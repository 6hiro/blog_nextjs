import Layout from '../components/Layout'
import styles from '../styles/Portfolio.module.css'


const PortfolioPage: React.FC = () => {
  
    return (
      <Layout title="Portfolio" discription="ポートフォリオ">
        <div className={styles.portfolio}>
          <div className={styles.portfolioTitle}>ポートフォリオ</div>
          <div className={styles.contents}>
            Comming soon ...
          </div>
        </div>
      </Layout>
    )
  };
  export default PortfolioPage