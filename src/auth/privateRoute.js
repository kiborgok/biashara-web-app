import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser"

export const PrivateRoute = ({children}) => {
    const user = useUser()
    if (!user) {
        return <Navigate to='/signin' replace />
    }

    return children
}