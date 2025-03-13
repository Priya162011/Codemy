import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const StudentSlice = createSlice({
    name: 'Students',
    initialState: {
        students:null
    },
    reducers: {
        addStudent: (state, action) => {
          console.log(action)
            state=action.payload;
            axios.post('/api/register',state).then(res=>{
             
                window.location.href="/admision"
              
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
          deleteStudent:(state, action)=>{
            axios.delete(`/api/Students/${action.payload}`).then(res=>{
            
              window.location.reload(); 
             }).catch(err=>{
              console.error(err);
            })
          },
          editStudent:(state,action)=>{
            state=action.payload;
            
            axios.put(`/api/student/${state._id}`,state).then(res=>{
               window.location.reload(); 
            }).catch(err=>{
              console.error(err);
            })
          }
    }
});

export const { addStudent, setStatus, setError,deleteStudent,editStudent } = StudentSlice.actions;
export default StudentSlice.reducer;
