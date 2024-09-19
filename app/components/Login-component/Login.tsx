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
        if (!token) {
            router.push('/login');
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
                    // Fetch user information from the Next.js API
                    const userResponse = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: user.email, password: user.password }),
                    });

                    const userData = await userResponse.json();

                    if (userResponse.ok && userData.email) {
                        sessionStorage.setItem('token', response.user.uid);

                        if (userData.email === user.email) {
                            sessionStorage.setItem('email', userData.email);
                            sessionStorage.setItem('role', userData.role_id);
                            if (userData.role_id === "1") {
                                router.push('/superadmin');
                            } else if (userData.role_id === "2") {
                                router.push('/admin');
                            } else if (userData.role_id === "3") {
                                router.push('/owner');
                            }else {
                                await showAlert({
                                    title: "Error",
                                    text: "Invalid role.",
                                    icon: "error",
                                    confirmButtonText: "OK"
                                });
                            }

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
                    } else {
                        await showAlert({
                            title: "Error",
                            text: userData.error || "User not found.",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
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
