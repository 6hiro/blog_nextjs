import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import { CodeComponent, ReactMarkdownNames } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import FolderIcon from '@mui/icons-material/Folder';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpdateIcon from '@mui/icons-material/Update';

import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/fetch' 
import styles from '../../styles/Blog.module.css'
import { POST } from '../../types/types'

// const CodeBlock: CodeComponent | ReactMarkdownNames = ({
//   inline,
//   className,
//   children,
//   ...props
// }) => {
//   const match = /language-(\w+)/.exec(className || '');
//   return !inline && match ? (
//     <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" {...props}>
//       {String(children).replace(/\n$/, '')}
//     </SyntaxHighlighter>
//   ) : (
//     <code className={className} {...props}>
//       {children}
//     </code>
//   );
// };

const PostDetail: React.FC<POST> = ({ id, title, previewContent, post, createdAt, updatedAt, categoryName, tags}) => {
  return (
    <Layout title={title} discription={previewContent}>
      <div className={styles.root}>
        <Link href="/posts/page/1"  passHref>
            <a className={styles.toBlogList}>ブログ一覧 &gt;</a>
        </Link>
  
        <Link href={`/posts/category/${categoryName}/`} passHref>
          <a className={styles.toCategory}>
            <FolderIcon sx={{ fontSize: 12 }}/>
            {categoryName} &gt;
            </a>
        </Link>

        <span className={styles.corrent_page}>
          {/* {title} */}
        {title}
        </span>
      </div>

      <div className={styles.date}>
        <span>
          <ScheduleIcon sx={{ fontSize: 16 }}/>
          {createdAt}
        </span>
        <span>
          <UpdateIcon sx={{ fontSize: 16 }}/>
          {updatedAt}
        </span>
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.tags} >
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
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        className={styles.markdownPost}
      >
        {post}
      </ReactMarkdown>

      {/* <ReactMarkdown
        className={styles.markdownPost}
        children={post}
        // components={{
        //   code({node, inline, className, children, ...props}) {
        //     const match = /language-(\w+)/.exec(className || '')
        //     return !inline && match ? (
        //       <SyntaxHighlighter
        //         children={String(children).replace(/\n$/, '')}
        //         style={dark}
        //         language={match[1]}
        //         PreTag="div"
        //         {...props}
        //       />
        //     ) : (
        //       <code className={className} {...props}>
        //         {children}
        //       </code>
        //     )
        //   }
        // }}
      /> */}
    </Layout>
  )
}
export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()
  return {
    paths,
    // DRFで、記事が増えるのに対応させるためtrueに
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params.id as string)
  return {
    props: {
      ...post,
    },
    // revalidate: 3,
  }
} 