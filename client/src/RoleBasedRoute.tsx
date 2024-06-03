import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "./redux/store";

const RoleBasedRoute = ({ children, allowedRoles }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user?.email) {
        try {
            const role = user?.role;
            if (allowedRoles.includes(role)) {
                return children;
            }
        } catch (e) {
            console.error("Failed to parse user data", e);
            localStorage.removeItem("user");
        }
    }

    return <Navigate to="/login" />;
};

export default RoleBasedRoute;
