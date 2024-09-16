'use client';
import React, { useEffect, useState } from 'react';
import style from './styles.module.css';
import HomeIcon from '@mui/icons-material/Home';

export const SidebarSuperAdmin = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []); 

  return (
    <aside className={style.aside}>
      <ul className={style.ul}>
        <a className={style.a} href="/superadmin">
          <div className={`${style.aside_nav} ${currentPath === '/superadmin' ? style.active : ''}`}>
            <HomeIcon className={style.icons} />
            <h2 className={style.aside_nav_h2}>Rseidential Units</h2>
          </div>
        </a>
      </ul>
    </aside>
  );
};
