import { useState } from "react";

export default function useForm(initialValues: { [key: string]: string | number; }) {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(values => ({ ...values, [name]: value }));
    };

    return { values, handleChange };
}