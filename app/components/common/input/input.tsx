'use client';
import React from "react";
import { Input, InputContainer, Label } from "./style";

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder: string;
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, placeholder }) => {

    return (
        <InputContainer>
            <Label>{label}</Label>
            <Input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
            />
        </InputContainer>
    )
}

export default InputField;