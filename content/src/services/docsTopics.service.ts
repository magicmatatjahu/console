import { useState, useEffect, useContext } from 'react';
import createContainer from 'constate';

import { QueriesService } from './queries.service';
import { NavigationService } from './navigation.service';
import { ClusterDocsTopic } from './types';

const useDocsTopics = () => {
  const { docsTopics } = useContext(QueriesService);
  const { activeNavNode } = useContext(NavigationService);
  const [
    activeDocsTopic,
    setActiveDocsTopic,
  ] = useState<ClusterDocsTopic | null>(null);

  const fn = () => {
    if (!activeNavNode) {
      return;
    }

    const { group, topic } = activeNavNode;
    const newDocsTopic =
      docsTopics &&
      docsTopics[group] &&
      docsTopics[group].find(dt => dt.name === topic);

    if (
      activeDocsTopic &&
      newDocsTopic &&
      activeDocsTopic.name === newDocsTopic.name
    ) {
      return;
    }
    newDocsTopic && setActiveDocsTopic(newDocsTopic);
  };

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    fn();
  }, [activeNavNode, docsTopics]);

  return {
    activeDocsTopic,
  };
};

const { Provider, Context } = createContainer(useDocsTopics, context => [
  context.activeDocsTopic,
]);
export { Provider as DocsTopicsProvider, Context as DocsTopicsService };
