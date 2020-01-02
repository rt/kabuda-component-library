import path from 'path';
import chokidar from 'chokidar';
import { run, fs, formatter } from 'kabuda-nodejs-tools';
import pkg from '../package.json';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  await fs.makeDir('build');
  await Promise.all([
    fs.writeFile(
      'build/package.json',
      JSON.stringify(
        {
          private: true,
          engines: pkg.engines,
          dependencies: pkg.dependencies,
          scripts: {
            start: 'node server.js',
          },
        },
        null,
        2,
      ),
    ),
    // fs.copyFile('LICENSE.txt', 'build/LICENSE.txt'),
    fs.copyFile('package-lock.json', 'build/package-lock.json'),
    fs.copyDir('public', 'build/public'),
  ]);

  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch(['public/**/*'], { ignoreInitial: true });

    watcher.on('all', async (event, filePath) => {
      const start = new Date();
      const src = path.relative('./', filePath);
      const dist = path.join(
        'build/',
        src.startsWith('src') ? path.relative('src', src) : src,
      );
      switch (event) {
        case 'add':
        case 'change':
          await fs.makeDir(path.dirname(dist));
          await fs.copyFile(filePath, dist);
          break;
        case 'unlink':
        case 'unlinkDir':
          fs.cleanDir(dist, { nosort: true, dot: true });
          break;
        default:
          return;
      }
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.info(`[${formatter.formatTime(end)}] ${event} '${dist}' after ${time} ms`);
    });
  }
}

run(copy);
