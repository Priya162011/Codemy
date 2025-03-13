import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const MarksSlice = createSlice({
    name: 'Marks',
    initialState: {
        Marks:null
    },
    reducers: {
        addMarks: (state, action) => {
            state=action.payload;
            axios.post('/api/marks',state).then(res=>{
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
          deleteMarks:(state, action)=>{
            axios.delete(`/api/marks/${action.payload}`).then(res=>{
            
             window.location.reload(); 
            state.Marks = state.Marks.filter(mark => mark._id !== action.payload)
            }).catch(err=>{
              console.error(err);
            })
          },
          editMarks:(state,action)=>{
            state=action.payload;
            
            axios.put(`/api/marks/${state.id}`,state).then(res=>{
              
              window.location.reload(); 
              state.Marks = state.Marks.map(mark =>
                mark._id === action.payload._id ? res.data.data : mark
            )
            }).catch(err=>{
              console.error(err);
            })
          }
    }
});

export const { addMarks, setStatus, setError,deleteMarks,editMarks } = MarksSlice.actions;
export default MarksSlice.reducer;
