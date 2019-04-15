import { useContext } from "react";
import createContainer from "constate";

import ConfigurationsService from "./Configurations.service";

const useUrls = () => {
  const { originalConfigs } = useContext(ConfigurationsService.Context);
}

export default createContainer(useUrls);
