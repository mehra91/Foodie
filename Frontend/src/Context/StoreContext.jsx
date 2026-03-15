import {  createContext } from "react";
import { food_list } from "../assets/frontend_assets/assets";
 export const StoreContext = createContext();
 export const StoreContextProvider = ({children})=>{
   const contextValue = food_list
    return(
      <StoreContext.Provider value={contextValue}>
        {children}
      </StoreContext.Provider>
    )
 };