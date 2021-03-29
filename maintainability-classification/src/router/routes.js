const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'feature-models/:id',
        name: 'feature-models',
        component: () => import('pages/FeatureModels.vue'),
      },
      {
        path: 'measures',
        name: 'measures',
        component: () => import('pages/Measures.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
