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
        residential_id: "", // Will be set from sessionStorage
        active: true
    };

    const [owner, setOwner] = useState<UserOwner>(initialState);
    const [confirmPassword, setConfirmPassword] = useState<string>(""); // New state for password confirmation
    const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth); // `loading` for Spinner

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate that Residential_id exists in sessionStorage
        const residential_id = sessionStorage.getItem('residential_id');
        if (!residential_id) {
            await showAlert({
                title: "Error",
                text: "Residential ID not found in session.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Validations
        if(!owner.name || !owner.email || !owner.password || !owner.phone || !owner.tower || !owner.apto) {
            await showAlert({
                title: "Error",
                text: "Please complete all fields.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(owner.email)) {
            await showAlert({
                title: "Invalid Email",
                text: "Please enter a valid email address.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Validate matching passwords
        if (owner.password !== confirmPassword) {
            await showAlert({
                title: "Password Error",
                text: "Passwords do not match.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Validate password length
        if (owner.password.length < 6) {
            await showAlert({
                title: "Weak Password",
                text: "Password must be at least 6 characters long.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        try {
            // Assign the Residential_id to the owner before sending it
            const ownerWithResidentialId = { ...owner, residential_id };

            // Step 1: Save owner data in local database
            const responseDB = await fetch('http://localhost:3004/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ownerWithResidentialId), 
            });

            if (!responseDB.ok) {
                throw new Error('Error saving data in the local database.');
            }

            // Step 2: Create owner in Firebase Authentication
            const responseFirebase = await createUserWithEmailAndPassword(owner.email, owner.password);
            
            if (responseFirebase) {
                // Send email verification
                await sendEmailVerification(responseFirebase.user);
                await showAlert({
                    title: "Verification Email Sent",
                    text: "A verification link has been sent to your email.",
                    icon: "success",
                    confirmButtonText: "OK"
                });

                // Reset form after successful submission
                setOwner(initialState);
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

    // Handle input change for owner data
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOwner(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle input change for confirm password
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
