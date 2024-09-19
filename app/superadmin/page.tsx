'use client';
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar/navbar";
import styles from './styles.module.css';
import { SidebarSuperAdmin } from "../components/sidebarSuperAdmin/sidebarSuperAdmin";
import { Unit } from "../types/units";
import { User } from "../types/users";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../components/common/modal/modal";
import FormRegisterAdmin from "../components/form-register-admin/form-register-admin";
import FormEditAdmin from "../components/form-edit-admin/form-edit-admin";
import ConfirmDialog from "../components/alertDelete/alertDelete";
import { useRouter } from "next/navigation";

const SuperadminPage = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Control del modal de creación
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Control del modal de edición
    const [selectedAdminId, setSelectedAdminId] = useState<string>(""); // ID del administrador seleccionado para editar
    const [token, setToken] = useState<string | null>(null); // Estado para el token

    const router = useRouter();

    // Comprobar si existe el token en sessionStorage
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (!storedToken) {
            router.push('/login');
        } else {
            setToken(storedToken);
        }
    }, [router]);

    // Obtener las unidades y los usuarios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const unitsResponse = await fetch("http://localhost:3004/units");
                const unitsData = await unitsResponse.json();

                const usersResponse = await fetch("http://localhost:3004/users");
                const usersData = await usersResponse.json();

                setUnits(unitsData);
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    // Obtener los datos del administrador
    const getAdminData = (adminId: string) => {
        return users.find(user => user.id === adminId && user.rol_id === '2');
    };

    // Manejar eliminación de una unidad y su administrador relacionado
    const handleDeleteClick = async (unit: Unit) => {
        const result = await ConfirmDialog({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                // Eliminar la unidad
                await fetch(`http://localhost:3004/units/${unit.id}`, {
                    method: 'DELETE',
                });
                // Eliminar el administrador relacionado
                await fetch(`http://localhost:3004/users/${unit.admin_id}`, {
                    method: 'DELETE',
                });
                // Actualizar el estado local después de la eliminación
                setUnits(units.filter(u => u.id !== unit.id));
                setUsers(users.filter(user => user.id !== unit.admin_id));
            } catch (error) {
                console.error("Error deleting unit or admin:", error);
            }
        }
    };

    // Manejar clic en el botón de edición
    const handleEditClick = (adminId: string) => {
        setSelectedAdminId(adminId);
        setIsEditModalOpen(true);
    };

    // Cerrar modal de creación
    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    // Cerrar modal de edición
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedAdminId(""); // Reiniciar el ID del administrador seleccionado
    };

    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <SidebarSuperAdmin />
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <th className={styles.th}>Unit Name</th>
                                <th className={styles.th}>City</th>
                                <th className={styles.th}>Name Admin</th>
                                <th className={styles.th}>Email</th>
                                <th className={styles.th}>Phone</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {units.map((unit) => {
                                const admin = getAdminData(unit.admin_id); // Obtener detalles del administrador

                                if (!admin) {
                                    return (
                                        <tr key={unit.id} className={styles.tr}>
                                            <td className={styles.td} colSpan={6}>No admin data available for this unit.</td>
                                        </tr>
                                    );
                                }

                                return (
                                    <tr key={unit.id} className={styles.tr}>
                                        <td className={styles.td}>{unit.name}</td>
                                        <td className={styles.td}>{unit.city}</td>
                                        <td className={styles.td}>{`${admin.name} ${admin.lastName}`}</td>
                                        <td className={styles.td}>{admin.email}</td>
                                        <td className={styles.td}>{admin.phone}</td>
                                        <td className={styles["action-icons"]}>
                                            <button onClick={() => handleEditClick(admin.id)}>
                                                <EditIcon />
                                            </button>
                                            <button onClick={() => handleDeleteClick(unit)}>
                                                <DeleteIcon />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className={styles.createAdmin}>
                        <button className={styles.button} onClick={() => setIsCreateModalOpen(true)}>Add Residential Unit</button>
                    </div>
                </div>
            </div>
            {/* Modal para crear administrador */}
            <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal}>
                <FormRegisterAdmin />
            </Modal>
            {/* Modal para editar administrador */}
            <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
                {selectedAdminId && <FormEditAdmin adminId={selectedAdminId} />}
            </Modal>
        </main>
    );
};

export default SuperadminPage;
