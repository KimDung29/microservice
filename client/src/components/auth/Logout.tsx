import { useNavigate } from "react-router-dom";
import API from "../../core/utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/authSlice";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const res = await API.post("/auth/logout");
            if (res.data.status) {
                toast.error(res.data.message);
            } else {
                dispatch(clearUser());
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast.error("Logout failed");
        }
    };

    return (
        <div>
            <button
                onClick={handleLogout}
                style={{
                    color: "#fff",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "8px 12px",
                    backgroundColor: "#4caf50",
                    border: "1px solid #4caf50",
                    outline: "none",
                    borderRadius: "5px",
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
