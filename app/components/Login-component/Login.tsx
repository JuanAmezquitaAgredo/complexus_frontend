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
    const [signInWithEmailAndPassword, , loading] = useSignInWithEmailAndPassword(auth); // Estado `loading` de firebase
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            router.push('/admin');
        }
    }, [router]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
    
        // Validaciones
        if (!user.email || !user.password) {
            await showAlert({
                title: "Error",
                text: "Por favor, completa todos los campos.",
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
                    // Consulta a la base de datos para obtener la información del usuario
                    const userResponse = await fetch(`http://localhost:3004/users?email=${user.email}`);
                    const users = await userResponse.json();
    
                    if (users.length > 0) {
                        const userFound = users.find((user: any) => user.email === user.email);
    
                        if (userFound) {
                            
                            sessionStorage.setItem('residential_id', userFound.residential_id);

                            if (userFound.rol_id === "1") {
                                router.push('/superadmin');
                            } else if (userFound.rol_id === "2") {
                                router.push('/admin');
                            } else if (userFound.rol_id === "3") {
                                router.push('/owner');
                            } else {
                                await showAlert({
                                    title: "Error",
                                    text: "Rol no válido.",
                                    icon: "error",
                                    confirmButtonText: "OK"
                                });
                            }
    
                            await showAlert({
                                title: "Sesión iniciada",
                                text: "¡Bienvenido de nuevo!",
                                icon: "success",
                                confirmButtonText: "OK"
                            });
    
                            sessionStorage.setItem('token', response.user.uid);
                        } else {
                            await showAlert({
                                title: "Error",
                                text: "Usuario no encontrado.",
                                icon: "error",
                                confirmButtonText: "OK"
                            });
                        }
                    }
                } else {
                    await showAlert({
                        title: "Error",
                        text: "Correo no verificado, por favor verifícalo.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            await showAlert({
                title: "Error",
                text: "Hubo un error al iniciar sesión. Por favor, intenta de nuevo.",
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
