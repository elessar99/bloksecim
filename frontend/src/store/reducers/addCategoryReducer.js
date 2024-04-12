import { useState } from "react";
import { useSelector } from "react-redux";

const SET_USER="SET_USER";
const ADD_CATEGORY = "ADD_CATEGORY";


const selector = useSelector(state => state.user);

const loginState={
    userName:"",
    eMail:"",
    password:"",
    categories:null,
    pinList:null
}


function addCategoryReducer(state=selector,action){
    switch (action.type) {
        case ADD_CATEGORY:
            return {
              ...state,
              categories: [...state.categories, action.payload.pin]
            };
            
        default:
            return  state

    }
}
export default addCategoryReducer