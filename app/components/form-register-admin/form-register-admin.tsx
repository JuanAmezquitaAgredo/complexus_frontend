import React, { useState } from "react";
import InputField from "../common/input/input";
import Button from "../common/button/button";
import Style from "./style.module.css";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import showAlert from "../alertcomponent/alertcomponent";
import { sendEmailVerification } from "firebase/auth";
import { ResidentialUnit, UserAdmin } from "@/app/types/admins";

const FormRegisterAdmin = () => {
    const initialState: UserAdmin = {
        name: "",
        email: "",
        password: "",
        phone: "",
        towers: "",
        rol: "admin"
    };

    const initialStateUnit: ResidentialUnit = {
        name: "",
        city: "",
        address: "",
        admin_id: "" // Nuevo campo para relacionar la unidad con el administrador
    };

    const [admin, setAdmin] = React.useState<UserAdmin>(initialState);
    const [unit, setUnit] = React.useState<ResidentialUnit>(initialStateUnit);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Validations
        if (!admin.name || !admin.email || !admin.password || !admin.phone || !admin.towers || !unit.name || !unit.city || !unit.address) {
            await showAlert({
                title: "Error",
                text: "Por favor, completa todos los campos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(admin.email)) {
            await showAlert({
                title: "Correo inválido",
                text: "Por favor ingresa un correo electrónico válido.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        if (admin.password !== confirmPassword) {
            await showAlert({
                title: "Error de contraseña",
                text: "Las contraseñas no coinciden.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        if (admin.password.length < 6) {
            await showAlert({
                title: "Contraseña débil",
                text: "La contraseña debe tener al menos 6 caracteres.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        try {
            // Paso 1: Crear el administrador en Firebase Authentication
            const responseFirebase = await createUserWithEmailAndPassword(admin.email, admin.password);
    
            if (responseFirebase) {
                await sendEmailVerification(responseFirebase.user);
                
                // Paso 2: Guardar el administrador en la base de datos local
                const responseDBOwner = await fetch('http://localhost:3004/admins', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(admin), 
                });
    
                if (!responseDBOwner.ok) {
                    throw new Error('Error al guardar los datos del administrador en la base de datos local.');
                }

                // Obtener el ID del administrador recién creado
                const createdAdmin = await responseDBOwner.json();
                const adminId = createdAdmin.id;
    
                // Paso 3: Crear la unidad con el admin_id
                const updatedUnit = { ...unit, admin_id: adminId }; // Asignar admin_id al objeto unit
                const responseDBUnit = await fetch('http://localhost:3004/units', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUnit), 
                });
    
                if (!responseDBUnit.ok) {
                    throw new Error('Error al guardar los datos de la unidad en la base de datos local.');
                }
    
                await showAlert({
                    title: "Registro exitoso",
                    text: "Se envió un correo de verificación.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
    
                setAdmin(initialState);
                setUnit(initialStateUnit); // Reiniciar la unidad
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
        setAdmin(prevState => ({ ...prevState, [name]: value }));
    };

    const handleChangeUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUnit(prevState => ({ ...prevState, [name]: value }));
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <form className={Style.form} onSubmit={handleSubmit}>
            <div className={Style.form__title}>Owner Registration</div>
            <hr />
            <InputField label="Name" type="text" name="name" value={admin.name} placeholder="Name" onChange={handleChange} />
            <InputField label="Email" type="email" name="email" value={admin.email} placeholder="Email" onChange={handleChange} />
            <InputField label="Password" type="password" name="password" value={admin.password} placeholder="Password" onChange={handleChange} />
            <InputField label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />
            <InputField label="Phone" type="text" name="phone" value={admin.phone} placeholder="Phone" onChange={handleChange} />
            <InputField label="Towers" type="number" name="towers" value={admin.towers} placeholder="Towers" onChange={handleChange} />
            <hr className={Style.hr}/>
            <InputField label="Unit Name" type="text" name="name" value={unit.name} placeholder="Unit Name" onChange={handleChangeUnit} />
            <InputField label="City" type="text" name="city" value={unit.city} placeholder="City" onChange={handleChangeUnit} />
            <InputField label="Address" type="text" name="address" value={unit.address} placeholder="Address" onChange={handleChangeUnit} />
            <div className={Style.form_buttons}>
                <Button label="Register" type="submit" />
            </div>
        </form>
    );
};

export default FormRegisterAdmin;
