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
				path: '/cemetery-map',
				name: 'cemetery-map',
				component: () => import('pages/CemeteryMap.vue')
			},
			{
				path: '/cemetery-add',
				name: 'cemetery-add',
				component: () => import('pages/AddCemetery.vue')
			},
			{
				path: '/grave-add',
				name: 'grave-add',
				component: () => import('pages/AddGrave.vue')
			},
			{
				path: '/full-list',
				name: 'graves-full-list',
				component: () => import('pages/ListGraves.vue')
			},
			{
				path: '/unpaid-list',
				name: 'unpaid-list',
				component: () => import('pages/UnpaidGraves.vue')
			},
			{
				path: '/dead-list',
				name: 'dead-list',
				component: () => import('pages/DeadByYear.vue')
			},
			{
				path: '/grave-show/:id',
				name: 'grave-show',
				component: () => import('pages/ShowGrave.vue'),
				props: true
			},
			{
				path: '/grave-edit/:id',
				name: 'grave-edit',
				component: () => import('pages/EditGrave.vue'),
				props: true
			},
			{
				path: '/taker-edit/:id',
				name: 'taker-edit',
				component: () => import('pages/EditTaker.vue'),
				props: true
			}
			// {
			// 	path: '/grave-delete/',
			// 	name: 'grave-delete',
			// 	component: () => import('pages/ShowGrave.vue'),
			// 	props: true
			// },
			// {
			// 	path: '/user-edit/',
			// 	name: 'user-edit',
			// 	component: () => import('pages/ShowGrave.vue'),
			// 	props: true
			// },
			// {
			// 	path: '/user-delete/',
			// 	name: 'user-delete',
			// 	component: () => import('pages/ShowGrave.vue'),
			// 	props: true
			// }
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
