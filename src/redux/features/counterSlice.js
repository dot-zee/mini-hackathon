import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
        state.value += 1
    },
    decrement: (state) => {
        state.value -= 1
    },
    incrementByAmount: (state , action) => {
        state.value += action.payload
    },
    decrementByAmount: (state , action) => {
        state.value -= action.payload
    }
  },
});

// Export the actions so that our components can use them
export const {increment , decrement , incrementByAmount , decrementByAmount} = counterSlice.actions

// Export the reducer so that the Store can use it 
export default counterSlice.reducer
