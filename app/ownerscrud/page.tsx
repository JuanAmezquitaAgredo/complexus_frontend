'use client';
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { User } from "../types/users"; // Asegúrate de tener un tipo User adecuado
import ConfirmDialog from "../components/alertDelete/alertDelete";
import { Navbar } from "../components/navbar/navbar";
import { Sidebar } from "../components/sidebar/sidebar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../components/common/modal/modal";
import FormRegisterOwner from "../components/form-register-owner/form-register-owner";
import FormEditOwner from "../components/form-edit-owner/form-edit-owner"; // Asegúrate de tener este componente

const OwnersCrud = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Control del modal de creación
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Control del modal de edición
    const [selectedUserId, setSelectedUserId] = useState<string>(""); // ID del usuario seleccionado para editar

    useEffect(() => {
        // Fetch users from json-server
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3004/users");
                const data = await response.json();
                // Filtra usuarios con rol_id igual a "3"
                const owners = data.filter((user: User) => user.rol_id === '3');
                setUsers(owners);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = async (userId: string) => {
        const result = await ConfirmDialog({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                // Eliminar el usuario
                await fetch(`http://localhost:3004/users/${userId}`, {
                    method: 'DELETE',
                });
                // Actualizar el estado local después de la eliminación
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const handleEditClick = (userId: string) => {
        setSelectedUserId(userId);
        setIsEditModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUserId(""); // Reset selected user ID
    };

    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th}>Email</th>
                                <th className={styles.th}>Phone</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {users.map((user) => (
                                <tr key={user.id} className={styles.tr}>
                                    <td className={styles.td}>{`${user.name} ${user.lastName}`}</td>
                                    <td className={styles.td}>{user.email}</td>
                                    <td className={styles.td}>{user.phone}</td>
                                    <td className={styles["action-icons"]}>
                                        <button onClick={() => handleEditClick(user.id)}>
                                            <EditIcon />
                                        </button>
                                        <button onClick={() => handleDeleteClick(user.id)}>
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.createAdmin}>
                        <button className={styles.button} onClick={() => setIsCreateModalOpen(true)}>Add Owner</button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal}>
                <FormRegisterOwner />
            </Modal>
            <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
                {selectedUserId && <FormEditOwner ownerId={selectedUserId} />}
            </Modal>
        </main>
    );
};

export default OwnersCrud;
