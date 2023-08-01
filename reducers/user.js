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

        }
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
        
    }
})


export const {login, signUp, healthCardCreation, addTreatment,addAllergies} = userSlice.actions;
export default userSlice.reducer;

