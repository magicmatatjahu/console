const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const childProcess = require('child_process');
const log = require('fancy-log');
const clc = require('cli-color');
const { promisify } = require('util');

const execFile = promisify(childProcess.execFile);

process.on('unhandledRejection', err => {
  throw err;
});
const distId = process.argv.indexOf('--dist');
const dist = distId < 0 ? '' : process.argv[distId + 1];

const common = 'common';
const genericDocumentation = 'generic-documentation';
const reactComponents = 'components';

const libraries = {
  [common]: ts.createProject(`./${common}/tsconfig.json`),
  [`components/${reactComponents}`]: ts.createProject(
    `./components/${reactComponents}/tsconfig.json`,
  ),
  [`components/${genericDocumentation}`]: ts.createProject(
    `./components/${genericDocumentation}/tsconfig.json`,
  ),
};
const libModules = Object.keys(libraries);

libModules.forEach(lib => {
  gulp.task(`${lib}:install`, async () => {
    const packageName = path.resolve(__dirname, `./${lib}`);
    await install(packageName);
  });
});
gulp.task(
  'install:libraries',
  gulp.parallel(libModules.map(lib => `${lib}:install`)),
);

libModules.forEach(lib => {
  gulp.task(lib, () => {
    return libraries[lib]
      .src()
      .pipe(libraries[lib]())
      .pipe(gulp.dest(`./${lib}/dist`));
  });
});
gulp.task('build:libraries', gulp.series(libModules));

gulp.task('watch:libraries', () => {
  libModules.forEach(lib => {
    gulp.watch(
      [
        `./${lib}/src/**/*.ts`,
        `./${lib}/src/*.ts`,
        `./${lib}/src/**/*.tsx`,
        `./${lib}/src/*.tsx`,
      ],
      gulp.parallel(lib),
    );
  });
});

const install = async dir => {
  log.info(
    `Installing dependencies of ${clc.magenta(dir.replace(__dirname, ''))}`,
  );

  try {
    await execFile(`npm`, ['install'], {
      cwd: dir,
    });
  } catch (err) {
    log.error(`Failed installing dependencies of ${dir}`);
    throw err;
  }
};
