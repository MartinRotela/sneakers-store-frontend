import { useState, ChangeEvent } from 'react';

export const useForm = <T extends Object>(initialState: T) => {
    const [values, setValues] = useState(initialState);
    const reset = (newFormState = initialState) => setValues(newFormState);
    const handleInputChange = ({
        target,
    }: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
        setValues({
            ...values,
            [target.name]: target.value,
        });
    };

    return { values, handleInputChange, reset };
};
