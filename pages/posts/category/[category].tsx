import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router';
import FolderIcon from '@mui/icons-material/Folder';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpdateIcon from '@mui/icons-material/Update';

import Layout from '../../../components/Layout'
import { getAllCategoriesData, getAllCategoryIds } from '../../../lib/fetch' 
import styles  from '../../../styles/BlogList.module.css'
import { POST } from '../../../types/types'

interface STATICPROPS {
  posts: POST[]
}

const BlogCategoryPage: React.FC<STATICPROPS> = ({ posts }) => {
  const router = useRouter()
  const category = router.query.category
  return (
    <Layout title="Blog" discription="ブログ一覧">
      <div className={styles.root}>カテゴリー：{category}</div>
      
      <div>
        {posts &&
          posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <div className={styles.header}>
                <div className={styles.category}>
                  <Link href={`/posts/category/${post.categoryName}/`} passHref>
                    <a className={styles.backToBlog}>
                      <FolderIcon sx={{ fontSize: 16 }}/>
                      {post.categoryName}
                    </a>
                  </Link>
                </div>
                <div className={styles.date}>
                  <span>
                    <ScheduleIcon sx={{ fontSize: 16 }}/>
                    {post.createdAt}
                  </span>
                  <span>
                    <UpdateIcon sx={{ fontSize: 16 }}/>
                    {post.updatedAt}
                  </span>
                </div>
              </div>

              <Link href={`/posts/${post.id}`} passHref>
                <a>
                  <span className={styles.title}>{post.title}</span>
                </a>
              </Link>
              <div className={styles.tags} >
                {post.tags &&
                  post.tags.map((tag, index) => (
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


              <Link href={`/posts/${post.id}`} passHref>
                <a>
                  <span className={styles.previewContent}>
                    {post.previewContent}
                  </span>
                </a>
              </Link>

            </div>
          ))
        }
      </div>
    </Layout> 
  )
};
export default BlogCategoryPage

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCategoryIds()
  return {
    paths,
    // DRFで、記事が増えるのに対応させるためtrueに
    fallback: true,
  }
}
  
export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getAllCategoriesData(ctx.params.category as string)
  return {
    props: {posts},
    revalidate: 3,
  }
} 