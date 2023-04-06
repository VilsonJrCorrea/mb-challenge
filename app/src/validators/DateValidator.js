export default {
  validate(date) {
    if (date) {
      const [day, month, year] = date.split("/");
      const objDate = new Date(year, month - 1, day);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const currentDay = new Date().getDate();
      const isValidDate =
        objDate.getFullYear() <= currentYear &&
        objDate.getMonth() <= currentMonth &&
        objDate.getDate() <= currentDay;
      const regex = new RegExp("^[0-9]{2}/[0-9]{2}/[0-9]{4}$");
      return regex.test(date) && isValidDate;
    }
    return false;
  },
};
