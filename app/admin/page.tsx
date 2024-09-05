import { Navbar } from '@/app/components/navbar/navbar'
import PostCard from '@/app/components/postcard/PostCard'
import { Sidebar } from '@/app/components/sidebar/sidebar'
import React from 'react'
import styles from './styles.module.css';


const adminPage = () => {
  return (
    <main>
      <Navbar />
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.posts}>
              <PostCard userName='Juan' message='Hello Welcome' likes={25}/>
            </div>
        </div>
    </main>
  )
}

export default adminPage