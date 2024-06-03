import "./form.css";

export interface InitialValueType {
    description: string;
}
interface TextareaType {
    label?: string;
    name: string;
    errorMessage?: string;
    onChange?: (
        e: React.ChangeEvent<HTMLTextAreaElement> & {
            target: { name: keyof InitialValueType; value: string };
        }
    ) => void;
}

function Textarea({ label, name, errorMessage, onChange }: TextareaType) {
    return (
        <div>
            <p>
                <label htmlFor={name}>{label}</label>
            </p>
            <textarea
                id={name}
                name={name}
                rows={4}
                cols={50}
                onChange={onChange}
            ></textarea>
            {errorMessage && (
                <span className="error-message item3">{errorMessage}</span>
            )}
        </div>
    );
}

export default Textarea;
