import { createContext, useContext, useState } from "react";


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    return (<UserContext.Provider 
    value={{userId,userName, userEmail,isLogin,setUserId,setUserName, setUserEmail, setIsLogin}}>
    {children}
    </UserContext.Provider>);
}


const useUserContext = ()=> useContext(UserContext);

export default useUserContext;