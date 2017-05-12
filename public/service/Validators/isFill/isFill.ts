const isFill = (field: string) => {
  if (field !== undefined) {
    return field.trim().length === 0;
  }

  return true;
};

export default isFill;
