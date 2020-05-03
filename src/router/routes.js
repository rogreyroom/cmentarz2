const routes = [
	{
		path: '/',
		component: () => import('layouts/Default.vue'),
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('pages/Index.vue')
			},

			{
				path: '/full-list',
				name: 'graves-full-list',
				component: () => import('pages/show-reports/ListGraves.vue')
			},
			{
				path: '/cemetery-list',
				name: 'cemetery-full-list',
				component: () => import('pages/show-reports/ListCemetery.vue')
			},
			{
				path: '/unpaid-list',
				name: 'unpaid-list',
				component: () => import('pages/show-reports/UnpaidGraves.vue')
			},
			{
				path: '/dead-list',
				name: 'dead-list',
				component: () => import('pages/show-reports/DeadByYear.vue')
			},

			{
				path: '/cemeteries',
				name: 'cemeteries',
				component: () => import('pages/show-view/Cemeteries.vue')
			},
			{
				path: '/cemeteries/:name',
				name: 'cemetery-map',
				component: () => import('pages/show-view/Cemeteries.vue'),
				props: true
			},
			{
				path: '/grave-show/:id',
				name: 'grave-show',
				component: () => import('pages/show-view/Grave.vue'),
				props: true
			},

			{
				path: '/cemetery-change',
				name: 'cemetery-add-edit',
				component: () => import('pages/show-forms/Cemetery.vue'),
				props: true
			},
			{
				path: '/cemetery-change/:id',
				name: 'cemetery-add-edit',
				component: () => import('pages/show-forms/Cemetery.vue'),
				props: true
			},
			{
				path: '/grave-change/',
				name: 'grave-add-edit',
				component: () => import('pages/show-forms/Grave.vue'),
				props: true
			},
			{
				path: '/grave-change/:id',
				name: 'grave-add-edit',
				component: () => import('pages/show-forms/Grave.vue'),
				props: true
			},
			{
				path: '/user-change/:id',
				name: 'user-add-edit',
				component: () => import('pages/show-forms/User.vue'),
				props: true
			},
			{
				path: '/search-show/:query',
				name: 'search-users',
				component: () => import('pages/show-view/Search.vue'),
				props: true
			}
		]
	}
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	});
}

export default routes;
