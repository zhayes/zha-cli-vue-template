import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import routeData from './routeData';
import store from '../store';

const routes:RouteRecordRaw[] = routeData;

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next)=>{
  const {name, meta, path} = to;

  if(path!="/login" && !store.state.auth){
    return next({path: '/login'});
  }
  if(path==="/login" && store.state.auth){
    return next({path: '/'});
  }

  next();
})

export default router;