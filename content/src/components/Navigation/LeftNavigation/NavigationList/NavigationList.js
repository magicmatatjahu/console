import React, { Component } from "react";

import ScrollSpy from "../../ScrollSpy/ScrollSpy.container";
import NavigationGroup from "./NavigationGroup";
import { Wrapper } from "./styled";

import { SCROLL_SPY_ROOT_ELEMENT } from '../../../../commons/variables';
import { tokenize } from '../../../../commons/helpers';

class Navigation extends Component {
  state = {
    activeNodes: null,
  };

  render() {
    const isLinkActive = (() => {
      return ({ id, type }) => {
        const content = this.props.activeContent;
        return (
          tokenize(id) === tokenize(content.id) &&
          tokenize(type) === tokenize(content.type)
        );
      };
    })();

    const {
      items,
      topics,
      activeNav,
      activeContent,
      chooseActive,
      setActiveNav,
      history,
    } = this.props;
    const { activeNodes } = this.state;

    return (
      <ScrollSpy
        rootElement={`#${SCROLL_SPY_ROOT_ELEMENT}`}
        nodeTypes={["groupOfDocuments", "document", "header"]}
        offset={{
          groupOfDocuments: 10,
          document: 10,
          header: 5,
        }}
        onUpdate={activeNodes => this.setState({ activeNodes })}
        activeContent={activeContent}
      >
        <Wrapper>
          <NavigationGroup
            data-e2e-id="navigation-root"
            title="Root"
            icon={"world"}
            items={[items.root]}
            topics={topics}
            groupType="root"
            isLinkActive={isLinkActive}
            activeContent={activeContent}
            activeNav={activeNav}
            activeNodes={activeNodes}
            setActiveNav={setActiveNav}
            chooseActive={chooseActive}
            history={history}
          />
          <NavigationGroup
            data-e2e-id="navigation-components"
            title="Components"
            icon={"Chart-Tree-Map"}
            items={items.components}
            topics={topics}
            groupType="components"
            isLinkActive={isLinkActive}
            activeContent={activeContent}
            activeNav={activeNav}
            activeNodes={activeNodes}
            setActiveNav={setActiveNav}
            chooseActive={chooseActive}
            history={history}
          />
        </Wrapper>
      </ScrollSpy>
    );
  }
}

export default Navigation;
