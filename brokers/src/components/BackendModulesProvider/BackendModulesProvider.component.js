import React from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import { SERVICE_CATALOG } from '../../commons/graphql-errors';

import App from '../App/App.container';

const BackendModulesProvider = ({ backendModules }) => {
    function goToCoreRoute() {
       LuigiClient.linkManager()
        .fromContext('environment')
        .navigate('/');
    };

    if (backendModules && backendModules.loading) return null;

    const modules = backendModules.backendModules;
    if (!modules.filter(mod => mod.name === SERVICE_CATALOG).length) {
        goToCoreRoute()
    }

    return <App />
}

export default BackendModulesProvider;