import Layout from '@/components/layout/index.vue';

const data = [
    {
        path: '/login',
        name:"login",
        hidden: true,
        component: () => import('@/views/login/index.vue'),
        meta:{
            auth: false,
        }
    },
    {
        path: '/',
        name:"home",
        hidden: true,
        redirect: '/welcome',
        component: Layout
    },
    {
        path: '/welcome',
        name:"welcome",
        redirect: '/welcome/index',
        meta: {title: '欢迎页', icon: "nav_1"},
        component: Layout,
        children: [
            { 
                path: '/welcome/index', 
                name: 'welcome_page', 
                component: () => import('@/views/welcome/index.vue'),
                hidden: true,
                meta:{
                    title: '欢迎页',
                    selected: '欢迎页'
                }
            }
        ]
    },
    {
		path: '/:pathMatch(.*)', 
        name: "404",
		component: ()=>import('@/views/404/index.vue'),
		hidden: true
	}
]

export default data