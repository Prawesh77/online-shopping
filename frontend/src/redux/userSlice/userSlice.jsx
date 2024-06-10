import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import userAPI from './userAPI';

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
    const response = await userAPI.login(credentials);
    return response.data;
});

export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
    const response = await userAPI.register(userData);
    return response.data;
});

const getInitialState = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return {
                token: token,
                userid: decodedToken.userid,
                userName: decodedToken.username,
                status: 'idle',
                error: null,
                isLoggedIn: true,
                isAdmin: decodedToken.isAdmin,
            };
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    return {
        token: null,
        userid: null,
        userName: null,
        status: 'idle',
        error: null,
        isLoggedIn: false,
        isAdmin: false,
    };
};

const initialState = getInitialState();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.userId = null;
            state.userName = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => { 
                const token=action.payload.token;
                state.token = action.payload;
                state.isLoggedIn = true;
                if(token){
                    try{
                        const decodedToken = jwtDecode(token);
                        state.userName=decodedToken.username;
                        state.isAdmin=decodedToken.isAdmin;
                        console.log(state.userName);
                    }catch(error){
                        console.error('Error decoding token:', error);
                    }
                }
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;