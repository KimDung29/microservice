import React from "react";

interface FileUploadProps {
    label?: string;
    name?: string;
    required?: boolean;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    multiple?: boolean;
    pattern?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    label,
    name,
    required,
    errorMessage,
    onChange,
    multiple,
}) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type="file"
                name={name}
                required={required}
                onChange={onChange}
                multiple={multiple}
            />
            {errorMessage && (
                <span className="error-message item3">{errorMessage}</span>
            )}
        </div>
    );
};

export default FileUpload;
