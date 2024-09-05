'use client';
import React from 'react'
import style from './styles.module.css'
import { Sidebar } from '../sidebar/sidebar';

export const Navbar = () => {
  return (
      <><nav className={style.nav}>
      <div>
        <img className={style.logo} src="/Logo_name.png" />
      </div>
      <ul className={style.ul}>
        <h3 className={style.h3}>Username Role Profile</h3>
      </ul>
      <a href="#">
        <img className={style.user} src="/user.png" />
      </a>
    </nav>
    <Sidebar />
    </>
  )
}
