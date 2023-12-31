import {createSlice} from '@reduxjs/toolkit';

const initialState={
    value: {
        isConnected: '',
        userStatus:null, 
        phoneNumber:null,
        lastname:null,
        firstName:null,
        email:null,
        hasHealthCard:null,
        adresse:null,
        healthCard: {
            dateOfBirth:new Date().toISOString(),
            size:null,
            weight:null,
            allergies:[],
            treatment: [],
            bloodGroup:null,
        },
        order:[],
        photoOrdonnance:[],
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
        updateUserStatus: (state,action) => {
            state.value.userStatus = action.payload.userStatus
            console.log(state.value)
        },
        signUp:(state,action) => {
            const { firstName, lastname, email,
                hasHealthCard,adresse} = action.payload
            state.value.lastname = lastname
            state.value.firstName= firstName
            state.value.email = email
            state.value.hasHealthCard = hasHealthCard
            state.value.adresse = adresse
            console.log('mis à jour credentials',state.value)
        },
        healthCardCreation:(state,action) => {
            const { isoStringDate,
                bloodGroup, size, weight} = action.payload
                
            state.value.healthCard.dateOfBirth = isoStringDate
            state.value.healthCard.size = size
            state.value.healthCard.weight = weight
            state.value.healthCard.bloodGroup = bloodGroup
            console.log('mise à jour healthcard',state.value.healthCard)// ajouter adresse et bloodgroup 
        },
        addTreatment:(state,action) => {
            if(!state.value.healthCard.treatment.find(e => e.pathologie === action.payload.pathologie)){
            state.value.healthCard.treatment.push(action.payload)
            console.log(state.value.healthCard.treatment)}
        },
        addAllergies:(state,action) => {
            if(!state.value.healthCard.allergies.find(e => e === action.payload)){
            state.value.healthCard.allergies.push(action.payload)}
        },
        logout:(state) => {
            state.value.isConnected = false;
            state.value.lastname=null;
            console.log(state.value)
        },
        addToCart:(state, action) => {
            console.log('item aded', action.payload)
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
        emptyCart: (state) => {
            state.value.order = [];
        },

        addPhotoOrdonnance: (state, action) => {
            console.log('add',action.payload)
            state.value.photoOrdonnance.push(action.payload);
          },
        removePhotoOrdonnance: (state, action) => {
            console.log('remove',action.payload)
            state.value.photoOrdonnance = state.value.photoOrdonnance.filter((data) => data !== action.payload);
          },

    }
})


export const {login,updateUserStatus, signUp,healthCardCreation, logout, addTreatment,addAllergies, addOneArticle,addToCart,removeFromCart,removeOneArticle,emptyCart, addPhotoOrdonnance, removePhotoOrdonnance} = userSlice.actions;
export default userSlice.reducer;

