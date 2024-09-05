'use client';
import React from "react";
import InputField from "../common/input/input";
import Button from "../common/button/button";
import ButtonGradient from "../common/buttonGradient/buttonGradient";
import Style from "./style.module.css";

const Login: React.FC = () => {
    return (
        <div className={Style.LoginContainer}>
            <InputField label="Email" type="email" name="email" value="" placeholder="Email"/>
            <InputField label="Password" type="password" name="password" value="" placeholder="Password"/>
            <Button label="Login"/>
            <div className={Style.RegisterContainer}>
                <ButtonGradient label="Owner Register"/>
                <ButtonGradient label="Admin Register"/>
            </div>
        </div>
    );
};
export default Login;