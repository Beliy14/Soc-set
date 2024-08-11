import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    dateBirth: ''
}

const dataProfileSlice = createSlice({
    name: 'dataProfile',
    initialState,
    reducers: {
        addDataProfile: (state, action) => {
            state.name = action.payload.name
            state.dateBirth = action.payload.dateBirth
        }   
    }
})

export const { addDataProfile } = dataProfileSlice.actions;
export default dataProfileSlice.reducer;