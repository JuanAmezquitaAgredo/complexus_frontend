import React, { useState } from "react";
import InputField from "../common/input/input";
import Button from "../common/button/button";
import Style from "./style.module.css";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import showAlert from "../alertcomponent/alertcomponent";
import { sendEmailVerification } from "firebase/auth";
import { ResidentialUnit, UserAdmin } from "@/app/types/admins";
import Spinner from "../common/spinner/spinner";

const FormRegisterAdmin = () => {
    const initialState: UserAdmin = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        tower: "N/A",
        residential_id: "",
        rol_id: "2"
    };

    const initialStateUnit: ResidentialUnit = {
        name: "",
        city: "",
        address: "",
        has_tower: "",
        admin_id: ""
    };

    const [admin, setAdmin] = React.useState<UserAdmin>(initialState);
    const [unit, setUnit] = React.useState<ResidentialUnit>(initialStateUnit);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Validations
        if (!admin.name || !admin.email || !admin.password || !admin.phone || !admin.tower || !unit.name || !unit.city || !unit.address) {
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
                
                // Paso 2: Guardar la unidad en la base de datos local
                const responseDBUnit = await fetch('http://localhost:3004/units', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(unit), 
                });
    
                if (!responseDBUnit.ok) {
                    throw new Error('Error al guardar los datos de la unidad en la base de datos local.');
                }
    
                // Obtener el ID de la unidad recién creada
                const createdUnit = await responseDBUnit.json();
                const unitId = createdUnit.id;
    
                // Actualizar el objeto del administrador con el ID de la unidad
                const updatedAdmin = { ...admin, residential_id: unitId }; // Asignar residential_id al objeto admin
                const responseDBOwner = await fetch('http://localhost:3004/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedAdmin), 
                });
    
                if (!responseDBOwner.ok) {
                    throw new Error('Error al guardar los datos del administrador en la base de datos local.');
                }
    
                // Obtener el ID del administrador recién creado
                const createdAdmin = await responseDBOwner.json();
                const adminId = createdAdmin.id;
    
                // Actualizar la unidad con el ID del administrador
                const updatedUnitWithAdmin = { ...unit, admin_id: adminId }; // Asignar admin_id al objeto unit
                const responseUpdateUnit = await fetch(`http://localhost:3004/units/${unitId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUnitWithAdmin), 
                });
    
                if (!responseUpdateUnit.ok) {
                    throw new Error('Error al actualizar los datos de la unidad en la base de datos local.');
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
        <>
            {loading ? (
                <Spinner loading={loading} /> 
            ) : (
                <form className={Style.form} onSubmit={handleSubmit}>
                    <div className={Style.form__title}>Admin Registration</div>
                    <hr />
                    <InputField label="Name" type="text" name="name" value={admin.name} placeholder="Name" onChange={handleChange} />
                    <InputField label="Last Name" type="text" name="lastName" value={admin.lastName} placeholder="Last Name" onChange={handleChange} />
                    <InputField label="Email" type="email" name="email" value={admin.email} placeholder="Email" onChange={handleChange} />
                    <InputField label="Password" type="password" name="password" value={admin.password} placeholder="Password" onChange={handleChange} />
                    <InputField label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />
                    <InputField label="Phone" type="text" name="phone" value={admin.phone} placeholder="Phone" onChange={handleChange} />
                    <hr className={Style.hr}/>
                    <InputField label="Unit Name" type="text" name="name" value={unit.name} placeholder="Unit Name" onChange={handleChangeUnit} />
                    <InputField label="City" type="text" name="city" value={unit.city} placeholder="City" onChange={handleChangeUnit} />
                    <InputField label="Address" type="text" name="address" value={unit.address} placeholder="Address" onChange={handleChangeUnit} />
                    <InputField label="Has Tower" type="text" name="has_tower" value={unit.has_tower} placeholder="Has Tower" onChange={handleChangeUnit} />
                    <div className={Style.form_buttons}>
                        <Button label="Register" type="submit" />
                    </div>
                </form>
            )}
        </>
    );
};

export default FormRegisterAdmin;
