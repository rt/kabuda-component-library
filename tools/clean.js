import { run, fs } from 'kabuda-nodejs-tools';

/**
 * Cleans up the output (build) directory.
 */
function clean() {
  return Promise.all([
    fs.cleanDir('build/*', {
      nosort: true,
      dot: true,
      ignore: ['build/.git'],
    }),
  ]);
}

run(clean);
