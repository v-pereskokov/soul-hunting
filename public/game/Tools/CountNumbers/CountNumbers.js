const countNumbers = (count, time, callback) => {
  setTimeout(function go() {
    callback(count);
    if (count > 0) {
      setTimeout(go, time);
    }
    --count;
  }, time);
};

export default countNumbers;
