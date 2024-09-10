'use client';
import React from "react";
import InputField from "../common/input/input";
import Button from "../common/button/button";
import Style from "./style.module.css";

const Login: React.FC = () => {
    return (
        <div className={Style.LoginContainer}>
            <InputField label="Email" type="email" name="email" value="" placeholder="Email"/>
            <InputField label="Password" type="password" name="password" value="" placeholder="Password"/>
            <Button label="Login"/>
        </div>
    );
};
export default Login;