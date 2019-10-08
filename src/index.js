const getCurrentSeconds = () => Math.trunc(new Date() / 1000);

module.exports = (timeframe = 60 * 5) => {
  const counter = new Map();
  let lastCleanup = getCurrentSeconds();

  const cleanup = () => {
    const secondsTo = getCurrentSeconds() - timeframe - 1;
    if (secondsTo > lastCleanup) {
      counter.forEach((_, timestamp) => {
        if (timestamp < secondsTo) {
          counter.delete(timestamp);
        }
      });
      lastCleanup = secondsTo;
    }
  };


  const emit = () => {
    const seconds = getCurrentSeconds();
    if (counter.get(seconds)) {
      counter.set(seconds, counter.get(seconds) + 1);
    } else {
      counter.set(seconds, 1);
    }
    cleanup();
  };

  const getCount = (lastSeconds) => {
    if (!lastSeconds && lastSeconds < 1) {
      // TODO:  <07-10-19, Vora, Deep> thow an error?
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

  return { emit, getCount };
};
