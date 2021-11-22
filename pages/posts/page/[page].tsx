import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router';
import FolderIcon from '@mui/icons-material/Folder';
import Pagination from '@mui/material/Pagination';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpdateIcon from '@mui/icons-material/Update';

import Layout from '../../../components/Layout'
import { getPostsCount, getPaginatedPostsData } from '../../../lib/fetch'
import { POST } from '../../../types/types'
import styles  from '../../../styles/BlogList.module.css'


interface STATICPROPS {
  posts: POST[],
  count: number,
}

const BlogPage: React.FC<STATICPROPS> = ({ posts, count }) => {
  const router = useRouter()
  const q = Number(router.asPath.split('/')[3])
  const [page, setPage] = useState(q)

  return (
    <Layout title="Blog" discription="ブログ一覧">
        <div className={styles.root}>ブログ一覧</div>
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
                          <a>#{tag.name}</a>
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

        <div className={styles.pagination}>
          <Pagination 
              count={Math.ceil(count / 10)} 
              // color="primary"
              onChange={
                  (e, page) => {
                      setPage(page)
                      router.push(`/posts/page/${page}`)
                  }
              }  //変更されたときに走る関数。第2引数にページ番号が入る
              page={q}         //現在のページ番号
          />
        </div>
    </Layout> 
  )
};
export default BlogPage

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getPostsCount()
    return {
      paths,
      // DRFで、記事が増えるのに対応させる場合は、true
      fallback: true,
    }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const paginatedPosts = await getPaginatedPostsData(ctx.params.page as string);
  const count = paginatedPosts.count;
  const next = paginatedPosts.next;
  const previous = paginatedPosts.previous;
  const posts = paginatedPosts.results;
  return {
    props: { posts, count  },
    // 5秒間に複数回アクセスがあっても静的なファイルの再生成は一回しか行われない
    revalidate: 5,
  }
}