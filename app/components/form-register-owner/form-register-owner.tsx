import React from "react";
import InputField from "../common/input/input";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Button from "../common/button/button";
import Style from "./style.module.css";
import { UserOwner } from "@/app/types/owners";
import { auth } from "@/app/firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

const FormRegisterOwner = () => {

    const initialState: UserOwner = {
        name: "",
        email: "",
        password: "",
        phone: "",
        tower: "",
        apto: "",
    };

    const [owner, setOwner] = React.useState<UserOwner>(initialState);
    const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await createUserWithEmailAndPassword(owner.email, owner.password);
            
            if (response) {
                await sendEmailVerification(response.user);
                alert('El enlace de verificación ha sido enviado a tu correo electrónico.');
                setOwner(initialState);  // Limpiar el formulario después del registro
                router.push('/login');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert('Hubo un error al crear la cuenta.');
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
                <Button label="Register" type="submit" />
            </div>
        </form>
    );
};

export default FormRegisterOwner;
