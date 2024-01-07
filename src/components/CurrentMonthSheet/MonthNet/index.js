import React, { useContext } from 'react';
import DateContext from '../../../constexts/DateContext';
import styles from './MonthNet.module.css';
import cx from 'classnames';

// тут довго думав чи варто цей об'єкт виносити в json, але потім вирішив, що мабуть не треба, підкажіть, будт ласка, як треба, бо я виніс його просто, щоб він не перерендерювався

const daysOfWeekNames = [{
    name: 'S',
    id: 0
},
{
    name: 'M',
    id: 1
},
{
    name: 'T',
    id: 2
},
{
    name: 'W',
    id: 3
},
{
    name: 'T',
    id: 4
},
{
    name: 'F',
    id: 5
},
{
    name: 'S',
    id: 6
},];

const MonthNet = () => {
    const [, , , currentDate, , daysInCurrentMonth, firstDayOfCurrentMonth, datePickCallback] = useContext(DateContext);
    
    // тут прямо на максимальних костилях зробив(((, але інакше не додумався, якщо чесно
    const monthSchedule = [];
    let keyCounter = 0;

    for (let i = 0; i < firstDayOfCurrentMonth; i++) {
        monthSchedule.push({value: ' ', id: keyCounter++});
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
        monthSchedule.push({value: i, id: keyCounter++});
    }

    const dateItemClickHandler = ({target: {innerText}}) => {
        datePickCallback(Number(innerText));
    }

    return (
        <article className={styles.net}>
            {daysOfWeekNames.map(item =>    <div    key={item.id} 
                                                    className={cx([ styles['date-item'], 
                                                                    styles['days-names-item']])}>
                                                    {item.name}
                                            </div>)}

            {monthSchedule.map(item => <div key={item.id} 
                                            className={cx(
                                                        [styles['date-item'], 
                                                        {[styles['current-date']]: item.value === currentDate}])}
                                            onClick={dateItemClickHandler}>
                                                {item.value}
                                        </div>)}
        </article>
    );
}

export default MonthNet;
