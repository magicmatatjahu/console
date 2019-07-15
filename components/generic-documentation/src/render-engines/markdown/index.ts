import { RenderEngineWithOptions } from '@kyma-project/documentation-component';
import {
  markdownRenderEngine,
  MarkdownRenderEngineOptions,
  plugins,
} from '@kyma-project/dc-markdown-render-engine';

import { Link } from './custom-renderers';
import { CopyButton } from './components';
import { highlightTheme } from './highlightTheme';
import { headingPrefix } from './helpers';
import { disableInternalLinksParserPlugin } from '../../plugins';

export const markdownRE: RenderEngineWithOptions<
  MarkdownRenderEngineOptions
> = {
  renderEngine: markdownRenderEngine,
  options: {
    customRenderers: {
      link: Link,
    },
    parsers: [plugins.tabsParserPlugin, disableInternalLinksParserPlugin],
    headingPrefix,
    highlightTheme,
    copyButton: CopyButton,
  },
};
