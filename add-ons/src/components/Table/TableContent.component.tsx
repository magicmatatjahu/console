import React from 'react';
import { TreeView, Popover, Button } from 'fundamental-react';

import FilterPopover from "../FilterPopover/FilterPopover.container";

import {
  Label,
  TreeViewColActions,
} from "./styled";

import { Configuration } from "../../types";

interface TableContentProps {
  headers: string[];
  configurations: Configuration[];
}

const TableContent: React.FunctionComponent<TableContentProps> = ({
  headers,
  configurations,
}) => {
  return (
    <TreeView>
      <TreeView.Head>
        {headers.map(header => (
          <TreeView.Col key={header}>
            {header}
          </TreeView.Col>
        ))}
      </TreeView.Head>
      <TreeView.Tree>
        {configurations.map((config, idx) => {
          return (
            <TreeView.Item key={idx}>
              <TreeView.Row>
                <TreeView.Col>
                  {config.name}
                </TreeView.Col>
                <TreeView.Col>
                  {config.labels.map(label => <Label key={label}>{label}</Label>)}
                </TreeView.Col>
                <TreeView.Col>
                  <TreeViewColActions>
                    <Button glyph="add" option="light" compact>
                      Add URL
                    </Button>
                    <Popover
                      body={<div></div>}
                      control={<Button glyph="overflow" option="light"/>}
                      placement="bottom"
                    />
                  </TreeViewColActions>
                </TreeView.Col>
              </TreeView.Row>
              <TreeView.Branch>
                <TreeView.Item>
                  <TreeView.Row>
                    {config.urls.map(url => (
                      <TreeView.Col key={url}>
                        <a href={url} target="_blank">{url}</a>
                      </TreeView.Col>
                    ))}
                  </TreeView.Row>
                </TreeView.Item>
              </TreeView.Branch>
            </TreeView.Item>
          )
        })}
      </TreeView.Tree>
    </TreeView>
  );
}

export default TableContent;
