/* @flow */

import type {gulp} from 'gulp';
/**
 * This gulp task converts SVG files from `assets/svg/` to
 * `assets/jsx/components/icons` in JSX format.
 *
 * Use `gulp generate` command to use it
 * @param  {gulp} gulp - gulp instance
 * @return {Object}
 */
export default function(gulp: gulp): Object {
  return {
    'generate:icons:jsx': (): void => {
      return gulp.src('./assets/svg/**/*.svg')
      .pipe(toJsx())
      .pipe(gulp.dest('assets/jsx/components/icons'));
    },

    'generate:icons:index': (): void => {
      return gulp.src('./assets/svg/**/*.svg')
      .pipe(toIndex())
      .pipe(gulp.dest('assets/jsx/components/icons'));
    },

    'generate:icons': (): void => {
      return gulp.series(
        'generate:icons:jsx',
        'generate:icons:index',
      );
    },
  };
}
