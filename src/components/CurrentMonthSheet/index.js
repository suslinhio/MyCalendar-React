import React, { useContext } from 'react';
import styles from './CurrentMonthSheet.module.css';
import DateContext from '../../constexts/DateContext';
import MonthNet from './MonthNet';

const CurrentMonthSheet = () => {
    const [ , currentMonthName, currentYear, , , , , , nextMonthCallback, prevMonthCallback] = useContext(DateContext);

    const nextButtonHandler = () => {
        nextMonthCallback();
    }

    const prevButtonHandler = () => {
        prevMonthCallback();
    }

    return (
        <section className={styles.container}>
            <nav className={styles['nav-bar']}>
                <button className={styles['nav-button']}
                        onClick={prevButtonHandler}>&lt;</button>
                <h2 className={styles.header}>{currentMonthName} {currentYear}</h2>
                <button className={styles['nav-button']}
                        onClick={nextButtonHandler}>&gt;</button>
            </nav>
            <MonthNet/>
        </section>
    );
}

export default CurrentMonthSheet;
