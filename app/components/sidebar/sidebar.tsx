'use client'
import React from 'react'
import style from './styles.module.css'

export const Sidebar = () => {
  return (
    <aside className={style.aside}>
        <ul className={style.ul}>
          <a className={style.a} href="#">
            <img className={style.icons} src="/page-icon.png" alt="Page Icon"/>
          </a>
          <a className={style.a} href="#">
            <img className={style.icons} src="/recidentes.png" alt="Recidentes Icon"/>
          </a>
          <a className={style.a} href="#">
            <img className={style.icons} src="/pin.png" alt="Pin Icon"/>
          </a>
        </ul>
    </aside>
  )
}
