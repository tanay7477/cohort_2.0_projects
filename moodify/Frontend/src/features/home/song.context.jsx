import { createContext, useState } from "react";

export const SongContext = createContext(null)

export const SongContextProvider = ({children}) => {
    const[song , setSong ] = useState({
        //yahan koi example likho 
    })

    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{song, setSong, loading, setLoading}}>
            {children}
        </SongContext.Provider>
    )
}

