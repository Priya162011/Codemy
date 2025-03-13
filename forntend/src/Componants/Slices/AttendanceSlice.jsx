import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const AttendanceSlice = createSlice({
    name: 'attendances',
    initialState: {
        attendances:null
    },
    reducers: {
        addattendance: (state, action) => {
            state=action.payload;
            axios.post('/api/attendance',state, {
              headers: { 'Content-Type': 'application/json' }}).then(res=>{
                console.log(res.data);
                window.location.reload(); 
              }).catch(err=>{
                console.error(err);
              })
          },
          setStatus: (state, action) => {
            state.status = action.payload;
          },
        setError: (state, action) => {
            state.error = action.payload;
          },
          deleteattendance:(state, action)=>{
            axios.delete(`/api/attendance/${action.payload}`).then(res=>{
              console.log(res.data);
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          },
          editattendance:(state,action)=>{
            state=action.payload;
            
            axios.put(`/api/attendance/${state.id}`,state).then(res=>{
              console.log(res.data);
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          }
    }
});

export const { addattendance, setStatus, setError,deleteattendance,editattendance } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;
