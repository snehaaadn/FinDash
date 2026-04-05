export const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
};

export const formatMonthKey = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}`;
};