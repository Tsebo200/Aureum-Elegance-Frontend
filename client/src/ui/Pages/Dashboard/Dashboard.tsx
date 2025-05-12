import styles from '../Dashboard/Dashboard.module.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import AlertCard from '../../Components/AlertCards/AlertCard';

function Dashboard() {
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.left}>
            <Sidebar />
        </div>
        <div className={styles.right}>
           <h1 className={styles.dashboardHeading}>Dashboard</h1>
             <div className={styles.horLine}></div>
              <div className={styles.mainSection}>
                <div className={styles.spacer}></div>
                <h1 className={styles.alertsHeading}>Alerts</h1>
                <div className={styles.cardSection}>
                  <AlertCard />
                </div>
                <h1 className={styles.graphsHeading}>Graphs</h1>
                <div className={styles.graphsSection}>

                </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard