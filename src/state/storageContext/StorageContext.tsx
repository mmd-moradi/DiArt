"use client"

import { Dispatch, createContext, use, useEffect, useReducer } from "react";


type StorageStateType = number;

type StorageActionType = {
  type: "STORAGE_UPDATED";
};


const initialStorageState: StorageStateType = 0;

export const storageContext = createContext<{
  state: StorageStateType,
  dispatch: Dispatch<StorageActionType>
}>({
  state: initialStorageState,
  dispatch: () => {}
})

const storageReducer = (state:  StorageStateType, action: StorageActionType): StorageStateType => {
  switch(action.type) {
    case "STORAGE_UPDATED":
      return state + 1;
    default:
      return state;
  }
}

export const StorageProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(storageReducer, initialStorageState);
  return (
    <storageContext.Provider value={{state, dispatch}}>
      {children}
    </storageContext.Provider>
  )

}