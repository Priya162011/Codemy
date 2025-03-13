import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checklogin = createAsyncThunk(
  'login/checklogin',
  async ({ username, password, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/login`, 
        { email: username, password: password }, 
        { withCredentials: true, responseType: 'json' }  
      );
      
      if (response.status === 200) {
        const userData = response.data.data;

        if(userData.role === "admin") {
          navigate('/admin');
        } else if(userData.role === "adminstar") {
          navigate('/admision');
        } else if(userData.role === "faculty") {
          navigate("/faculty");
        } else if(userData.role === "student") {
          navigate('/student');
        }

        return userData; 
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return rejectWithValue('Invalid username or password.');
      }
      return rejectWithValue('Something went wrong.');
    }
  }
);

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
       axios.get('/api/logout').then(res=>{
        if (res.status === 200) {
          state.user = null; 
      }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checklogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checklogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(checklogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;
