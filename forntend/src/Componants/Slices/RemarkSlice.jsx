import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const remarkSlice = createSlice({
    name: 'remarks',
    initialState: {
        remarks:null
    },
    reducers: {
        addremark: (state, action) => {
            state=action.payload;
            
            axios.post('/api/remark',state, {
              headers: { 'Content-Type': 'application/json' }}).then(res=>{
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
          deleteremark:(state, action)=>{
            axios.delete(`/api/remark/${action.payload}`).then(res=>{
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          },
          editremark:(state,action)=>{
            state=action.payload;
            
            axios.put(`/api/remark/${state.id}`,state).then(res=>{
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          }
    }
});

export const { addremark, setStatus, setError,deleteremark,editremark } = remarkSlice.actions;
export default remarkSlice.reducer;
