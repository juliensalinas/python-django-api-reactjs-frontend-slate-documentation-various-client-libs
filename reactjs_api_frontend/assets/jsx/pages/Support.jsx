/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {
  Paragraph,
  Title,
  Link,
} from 'react';

import genericStyles from './Generic.css';

/**
 * Support page
 *
 */
export class Support extends React.Component {
  render(): React.Element<*> {
    let apiDocsUrlContent = {
      id: 'support.apiDocsUrl',
    };

    let apiDocsUrl = (
      <Link content={apiDocsUrlContent} href="/" />
    );

    let apiDocsParagraphContent = {
      id     : 'support.apiDocs.content',
      values : {
        apiDocsUrl,
      },
    };

    return (
      <div>
        <Title
          className={genericStyles.pageTitle}
          content={{id: 'support.title'}}
        />

        <div>
          <div>
            <Title
              className={genericStyles.subTitle}
              content={{id: 'support.questions.title'}}
            />
            <Paragraph content={{id: 'support.questions.content'}} />
          </div>

          <div>
            <Title
              className={genericStyles.subTitle}
              content={{id: 'support.apiDocs.title'}}
            />
            <Paragraph content={apiDocsParagraphContent} />
          </div>

          {/*
          <div>
            <Title
              className={genericStyles.subTitle}
              content={{id: 'support.chatToUs.title'}}
            />
            <Paragraph content={{id: 'support.chatToUs.content'}} />
          </div>

          <div>
            <Title
              className={genericStyles.subTitle}
              content={{id: 'support.emailUs.title'}}
            />
            <Paragraph content={{id: 'support.emailUs.content'}} />
          </div>
          */}
        </div>
      </div>
    );
  }
}
