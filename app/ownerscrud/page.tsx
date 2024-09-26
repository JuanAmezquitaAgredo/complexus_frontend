'use client';
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { User } from "../types/users";
import ConfirmDialog from "../components/alertDelete/alertDelete";
import { Navbar } from "../components/navbar/navbar";
import { Sidebar } from "../components/sidebar/sidebar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../components/common/modal/modal";
import FormRegisterOwner from "../components/form-register-owner/form-register-owner";
import FormEditOwner from "../components/form-edit-owner/form-edit-owner";
import * as XLSX from 'xlsx';
import showAlert from "../components/alertcomponent/alertcomponent";

const OwnersCrud = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [excelData, setExcelData] = useState<any[]>([]);

    // Cargar datos de Excel desde localStorage al iniciar
    useEffect(() => {
        const storedExcelData = localStorage.getItem('excelData');
        if (storedExcelData) {
            setExcelData(JSON.parse(storedExcelData));
        }
    }, []);

    useEffect(() => {
        // Fetch users from json-server
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3004/users");
                const data = await response.json();

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
                await fetch(`http://localhost:3004/users/${userId}`, {
                    method: 'DELETE',
                });
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const reader = new FileReader();

        reader.onload = async (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convierte la hoja de Excel a JSON

            setExcelData(jsonData); // Actualiza el estado con los datos del Excel
            localStorage.setItem('excelData', JSON.stringify(jsonData)); // Guardar en localStorage para persistencia
            showAlert({
                title: 'Success',
                text: 'Excel data uploaded successfully!',
                icon: 'success'
            });
        };

        reader.readAsArrayBuffer(file);
    };

    // Función para eliminar los datos de Excel del estado y de localStorage
    const handleClearExcelData = () => {
        setExcelData([]);
        localStorage.removeItem('excelData');
        showAlert({
            title: 'Delete',
            text: 'Excel data cleared successfully!',
            icon: 'warning'
        });
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
                                <th className={styles.th}>Apto</th>
                                <th className={styles.th}>Phone</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {users.map((user) => (
                                <tr key={user.id} className={styles.tr}>
                                    <td className={styles.td}>{`${user.name} ${user.lastName}`}</td>
                                    <td className={styles.td}>{user.email}</td>
                                    <td className={styles.td}>{user.apto}</td>
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

                            {/* Renderiza los datos del archivo Excel */}
                            {excelData.map((row, index) => (
                                <tr key={index} className={styles.tr}>
                                    <td className={styles.td}>{row["Name"] || "N/A"}</td>
                                    <td className={styles.td}>{row["Email"] || "N/A"}</td>
                                    <td className={styles.td}>{row["Apto"] || "N/A"}</td>
                                    <td className={styles.td}>{row["Phone"] || "N/A"}</td>
                                    <td className={styles["action-icons"]}></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.createAdmin}>
                        <button className={styles.button} onClick={() => setIsCreateModalOpen(true)}>Add Owner</button>
                    </div>
                    <div className={styles.fileUpload}>
                        <label htmlFor="fileUpload">Select Excel File</label>
                        <input type="file" id="fileUpload" accept=".xlsx, .xls" onChange={handleFileChange} />
                        <button className={styles.uploadButton} onClick={handleUploadClick} disabled={!file}>
                            Upload Excel
                        </button>
                        <button className={styles.clearButton} onClick={handleClearExcelData} disabled={excelData.length === 0}>
                            Clear Excel
                        </button>
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
