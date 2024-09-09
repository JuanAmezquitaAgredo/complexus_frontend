import React, { useState } from "react";
import InputField from "../common/input/input";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Button from "../common/button/button";
import Style from "./style.module.css";
import { UserOwner } from "@/app/types/owners";
import { auth } from "@/app/firebase/config";
import { sendEmailVerification } from "firebase/auth";
import showAlert from "../alertcomponent/alertcomponent";

const FormRegisterOwner = () => {
    const initialState: UserOwner = {
        name: "",
        email: "",
        password: "",
        phone: "",
        tower: "",
        apto: "",
        rol: "owner",
    };

    const [owner, setOwner] = React.useState<UserOwner>(initialState);
    const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            // 1. Enviar los datos a la base de datos falsa con json-server
            const responseDB = await fetch('http://localhost:3004/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(owner), // Enviar los datos del propietario
            });

            if (!responseDB.ok) {
                throw new Error('Error al guardar los datos en la base de datos local.');
            }

            // 2. Si la base de datos local respondió correctamente, crear el usuario en Firebase
            const responseFirebase = await createUserWithEmailAndPassword(owner.email, owner.password);
            
            if (responseFirebase) {
                await sendEmailVerification(responseFirebase.user);
                await showAlert({
                    title: "Enlace de verificación enviado",
                    text: "El enlace de verificación ha sido enviado a tu correo electrónico.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                
                // Limpiar el formulario después del registro exitoso
                setOwner(initialState);  

                window.location.reload();
            }
        } catch (error) {
            console.error('Error en el proceso de registro:', error);
            await showAlert({
                title: "Error",
                text: "Hubo un error al procesar tu registro. Intenta nuevamente.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOwner(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <form className={Style.form} onSubmit={handleSubmit}>
            <div className={Style.form__title}>Owner Registration</div>
            <hr />
            <InputField label="Name" type="text" name="name" value={owner.name} placeholder="Name" onChange={handleChange} />
            <InputField label="Email" type="email" name="email" value={owner.email} placeholder="Email" onChange={handleChange} />
            <InputField label="Password" type="password" name="password" value={owner.password} placeholder="Password" onChange={handleChange} />
            <InputField label="Phone" type="text" name="phone" value={owner.phone} placeholder="Phone" onChange={handleChange} />
            <InputField label="Tower" type="text" name="tower" value={owner.tower} placeholder="Tower" onChange={handleChange} />
            <InputField label="Apto" type="text" name="apto" value={owner.apto} placeholder="Apto" onChange={handleChange} />
            <div className={Style.form_buttons}>
                <Button label="Register" type="submit"/>
            </div>
        </form>
    );
};

export default FormRegisterOwner;
