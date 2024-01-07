const API_BASE = '/months.json';

export const getMonthName = async() => {
    const response = await fetch(API_BASE);
    return await response.json();
}