import Layout from '../components/Layout'
import styles from '../styles/About.module.css'


const AboutPage: React.FC = () => {
  return (
    <Layout title="About" discription="ホーム画面">
      <div>
        <h1 className={styles.homeTitle}>
          このブログについて
        </h1>
        <div　className={styles.introduction}>
          <span>当ブログでは、pythonやJavaScriptを中心に、日々、学習したことをまとめています。</span>
          <br/>
          <span>個人的なメモが多くなるかもしれませんが、ご了承ください。</span>
          <br/>
          <span>当ブログは、<a href="https://nextjs.org/">Next.js</a>と
            <a href="https://www.django-rest-framework.org/">Django REST framework</a>で構築しています。
          </span>
          <br />
          <br />
          <h2>筆者について</h2>
          <span>2021年5月に、プログラミングの学習を開始。それ以前は、大学でVBAやRの単位を取ったくらいです。</span>
          <br />
          <span>DjangoやReactなどWebサービスの構築について学習しています。大学で統計学を学んでいたこともあり、データ分析にも興味があります。</span>
          <br />
          <span>日商簿記二級、行政書士、TOEIC L&R 780点などプログラミングに直接関係のない資格は保有しています。</span>
          <br />
          <br />
          <h2>お問い合わせ</h2>
          <span>当ブログに関して、ご質問等ある際は、以下のSNSもしくは、メールからご連絡ください。</span>
          <br />
          <br />
          <span>Twitter：</span>
          <br />
          <span>メール：</span>
          <br />
          <br />
          <h2>留意事項</h2>
          <span>当ブログに掲載しているサンプルコード等はご自由に利用していただいても構いませんが、使用により問題が発生した場合、当方は一切責任を負いません。予めご了承ください。</span>
        </div>
      </div>
    </Layout>
  )
  }
  export default AboutPage