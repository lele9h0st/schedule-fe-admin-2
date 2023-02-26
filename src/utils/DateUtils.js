export const dateToString = (date) =>
    `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`