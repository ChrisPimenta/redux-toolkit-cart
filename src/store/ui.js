import { createSlice } from '@reduxjs/toolkit';

const initialUIState = {
    isCartShown: false
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIState,
    reducers: {
        toggleCart(state) {
            state.isCartShown = !state.isCartShown;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;