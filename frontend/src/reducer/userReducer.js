export const initialState = null ; //initial value for user is null 

export const reducer = (state, action ) =>{
    if(action.type == "USER"){
        return action.payload;
    }
    if(action.type == "LOGOUT"){
        return null;
    }
    return state;
}