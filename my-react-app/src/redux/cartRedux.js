import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state,action)=>{
            //this is cart quantity
            state.quantity+=1;
            state.products.push(action.payload);
            //while here it is product selected for adding to cart quantity
            state.total += action.payload.price * action.payload.quantity;
        },
    },
});

export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;