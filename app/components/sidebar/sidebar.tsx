'use client'
import React from 'react'
import style from './styles.module.css'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

export const Sidebar = () => {
  return (
    <aside className={style.aside}>
        <ul className={style.ul}>
          <a className={style.a} href="#">
            <PostAddOutlinedIcon className={style.icons}/>
          </a>
          <a className={style.a} href="#">
            <MapsHomeWorkOutlinedIcon className={style.icons}/>
          </a>
          <a className={style.a} href="#">
            <PushPinIcon className={style.icons}/>
          </a>
        </ul>
    </aside>
  )
}
