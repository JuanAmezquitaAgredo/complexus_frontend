import { ButtonGradientProps } from "@/app/types/common/common";
import React from "react";
import Style from "./style.module.css";
const ButtonGradient: React.FC<ButtonGradientProps> = ({ label }) => {
    return (
        <button className={Style.buttonGradient}>
            {label}
        </button>
    );
};

export default ButtonGradient