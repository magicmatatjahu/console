import React from 'react';
import { TreeView, Popover, Button } from 'fundamental-react';

import FilterPopover from "../FilterPopover/FilterPopover.container";
import DeleteConfigurationModal from "../Modals/DeleteConfigurationModal/DeleteConfigurationModal.container";
import AddUrlModal from "../Modals/AddUrlModal/AddUrlModal.container";
import DeleteUrlModal from "../Modals/DeleteUrlModal/DeleteUrlModal.container";

import {
  Label,
  TreeViewColActions,
} from "./styled";

import { Configuration } from "../../types";

interface TableContentProps {
  headers: string[];
  configs: Configuration[];
}

const TableContent: React.FunctionComponent<TableContentProps> = ({
  headers,
  configs,
}) => {
  return (
    <TreeView>
      <TreeView.Head>
        {headers.map((header, idx) => (
          <TreeView.Col key={idx}>
            {header}
          </TreeView.Col>
        ))}
      </TreeView.Head>
      <TreeView.Tree>
        {configs && configs.map((config, idx) => (
            <TreeView.Item key={idx}>
              <TreeView.Row>
                <TreeView.Col>
                  {config.name}
                </TreeView.Col>
                <TreeView.Col>
                  {/* {config.labels.map(label => <Label key={label}>{label}</Label>)} */}
                </TreeView.Col>
                <TreeView.Col>
                  <TreeViewColActions>
                    <AddUrlModal configurationName={config.name} />
                    <DeleteConfigurationModal configurationName={config.name} />
                  </TreeViewColActions>
                </TreeView.Col>
              </TreeView.Row>
              <TreeView.Branch>
                <TreeView.Item>
                  {config.urls.map(url => (
                    <TreeView.Row key={url}>
                      <TreeView.Col className="add-ons-url">
                        <a href={url} target="_blank">{url}</a>
                        <DeleteUrlModal configurationName={config.name} url={url} />
                      </TreeView.Col>
                    </TreeView.Row>
                  ))}
                </TreeView.Item>
              </TreeView.Branch>
            </TreeView.Item>
          ))}
      </TreeView.Tree>
    </TreeView>
  );
}

export default TableContent;
