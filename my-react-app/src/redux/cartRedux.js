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
            console.log(action.payload)
            //while here it is product selected for adding to cart quantity
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct:(state,action)=>{
            console.log(action.payload);
            // state.total=state.total-state.products[(-1)]
            // state?.quantity=state?.quantity-state.products[action.payload.number].quantity;
            console.log(state.products[action.payload.number]);
            state.products.splice(action.payload.number, 1);
            state.quantity--;
            console.log(state)
            
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