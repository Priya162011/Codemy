import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const leaveSlice = createSlice({
    name: 'leaves',
    initialState: {
        leaves:null
    },
    reducers: {
        addleave: (state, action) => {
            state=action.payload;
            axios.post('/api/leave',state, {
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
          deleteleave:(state, action)=>{
            axios.delete(`/api/leave/${action.payload}`).then(res=>{
              
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          },
          editleave:(state,action)=>{
            state=action.payload;
            
            axios.put(`/api/leave/${state._id}`,{status:state.status}).then(res=>{
              // console.log(res.data.data.data);
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          }
    }
});


export const { addleave, setStatus, setError,deleteleave,editleave } = leaveSlice.actions;
export default leaveSlice.reducer;
