const SET_ADMIN = "SET_ADMIN";
const SET_USER="SET_USER";
const ADD_CATEGORY = "ADD_CATEGORY";

const adminData ={
        userName: '',
        eMail: '',
        passWord:"",
        isAdmin: true,
        ownerName:"",
        ownerCategories: null,
    }


function adminLoginReducer(state=adminData,action){
    switch (action.type) {
        case SET_ADMIN:
            return {
                userName:action.payload.userName,
                eMail:action.payload.eMail,
                passWord:action.payload.passWord,
                isAdmin:true,
                ownerName:action.payload.ownerName,
                ownerCategories:action.payload.ownerCategories
            }
        default:
            return  state
    }
}
export default adminLoginReducer