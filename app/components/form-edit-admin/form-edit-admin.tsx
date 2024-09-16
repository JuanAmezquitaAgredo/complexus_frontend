import React, { useEffect, useState } from "react";
import InputField from "../common/input/input";
import Spinner from "../common/spinner/spinner";
import Style from "./style.module.css";
import { ResidentialUnit, UserAdmin } from "@/app/types/admins";
import showAlert from "../alertcomponent/alertcomponent";
import Button from "../common/button/button";

interface FormEditAdminProps {
    adminId: string; // Cambiado a string
}

const FormEditAdmin: React.FC<FormEditAdminProps> = ({ adminId }) => {
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
        id: "",
        name: "",
        city: "",
        address: "",
        has_tower: "",
        admin_id: ""
    };

    const [admin, setAdmin] = useState<UserAdmin>(initialState);
    const [unit, setUnit] = useState<ResidentialUnit>(initialStateUnit);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const responseAdmin = await fetch(`http://localhost:3004/users/${adminId}`);
                if (!responseAdmin.ok) throw new Error('Error al obtener datos del administrador.');
                const adminData = await responseAdmin.json();
                setAdmin(adminData);

                // Fetch the associated unit data
                const responseUnit = await fetch(`http://localhost:3004/units/${adminData.residential_id}`);
                if (!responseUnit.ok) throw new Error('Error al obtener datos de la unidad.');
                const unitData = await responseUnit.json();
                setUnit(unitData);
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

        fetchAdminData();
    }, [adminId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Validations
        if (!admin.name || !admin.phone || !admin.tower || !unit.name || !unit.city || !unit.address) {
            await showAlert({
                title: "Error",
                text: "Por favor, completa todos los campos.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }
    
        try {
            // Update the admin data
            const responseDBAdmin = await fetch(`http://localhost:3004/users/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(admin),
            });

            if (!responseDBAdmin.ok) throw new Error('Error al actualizar los datos del administrador en la base de datos local.');

            // Update the unit data
            const updatedUnitWithAdmin = { ...unit, admin_id: adminId }; // Assign admin_id to the unit object
            const responseUpdateUnit = await fetch(`http://localhost:3004/units/${unit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUnitWithAdmin),
            });

            if (!responseUpdateUnit.ok) throw new Error('Error al actualizar los datos de la unidad en la base de datos local.');

            await showAlert({
                title: "Actualización exitosa",
                text: "Los datos se han actualizado correctamente.",
                icon: "success",
                confirmButtonText: "OK"
            });

            setAdmin(initialState);
            setUnit(initialStateUnit); // Reset the unit
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
        setAdmin(prevState => ({ ...prevState, [name]: value }));
    };

    const handleChangeUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUnit(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <form className={Style.form} onSubmit={handleSubmit}>
                    <div className={Style.form__title}>Edit Admin</div>
                    <hr />
                    <InputField label="Name" type="text" name="name" value={admin.name} placeholder="Name" onChange={handleChange} />
                    <InputField label="Last Name" type="text" name="lastName" value={admin.lastName} placeholder="Last Name" onChange={handleChange} />
                    <InputField label="Email" type="email" name="email" value={admin.email} placeholder="Email" disabled />
                    <InputField label="Phone" type="text" name="phone" value={admin.phone} placeholder="Phone" onChange={handleChange} />
                    <hr className={Style.hr} />
                    <InputField label="Unit Name" type="text" name="name" value={unit.name} placeholder="Unit Name" onChange={handleChangeUnit} />
                    <InputField label="City" type="text" name="city" value={unit.city} placeholder="City" onChange={handleChangeUnit} />
                    <InputField label="Address" type="text" name="address" value={unit.address} placeholder="Address" onChange={handleChangeUnit} />
                    <InputField label="Has Tower" type="text" name="has_tower" value={unit.has_tower} placeholder="Has Tower" onChange={handleChangeUnit} />
                    <div className={Style.form_buttons}>
                        <Button label="Update" type="submit" />
                    </div>
                </form>
            )}
        </>
    );
};

export default FormEditAdmin;
