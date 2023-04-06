export default {
  validate(cpf) {
    if (cpf) {
      const regex = new RegExp("^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$");
      return regex.test(cpf);
    }
    return false;
  },
};
