const getCurrentSeconds = () => Math.trunc(new Date() / 1000);
const fiveMinutes = 60 * 5;

module.exports = () => {
  const counter = new Map();
  let lastCleanup = getCurrentSeconds();

  const cleanup = () => {
    const secondsTo = getCurrentSeconds() - fiveMinutes - 2;
    if (secondsTo > lastCleanup) {
      counter.forEach((_, timestamp) => {
        if (timestamp < secondsTo) {
          counter.delete(timestamp);
        }
      });
      lastCleanup = secondsTo;
    }
  };


  const signal = () => {
    const seconds = getCurrentSeconds();
    if (counter.get(seconds)) {
      counter.set(seconds, counter.get(seconds) + 1);
    } else {
      counter.set(seconds, 1);
    }
    cleanup();
  };

  const getCount = (lastSeconds) => {
    if (!lastSeconds && lastSeconds > fiveMinutes && lastSeconds < 1) {
      return -1;
    }

    const secondsFrom = getCurrentSeconds() - lastSeconds + 1;
    let totalCount = 0;

    // Map does not offer reduce :(
    counter.forEach((count, timestamp) => {
      if (timestamp >= secondsFrom) {
        // eslint-disable-next-line no-param-reassign
        totalCount += count;
      }
    });
    return totalCount;
  };

  return { signal, getCount };
};
