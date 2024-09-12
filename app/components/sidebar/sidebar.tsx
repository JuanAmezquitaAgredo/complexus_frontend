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
        <div className={style.aside_nav}>
          <a className={style.a} href="/posts">
            <PostAddOutlinedIcon className={style.icons} />
          </a>
          <h2 className={style.aside_nav_h2}>Home</h2>
        </div>
        <div className={style.aside_nav}>
          <a className={style.a} href="#">
            <MapsHomeWorkOutlinedIcon className={style.icons} />
          </a>
          <h2 className={style.aside_nav_h2}>Create post</h2>
        </div>
        <div className={style.aside_nav}>
          <a className={style.a} href="#">
            <PushPinIcon className={style.icons} />
          </a>
          <h2 className={style.aside_nav_h2}>Owners</h2>
        </div>
      </ul>
    </aside>
  )
}
