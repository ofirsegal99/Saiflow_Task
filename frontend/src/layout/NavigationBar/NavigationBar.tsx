import styles from '@/layout/NavigationBar/NavigationBar.module.scss'
import { Link } from 'react-router-dom';
import NavLink from '@/components/NavLink/NavLink';
const NavigationBar = () => {
  return (
    <div className={styles.navigationBar}>
        <div className={styles.navigationBar__content}>
            <div className={styles.navigationBar__content__leftContainer}>
                <Link to='/'>
                    <img src='https://www.saiflow.com/wp-content/uploads/2022/10/fuse-logo-with-text-1.svg' className={styles.navigationBar__content__leftContainer__logo}/>
                </Link>
            </div>
            <div className={styles.navigationBar__content__middleContainer}>
                <NavLink to='/Sessions'>
                    Sessions
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default NavigationBar;