"use client"

import { Dispatch, createContext, use, useEffect, useReducer } from "react";


export type AuthFormStateType = boolean;

export type AuthFormActionType = {
  type: "AuthFormOpened" | "AuthFormClosed";
};


const initialStorageState: AuthFormStateType = false;

export const AuthFormContext = createContext<{
  state: AuthFormStateType,
  dispatch: Dispatch<AuthFormActionType>
}>({
  state: initialStorageState,
  dispatch: () => {}
})

const AuthFormReducer = (state:  AuthFormStateType, action: AuthFormActionType): AuthFormStateType => {
  switch(action.type) {
    case "AuthFormOpened":
      return true;
    case "AuthFormClosed":
      return false;
    default:
      return state;
  }
}

export const AuthFormProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(AuthFormReducer, initialStorageState);
  return (
    <AuthFormContext.Provider value={{state, dispatch}}>
      {children}
    </AuthFormContext.Provider>
  )

}