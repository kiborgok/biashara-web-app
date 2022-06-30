import { useState, useEffect } from "react";
import { useToken } from "./useToken";
import jwt from 'jwt-decode';

const SECRET_KEY = "DiN=*&6HBKJ-NBvgT@YHV_HV#@$%JGHVb08yB_gDd";

const useUser = () => {
    const [token] = useToken();

    const getUser = token => {
        return jwt(token, SECRET_KEY);
    }

    const [user, setUser] = useState(() => {
        if (!token) return null
        return getUser(token)
    })

    useEffect(() => {
        if (!token) {
            setUser(null)
        } else {
            setUser(getUser(token))
        }
    }, [token])
    
    return user
}

export default useUser