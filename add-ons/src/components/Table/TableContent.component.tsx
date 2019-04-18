import React from 'react';
import { TreeView, Popover, Button } from 'fundamental-react';

import DeleteConfigurationModal from "../Modals/DeleteConfigurationModal/DeleteConfigurationModal.container";
import AddUrlModal from "../Modals/AddUrlModal/AddUrlModal.container";
import DeleteUrlModal from "../Modals/DeleteUrlModal/DeleteUrlModal.container";

import {
  Label,
  Labels,
  TreeViewColActions,
} from "./styled";

import { Configuration } from "../../types";

interface TableContentProps {
  headers: string[];
  configs: Configuration[];
  setFilterLabel: (key: string, value: string) => void;
}

const TableContent: React.FunctionComponent<TableContentProps> = ({
  headers,
  configs,
  setFilterLabel,
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
                  <div>{config.name}</div>
                </TreeView.Col>
                <TreeView.Col>
                  <Labels>
                    {Object.keys(config.labels).map(key => (
                      <Label 
                        key={key}
                        onClick={() => setFilterLabel(key, config.labels[key])}
                      >
                        {`${key}=${config.labels[key]}`}
                      </Label>
                    ))}
                  </Labels>
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
