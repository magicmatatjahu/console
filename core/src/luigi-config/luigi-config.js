import LuigiClient from '@kyma-project/luigi-client';

var clusterConfig = window['clusterConfig'];
var k8sDomain = (clusterConfig && clusterConfig['domain']) || 'kyma.local';
var k8sServerUrl = 'https://apiserver.' + k8sDomain;

var config = {
  serviceCatalogModuleUrl: 'https://catalog.' + k8sDomain,
  serviceInstancesModuleUrl: 'https://instances.' + k8sDomain,
  lambdasModuleUrl: 'https://lambdas-ui.' + k8sDomain,
  serviceBrokersModuleUrl: 'https://brokers.' + k8sDomain,
  docsModuleUrl: 'https://docs.' + k8sDomain,
  addOnsModuleUrl: 'https://add-ons.' + k8sDomain,
  logsModuleUrl: 'https://log-ui.' + k8sDomain,
  graphqlApiUrl: 'https://console-backend.' + k8sDomain + '/graphql'
};

if (clusterConfig) {
  for (var propertyName in config) {
    if (clusterConfig.hasOwnProperty(propertyName)) {
      config[propertyName] = clusterConfig[propertyName];
    }
  }
}

var token;
if (localStorage.getItem('luigi.auth')) {
  token = JSON.parse(localStorage.getItem('luigi.auth')).idToken;
}

function getNodes(context) {
  var namespace = context.namespaceId;
  var staticNodes = [
    {
      link: '/home/workspace',
      label: 'Back to Home',
      icon: 'nav-back'
    },
    {
      pathSegment: 'details',
      label: 'Overview',
      viewUrl: '/consoleapp.html#/home/namespaces/' + namespace + '/details',
      icon: 'product'
    },
    {
      category: { label: 'Service Catalog', icon: 'add-coursebook' },
      pathSegment: '_service_catalog_category_placeholder_',
      hideFromNav: true
    },
    {
      category: { label: 'Configuration', icon: 'key-user-settings' },
      pathSegment: '_configuration_category_placeholder_',
      hideFromNav: true
    },
    {
      category: 'Configuration',
      pathSegment: 'permissions',
      navigationContext: 'permissions',
      label: 'Permissions',
      viewUrl:
        '/consoleapp.html#/home/namespaces/' + namespace + '/permissions',
      keepSelectedForChildren: true,
      children: [
        {
          pathSegment: 'roles',
          children: [
            {
              pathSegment: ':name',
              viewUrl:
                '/consoleapp.html#/home/namespaces/' +
                namespace +
                '/permissions/roles/:name'
            }
          ]
        }
      ]
    },
    {
      category: 'Configuration',
      pathSegment: 'resources',
      navigationContext: 'resources',
      label: 'Resources',
      viewUrl: '/consoleapp.html#/home/namespaces/' + namespace + '/resources'
    },
    {
      category: 'Configuration',
      pathSegment: 'config-maps',
      navigationContext: 'config-maps',
      label: 'Config maps',
      viewUrl:
        '/consoleapp.html#/home/namespaces/' + namespace + '/configmaps'
    },
    {
      category: { label: 'Development', icon: 'source-code' },
      pathSegment: '_development_category_placeholder_',
      hideFromNav: true
    },
    {
      category: { label: 'Operation', icon: 'instance' },
      pathSegment: 'deployments',
      navigationContext: 'deployments',
      label: 'Deployments',
      viewUrl:
        '/consoleapp.html#/home/namespaces/' + namespace + '/deployments'
    },
    {
      category: 'Operation',
      pathSegment: 'replica-sets',
      navigationContext: 'replica-sets',
      label: 'Replica Sets',
      viewUrl:
        '/consoleapp.html#/home/namespaces/' + namespace + '/replicaSets'
    },
    {
      category: 'Operation',
      pathSegment: 'pods',
      navigationContext: 'pods',
      label: 'Pods',
      viewUrl: '/consoleapp.html#/home/namespaces/' + namespace + '/pods'
    },
    {
      category: 'Operation',
      pathSegment: 'services',
      navigationContext: 'services',
      label: 'Services',
      viewUrl: '/consoleapp.html#/home/namespaces/' + namespace + '/services',
      keepSelectedForChildren: true,
      children: [
        {
          pathSegment: 'details',
          children: [
            {
              pathSegment: ':name',
              viewUrl:
                '/consoleapp.html#/home/namespaces/' +
                namespace +
                '/services/:name',
              children: [
                {
                  pathSegment: 'apis',
                  children: [
                    {
                      pathSegment: 'create',
                      viewUrl:
                        '/consoleapp.html#/home/namespaces/' +
                        namespace +
                        '/services/:name/apis/create'
                    },
                    {
                      pathSegment: 'details',
                      children: [
                        {
                          pathSegment: ':apiName',
                          viewUrl:
                            '/consoleapp.html#/home/namespaces/' +
                            namespace +
                            '/services/:name/apis/details/:apiName'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      category: 'Operation',
      pathSegment: 'secrets',
      navigationContext: 'secrets',
      label: 'Secrets',
      viewUrl: '/consoleapp.html#/home/namespaces/' + namespace + '/secrets',
      keepSelectedForChildren: true,
      children: [
        {
          pathSegment: 'details',
          children: [
            {
              pathSegment: ':name',
              viewUrl:
                '/consoleapp.html#/home/namespaces/' +
                namespace +
                '/secrets/:name'
            }
          ]
        }
      ]
    }
  ];
  return Promise.all([
    getUiEntities('microfrontends', namespace),
    getUiEntities('clustermicrofrontends', namespace, [
      'namespace',
      'namespace'
    ])
  ]).then(function (values) {
    var nodeTree = [...staticNodes];
    values.forEach(function (val) {
      if (val === 'systemNamespace') {
        nodeTree.forEach(item => {
          if (item.context) {
            item.context['isSystemNamespace'] = true;
          } else {
            item['context'] = {
              isSystemNamespace: true
            };
          }
        });
      } else {
        nodeTree = [].concat.apply(nodeTree, val);
      }
    });
    return nodeTree;
  })
  .catch((err) => {
    const errParsed = JSON.parse(err);
    console.error('Error', errParsed);
    const settings = {
      text: `Namespace ${errParsed.details.name} not found.`,
      type: 'error'
     }
     LuigiClient
      .uxManager()
      .showAlert(settings)
  });
}

/**
 * We're using Promise based caching approach, since we often
 * execute getNamespace twice at the same time and we only
 * want to do one rest call.
 *
 * @param {string} namespaceName
 * @returns {Promise} nsPromise
 */
async function getNamespace(namespaceName) {
  const cacheName = '_console_namespace_promise_cache_';
  if (!window[cacheName]) {
    window[cacheName] = {};
  }
  const cache = window[cacheName];
  if (!cache[namespaceName]) {
    cache[namespaceName] = fetchFromKyma(
      `${k8sServerUrl}/api/v1/namespaces/${namespaceName}`
    );
  }
  return await cache[namespaceName];
}

/**
 * getUiEntities
 * @param {string} entityname microfrontends | clustermicrofrontends
 * @param {string} namespace k8s namespace name
 * @param {array} placements array of strings: namespace | namespace | cluster
 */
async function getUiEntities(entityname, namespace, placements) {
  if (namespace) {
    const currentNamespace = await getNamespace(namespace);
    if (
      !currentNamespace.metadata.labels ||
      currentNamespace.metadata.labels.env !== 'true'
    ) {
      return 'systemNamespace';
    }
  }
  var fetchUrl =
    k8sServerUrl +
    '/apis/ui.kyma-project.io/v1alpha1/' +
    (namespace ? 'namespaces/' + namespace + '/' : '') +
    entityname;
  const segmentPrefix = entityname === 'clustermicrofrontends' ? 'cmf-' : 'mf-';
  const cacheName = '_console_mf_cache_';
  if (!window[cacheName]) {
    window[cacheName] = {};
  }

  const cache = window[cacheName];
  const cacheKey = fetchUrl + (placements || '');
  const fromCache = cache[cacheKey];
  return (
    fromCache ||
    fetchFromKyma(fetchUrl)
      .then(result => {
        if (!result.items.length) {
          return [];
        }
        return result.items
          .filter(function (item) {
            // placement only exists in clustermicrofrontends
            return !placements || placements.includes(item.spec.placement);
          })
          .map(function (item) {
            function buildNode(node, spec) {
              var n = {
                label: node.label,
                pathSegment: node.navigationPath.split('/').pop(),
                viewUrl: spec.viewBaseUrl
                  ? spec.viewBaseUrl + node.viewUrl
                  : node.viewUrl,
                hideFromNav: node.showInNavigation === false || undefined,
                order: node.order,
                context: {
                  settings: node.settings
                    ? { ...node.settings, ...(node.context || {}) }
                    : {}
                }
              };

              n.context.requiredBackendModules =
                node.requiredBackendModules || undefined;

              if (node.externalLink) {
                delete n.viewUrl;
                delete n.pathSegment;
                n.externalLink = {
                  url: node.externalLink,
                  sameWindow: false
                };
              }

              processNodeForLocalDevelopment(n);
              return n;
            }

            function processNodeForLocalDevelopment(node) {
              const isLocalDev = window.location.href.startsWith(
                'http://console-dev.kyma.local:4200'
              );
              if (!isLocalDev || !node.viewUrl) {
                return;
              }
              if (node.viewUrl.startsWith('https://console.kyma.local')) {
                node.viewUrl =
                  'http://console-dev.kyma.local:4200' +
                  node.viewUrl.substring('https://console.kyma.local'.length);
              } else if (
                node.viewUrl.startsWith('https://catalog.kyma.local')
              ) {
                node.viewUrl =
                  config.serviceCatalogModuleUrl +
                  node.viewUrl.substring('https://catalog.kyma.local'.length);
              } else if (
                node.viewUrl.startsWith('https://instances.kyma.local')
              ) {
                node.viewUrl =
                  config.serviceInstancesModuleUrl +
                  node.viewUrl.substring('https://instances.kyma.local'.length);
              } else if (
                node.viewUrl.startsWith('https://brokers.kyma.local')
              ) {
                node.viewUrl =
                  config.serviceBrokersModuleUrl +
                  node.viewUrl.substring('https://brokers.kyma.local'.length);
              } else if (
                node.viewUrl.startsWith('https://lambdas-ui.kyma.local')
              ) {
                node.viewUrl =
                  config.lambdasModuleUrl +
                  node.viewUrl.substring(
                    'https://lambdas-ui.kyma.local'.length
                  );
              } else if (node.viewUrl.startsWith('https://log-ui.kyma.local')) {
                node.viewUrl =
                  config.logsModuleUrl +
                  node.viewUrl.substring('https://log-ui.kyma.local'.length);
              } else if(node.viewUrl.startsWith('https://add-ons.kyma.local')) {
                node.viewUrl =
                  config.addOnsModuleUrl +
                  node.viewUrl.substring('https://add-ons.kyma.local'.length);
              }
              return node;
            }

            function buildNodeWithChildren(specNode, spec) {
              var parentNodeSegments = specNode.navigationPath.split('/');
              var children = getDirectChildren(parentNodeSegments, spec);
              var node = buildNode(specNode, spec);
              if (children.length) {
                node.children = children;
              }
              return node;
            }

            function getDirectChildren(parentNodeSegments, spec) {
              // process only direct children
              return spec.navigationNodes
                .filter(function (node) {
                  var currentNodeSegments = node.navigationPath.split('/');
                  var isDirectChild =
                    parentNodeSegments.length ===
                    currentNodeSegments.length - 1 &&
                    parentNodeSegments.filter(function (segment) {
                      return currentNodeSegments.includes(segment);
                    }).length > 0;
                  return isDirectChild;
                })
                .map(function mapSecondLevelNodes(node) {
                  // map direct children
                  return buildNodeWithChildren(node, spec);
                });
            }

            function buildTree(name, spec) {
              return spec.navigationNodes
                .filter(function getTopLevelNodes(node) {
                  var segments = node.navigationPath.split('/');
                  return segments.length === 1;
                })
                .map(function processTopLevelNodes(node) {
                  return buildNodeWithChildren(node, spec, name);
                })
                .map(function addSettingsForTopLevelNodes(node) {
                  if (spec.category) {
                    node.category = spec.category;
                  }
                  if (!node.externalLink) {
                    if (!node.pathSegment.startsWith(segmentPrefix)) {
                      node.pathSegment = segmentPrefix + node.pathSegment;
                    }
                    node.navigationContext = spec.appName ? spec.appName : name;
                    node.viewGroup = node.navigationContext;
                    node.keepSelectedForChildren = true;
                  }

                  return node;
                });
            }
            if (item.spec.navigationNodes) {
              var tree = buildTree(item.metadata.name, item.spec);
              return tree;
            }
            return [];
          });
      })
      .catch(err => {
        console.error('Error fetching UiEntity ' + name, err);
        return [];
      })
      .then(result => {
        cache[cacheKey] = new Promise(function (resolve) {
          resolve(result);
        });
        return result;
      })
  );
}

function fetchFromKyma(url) {
  return new Promise(function (resolve, reject) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        resolve(JSON.parse(xmlHttp.response));
      } else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
        if (xmlHttp.status === 401) {
          relogin();
        }
        reject(xmlHttp.response);
      }
    };

    xmlHttp.open('GET', url, true);
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlHttp.send(null);
  });
}

function fetchFromGraphQL(query, variables, gracefully) {
  return new Promise(function (resolve, reject) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        try {
          const response = JSON.parse(xmlHttp.response);
          if (response && response.errors) {
            reject(response.errors[0].message);
          } else if (response && response.data) {
            return resolve(response.data);
          }
          resolve(response);
        } catch {
          reject(xmlHttp.response);
        }
      } else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
        // TODO: investigate it, falls into infinite loop
        // if (xmlHttp.status === 401) {
        // relogin();
        // }
        if (!gracefully) {
          reject(xmlHttp.response);
        } else {
          resolve(null);
        }
      }
    };

    xmlHttp.open('POST', config.graphqlApiUrl, true);
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify({ query, variables }));
  });
}

function postToKyma(url, body) {
  return new Promise(function (resolve, reject) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (
        xmlHttp.readyState == 4 &&
        (xmlHttp.status == 200 || xmlHttp.status == 201)
      ) {
        try {
          const response = JSON.parse(xmlHttp.response);
          resolve(response);
        } catch {
          reject(xmlHttp.response);
        }
      } else if (
        xmlHttp.readyState == 4 &&
        xmlHttp.status != 200 &&
        xmlHttp.status != 201
      ) {
        // TODO: investigate it, falls into infinite loop
        // if (xmlHttp.status === 401) {
        // relogin();
        // }
        // console.log(xmlHttp);
        reject(xmlHttp.response);
      }
    };

    xmlHttp.open('POST', url, true);
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(body));
  });
}

function getSelfSubjectRulesReview() {
  const url =
    k8sServerUrl + '/apis/authorization.k8s.io/v1/selfsubjectrulesreviews ';
  const body = {
    kind: 'SelfSubjectRulesReview',
    apiVersion: 'authorization.k8s.io/v1',
    spec: {
      namespace: '*'
    }
  };
  return new Promise(function (resolve, reject) {
    postToKyma(url, body).then(
      res => {
        let resourceRules = [];
        if (res.status) {
          resourceRules = res.status.resourceRules;
        }
        resolve(resourceRules);
      },
      err => {
        reject(err);
      }
    );
  });
}

function checkRules(nodeToCheckPermissionsFor) {
  let hasPermissions = false;
  if (nodeToCheckPermissionsFor.adminOnly) {
    if (selfSubjectRulesReview.length > 0) {
      selfSubjectRulesReview.forEach(rule => {
        if (
          rule.verbs.includes('*') &&
          (rule.apiGroups.includes('') || rule.apiGroups.includes('*')) &&
          rule.resources.includes('*')
        ) {
          hasPermissions = true;
        }
      });
    }
  } else {
    hasPermissions = true;
  }
  return hasPermissions;
}

function checkRequiredBackendModules(nodeToCheckPermissionsFor) {
  let hasPermissions = true;
  if (
    nodeToCheckPermissionsFor.context &&
    nodeToCheckPermissionsFor.context.requiredBackendModules &&
    nodeToCheckPermissionsFor.context.requiredBackendModules.length > 0
  ) {
    if (backendModules && backendModules.length > 0) {
      nodeToCheckPermissionsFor.context.requiredBackendModules.forEach(
        module => {
          if (hasPermissions && backendModules.indexOf(module) === -1) {
            hasPermissions = false;
          }
        }
      );
    } else {
      hasPermissions = false;
    }
  }
  return hasPermissions;
}

function navigationPermissionChecker(nodeToCheckPermissionsFor) {
  return (
    checkRules(nodeToCheckPermissionsFor) &&
    checkRequiredBackendModules(nodeToCheckPermissionsFor)
  );
}

function getBackendModules() {
  const query = `query {
    backendModules{
      name
    }
  }`;
  const gracefully = true;
  return fetchFromGraphQL(query, undefined, gracefully);
}

function getNamespaces() {
  return fetchFromKyma(
    k8sServerUrl + '/api/v1/namespaces?labelSelector=env=true'
  ).then(function getNamespacesFromApi(response) {
    var namespaces = [];
    response.items.map(namespace => {
      if (namespace.status && namespace.status.phase !== 'Active') {
        return; //"pretend" that inactive namespace is already removed
      }
      const namespaceName = namespace.metadata.name;
      namespaces.push({
        category: 'Namespaces',
        label: namespaceName,
        pathValue: namespaceName
      });
    });
    return namespaces;
  })
    .catch(function catchNamespaces(err) {
      console.error('get namespace: error', err);
    });
}

function relogin() {
  localStorage.removeItem('luigi.auth');
  location.reload();
}

function getFreshKeys() {
  // manually re-fetching keys, since this is a major pain point
  // until dex has possibility of no-cache
  return fetch('https://dex.' + k8sDomain + '/keys', { cache: "no-cache" })
}

let backendModules = [];
let selfSubjectRulesReview = [];
Promise.all([getBackendModules(), getSelfSubjectRulesReview(), getFreshKeys()])
  .then(
    res => {
      const modules = res[0];
      const subjectRules = res[1];
      if (
        modules &&
        modules.backendModules &&
        modules.backendModules.length > 0
      ) {
        modules.backendModules.forEach(backendModule => {
          backendModules.push(backendModule.name);
        });
      }
      if (subjectRules && subjectRules.length > 0) {
        selfSubjectRulesReview = subjectRules;
      }
    },
    err => {
      // console.error(err);
    }
  )
  // 'Finally' not supported by IE and FIREFOX (if 'finally' is needed, update your .babelrc)
  .then(() => {
    Luigi.setConfig({
      auth: {
        use: 'openIdConnect',
        openIdConnect: {
          authority: 'https://dex.' + k8sDomain,
          client_id: 'console',
          scope:
            'audience:server:client_id:kyma-client audience:server:client_id:console openid profile email groups',
          automaticSilentRenew: true,
          loadUserInfo: false
        },

        events: {
          onLogout: () => {
            console.log('onLogout');
          },
          onAuthSuccessful: data => { },
          onAuthExpired: () => {
            console.log('onAuthExpired');
          },
          // TODO: define luigi-client api for getting errors
          onAuthError: err => {
            console.log('authErrorHandler 1', err);
          }
        }
      },
      navigation: {
        nodeAccessibilityResolver: navigationPermissionChecker,
        nodes: () => [
          {
            pathSegment: 'home',
            hideFromNav: true,
            context: {
              idToken: token,
              backendModules
            },
            children: function () {
              return getUiEntities('clustermicrofrontends', undefined, [
                'cluster'
              ]).then(function (cmf) {
                var staticNodes = [
                  {
                    pathSegment: 'workspace',
                    label: 'Namespaces',
                    viewUrl:
                      '/consoleapp.html#/home/namespaces/workspace?showModal={nodeParams.showModal}&allNamespaces={nodeParams.allNamespaces}',
                    icon: 'dimension'
                  },
                  {
                    pathSegment: 'namespaces',
                    viewUrl: '/consoleapp.html#/home/namespaces/workspace',
                    hideFromNav: true,
                    children: [
                      {
                        pathSegment: ':namespaceId',
                        context: {
                          environmentId: ':namespaceId',
                          namespaceId: ':namespaceId'
                        },
                        children: getNodes,
                        navigationContext: 'namespaces',
                        defaultChildNode: 'details'
                      }
                    ]
                  },
                  {
                    category: { label: 'Integration', icon: 'overview-chart' },
                    pathSegment: '_integration_category_placeholder_',
                    hideFromNav: true
                  },
                  {
                    pathSegment: 'settings',
                    navigationContext: 'settings',
                    label: 'General Settings',
                    category: { label: 'Settings', icon: 'settings' },
                    viewUrl: '/consoleapp.html#/home/settings/organisation'
                  },
                  {
                    pathSegment: 'global-permissions',
                    navigationContext: 'global-permissions',
                    label: 'Global Permissions',
                    category: 'Settings',
                    viewUrl:
                      '/consoleapp.html#/home/settings/globalPermissions',
                    keepSelectedForChildren: true,
                    children: [
                      {
                        pathSegment: 'roles',
                        children: [
                          {
                            pathSegment: ':name',
                            viewUrl:
                              '/consoleapp.html#/home/settings/globalPermissions/roles/:name'
                          }
                        ]
                      }
                    ],
                    adminOnly: true
                  },
                  {
                    category: {
                      label: 'Diagnostics',
                      icon: 'electrocardiogram'
                    },
                    pathSegment: '_integration_category_placeholder_',
                    hideFromNav: true
                  }
                ];
                if (cmf.length > 0) {
                  cmf.forEach(clusterMF => {
                    if (clusterMF[0]) {
                      clusterMF[0].adminOnly = true;
                    }
                  });
                }
                var fetchedNodes = [].concat.apply([], cmf);
                return [].concat.apply(staticNodes, fetchedNodes);
              });
            }
          },
          {
            pathSegment: 'docs',
            viewUrl: config.docsModuleUrl,
            label: 'Docs',
            hideSideNav: true,
            context: {
              idToken: token,
              backendModules
            },
            icon: 'sys-help'
          }
        ],
        contextSwitcher: {
          defaultLabel: 'Select Namespace ...',
          parentNodePath: '/home/namespaces', // absolute path
          lazyloadOptions: true, // load options on click instead on page load
          options: getNamespaces,
          actions: [
            {
              label: '+ New Namespace',
              link: '/home/workspace?~showModal=true'
            },
            {
              label: 'Show all namespaces',
              link: '/home/workspace?~allNamespaces=true',
              position: 'bottom'
            }
          ]
        }
      },
      routing: {
        nodeParamPrefix: '~',
        skipRoutingForUrlPatterns: [/access_token=/, /id_token=/]
      },
      settings: {
        responsiveNavigation: 'simpleMobileOnly',
        header: () => {
          const logo =
            clusterConfig && clusterConfig.headerLogoUrl
              ? clusterConfig.headerLogoUrl
              : '/assets/logo.svg';
          const title = clusterConfig ? clusterConfig.headerTitle : undefined;
          const favicon = clusterConfig ? clusterConfig.faviconUrl : undefined;
          return {
            logo,
            title,
            favicon
          };
        }
      }
    });
  })
  .catch((err) => {
    console.error('Config Init Error', err);
  });

window.addEventListener('message', e => {
  if (e.data.msg && e.data.msg === 'console.quotaexceeded') {
    const namespace = e.data.namespace;
    const data = e.data.data;
    let limitHasBeenExceeded;
    let limitExceededErrors;
    if (data && data.resourceQuotasStatus) {
      limitHasBeenExceeded = data.resourceQuotasStatus.exceeded;
    }
    if (
      data &&
      data.resourceQuotasStatus &&
      data.resourceQuotasStatus.exceededQuotas &&
      data.resourceQuotasStatus.exceededQuotas.length > 0
    ) {
      limitExceededErrors = setLimitExceededErrorsMessages(
        data.resourceQuotasStatus.exceededQuotas
      );
      const linkdata = {
        goToResourcesConfig: {
          text: 'Resources Configuration',
          url: `/home/namespaces/${namespace}/resources`
        }
      };
      let errorText = `Error ! The following resource quota limit has been exceeded by the given resource:<br>`;
      limitExceededErrors.forEach(error => {
        errorText += `-${error}<br>`;
      });
      errorText += `See {goToResourcesConfig} for details.`;
      const settings = {
        text: errorText,
        type: 'error',
        links: linkdata
      };
      window.postMessage(
        {
          msg: 'luigi.ux.alert.show',
          data: { settings }
        },
        '*'
      );
    }
  }
});

function setLimitExceededErrorsMessages(limitExceededErrors) {
  let limitExceededErrorscomposed = [];
  limitExceededErrors.forEach(resource => {
    if (resource.affectedResources && resource.affectedResources.length > 0) {
      resource.affectedResources.forEach(affectedResource => {
        limitExceededErrorscomposed.push(
          `'${resource.resourceName}' by '${affectedResource}' (${
          resource.quotaName
          })`
        );
      });
    }
  });
  return limitExceededErrorscomposed;
}
