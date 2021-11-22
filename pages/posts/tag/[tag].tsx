import { useRouter } from 'next/router';
import Layout from '../../../components/Layout'
import Link from 'next/link'
import FolderIcon from '@mui/icons-material/Folder';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpdateIcon from '@mui/icons-material/Update';
import { POST } from '../../../types/types'
import styles  from '../../../styles/BlogList.module.css'
import { getAllTagsData, getAllTagIds } from '../../../lib/fetch' 
import { GetStaticProps, GetStaticPaths } from 'next'

// import Cookie from 'universal-cookie'
interface STATICPROPS {
  posts: POST[]
}

const BlogTagPage: React.FC<STATICPROPS> = ({ posts }) => {
  const router = useRouter()
  const tag = router.query.tag
// const BlogPage: React.FC = () => {
  return (
  <Layout title="Blog" discription="ブログ一覧">    
    <div className={styles.root}>タグ：{tag}</div>
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
            {/* <hr /> */}

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
export default BlogTagPage

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTagIds()
  return {
    paths,
    // DRFで、記事が増えるのに対応させるためtrueに
    fallback: true,
  }
}
  
export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getAllTagsData(ctx.params.tag as string)
  return {
    props: {posts},
    revalidate: 3,
  }
} 