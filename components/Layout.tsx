import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from "framer-motion"

import { POST } from '../types/types'
import styles from '../styles/Layout.module.css'

interface TITLE {
  title: string,
  discription: string
}

const Layout: React.FC<TITLE> = ({ children, title = 'ShikuBlog', discription = 'ShikuBlog' }) => {
  const router = useRouter()
  // const [activeSearchForm, setActiveSearchForm] = useState<boolean>(false);
  const [activeMenubar, setActiveMenubar] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={discription} />
      </Head>
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>ShikuBlog</div>

          <div className={styles.links}>
            <Link href="/" passHref>
              <motion.a
                whileHover={{
                  // color: "#999",
                  color: "#f53b57",
                  // color: "#6495ed",
                }}
                className={styles.link}
                key="home"
              >
                Home
              </motion.a>
            </Link>
            <Link href="/posts/page/1" passHref>
              <motion.a
                whileHover={{
                  // color: "#666",
                  color: "#f53b57",
                  // color: "#6495ed",
                }}
                className={styles.link}
                key="blog"
              >
                Blog
              </motion.a>
            </Link>
            <Link href="/portfolio-page" passHref>
              <motion.a
                whileHover={{
                  color: "#f53b57",
                }}
                className={styles.link}
                key="portfolio"
              >
                Portfolio
              </motion.a>
            </Link>
            <Link href="/about-page" passHref>
              <motion.a
                whileHover={{
                  color: "#f53b57",
                }}
                className={styles.link}
                key="about"
              >
                About
              </motion.a>
            </Link>
          </div>

          <div className={styles.icons}>
            <div
              className={`
                ${styles.icon} 
                ${styles.menuBtn} 
                ${activeMenubar && styles.active}
              `}

              onClick={() => {
                setActiveMenubar(!activeMenubar);
              }}
            >
               <span className={styles.border}></span>
               <span className={styles.border}></span>
               <span className={styles.border}></span>
            </div>
            {/* <motion.div 
              whileHover={{
                color: "#e10098",
              }}
              className={styles.icon} 
              onClick={() => {
                setActiveMenubar(false);
                setActiveSearchForm(!activeSearchForm);
              }}
            >
              <SearchIcon />
            </motion.div> */}
          </div>

        </div>

        {/*  */}
        {activeMenubar &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ x: [ 1000, 0], opacity:1 }}
            transition={{ duration: 0.6 }}
            className={ activeMenubar ? `${styles.menubar} ${styles.activeMenubar}` : styles.menubar}
          >
            <div className={styles.menuTitle}>Menu</div>
            <div className={styles.links}>
              <div className={styles.link}>
                <Link href="/" passHref>
                  <motion.a
                    whileHover={{
                      color: "#333",
                    }}
                    key="home"
                  >
                    Home
                  </motion.a>
                </Link>
              </div>
              <div className={styles.link}>
                <Link href="/posts/page/1" passHref>
                  <motion.a
                    whileHover={{
                      color: "#333",
                    }}
                    key="blog"
                  >
                    Blog
                  </motion.a>
                </Link>
              </div>
              <div className={styles.link}>
                <Link href="/portfolio-page" passHref>
                  <motion.a
                    whileHover={{
                      color: "#333",
                    }}  
                    key="portfolio"
                  >
                    Portfolio
                  </motion.a>
                </Link>
              </div>
              <div className={styles.link}>
                <Link href="/about-page" passHref>
                  <motion.a
                    whileHover={{
                      color: "#333",
                    }}
                    key="about"
                  >
                    About
                  </motion.a>
                </Link>
              </div>
            </div> 
          </motion.div>
        }
        {/* {activeSearchForm &&
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ x: [ 1000, 0], opacity:1 }}
            transition={{ duration: 0.4 }}
            action="" 
            className={ activeSearchForm ? `${styles.searchForm} ${styles.activeSearchForm}` : styles.searchForm}
          >
            <input 
              type="text" 
              placeholder="search here ..."
              onChange={(e) => setWord(e.target.value)}
              className={styles.a}
              onKeyPress={(e) => {
                // console.log(e.key)
                if (e.key == 'Enter') {
                  e.preventDefault()
                  router.push(`/posts/search/?q=${word}`)
                }
              }}

            />
            <motion.label
              whileHover={{
                color: "#333",
              }} 
              htmlFor="search-box"
            >
              <span
                onClick={() => router.push(`posts/search?q=${word}`)}
              >
                <SearchIcon sx={{ fontSize: 30 }}/> 
              </span>
            </motion.label>
          </motion.form>
        } */}
      </header>

      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ y: [ 10, 0], opacity:1 }}
          transition={{ duration: 0.8 }}
        >
        {children}
        </motion.div>
      </main>

      <footer className={styles.footer}>
        <Link href="/" passHref>
          <div
            className={styles.logo}
          >
            &copy; 2021 ShikuBlog. All rights reserved.
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </div>
        </Link>
      </footer>
    </div>
  )
};
export default Layout