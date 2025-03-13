import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const examSlice = createSlice({
    name: 'exams',
    initialState: {
        exams:null
    },
    reducers: {
        addexam: (state, action) => {
            state=action.payload;
            axios.post('/api/exam',state, {
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
          deleteexam:(state, action)=>{
            axios.delete(`/api/exam/${action.payload}`).then(res=>{
              console.log(res.data);
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          },
          editexam:(state,action)=>{
            state=action.payload;
            
            axios.put(`/api/exam/${state.id}`,state).then(res=>{
              console.log(res.data);
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          }
    }
});

export const { addexam, setStatus, setError,deleteexam,editexam } = examSlice.actions;
export default examSlice.reducer;
