const SET_TOKEN="SET_TOKEN";
const tokenState={
    token:"none"
}
function loginTokenReducer(state=tokenState,action){
    switch (action.type) {
        case SET_TOKEN:
            return {
                token:action.payload
            }
        default:
            return  state

    }
}
export default loginTokenReducer