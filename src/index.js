const getCurrentSeconds = () => Math.trunc(new Date() / 1000);


/**
 * @typedef {Object} EventCounter
 * @property {function} emit - Emits/signals event that needs to be accumulated
 * @property {function} getCount - Get the count of events registered in last n seconds
 */

/**
 * Represents Event Counter
 * @param {int} timeframe - Timeframe for  cleanup
 * @returns {EventCounter}
 */
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

  /**
   * @function emit
   * Registers the event and incremetns the count for that second.
   * Calls cleanup everytime its invoked which will clean up old stale data out of timeframe
   */
  const emit = () => {
    const seconds = getCurrentSeconds();
    if (counter.get(seconds)) {
      counter.set(seconds, counter.get(seconds) + 1);
    } else {
      counter.set(seconds, 1);
    }
    cleanup();
  };

  /**
   * @function getCount
   * Returns the count of total events in last n seconds.
   * @param {int} lastSeconds - n previous seconds from now
   */
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
