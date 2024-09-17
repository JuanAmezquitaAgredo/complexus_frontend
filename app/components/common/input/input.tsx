'use client';
import React from "react";
import { InputFieldProps } from "@/app/types/common/common";
import Style from "./style.module.css";

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, placeholder,boderColor, onChange, disabled }) => {

    return (
        <div className={Style.InputContainer}>
            <label className={Style.Label}>{label}</label>
            <input
                className={Style.Inputform}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                style={{borderColor: boderColor}}
                disabled={disabled}
            />
        </div>
    )
}

export default InputField;