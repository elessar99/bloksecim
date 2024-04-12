
const SET_USER="SET_USER";
const ADD_CATEGORY = "ADD_CATEGORY";



const loginState={
    userName:"",
    eMail:"",
    password:"",
    categories:null,
    pinList:null
}


function loginReducer(state=loginState,action){
    switch (action.type) {
        case SET_USER:
            return {
                userName:action.payload.userName,
                eMail:action.payload.eMail,
                passWord:action.payload.passWord,
                categories:action.payload.categories,
                pinList:action.payload.pinList
            }
        case ADD_CATEGORY:
            return {
              ...action.user,
              categories: [...action.user.categories, action.payload.category]
            };
            
        default:
            return  state

    }
}
export default loginReducer