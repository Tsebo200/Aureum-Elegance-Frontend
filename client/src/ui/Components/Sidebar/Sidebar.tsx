import React from 'react'
import logo from '../../assets/Wordmark Logo.png';
import styles from '../Sidebar/Sidebar.module.scss';

const Sidebar = () => {
  const navItems = [
    "Dashboard",
    "Production",
    "Stock Request",
    "Add Stock",
    "Warehouse Stock",
    "User Management",
    "Stock Management",
  ];
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Company logo" />
      </div>
      <nav className={styles.navigation}>
        {navItems.map((item, i) => (
          <a key={i} href="#" className={styles['nav-item']}>
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
};


export default Sidebar