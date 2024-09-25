'use client'
import React from "react";
import Login from "../components/Login-component/Login";
import Style from "./style.module.css";
import Footer from "../components/footer/footer";
import { useRouter } from "next/navigation";

const loginPage: React.FC = () => {

    const router = useRouter();

    const GoToHome = () => {
        router.replace("/");
    }
    return (
        <div className={Style.LoginPage}>
            <nav className={Style.navbar}>
                <a onClick={GoToHome}>
                    <img src="/Logo_name.png" alt="" className={Style.Logo}  />
                </a>
            </nav>
            <hr />
            <div className={Style.loginContainer}>
                <div>
                    <Login />
                </div>
                <div className={Style.container}>
                    <div className={Style.background}></div>
                    <img src="/loginimg.png" alt="" className={Style.image} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default loginPage;