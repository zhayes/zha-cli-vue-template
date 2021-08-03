
export default [
    {
        path: '/login',
        name:"login",
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/',
        redirect: '/welcome',
        name:"welcome",
        component: ()=>import('../components/layout/index.vue'),
        children: [
            { 
                path: '/welcome', 
                name: 'welcome', 
                component: () => import('../views/welcome/index.vue'),
                meta:{
                    title: '欢迎页',
                    breadcrumb: [{title:'欢迎页'}, {title:'hi', path:'/welcome'}]
                },
                children: [
                    { 
                        path: '/welcome', 
                        name: 'welcome', 
                        component: () => import('../views/welcome/index.vue'),
                        meta:{
                            title: '欢迎页2',
                            selected: '欢迎页2',
                            breadcrumb: [{title:'欢迎页'}, {title:'hi', path:'/welcome'}]
                        }
                    },
                ]
            },
            {
                path: '/dashboard', 
                name: 'dashboard', 
                component: () => import('../views/welcome/index.vue'),
                meta:{
                    title:'dashboard',
                    selected: 'dashboard',
                    breadcrumb: [{title:'welcome', path:'/welcome'}, {title:'hi', path:''}]
                }
            }
        ]
    },
]