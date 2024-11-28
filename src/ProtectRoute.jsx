import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoute (){
    const userRole = localStorage.getItem('role');
    if(userRole != 'student') {
        return <Navigate to = '/login' replace />
    }
    return <Outlet/>
}