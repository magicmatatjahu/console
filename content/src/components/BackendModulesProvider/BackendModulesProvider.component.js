import React from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import { CONTENT } from '../../commons/graphql-errors';

import App from '../App/App.component';

const BackendModulesProvider = ({ backendModules }) => {
    function goToCoreRoute() {
       LuigiClient.linkManager()
        .navigate('/home/workspace');
    };

    if (backendModules && backendModules.loading) return null;

    const modules = backendModules.backendModules;
    if (!modules.filter(mod => mod.name === CONTENT).length) {
        goToCoreRoute()
    }

    return <App />
}

export default BackendModulesProvider;
