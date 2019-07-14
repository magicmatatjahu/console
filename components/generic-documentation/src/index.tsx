import React, { useState, useEffect } from 'react';
import {
  DC,
  Sources,
  Source,
  Plugins,
  RenderEngines,
  Renderers,
} from '@kyma-project/documentation-component';
import { plugins as markdownPlugins } from '@kyma-project/dc-markdown-render-engine';

import { markdownRE, openApiRE, asyncApiRE } from './render-engines';
import { ContentUILayout, CatalogUILayout, InstancesUILayout } from './layouts';
import { MarkdownSingleRenderer } from './renderers';
import { replaceImagePathsMutationPlugin } from './plugins';
import { loader, ClusterDocsTopic, DocsTopic } from './loader';
import {
  headingPrefix,
  customNodes,
  disableClickEventFromSwagger,
} from './helpers';

const PLUGINS: Plugins = [
  markdownPlugins.frontmatterMutationPlugin,
  markdownPlugins.replaceAllLessThanCharsMutationPlugin,
  {
    plugin: markdownPlugins.headersExtractorPlugin,
    options: {
      headerPrefix: headingPrefix,
      customNodes,
    },
  },
  markdownPlugins.tabsMutationPlugin,
  replaceImagePathsMutationPlugin,
];

const RENDER_ENGINES: RenderEngines = [markdownRE, openApiRE, asyncApiRE];

const RENDERERS: Renderers = {
  single: [MarkdownSingleRenderer],
};

function renderContent(type: LayoutType, props?: any): React.ReactNode {
  switch (type) {
    case LayoutType.CONTENT_UI: {
      return <ContentUILayout renderers={RENDERERS} />;
    }
    case LayoutType.CATALOG_UI: {
      return <CatalogUILayout {...props} renderers={RENDERERS} />;
    }
    case LayoutType.INSTANCES_UI: {
      return <InstancesUILayout renderers={RENDERERS} />;
    }
    default:
      return null;
  }
}

export enum LayoutType {
  CONTENT_UI = 'content-ui',
  CATALOG_UI = 'catalog-ui',
  INSTANCES_UI = 'instances-ui',
}

export interface GenericComponentProps {
  docsTopic: ClusterDocsTopic | DocsTopic;
  layout?: LayoutType;
  additionalTabs?: Array<{
    label: string;
    content: React.ReactNode;
    additionalContent: React.ReactNode;
  }>;
}

export const GenericComponent: React.FunctionComponent<
  GenericComponentProps
> = ({ docsTopic, layout = LayoutType.CONTENT_UI, ...others }) => {
  if (!docsTopic) {
    return null;
  }

  useEffect(() => {
    disableClickEventFromSwagger();
  }, []);

  const [sources, setSources] = useState<Sources>([]);
  useEffect(() => {
    const fetchAssets = async () => {
      loader.setDocsTopic(docsTopic);
      await loader.fetchAssets();
      setSources(loader.getSources(layout !== LayoutType.CONTENT_UI));
    };
    fetchAssets();
  }, [, docsTopic]);

  if (!sources || !sources.length) {
    return null;
  }

  return (
    <DC.Provider
      sources={sources}
      plugins={PLUGINS}
      renderEngines={RENDER_ENGINES}
    >
      {renderContent(layout, others)}
    </DC.Provider>
  );
};
