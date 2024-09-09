import { ButtonGradientProps } from "@/app/types/common/common";
import React from "react";
import Style from "./style.module.css";
const ButtonGradient: React.FC<ButtonGradientProps> = ({ label, onClick }) => {
    return (
        <button className={Style.buttonGradient} onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonGradient