import { ButtonProps } from "@/app/types/common/common";
import React from "react";
import  Style  from "./style.module.css";

const Button: React.FC<ButtonProps> = ({ label, backgroundColor, onClick}) => {
    return (
        <button className={Style.button} style={{ backgroundColor: backgroundColor}} onClick={onClick} >
            {label}
        </button>
    );
};

export default Button