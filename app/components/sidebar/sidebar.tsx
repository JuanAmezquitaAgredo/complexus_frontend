'use client';
import React, { useEffect, useState } from 'react';
import style from './styles.module.css';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import HomeIcon from '@mui/icons-material/Home';

export const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []); 

  return (
    <aside className={style.aside}>
      <ul className={style.ul}>
        <a className={style.a} href="/admin">
          <div className={`${style.aside_nav} ${currentPath === '/admin' ? style.active : ''}`}>
            <HomeIcon className={style.icons} />
            <h2 className={style.aside_nav_h2}>Home</h2>
          </div>
        </a>

        <a className={style.a} href="/posts">
          <div className={`${style.aside_nav} ${currentPath === '/posts' ? style.active : ''}`}>
            <PostAddOutlinedIcon className={style.icons} />
            <h2 className={style.aside_nav_h2}>Create post</h2>
          </div>
        </a>

        <a className={style.a} href="/ownerscrud">
          <div className={`${style.aside_nav} ${currentPath === '/ownerscrud' ? style.active : ''}`}>
            <MapsHomeWorkOutlinedIcon className={style.icons} />
            <h2 className={style.aside_nav_h2}>Owners</h2>
          </div>
        </a>
      </ul>
    </aside>
  );
};
