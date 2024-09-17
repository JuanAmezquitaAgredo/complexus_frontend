'use client'
import React from "react";
import FormRegisterOwner from "../components/form-register-owner/form-register-owner";
import FormRegisterAdmin from "../components/form-register-admin/form-register-admin";

const RegisterPage: React.FC = () => {
    return (
        <div style={{backgroundColor: '#15004e' }}>
            <h1>Register Page</h1>
            <FormRegisterOwner />
            <FormRegisterAdmin />
        </div>
    );
};

export default RegisterPage;