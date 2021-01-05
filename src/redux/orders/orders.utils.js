export const sortDesc = (arr, field) => {
  if (field !== "name")
    return arr.sort((a, b) => {
      if (a[field] > b[field]) {
        return -1;
      }
      if (b[field] < a[field]) {
        return 1;
      }
      return 0;
    });
  else
    return arr.sort((a, b) => {
      if (a.user.displayName > b.user.displayName) {
        return -1;
      }
      if (b.user.displayName < a.user.displayName) {
        return 1;
      }
      return 0;
    });
};
