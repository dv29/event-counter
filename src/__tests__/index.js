const EventCounter = require('..');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Event Counter test suite', () => {
  describe('Signal tests', () => {
    test('All signals should registered', () => {
      const ec = EventCounter();
      Array.from(Array(10)).forEach(ec.emit);
      expect(ec.getCount(1)).toBe(10);
    });

    test('When signals are fired ever second, it should distinctly register each signal count', async () => {
      const ec = EventCounter();

      await Promise.all(
        Array.from(Array(10)).map(async (_, index) => {
          await sleep(1000 * index);
          return ec.emit();
        }),
      );

      expect(ec.getCount(1)).toEqual(1);
    }, 10000);

    test('When multiple signals are fired every second, it should register each signal count', async () => {
      const ec = EventCounter();

      await Promise.all(
        Array.from(Array(10)).map(async (_, index) => {
          await sleep(1000 * index);
          return Array.from(Array(10)).map(ec.emit);
        }),
      );

      expect(ec.getCount(1)).toEqual(10);
    }, 10000);

    test('When thousands of signals are fired every second, it should register each signal count', async () => {
      const ec = EventCounter();

      await Promise.all(
        Array.from(Array(3)).map(async (_, index) => {
          await sleep(1000 * index);
          return Array.from(Array(1000000)).map(ec.emit);
        }),
      );

      // giving it time to register the last 1000000
      await sleep(100);
      expect(ec.getCount(2)).toBeGreaterThan(300000);
    }, 10000);
  });

  describe('Get count tests', () => {
    test('Get last 5 seconds should return the count of signals fired in last 5 seconds', async () => {
      const ec = EventCounter();

      await Promise.all(
        Array.from(Array(10)).map(async (_, index) => {
          await sleep(1000 * index);
          return Array.from(Array(10)).map(ec.emit);
        }),
      );

      expect(ec.getCount(5)).toEqual(50);
    }, 10000);

    test('getCount should return -1 if query is invalid', async () => {
      const ec = EventCounter();

      await Promise.all(
        Array.from(Array(10)).map(async (_, index) => {
          await sleep(1000 * index);
          return Array.from(Array(10)).map(ec.emit);
        }),
      );

      expect(ec.getCount(0)).toEqual(-1);
    }, 10000);

    test('getCount should return 0 if there are no events in the timeframe', async () => {
      const ec = EventCounter();

      expect(ec.getCount(5)).toEqual(0);
    }, 10000);
  });

  describe('Cleanup tests', () => {
    test('Should return -1 as the count is past time frame, i.e stale data cannot be accessed', async () => {
      // reduced the time frame to tirgger clean up faster
      const ec = EventCounter(1);

      await Promise.all(
        Array.from(Array(10)).map(async (_, index) => {
          await sleep(1000 * index);
          return Array.from(Array(10)).map(ec.emit);
        }),
      );

      // it would return 50 without the clean up
      expect(ec.getCount(5)).toEqual(-1);
    }, 10000);
  });
});
