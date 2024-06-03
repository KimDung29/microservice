import { useState } from "react";
import InputForm from "../form/InputForm";
import "../form/form.css";
import { useNavigate } from "react-router-dom";
import Checkbox from "../form/Checkbox";
import API from "../../core/utils/axiosInstance";
import { toast } from "react-toastify";

export interface InitialValueType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
    [key: string]: any;
}
const initialValue = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
};

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState<InitialValueType>(initialValue);
    const [loading, setLoading] = useState(false);

    const inputs = [
        {
            id: 1,
            label: "First Name",
            name: "first_name",
            type: "text",
            placeholder: "Enter your first name",
            errorMessage:
                "First Name should be 3-16 characters and should not includes any special characters.",
            required: true,
            pattern: "^[A-Za-z0-9]{3,16}$",
        },
        {
            id: 2,
            label: "Last Name",
            name: "last_name",
            type: "text",
            placeholder: "Enter your last name",
            errorMessage:
                "First Name should be 3-16 characters and should not includes any special characters.",
            required: true,
            pattern: "^[A-Za-z0-9]{3,16}$",
        },
        {
            id: 3,
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            errorMessage: "Email should be valid.",
            required: true,
            pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
        },
        {
            id: 4,
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            errorMessage:
                "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 characters",
            required: true,
            pattern: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
        },
        {
            id: 5,
            type: "password",
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Enter your confirm password",
            errorMessage: "It should be same with your password.",
            required: true,
            pattern: values.password,
        },
        {
            id: 6,
            type: "checkbox",
            name: "isAdmin",
            label: "Are you a seller ?",
            placeholder: "",
            errorMessage: "",
            required: true,
            pattern: "",
        },
    ];

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement> & {
            target: { name: keyof InitialValueType; value: string };
        }
    ) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.checked });
    };

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post("/auth/register", { ...values });

            if (res.data.status) {
                toast.error(res.data.message);
            } else {
                res.data.message ? navigate("/login") : navigate("/register");
                toast.success("Your account has been registed successfully.");
            }
        } catch (err) {
            console.error(err.stack);
        }
    };

    return (
        <>
            <div className="container">
                <div className="form_validate">
                    <form onSubmit={onSubmit}>
                        <h1>Register</h1>

                        {inputs.map((input) =>
                            input.type === "checkbox" ? (
                                <Checkbox
                                    key={input.id}
                                    label={input.label}
                                    type={input.type}
                                    name={input.name}
                                    // errorMessage={input.errorMessage}
                                    onChange={onCheckboxChange}
                                />
                            ) : (
                                <InputForm
                                    key={input.id}
                                    label={input.label}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    pattern={input.pattern}
                                    required={input.required}
                                    errorMessage={input.errorMessage}
                                    onChange={onInputChange}
                                />
                            )
                        )}

                        <button className="submit" type="submit">
                            {loading ? "Loading" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
