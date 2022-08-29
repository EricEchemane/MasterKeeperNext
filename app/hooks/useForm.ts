import { useState } from "react";

export default function useForm(
    initialValues: { [key: string]: string; },
    validators?: { [key: string]: (value: string) => string | null; }
) {
    const [values, setValues] = useState(initialValues);

    const validate = () => {
        const errors: { [key: string]: string; } = {};
        let noErrors = true;
        Object.keys(values).forEach(key => {
            if (validators && validators[key]) {
                const error = validators[key](values[key]);
                if (error) {
                    errors[key] = error;
                    noErrors = false;
                }
            }
        });
        return noErrors ? null : errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(values => ({ ...values, [name]: value }));
    };

    return { values, handleChange, validate };
}