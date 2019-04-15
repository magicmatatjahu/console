import React, { useContext } from 'react';

import MutationsService from "../../../services/Mutations.service";
import DeleteConfigurationModal from "./DeleteUrlModal.component";

interface Props {
  configurationName: string;
  url: string;
}

export const DeleteUrlModalContainer: React.FunctionComponent<Props> = ({
  configurationName,
  url,
}) => {
  const { removeAddonsConfigurationUrls } = useContext(MutationsService.Context);

  const handleDelete = () => {
    removeAddonsConfigurationUrls({ variables: { 
      name: configurationName,
      urls: [url],
    } })
  }

  return (
    <DeleteConfigurationModal 
      configurationName={configurationName}
      url={url}
      handleDelete={handleDelete}
    />
  )
}

export default DeleteUrlModalContainer;
