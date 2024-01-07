import React, { useEffect, useState } from 'react';
import CurrentDaySheet from '../CurrentDaySheet';
import CurrentMonthSheet from '../CurrentMonthSheet';
import styles from './ReactCalendar.module.css';
import { getDate, getDay, getMonth, getYear, getDaysInMonth } from 'date-fns';
import { getMonthName } from '../../api/getMonthName';
import DateContext from '../../constexts/DateContext';

/* 
Доброго дня!
Одразу відповіді на Ваші питання:

1. Чому обрав функціональну, а не класову. Я подумав, що різниці особливо взагалі не буде, але вже зараз по факту думаю, що можливо класовою було б навіт краще і читабельніше, тому що багато різних стейтів вийшло. В цілому обирав за принципом, що це хороша практика на хуках буде, бо всі пет-проекти збираюсь на них писати по можливості.
2. Всі технології по тз використав.
3. Не можу знайти баг. Коли йду по місяцях в пагінації, то перший і останній місяць дублюються, я вже все передивився і не можу зрозуміти в чому проблема.
4. Код точно поганий, але поки не розумію, як краще зробити і чи правильно я взагалі все скомпонував і чи треба було редьюсер використовувати, тому дуже чекаю на Ваш фідбек) Гарного дня і дякую за Ваш час!
*/

const ReactCalendar = () => {
    const [currentMonthId, setCurrentMonthId] = useState(getMonth(new Date())); //тут не впевнений чи можна перед хуками просто зробити одну змінну з початковою датою і всюди у юзстейтах порозсовувати, щоб не перестворювати однакові об'єкти, тому поки так залишив
    const [currentYear] = useState(getYear(new Date()));
    const [currentDate, setCurrentDate] = useState(getDate(new Date()));
    const [currentDay, setCurrentDay] = useState(getDay(new Date()));
    const [daysInCurrentMonth, setDaysInCurrentMonth] = useState(getDaysInMonth(new Date(currentYear, currentMonthId)));
    const [firstDayOfCurrentMonth, setFirstDayOfCurrentMonth] = useState(getDay(new Date(currentYear, currentMonthId, 1)));
    const [currentMonthName, setCurrentMonthName] = useState('');
    const [, setError] = useState(null);
    const [, setFetching] = useState(true);

    const load = () => {
        getMonthName()
        .then(data => {
            setCurrentMonthName(data[currentMonthId].toUpperCase())
        })
        .catch(error => {
            setError(error)
        })
        .finally(setFetching(false))
    }

    useEffect(() => {
        load();
    }, [])

    const datePickCallback = (date) => {
        const newDate = new Date(currentYear, currentMonthId, date);

        setCurrentDate(getDate(newDate));
        setCurrentDay(getDay(newDate));
    }
    
    const nextMonthCallback = () => {
        if (currentMonthId < 11) {
            setCurrentMonthId(currentMonthId + 1);
            const newDate = new Date(currentYear, currentMonthId, 1);
            load();
            setCurrentDate(getDate(newDate));
            setCurrentDay(getDay(newDate));
            setDaysInCurrentMonth(getDaysInMonth(newDate));
            setFirstDayOfCurrentMonth(getDay(newDate));
        }
    }

    const prevMonthCallback = () => {
        if (currentMonthId > 0) {
            setCurrentMonthId(currentMonthId - 1);
            const newDate = new Date(currentYear, currentMonthId, 1);
            load();
            setCurrentDate(getDate(newDate));
            setCurrentDay(getDay(newDate));
            setDaysInCurrentMonth(getDaysInMonth(newDate));
            setFirstDayOfCurrentMonth(getDay(newDate));
        }
    }

    return (
        <main className={styles.container}>
            <DateContext.Provider value={[currentMonthId, currentMonthName, currentYear, currentDate, currentDay, daysInCurrentMonth, firstDayOfCurrentMonth, datePickCallback, nextMonthCallback, prevMonthCallback]}>
                <CurrentDaySheet/>
                <CurrentMonthSheet/>
            </DateContext.Provider>
        </main>
    );
}

export default ReactCalendar;
