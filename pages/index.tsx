import { GetStaticProps } from "next"
import Link from 'next/link'
import { motion } from "framer-motion"
import FolderIcon from '@mui/icons-material/Folder';

import { getAllCategories, getAllTags } from "../lib/fetch"
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'


interface STATICPROPS {
  categories: {id:string, name: string}[]
  tags: {id:string, name: string}[]
}

const Home: React.FC<STATICPROPS> = ({ categories, tags }) => {
  return (
    <Layout title="Home" discription="ホーム画面">
      <div className={styles.home}>
        {/* <div className={styles.homeTitle}>
          ホーム
        </div> */}
        <div>
            <h2>カテゴリ一覧</h2>
          <div className={styles.categories}>
            {categories &&
              categories.map((category) => (
                <div key={category.id} className={styles.category}>
                  <Link href={`/posts/category/${category.name}/`} passHref>
                    <a className={styles.backToBlog}>
                      <FolderIcon sx={{ fontSize: 12 }}/>
                      <span className={styles.catgegoryName}>
                        {category.name}
                      </span>
                    </a>
                  </Link>
                </div>
              ))
            }
          </div>
          <br />

          <h2>タグ一覧</h2>
          <div className={styles.tags}>
            {tags &&
              tags.map((tag, index) => (
                <div
                  className={` ${styles.tag} ${
                    index === 0 || index === 5 || index === 10 || index === 15 || index === 20 ? styles.blue : ''}
                    ${index === 1 || index === 6 || index === 11 || index === 16 || index === 21 ? styles.red : ''}
                    ${index === 2 || index === 7 || index === 12 || index === 17 || index === 22 ? styles.green : ''}
                    ${index === 3 || index === 8 || index === 13 || index === 18 || index === 23 ? styles.yellow : ''}
                    ${index === 4 || index === 9 || index === 14 || index === 19 || index === 24 ? styles.skyBlue : ''}
                  `}
                  key={tag.id}
                >
                  <Link href={`/posts/tag/${tag.name}/`} passHref>
                    <a className={styles.backToBlog}>#{tag.name}</a>
                  </Link>
                </div>
              ))}
          </div>
        </div>

      </div>

    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const categories = await getAllCategories()
  const tags = await getAllTags()
  return {
    props: { categories, tags },
    // 5秒間に複数回アクセスがあっても静的なファイルの再生成は一回しか行われない
    revalidate: 5,
  }
}