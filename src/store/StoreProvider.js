import React from 'react';
import { useReducer , useContext, createContext } from "react";
import initialState from "../reducer/initialState";
import rootReducer from "../reducer/rootReducer";
const StoreContext = createContext();

const StoreProvider = ({children}) => 
    <StoreContext.Provider value={useReducer(rootReducer, initialState)}>
        {children}
    </StoreContext.Provider>

const useGlobalState = () => useContext(StoreContext)[0]
const useDispatch = () => useContext(StoreContext)[1]

export { StoreContext , useGlobalState, useDispatch }
export default StoreProvider;
