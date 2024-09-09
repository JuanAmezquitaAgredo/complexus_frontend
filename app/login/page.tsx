'use client'
import React, { useState } from "react";
import ButtonGradient from "../components/common/buttonGradient/buttonGradient";
import Login from "../components/Login-component/Login";
import Style from "./style.module.css";
import Modal from "../components/common/modal/modal";
import FormRegisterOwner from "../components/form-register-owner/form-register-owner";

const loginPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={Style.LoginPage}>
            <nav className={Style.navbar}>
                <img src="/Logo_name.png" alt="" className={Style.Logo} />
            </nav>
            <hr />
            <div className={Style.loginContainer}>
                <div>
                    <Login />
                    <div className={Style.RegisterContainer}>
                        <ButtonGradient label="Owner Register" onClick={openModal} />
                        <ButtonGradient label="Admin Register" onClick={openModal} />
                    </div>
                </div>
                <div className={Style.container}>
                    <div className={Style.background}></div>
                    <img src="/loginimg.png" alt="" className={Style.image} />
                </div>
            </div>
            <footer className={Style.footer}>
                <h2>© 2024</h2>
                <h2>Complexus@Complexus.com</h2>
                <img src="/logo.png" alt="" className={Style.logoFooter} />
            </footer>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <FormRegisterOwner />
            </Modal>
        </div>
    );
};

export default loginPage;