import Login from "../components/Login-component/Login";
import Style from "./style.module.css";

const loginPage: React.FC = () => {
    return (
        <div className={Style.LoginPage}>
            <nav className={Style.navbar}>
                <img src="/Logo_name.png" alt="" className={Style.Logo} />
            </nav>
            <hr />
            <div className={Style.loginContainer}>
                <Login />
                <div className={Style.container}>
                    <div className={Style.background}></div>
                    <img src="/loginimg.png" alt="" className={Style.image} />
                </div>
            </div>
            <footer className={Style.footer}>
                <h2>© 2022</h2>
                <h2>Complexus@Complexus.com</h2>
                <img src="/logo.png" alt="" className={Style.logoFooter}/>
            </footer>
        </div>
    );
};

export default loginPage;