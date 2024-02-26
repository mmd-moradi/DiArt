"use client"
import { Dispatch, createContext, useReducer } from "react";


export interface UserDataType {
  userProfileUrl: string;
};

interface UserProfileStateType {
  data: UserDataType | undefined;
}

const initialUserProfileState: UserProfileStateType = {
  data: undefined
}

export const userDataContext = createContext<{
  state: UserProfileStateType,
  dispatch: Dispatch<Action>
}>({
  state: initialUserProfileState,
  dispatch: () => {}
})

export type Action = 
  | {type: "SET_USER_PROFILE", payload: UserDataType}
  | {type: "CLEAR_USER_PROFILE"}


const userDataReducer = (state: UserProfileStateType, action: Action) => {
  switch(action.type) {
    case "SET_USER_PROFILE":
      return {...state, data: action.payload}
    
    case "CLEAR_USER_PROFILE":
      return {...state, data: undefined}
    
    default:
      return state
  }
}



export const UserProfileProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(userDataReducer, initialUserProfileState)

  return (
    <userDataContext.Provider value={{ state, dispatch }}>
      {children}
    </userDataContext.Provider>
  )
}