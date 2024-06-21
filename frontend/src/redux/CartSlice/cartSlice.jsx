import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartAPI from './cartAPI';
// Define the initial state for the cart
const initialState = {
  cart: { products: [] },
  cart1:{products:[]},
  loading: false,
  status: 'idle',
  error: null,
};

//add async thunk to add to db
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (payload, thunkAPI) => {
    try {
      console.log("From async")
      const response = await cartAPI.addToCart(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//load async thunk to loadd from db
export const loadCartAsync = createAsyncThunk(
  'cart/loadCart',
  async (payload, thunkAPI) => {
    try {
      // console.log("From loadCartAsync")
      const response = await cartAPI.loadCart(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartLocally(state, action) {
      state.cart.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        console.log(state.cart);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadCartAsync.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.cart = action.payload;
        // console.log(state.cart);

      })
      .addCase(loadCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addToCartLocally } = cartSlice.actions;
export default cartSlice.reducer;