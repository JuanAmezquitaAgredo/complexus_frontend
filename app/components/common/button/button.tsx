import { ButtonProps } from "@/app/types/common/common";
import React from "react";
import  Style  from "./style.module.css";

const Button: React.FC<ButtonProps> = ({ label, backgroundColor}) => {
    return (
        <button className={Style.button} style={{ backgroundColor: backgroundColor  }} >
            {label}
        </button>
    );
};

export default Button