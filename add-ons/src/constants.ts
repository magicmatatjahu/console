export const DEFAULT_CONFIGURATION = "helm-repos-urls";
export const CONFIGURATION_NAME_PREFIX = "addons-configuration";
export const KYMA_SYSTEM_ENV = "kyma-system";
export const NOTIFICATION_SHOW_TIME = 5000;
export const BACKEND_MODULE_SERVICE_CATALOG = "servicecatalogaddons";
export const BACKEND_MODULE_SERVICE_CATALOG_DISPLAY_NAME = "Service Catalog Addons";
export const CONFIGURATION_VARIABLE = "{CONFIGURATION}";

export const NOTIFICATION = {
  ADD_CONFIGURATION: {
    TITLE: "Configuration added",
    CONTENT: `Configuration ${CONFIGURATION_VARIABLE} has been successfully added`,
  },
  UPDATE_CONFIGURATION: {
    TITLE: "Configuration updated",
    CONTENT: `Configuration ${CONFIGURATION_VARIABLE} has been successfully updated`,
  },
  DELETE_CONFIGURATION: {
    TITLE: "Configuration removed",
    CONTENT: `Configuration ${CONFIGURATION_VARIABLE} has been successfully removed`,
  },
};

export const HELP = {
  URL_FIELD: "",
  NAME_FIELD: "",
  LABELS_FIELD: "",
};

export const PLACEHOLDERS = {
  URL_FIELD: "Insert repository URL.",
  NAME_FIELD: "Insert name.",
  LABELS_FIELD: "Insert labels (optionally).",
};

export const ERRORS = {
  NAME: {
    ALREADY_EXISTS: "Name already exists",
    REGEX: "A name value must consists of alphanumeric characters, '-', '_' or '.', and must starts and ends with an alphanumeric character and contains maximum 63 chars.",
    SHORT: "Name must contains more than 3 chars.",
    LONG_NAME: "Name must contains less than 64 chars.",
  },
  URL: {
    ALREADY_EXISTS: "Url already exists in config.",
    STARTS_WITH_HTTP: "Url must starts with http(s) protocol.",
    YAML_EXTENSION: "Url must have .yaml or .yml extension.",
  }
};

export const TOOLTIP_DATA = {
  type: 'error',
  content: 'Fill out all mandatory fields',
};

