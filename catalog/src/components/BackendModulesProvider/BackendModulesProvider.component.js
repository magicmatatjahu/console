import React from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import { SERVICE_CATALOG, CONTENT } from '../../commons/graphql-errors';

import App from '../App/App.container';

const BackendModulesProvider = ({ backendModules }) => {
    function goToCoreRoute() {
       LuigiClient.linkManager()
        .fromContext('environment')
        .navigate('/');
    };

    function isModuleDisabled(modules, name) {
        return modules ? !Boolean(modules.filter(mod => mod.name === name).length) : false; 
    }

    if (backendModules && backendModules.loading) return null;

    const modules = backendModules.backendModules;
    if (!modules.filter(mod => mod.name === SERVICE_CATALOG).length) {
        goToCoreRoute()
    }

    const modulesDisabled = {
        [`${CONTENT}`]: isModuleDisabled(modules, CONTENT),
    }

    return <App modulesDisabled={modulesDisabled} />
}

export default BackendModulesProvider;