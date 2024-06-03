import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SelectForm from "../../form/SelectForm";
import Checkbox from "../../form/Checkbox";
import InputForm from "../../form/InputForm";
import FileUpload from "../../form/FileUpload";
import Textarea from "../../form/Textarea";
import axios from "axios";
import API from "../../../core/utils/axiosInstance";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export interface InitialValueType {
    name: string;
    description: string;
    color: string[];
    size: string[];
    avatar: File | null;
    images: File[];
    quantity: number;
    price: string;
    serviceName: string;
    [key: string]: any;
}

const initialValue = {
    name: "",
    description: "",
    color: [],
    size: [],
    avatar: null,
    images: [],
    quantity: 0,
    price: "",
    serviceName: "c1-product-service",
};

export default function CreateProduct() {
    const navigate = useNavigate();
    const [values, setValues] = useState<InitialValueType>(initialValue);
    const [loading, setLoading] = useState(false);

    const inputs = [
        {
            id: 1,
            label: "Product's name",
            name: "name",
            type: "text",
            placeholder: "Product's name",
            required: true,
        },
        {
            id: 2,
            label: "Description",
            name: "description",
            type: "textarea",
            placeholder: "Description the product",
            required: true,
            errorMessage: "Product description is required",
        },
        {
            id: 3,
            label: "S",
            name: "size",
            value: "S",
            type: "checkbox",
        },
        {
            id: 4,
            label: "M",
            name: "size",
            value: "M",
            type: "checkbox",
        },
        {
            id: 5,
            label: "L",
            name: "size",
            value: "L",
            type: "checkbox",
        },
        {
            id: 6,
            label: "XL",
            name: "size",
            value: "XL",
            type: "checkbox",
        },
        {
            id: 7,
            label: "black",
            name: "color",
            value: "black",
            type: "checkbox",
        },
        {
            id: 8,
            label: "white",
            name: "color",
            value: "white",
            type: "checkbox",
        },
        {
            id: 9,
            label: "yellow",
            name: "color",
            value: "yellow",
            type: "checkbox",
        },
        {
            id: 10,
            label: "gray",
            name: "color",
            value: "gray",
            type: "checkbox",
        },
        {
            id: 11,
            label: "Quantity",
            name: "quantity",
            type: "number",
            placeholder: "Product's quantity",
            required: true,
        },
        {
            id: 12,
            type: "number",
            name: "price",
            label: "Price",
            placeholder: "Product's price",
            required: true,
        },
        {
            id: 13,
            label: "Avatar",
            name: "avatar",
            type: "file",
            placeholder: "",
            errorMessage: "Choose your avatar",
            required: true,
            pattern: "",
        },
        {
            id: 14,
            label: "Images",
            name: "images",
            type: "file",
            placeholder: "",
            errorMessage: "Choose your images",
            required: false,
            pattern: "",
            multiple: true,
        },
    ];

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement> & {
            target: { name: keyof InitialValueType; value: string };
        }
    ) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement> & {
            target: { name: keyof InitialValueType; value: string };
        }
    ) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            if (name === "avatar") {
                setValues({ ...values, avatar: files[0] });
            } else if (name === "images") {
                setValues((prevValues) => {
                    const fileArray = Array.from(files);
                    const updatedArray = [...prevValues.images, ...fileArray];
                    return { ...prevValues, images: updatedArray };
                });
            }
        }
    };

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        setValues((prevValues) => {
            const updatedArray = checked
                ? [...prevValues[name], value]
                : prevValues[name].filter((item: string) => item !== value);

            return { ...prevValues, [name]: updatedArray };
        });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("quantity", values.quantity.toString());
        formData.append("price", values.price);
        formData.append("color", values.color.join(","));
        formData.append("product_size", values.size.join(","));
        formData.append("serviceName", values.serviceName);
        if (values.avatar) {
            formData.append("avatar", values.avatar);
        }
        values.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            const res = await API.post("/products/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.status) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                navigate("/admin");
            }
        } catch (err) {
            console.log(err.stack);
            toast.error(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form_validate">
                <form onSubmit={onSubmit}>
                    <h1>Create Product</h1>
                    <div>
                        {inputs.map((input) =>
                            input.type === "file" ? (
                                <FileUpload
                                    key={input.id}
                                    label={input.label}
                                    name={input.name}
                                    pattern={input.pattern}
                                    required={input.required}
                                    errorMessage={input.errorMessage}
                                    onChange={onFileChange}
                                    multiple={input.multiple}
                                />
                            ) : input.type === "select" ? (
                                <SelectForm
                                    key={input.id}
                                    label={input.label}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    required={input.required}
                                    errorMessage={input.errorMessage}
                                    onChange={onSelectChange}
                                />
                            ) : input.type === "checkbox" ? (
                                <Checkbox
                                    key={input.id}
                                    label={input.label}
                                    type={input.type}
                                    name={input.name}
                                    value={input.value}
                                    onChange={onCheckboxChange}
                                />
                            ) : input.type === "textarea" ? (
                                <Textarea
                                    key={input.id}
                                    label="Description"
                                    name="description"
                                    onChange={onTextAreaChange}
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
                    </div>
                    <button className="submit" type="submit">
                        {loading ? "Loading" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
