/* @flow */

// require('babel-register')({
//   extensions: ['.jsx', '.js'],
// });

import gulp from 'gulp';
/* eslint-enable import/extensions */
import gulpLoadPlugins from 'gulp-load-plugins';

var plugins = gulpLoadPlugins();

const TASKS = [
  'generate:icons:jsx',
  'generate:icons:index',
  'generate:icons',
];

function getTask(taskName: string, done: Function): any {
  let filename = taskName.split(':')[0];
  // $FlowFixMe
  let tasksFunc = require(`./src/tasks/${filename}`).default;
  let tasks     = tasksFunc(gulp, plugins, __dirname, (): void => {});
  let func      = tasks[taskName];

  let result = func(done);

  if (typeof result === 'function') {
    result = result(done);
  }

  return result;
}

for (let taskName of TASKS) {
  /* eslint-disable no-loop-func */
  gulp.task(taskName, (done: Function): any => {
    return getTask(taskName, done);
  });
  /* eslint-enable no-loop-func */
}
