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
    // Initial state for the admin user form
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

    // Initial state for the residential unit form
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
                text: "Please fill in all the fields.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(admin.email)) {
            await showAlert({
                title: "Invalid Email",
                text: "Please enter a valid email address.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        if (admin.password !== confirmPassword) {
            await showAlert({
                title: "Password Error",
                text: "Passwords do not match.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        if (admin.password.length < 6) {
            await showAlert({
                title: "Weak Password",
                text: "Password must be at least 6 characters long.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        try {
            // Step 1: Create the admin user in Firebase Authentication
            const responseFirebase = await createUserWithEmailAndPassword(admin.email, admin.password);
    
            if (responseFirebase) {
                await sendEmailVerification(responseFirebase.user);
                
                // Step 2: Save the residential unit in the local database
                const responseDBUnit = await fetch('/api/user/admin/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(unit), 
                });
    
                if (!responseDBUnit.ok) {
                    throw new Error('Error saving the residential unit in the local database.');
                }
    
                // Get the ID of the newly created residential unit
                const createdUnit = await responseDBUnit.json();
                const unitId = createdUnit.id;
    
                // Update the admin object with the residential unit ID
                const updatedAdmin = { ...admin, residential_id: unitId }; // Assign residential_id to the admin object
                const responseDBOwner = await fetch('http://localhost:3004/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedAdmin), 
                });
    
                if (!responseDBOwner.ok) {
                    throw new Error('Error saving the admin data in the local database.');
                }
    
                // Get the ID of the newly created admin
                const createdAdmin = await responseDBOwner.json();
                const adminId = createdAdmin.id;
    
                // Update the residential unit with the admin ID
                const updatedUnitWithAdmin = { ...unit, admin_id: adminId }; // Assign admin_id to the unit object
                const responseUpdateUnit = await fetch(`http://localhost:3004/units/${unitId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUnitWithAdmin), 
                });
    
                if (!responseUpdateUnit.ok) {
                    throw new Error('Error updating the residential unit in the local database.');
                }
    
                await showAlert({
                    title: "Registration Successful",
                    text: "A verification email has been sent.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
    
                // Reset form state
                setAdmin(initialState);
                setUnit(initialStateUnit); // Reset the unit
                setConfirmPassword("");
                window.location.reload();
            }
        } catch (error) {
            console.error('Registration process error:', error);
            await showAlert({
                title: "Error",
                text: "There was an error processing your registration. Please try again.",
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
