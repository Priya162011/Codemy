import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const requestOtp = createAsyncThunk(
  "forgetPassword/requestOtp",
  async ({ mobile }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/request-otp", { mobile });
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to send OTP. Try again.");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "forgetPassword/verifyOtp",
  async ({ mobile, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/verify-otp", {
        mobile,
        otp,
        newPassword,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Invalid OTP or error resetting password.");
    }
  }
);

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: {
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(requestOtp.fulfilled, (state) => {
        state.status = "otpSent";
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = "passwordReset";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default forgetPasswordSlice.reducer;
