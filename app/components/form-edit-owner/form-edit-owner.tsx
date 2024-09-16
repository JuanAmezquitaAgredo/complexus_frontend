import React, { useState, useEffect } from "react";
import InputField from "../common/input/input";
import Button from "../common/button/button";
import Style from "./style.module.css";
import { UserOwner } from "@/app/types/owners";
import showAlert from "../alertcomponent/alertcomponent";
import Spinner from "../common/spinner/spinner";

interface FormEditOwnerProps {
    ownerId: string;
}

const FormEditOwner: React.FC<FormEditOwnerProps> = ({ ownerId }) => {
    const initialState: UserOwner = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        tower: "",
        apto: "",
        rol_id: "3",
        residential_id: "", // Este campo será establecido al tomarlo de sessionStorage o de otro lugar
        active: true
    };

    const [owner, setOwner] = useState<UserOwner>(initialState);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const response = await fetch(`http://localhost:3004/users/${ownerId}`);
                if (!response.ok) throw new Error('Error al obtener datos del owner.');
                const ownerData = await response.json();
                setOwner(ownerData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                await showAlert({
                    title: "Error",
                    text: "Hubo un error al cargar los datos.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        };

        fetchOwnerData();
    }, [ownerId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validations
        if (!owner.name || !owner.phone || !owner.tower || !owner.apto) {
            await showAlert({
                title: "Error",
                text: "Por favor, completa todos los campos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        try {
            const responseDB = await fetch(`http://localhost:3004/users/${ownerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(owner),
            });

            if (!responseDB.ok) throw new Error('Error al actualizar los datos del owner en la base de datos local.');

            await showAlert({
                title: "Actualización exitosa",
                text: "Los datos se han actualizado correctamente.",
                icon: "success",
                confirmButtonText: "OK"
            });

            setOwner(initialState);
            window.location.reload();
        } catch (error) {
            console.error('Error en el proceso de actualización:', error);
            await showAlert({
                title: "Error",
                text: "Hubo un error al procesar la actualización. Intenta nuevamente.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOwner(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <form className={Style.form} onSubmit={handleSubmit}>
                    <div className={Style.form__title}>Edit Owner</div>
                    <hr />
                    <InputField label="Name" type="text" name="name" value={owner.name} placeholder="Name" onChange={handleChange} />
                    <InputField label="Last Name" type="text" name="lastName" value={owner.lastName} placeholder="Last Name" onChange={handleChange} />
                    <InputField label="Email" type="email" name="email" value={owner.email} placeholder="Email" disabled />
                    <InputField label="Phone" type="text" name="phone" value={owner.phone} placeholder="Phone" onChange={handleChange} />
                    <InputField label="Tower" type="text" name="tower" value={owner.tower} placeholder="Tower" onChange={handleChange} />
                    <InputField label="Apto" type="text" name="apto" value={owner.apto} placeholder="Apto" onChange={handleChange} />
                    <div className={Style.form_buttons}>
                        <Button label="Update" type="submit" />
                    </div>
                </form>
            )}
        </>
    );
};

export default FormEditOwner;
