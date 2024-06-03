import { useState } from "react";

interface CheckboxType {
    label?: string;
    type?: string;
    name?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
    label,
    type,
    onChange,
    name,
    value,
}: CheckboxType) {
    const [focus, setFocus] = useState(false);

    const handleFocused = () => {
        setFocus(true);
    };

    return (
        <div
            className="checkboxLabel"
            style={{ display: "inline", marginRight: "15px", width: "50px" }}
        >
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleFocused}
                data-focus={focus.toString()}
            />
            <label>{label}</label>
        </div>
    );
}
