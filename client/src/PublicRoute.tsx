import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "./redux/store";

const PublicRoute = ({ children }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (user?.email) {
        try {
            const role = user?.role;
            return <Navigate to={role === "admin" ? "/admin" : "/client"} />;
        } catch (e) {
            console.error("Failed to parse user data", e);
            localStorage.removeItem("user");
        }
    }

    return children;
};

export default PublicRoute;
