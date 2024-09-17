'use client';
import { useRouter } from "next/navigation";
import Button from "./components/common/button/button";
import Footer from "./components/footer/footer";
import Style from "./style.module.css";

export default function Home() {
  const router = useRouter();

  const GoToLogin = () => {
    router.push("/login");
  };
  
  return (
    <main className={Style.HomePage}>
      <nav className={Style.navbar}>
        <img src="/Logo_name.png" alt="" className={Style.Logo} />
      </nav>
      <hr />
      <div className={Style.loginContainer}>
        <div className={Style.Text}>
          <h1 className={Style.Text_h1}>Welcome!</h1>
          <h3 className={Style.Text_h3}>Complexus simplifies communication, fostering collaboration between residents and the administrator to enhance your community living.
            Never miss a thing—be part of the digital evolution in your community.</h3>
          <div className={Style.container_btn}>
            <Button label="Get Started" onClick={GoToLogin} />
          </div>
        </div>
        <div className={Style.container}>
          <div className={Style.background}></div>
          <img src="/loginimg.png" alt="" className={Style.image} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
