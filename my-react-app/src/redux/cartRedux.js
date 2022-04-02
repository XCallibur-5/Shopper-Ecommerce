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
        removeProduct:(state,action)=>{
            console.log(action.payload);
            console.log(state.products);
            //state.total=state.total-state.products[(-1)].
            state.products.pop();
            state.quantity--;
            //state.total=0;
            
        },
        resetProduct:(state)=>{
            state.quantity=0;
            state.products=[];
            state.total=0
        }
    },
});

export const {addProduct,resetProduct,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;