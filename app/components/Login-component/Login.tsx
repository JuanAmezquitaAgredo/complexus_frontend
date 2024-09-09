'use client';
import React, { useState } from "react";
import InputField from "../common/input/input";
import Button from "../common/button/button";
import Style from "./style.module.css";
import { UserLogin } from "@/app/types/common/common";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const Login: React.FC = () => {

    const initialState: UserLogin = {
        email: "",
        password: "",
    };
    
    const [user, setUser] = useState<UserLogin>(initialState);
    const [signInWithEmailAndPassword, , loading] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        try {
            // Intentar iniciar sesión con Firebase
            const response = await signInWithEmailAndPassword(user.email, user.password);

            if (response) {
                // Verificar si el correo del usuario está verificado
                const userEmailVerified = response.user.emailVerified;
                
                if (userEmailVerified) {
                    alert('Login exitoso');
                    setUser(initialState);
                    sessionStorage.setItem('token', response.user.uid);
                    router.push('/admin'); // Redirigir al inicio
                } else {
                    // Si el correo no está verificado
                    alert('Por favor, verifica tu correo antes de iniciar sesión.');
                    console.log(response)
                }
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Hubo un error al iniciar sesión. Por favor, intenta de nuevo.');
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <form className={Style.LoginContainer} onSubmit={handleSubmit}>
            <InputField label="Email" type="email" name="email" value={user.email} placeholder="Email" onChange={handleChange} />
            <InputField label="Password" type="password" name="password" value={user.password} placeholder="Password" onChange={handleChange}/>
            <Button label="Login" type="submit"/>
        </form>
    );
};
export default Login;