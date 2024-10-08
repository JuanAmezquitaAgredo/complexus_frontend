'use client';
import React, { useEffect, useState } from "react";
import InputField from "../common/input/input";
import Button from "../common/button/button";
import Style from "./style.module.css";
import { UserLogin } from "@/app/types/common/common";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import showAlert from "../alertcomponent/alertcomponent";
import Spinner from "../common/spinner/spinner";

const Login: React.FC = () => {

    const initialState: UserLogin = {
        email: "",
        password: "",
    };
    
    const [user, setUser] = useState<UserLogin>(initialState);
    const [signInWithEmailAndPassword, , loading] = useSignInWithEmailAndPassword(auth); // Firebase `loading` state
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            router.push('/admin');
        }
    }, [router]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
    
        // Validations
        if (!user.email || !user.password) {
            await showAlert({
                title: "Error",
                text: "Please fill out all fields.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        try {
            const response = await signInWithEmailAndPassword(user.email, user.password);
    
            if (response) {
                const userEmailVerified = response.user.emailVerified;
                
                if (userEmailVerified) {
                    // Fetch user information from the database
                    const userResponse = await fetch(`http://localhost:3004/users?email=${user.email}`);
                    const users = await userResponse.json();
    
                    if (users.length > 0) {
                        const userFound = users.find((user: any) => user.email === user.email)
    
                        if (userFound) {
                            
                            sessionStorage.setItem('residential_id', userFound.residential_id);
                            sessionStorage.setItem('id', userFound.id);
                            sessionStorage.setItem('name', userFound.name);
    
                            // Store token immediately
                            sessionStorage.setItem('token', response.user.uid);
    
                            // Redirect based on role
                            if (userFound.rol_id === "1") {
                                router.replace('/superadmin'); // Use replace instead of push
                            } else if (userFound.rol_id === "2") {
                                router.replace('/admin');
                            } else if (userFound.rol_id === "3") {
                                router.replace('/owner');
                            } else {
                                await showAlert({
                                    title: "Error",
                                    text: "Invalid role.",
                                    icon: "error",
                                    confirmButtonText: "OK"
                                });
                            }
    
                            // Show success message after redirection
                            await showAlert({
                                title: "Session Started",
                                text: "Welcome back!",
                                icon: "success",
                                confirmButtonText: "OK"
                            });
    
                        } else {
                            await showAlert({
                                title: "Error",
                                text: "User not found.",
                                icon: "error",
                                confirmButtonText: "OK"
                            });
                        }
                    }
                } else {
                    await showAlert({
                        title: "Error",
                        text: "Email not verified. Please verify your email.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            await showAlert({
                title: "Error",
                text: "There was an error logging in. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }
    
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <form className={Style.LoginContainer} onSubmit={handleSubmit}>
                    <InputField label="Email" type="email" name="email" value={user.email} placeholder="Email" onChange={handleChange} />
                    <InputField label="Password" type="password" name="password" value={user.password} placeholder="Password" onChange={handleChange}/>
                    <Button label="Login" type="submit"/>
                </form>
            )}
        </>
    );
};

export default Login;
