import React from 'react';
import { SERVICE_CATALOG, SERVICE_CATALOG_ADDONS, CONTENT } from './modules';

const BackendModulesProvider = ({ children, backendModules }) => {
    function isModuleDisabled(modules, name) {
        return modules ? !modules.some(m => m.name === name) : false; 
    }

    if (backendModules && backendModules.loading) return null;
    if (typeof children !== "function") return null;

    const modules = backendModules.backendModules;
    const modulesDisabled = {
        [`${SERVICE_CATALOG}`]: isModuleDisabled(modules, SERVICE_CATALOG),
        [`${SERVICE_CATALOG_ADDONS}`]: isModuleDisabled(modules, SERVICE_CATALOG_ADDONS),
        [`${CONTENT}`]: isModuleDisabled(modules, CONTENT),
    }

    return children(modulesDisabled);
}

export default BackendModulesProvider;
