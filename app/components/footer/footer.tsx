import React from "react";
import Style from "./style.module.css";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Footer = () => {
    return (
        <div className={Style.footer}>
            <div className={Style.footer_logo}>
                <img src="/logo.png" alt="" className={Style.logoFooter} />
                <h2>© 2024</h2>
            </div>
            <h2 className={Style.footer_Title}>Complexus@Complexus.com</h2>
            <div className={Style.footer_icons}>
                <a href="https://wa.me/573176980852" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className={Style.Icon} />
                </a>
                <a href="https://www.instagram.com/tuUsuario" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon className={Style.Icon} />
                </a>
                <a href="mailto:Complexus@gmail.com" target="_blank" rel="noopener noreferrer">
                    <MailOutlineIcon className={Style.Icon} />
                </a>
            </div>
        </div>
    );
};

export default Footer;
