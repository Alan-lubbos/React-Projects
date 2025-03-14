import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
    username: string;
    password: string;
    loading: boolean;
    error: string | null;
}

const initialState: RegisterState = {
    username: '',
    password: '',
    loading: false,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        resetState: () => initialState, // Reset state when needed
    },
});

export const { setUsername, setPassword, setLoading, setError, resetState } = registerSlice.actions;

export default registerSlice.reducer;
