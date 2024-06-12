import { createSlice } from "@reduxjs/toolkit";

const indicatorSlice = createSlice({
    name: "indicator",
    initialState: {
        flag:false
    },
    reducers: {
        setFlag: (state, action) => {
            state.flag = action.payload;
        }
    }
});

export const {setFlag} = indicatorSlice.actions
export default indicatorSlice.reducer;