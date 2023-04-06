export default {
  validate(phone) {
    if (phone) {
      const regex = /\(\d{2}\)\s\d{4,5}-?\d{4}/g;
      return regex.test(phone);
    }
    return false;
  },
};
