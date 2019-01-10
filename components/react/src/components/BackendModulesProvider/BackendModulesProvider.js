import React from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import { SERVICE_CATALOG, SERVICE_CATALOG_ADDONS, CONTENT } from './modules';

const BackendModulesProvider = ({ children, backendModules, luigiClient, loadingComponent }) => {
    function goToCoreRoute() {
      luigiClient.linkManager()
        .fromContext('environment')
        .navigate('/');
    };

    function isModuleDisabled(modules, name) {
        return modules ? !Boolean(modules.filter(mod => mod.name === name).length) : false; 
    }

    if (backendModules && backendModules.loading) return loadingComponent;

    const modules = backendModules.backendModules;
    if (!modules.filter(mod => mod.name === SERVICE_CATALOG).length) {
        goToCoreRoute()
    }

    const modulesDisabled = {
        [`${SERVICE_CATALOG}`]: isModuleDisabled(modules, SERVICE_CATALOG),
        [`${SERVICE_CATALOG_ADDONS}`]: isModuleDisabled(modules, SERVICE_CATALOG_ADDONS),
        [`${CONTENT}`]: isModuleDisabled(modules, CONTENT),
    }

    return children(modulesDisabled)
}

export default BackendModulesProvider;
