const countNumbers = (count, time, callback, callbackStart) => {
  setTimeout(function go() {
    callback(count);

    if (count > 0) {
      setTimeout(go, time);
    } else if (count === 0) {
      callbackStart();
    }

    --count;
  }, time);
};

export default countNumbers;
