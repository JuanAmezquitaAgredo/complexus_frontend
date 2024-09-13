import React, { useState } from "react";
import InputField from "../common/input/input";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Button from "../common/button/button";
import Style from "./style.module.css";
import { UserOwner } from "@/app/types/owners";
import { auth } from "@/app/firebase/config";
import { sendEmailVerification } from "firebase/auth";
import showAlert from "../alertcomponent/alertcomponent";
import Spinner from "../common/spinner/spinner";

const FormRegisterOwner = () => {
    const initialState: UserOwner = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        tower: "",
        apto: "",
        rol_id: "3",
        residential_id: "", // Se establecerá al tomarlo de sessionStorage
        active: true
    };

    const [owner, setOwner] = React.useState<UserOwner>(initialState);
    const [confirmPassword, setConfirmPassword] = useState<string>(""); // Nuevo estado para la confirmación de contraseña
    const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth); // `loading` para el Spinner

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validar que el Residential_id existe en sessionStorage
        const residential_id = sessionStorage.getItem('residential_id');
        if (!residential_id) {
            await showAlert({
                title: "Error",
                text: "No se encontró el Residential ID en la sesión.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Validations
        if(!owner.name || !owner.email || !owner.password || !owner.phone || !owner.tower || !owner.apto) {
            await showAlert({
                title: "Error",
                text: "Por favor, completa todos los campos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(owner.email)) {
            await showAlert({
                title: "Correo inválido",
                text: "Por favor ingresa un correo electrónico válido.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        if (owner.password !== confirmPassword) {
            await showAlert({
                title: "Error de contraseña",
                text: "Las contraseñas no coinciden.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        if (owner.password.length < 6) {
            await showAlert({
                title: "Contraseña débil",
                text: "La contraseña debe tener al menos 6 caracteres.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        try {
            // Asignar el Residential_id al owner antes de enviarlo
            const ownerWithResidentialId = { ...owner, residential_id };

            const responseDB = await fetch('http://localhost:3004/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ownerWithResidentialId), 
            });

            if (!responseDB.ok) {
                throw new Error('Error al guardar los datos en la base de datos local.');
            }

            const responseFirebase = await createUserWithEmailAndPassword(owner.email, owner.password);
            
            if (responseFirebase) {
                await sendEmailVerification(responseFirebase.user);
                await showAlert({
                    title: "Enlace de verificación enviado",
                    text: "El enlace de verificación ha sido enviado a tu correo electrónico.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                
                setOwner(initialState);
                setConfirmPassword(""); 

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

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <form className={Style.form} onSubmit={handleSubmit}>
                    <div className={Style.form__title}>Owner Registration</div>
                    <hr />
                    <InputField label="Name" type="text" name="name" value={owner.name} placeholder="Name" onChange={handleChange} />
                    <InputField label="Last Name" type="text" name="lastName" value={owner.lastName} placeholder="Last Name" onChange={handleChange} />
                    <InputField label="Email" type="email" name="email" value={owner.email} placeholder="Email" onChange={handleChange} />
                    <InputField label="Password" type="password" name="password" value={owner.password} placeholder="Password" onChange={handleChange} />
                    <InputField label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />
                    <InputField label="Phone" type="text" name="phone" value={owner.phone} placeholder="Phone" onChange={handleChange} />
                    <InputField label="Tower" type="text" name="tower" value={owner.tower} placeholder="Tower" onChange={handleChange} />
                    <InputField label="Apto" type="text" name="apto" value={owner.apto} placeholder="Apto" onChange={handleChange} />
                    <div className={Style.form_buttons}>
                        <Button label="Register" type="submit" />
                    </div>
                </form>
            )}
        </>
    );
};

export default FormRegisterOwner;
