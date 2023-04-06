export default {
  validate(password) {
    return password && password.length >= 1;
  },
};
