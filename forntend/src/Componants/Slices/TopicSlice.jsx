import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const TopicSlice = createSlice({
    name: 'topics',
    initialState: {
        topics:null
    },
    reducers: {
        addtopic: (state, action) => {
          
            state=action.payload;
            axios.post('/api/student_topic',state, {
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
          deletetopic:(state, action)=>{
            axios.delete(`/api/student_topic/${action.payload}`).then(res=>{
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          },
          edittopic:(state,action)=>{
            state=action.payload;
            
            axios.put(`/api/student_topic/${state.id}`,state).then(res=>{
              window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          }
    }
});

export const { addtopic, setStatus, setError,deletetopic,edittopic } = TopicSlice.actions;
export default TopicSlice.reducer;
