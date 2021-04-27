export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', redirect: '/stories/new'},
      { path: 'stories/:tab',
        component: () => import('pages/stories') ,
        name: 'stories',
      },
      { path: 'feeds',
        name: 'feeds',
        component: () => import('pages/feeds')
      },
      { path: 'feeds/add', component: () => import('pages/feedAdd') },
      { path: 'oidc/callback', component: () => import('pages/oidcCallback') , meta: {public: true}},
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/Error404')
  }
]
