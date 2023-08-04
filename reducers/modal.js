import {createSlice} from '@reduxjs/toolkit';

const initialState={
    value: false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setModalVisible:(state,action )=> {
            state.value = action.payload;
        },
    }
})

export const {setModalVisible} = userSlice.actions;
export default userSlice.reducer;

