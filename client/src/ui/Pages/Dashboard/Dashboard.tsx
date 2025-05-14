import styles from '../Dashboard/Dashboard.module.scss';
import Sidebar from '../../Components/Sidebar';
import AlertCard from '../../Components/AlertCards/AlertCard';
import DoughnutChart from '../../Components/Graphs/DoughnutChart'

function Dashboard() {
  return (
    <div>
      <div className={styles.mainContainer}>
            <Sidebar />
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
                  <div className={styles.graphBoxOne}>
                 <DoughnutChart />
                  </div>
 

                </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard