const isEmpty = (word) => {
  if (word) {
    if (word.trim().length !== 0) {
      return true;
    }
  }

  return false;
};

export default isEmpty;
