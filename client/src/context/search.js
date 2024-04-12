import { useState, createContext, useContext} from "react";

// import axios from "axios";

const SearchContext = createContext();

const SearchProvider = ({children}) => {

    const [values, setValues] = useState({
        keyword:"",  //store keyword
        results:[],    //store results
    });

    //axios config
    

    return (
        <SearchContext.Provider value = {[values, setValues]}>
            {children}
        </SearchContext.Provider>

    );

};

const useSearch = () => useContext(SearchContext);
// const [auth, setAuth] = useAuth()   can be usedon other pages

export {useSearch, SearchProvider};