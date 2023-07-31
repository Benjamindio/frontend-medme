import {createSlice} from '@reduxjs/toolkit';

const initialState={
    value: {
        isConnected: '', 
        phoneNumber:null,
        lastname:null,
        firstname:null,
        email:null,
        hasHealthCard:null,
        healthCard: {
            dateOfBirth:null,
            size:null,
            weigth:null,
            allergies:[null],
            treatment: [{
                pathologie:null,
                actualTreatment:null,
                dosage:null,
            }],

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
            const { firstname, lastname, email,
                hasHealthCard} = action.payload
            state.value.lastname = lastname
            state.value.firstname= firstname
            state.value.email = email
            state.value.hasHealthCard = hasHealthCard
            console.log(state.value)
        },
        healtCardCreation:(state,action) => {
            const { adress, dateOfBirth,
                bloodGroup, size, weight} = action.payload
            state.value.dateOfBirth = dateOfBirth
            state.value.size = size
            state.value.weight = weight
            console.log(state.value)// ajouter adresse et bloodgroup 
        },
        addTreatment:(state,action) => {
            state.value.treatment.push(action.payload.treatment)
        },
        addAllergies:(state,action) => {
            state.value.push(action.payload.allergies)
        },
        logout:(state) => {
            state.value.isConnected = false;
            state.value.lastname=null;
        }
    }
})


export const {login, signUp, healtCardCreation, addTreatment,addAllergies} = userSlice.actions;
export default userSlice.reducer;

