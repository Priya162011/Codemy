import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const PaymentSlice = createSlice({
    name: 'Payment',
    initialState: {
        Payment:null
    },
    reducers: {
        addPayment: (state, action) => {
            state=action.payload;
            axios.post('/api/Payment',state).then(res=>{
                
                // window.location.reload(); 
                axios.post('/api/receipt',{name:state.name,receiptno:"",status:1}).then(res=>{

                }).catch(err=>{
                  console.log(err)
                })
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
          deletePayment:(state, action)=>{
            axios.delete(`/api/Payment/${action.payload}`).then(res=>{
           
            //  window.location.reload(); 
            state.Payment = state.Payment.filter(mark => mark._id !== action.payload)
            }).catch(err=>{
              console.error(err);
            })
          },
          editPayment:(state,action)=>{
            state=action.payload;
            
            axios.put(`/api/Payment/${state.id}`,state).then(res=>{
             
              // window.location.reload(); 
              state.Payment = state.Payment.map(mark =>
                mark._id === action.payload._id ? res.data.data : mark
            )
            }).catch(err=>{
              console.error(err);
            })
          }
    }
});

export const { addPayment, setStatus, setError,deletePayment,editPayment } = PaymentSlice.actions;
export default PaymentSlice.reducer;
