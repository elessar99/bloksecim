const SET_ADMIN = "SET_ADMIN";

export const setAdmin=(admin)=>{
    return {
        type:SET_ADMIN,
        payload:admin
    }
}