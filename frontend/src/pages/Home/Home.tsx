import styles from '@/pages/Home/Home.module.scss'
const Home = () => {
  return (
    <div className={styles.home}>
      <img className={styles.home__logo} src='https://storage.googleapis.com/finder-images/$wuyCp6c7PtkB62A3BqdYuzk8Dsvz8Uc6Ki5E6MBrmqpkoVDQA0azoS.svg' />
      <h3 className={styles.home__header}>
        Quick walkthrough
      </h3>
      <ol className={styles.home__ol}>
        <li className={styles.home__ol__li}>
          <span className={styles.home__ol__li__highlight}>
          Navigate:
          </span>
          Use the navigation bar to seamlessly move between the home page and the sessions page.
        </li>
        <li className={styles.home__ol__li}>
        <span className={styles.home__ol__li__highlight}>
        Sessions Overview:
          </span>
           Explore all sessions with detailed information including status, authorization, duration, start and end points. Easily navigate to associated transactions from the transaction button inside the session page .
        </li>
        <li className={styles.home__ol__li}>
        <span className={styles.home__ol__li__highlight}>
        Sortable Tables:
          </span>
           All columns within the session and transaction tables are sortable.
        </li>
        <li className={styles.home__ol__li}>
        <span className={styles.home__ol__li__highlight}>
        Transaction Details:
          </span>
           Delve into transaction specifics with a comprehensive table showcasing voltage, amperage, timestamp, wattage, watt-hour, and more. Each transaction offers a dialog component revealing all related messages with timestamps and message types.
        </li>
        <li className={styles.home__ol__li}>
        <span className={styles.home__ol__li__highlight}>
        OCPP Messages:
          </span>
          On the transactions page, you have the option to open a dialog displaying all messages associated with the selected transaction.
        </li>
        <li className={styles.home__ol__li}>
          <span className={styles.home__ol__li__highlight}>
          Tech Stack:
          </span>
           Built using MUI table and Radix primitive dialog components, with React Router for navigation.
        </li>
      </ol>
    </div>
  )
}

export default Home