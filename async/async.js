const wait = (ms = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const makeTimer = (name) => {
  const start = Date.now();
  const report = (id) => {
    console.log(`${name}: ${id} @ ${Date.now() - start}ms elapsed`);
  };
  const willReport = (id) => () => report(id);
  return { report, willReport };
};

const serialAwait = async (timer = makeTimer('serial')) => {
  const { report, willReport } = timer;
  const a = await wait(300)
    .then(report('1st returned'))
    .then(willReport('1st resolved'));
  const b = await wait(300)
    .then(report('2nd returned'))
    .then(willReport('2nd resolved'));
  const c = await wait(300)
    .then(report('3rd returned'))
    .then(willReport('3rd resolved'));
};

const allSettled = async (timer = makeTimer('parallel')) => {
  const { report, willReport } = timer;
  const a = wait(300)
    .then(report('1st returned'))
    .then(willReport('1st resolved'));
  const b = wait(300)
    .then(report('2nd returned'))
    .then(willReport('2nd resolved'));
  const c = wait(300)
    .then(report('3rd returned'))
    .then(willReport('3rd resolved'));
  await Promise.allSettled([a, b, c])
    .then(report('allSettled returned'))
    .then(willReport('allSettled resolved'));
};

const app = async () => {
  const timer = makeTimer('all');
  const { report, willReport } = timer;
  const sr = serialAwait();
  const st = allSettled();
  await Promise.allSettled([sr, st])
    .then(report('outer promise returned'))
    .then(willReport('outer promise resolved'));
  report('\nfull run done');
};

app();
