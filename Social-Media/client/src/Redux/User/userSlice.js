import { createSlice } from '@reduxjs/toolkit'



const defaultUser = JSON.parse(localStorage.getItem('user'))
console.log(defaultUser,'defaultUser');
if(defaultUser){
    var {fullName,userName,accountType,_id,} = defaultUser
}else{

}


const userSlice = createSlice({
    name:'user',
    initialState:{
        _id,
        fullName,
        userName,
        accountType,
    },
    reducers:{
        update:(state,action)=>{
            state._id = action.payload._id
            state.fullName = action.payload.fullName
            state.userName = action.payload.userName
            state.accountType = action.payload.accountType
        }, 
        remove:(state) => {state ={} }
    },
});


export const {update, remove} = userSlice.actions;
export default userSlice.reducer;
