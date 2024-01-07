import React, { useContext } from 'react';
import styles from './CurrentDaySheet.module.css';
import DateContext from '../../constexts/DateContext';

const CurrentDaySheet = () => {
    const [, , , currentDate, currentDay] = useContext(DateContext);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <section className={styles.container}>
            <h2>{daysOfWeek[currentDay].toUpperCase()}</h2>
            <p className={styles.date}>{currentDate}</p>
        </section>
    );
}

export default CurrentDaySheet;
