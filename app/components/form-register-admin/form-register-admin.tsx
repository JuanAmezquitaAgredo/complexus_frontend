

import React from "react";
import InputField from "../common/input/input";
import Button from "../common/button/button";
import Style from "./style.module.css";

const FormRegisterAdmin = () => {

    return (
        <form className={Style.form}>
            <div className={Style.form__title}>Admin Registartion</div>
            <hr />
            <InputField label="Name" type="Name" name="Name" value="" placeholder="Name"/>
            <InputField label="Email" type="Email" name="Email" value="" placeholder="Email" />
            <InputField label="Password" type="Password" name="Password" value="" placeholder="Password" />
            <InputField label="Phone" type="Phone" name="Phone" value="" placeholder="Phone" />
            <InputField label="Name_Tower" type="Name_Tower" name="Name_Tower" value="" placeholder="Name_Tower" />
            <div className={Style.form_buttons}>
                <Button label="Cancel" backgroundColor="#EF4444"/>
                <Button label="Register"/>
            </div>
        </form>
    );
};

export default FormRegisterAdmin;