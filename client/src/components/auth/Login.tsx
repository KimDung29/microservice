import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../form/InputForm";
import "../form/form.css";
import API from "../../core/utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";

export interface InitialValueType {
    email: string;
    password: string;
    [key: string]: any;
}
const initialValue = {
    email: "",
    password: "",
};

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState<InitialValueType>(initialValue);
    const [loading, setLoading] = useState(false);

    const inputs = [
        {
            id: 1,
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            errorMessage: "Email should be valid.",
            required: true,
        },
        {
            id: 2,
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            required: true,
        },
    ];

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement> & {
            target: { name: keyof InitialValueType; value: string };
        }
    ) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post("/auth/login", { ...values });
            if (res.data.status) {
                toast.error(res.data.message);
            } else {
                dispatch(setUser(res.data));
                res.data.role === "admin"
                    ? navigate("/admin")
                    : navigate("/client");
                toast.success("Login successful!");
            }
        } catch (err) {
            console.log(err);
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className="form_validate">
                    <form onSubmit={onSubmit}>
                        <h1>Login</h1>

                        {inputs.map((input) => (
                            <InputForm
                                key={input.id}
                                label={input.label}
                                name={input.name}
                                type={input.type}
                                placeholder={input.placeholder}
                                required={input.required}
                                errorMessage={input.errorMessage}
                                onChange={onInputChange}
                            />
                        ))}

                        <button className="submit" type="submit">
                            {loading ? "Loading" : "Submit"}
                        </button>
                    </form>
                    <Link to={"/register"} className="linkToRegister">
                        or Register
                    </Link>
                </div>
            </div>
        </>
    );
}
