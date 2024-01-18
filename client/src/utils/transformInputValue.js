export const blockTextInput = (e) => {
  e.target.value = e.target.value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
};
