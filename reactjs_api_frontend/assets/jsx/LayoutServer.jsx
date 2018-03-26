/* @flow */

/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-sort-props */

import React          from 'react';
import ReactDOMServer from 'react-dom/server';
import {Layout}       from 'react/lib/components/Layout';

export class LayoutServer extends React.Component {
  props: {
    assetsPath        : string,
    baseSelfHostname  : string,
    baseSelfScheme    : string,
    faviconsPath      : string,
    forceLocale      ?: ?string,
    locales           : Array<string>,
    manifest         ?: ?Object,
    title             : string,
  };

  static propTypes = {
    assetsPath       : React.PropTypes.string,
    baseSelfHostname : React.PropTypes.string.isRequired,
    baseSelfScheme   : React.PropTypes.string.isRequired,
    faviconsPath     : React.PropTypes.string,
    forceLocale      : React.PropTypes.string,
    // locales          : React.PropTypes.array.isRequired,
    manifest         : React.PropTypes.object,
    title            : React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    assetsPath   : '/assets',
    faviconsPath : '',
  };

  render(): any {
    let {
      assetsPath,
      baseSelfHostname,
      baseSelfScheme,
      faviconsPath,
      forceLocale,
      // locales,
      manifest,
      title,
    } = this.props;

    let body = [];

    let children = [
      <script id="preloadedData" key="preloadedData" type="application/json" />,
    ];

    if (forceLocale != null) {
      children.push(
        <script id="forceLocale" key="forceLocale" type="text/plain">{forceLocale}</script>
      );
    }

    if (manifest != null) {
      children.push(<link href={`${assetsPath}/${manifest['vendor.css']}`} key="vendor.css" rel="stylesheet" />);
      children.push(<link href={`${assetsPath}/${manifest['bundle.css']}`} key="bundle.css" rel="stylesheet" />);
      children.push(
        <script key="vendor.js" src={`${assetsPath}/${manifest['vendor.js']}`} type="text/javascript" />
      );
      children.push(
        <script key="bundle.js" src={`${assetsPath}/${manifest['bundle.js']}`} type="text/javascript" />
      );
    } else {
      children.push(
        <script key="vendor-dll.js" src={`/vendor-dll.js`} type="text/javascript" />
      );
      children.push(
        <script key="bundle.js" src="/bundle.js" type="text/javascript" />
      );
    }

    let alternates = [];

    // alternates = locales.map((locale: string): any => {
    //   return (
    //     <link
    //       key={`alternate-${locale}`}
    //       rel="alternate"
    //       hrefLang={locale}
    //       href={`${baseSelfScheme}${locale}.${baseSelfHostname}`}
    //     />
    //   );
    // });

    alternates.push(
      <link
        key="alternate-x-default"
        rel="alternate"
        hrefLang="x-default"
        href={`${baseSelfScheme}${baseSelfHostname}`}
      />
    );

    return (
      <Layout
        title={title}
        body={body}
        lang={forceLocale}
      >
        {alternates}
        {children}

        <meta httpEquiv="Content-Security-Policy" content="script-src 'unsafe-eval' checkout.stripe.com www.google-analytics.com data:;" />

        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Resume" />

        <link rel="shortcut icon" href={`${faviconsPath}/favicon.ico`} />
        <link rel="icon" type="image/x-icon" href={`${faviconsPath}/favicon.ico`} />
        <link rel="icon" type="image/png" href={`${faviconsPath}/favicon.png`} />

        <link rel="shortcut icon" sizes="16x16" href={`${faviconsPath}/favicon-16x16.png`} />
        <link rel="shortcut icon" sizes="32x32" href={`${faviconsPath}/favicon-32x32.png`} />
        {/*
        <link rel="shortcut icon" sizes="96x96" href={`${faviconsPath}/favicon-96x96.png`} />
        <link rel="shortcut icon" sizes="230x230" href={`${faviconsPath}/favicon-230x230.png`} />

        <link rel="shortcut icon" sizes="36x36" href={`${faviconsPath}/android-chrome-36x36.png`} />
        <link rel="shortcut icon" sizes="144x144" href={`${faviconsPath}/android-chrome-144x144.png`} />
        <link rel="shortcut icon" sizes="192x192" href={`${faviconsPath}/android-chrome-192x192.png`} />
        <link rel="shortcut icon" sizes="256x256" href={`${faviconsPath}/android-chrome-256x256.png`} />
        <link rel="shortcut icon" sizes="384x384" href={`${faviconsPath}/android-chrome-384x384.png`} />
        <link rel="shortcut icon" sizes="48x48" href={`${faviconsPath}/android-chrome-48x48.png`} />
        <link rel="shortcut icon" sizes="512x512" href={`${faviconsPath}/android-chrome-512x512.png`} />
        <link rel="shortcut icon" sizes="72x72" href={`${faviconsPath}/android-chrome-72x72.png`} />
        <link rel="shortcut icon" sizes="96x96" href={`${faviconsPath}/android-chrome-96x96.png`} />

        <meta name="msapplication-TileColor" content="#364f6c" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />

        <link rel="apple-touch-startup-image" href={`${faviconsPath}/apple-touch-startup-image-320x460.png`} />

        <link
          rel="apple-touch-startup-image"
          media="(device-width: 320px)"
          href={`${faviconsPath}/apple-touch-startup-image-320x460.png`}
        />

        <link
          rel="apple-touch-startup-image"
          media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)"
          href={`${faviconsPath}/apple-touch-startup-image-640x920.png`}
        />

        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px) and (orientation: portrait)"
          href={`${faviconsPath}/apple-touch-startup-image-768x1004.png`}
        />

        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px) and (orientation: landscape)"
          href={`${faviconsPath}/apple-touch-startup-image-748x1024.png`}
        />

        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px)
           and (orientation: portrait)
           and (-webkit-device-pixel-ratio: 2)"
          href={`${faviconsPath}/apple-touch-startup-image-1536x2008.png`}
        />

        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px)
           and (orientation: landscape)
           and (-webkit-device-pixel-ratio: 2)"
          href={`${faviconsPath}/apple-touch-startup-image-1496x2048.png`}
        />

        <link href={`${faviconsPath}/apple-touch-icon.png`} rel="apple-touch-icon" />
        <link href={`${faviconsPath}/apple-touch-icon-180x180.png`} rel="apple-touch-icon" sizes="180x180" />
        <link href={`${faviconsPath}/apple-touch-icon-167x167.png`} rel="apple-touch-icon" sizes="167x167" />
        <link href={`${faviconsPath}/apple-touch-icon-152x152.png`} rel="apple-touch-icon" sizes="152x152" />
        <link href={`${faviconsPath}/apple-touch-icon-144x144.png`} rel="apple-touch-icon" sizes="144x144" />
        <link href={`${faviconsPath}/apple-touch-icon-120x120.png`} rel="apple-touch-icon" sizes="120x120" />
        <link href={`${faviconsPath}/apple-touch-icon-114x114.png`} rel="apple-touch-icon" sizes="114x114" />
        */}

        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
      </Layout>
    );
  }
}

/* istanbul ignore next */
export function renderLayoutToStaticMarkup(props: Object): string {
  /* istanbul ignore next */
  return ReactDOMServer.renderToStaticMarkup(
    <LayoutServer {...props} />
  );
}

/* eslint-enable react/no-danger */
/* eslint-enable react/jsx-sort-props */
