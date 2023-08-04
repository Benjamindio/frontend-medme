import {createSlice} from '@reduxjs/toolkit';

const initialState={
    value: {
        isConnected: '', 
        phoneNumber:null,
        lastname:null,
        firstName:null,
        email:null,
        hasHealthCard:null,
        healthCard: {
            dateOfBirth:null,
            size:null,
            weight:null,
            allergies:[],
            treatment: [],

        },
        order:[]
    }
}


export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action )=> {
            state.value.isConnected = action.payload.token;
            state.value.phoneNumber = action.payload.phoneNumber
            console.log(state.value)
        },
        signUp:(state,action) => {
            const { firstName, lastname, email,
                hasHealthCard} = action.payload
            state.value.lastname = lastname
            state.value.firstName= firstName
            state.value.email = email
            state.value.hasHealthCard = hasHealthCard
            console.log(state.value)
        },
        healthCardCreation:(state,action) => {
            const { adress, dateOfBirth,
                bloodGroup, size, weight} = action.payload
            state.value.healthCard.dateOfBirth = dateOfBirth
            state.value.healthCard.size = size
            state.value.healthCard.weight = weight
            console.log(state.value)// ajouter adresse et bloodgroup 
        },
        addTreatment:(state,action) => {
            state.value.healthCard.treatment.push(action.payload)
            console.log(state.value.healthCard.treatment)
        },
        addAllergies:(state,action) => {
            state.value.healthCard.allergies.push(action.payload)
        },
        logout:(state) => {
            state.value.isConnected = false;
            state.value.lastname=null;
        },
        addToCart:(state, action) => {
            if(!state.value.order.find(e => e.product_id === action.payload.product_id)){
            state.value.order.push(action.payload)}
            //else{
                //const i = state.value.order.findIndex(action.payload.product_id)
               // state.value.order[i].quantity = state.value.order[i].quantity + action.payload.quantity
                //if(state.value.order.includes(action.payload.))
                
           // }
        
            console.log(state.value.order)
        },
        removeFromCart: (state, action) => {
            state.value.order = state.value.order.filter((item) => item.product_id !== action.payload.product_id);
          },
        addOneArticle: (state, action) => {
            const index = state.value.order.findIndex((item) => item.product_id === action.payload.product_id);
            if (index !== -1) {
              state.value.order[index].quantity += 1;
            }
         
        }, 
        removeOneArticle: (state, action) => {
            const index = state.value.order.findIndex((item) => item.product_id === action.payload.product_id);
            if (index !== -1) {
              state.value.order[index].quantity -= 1;
            }
          },

    }
})


export const {login, signUp, healthCardCreation, addTreatment,addAllergies, addOneArticle,addToCart,removeFromCart,removeOneArticle} = userSlice.actions;
export default userSlice.reducer;

