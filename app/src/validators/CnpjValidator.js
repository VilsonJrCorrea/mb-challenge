export default {
  validate(cnpj) {
    if (cnpj) {
      const regex = new RegExp(
        "^[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}$"
      );
      return regex.test(cnpj);
    }
    return false;
  },
};
