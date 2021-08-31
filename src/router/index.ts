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
  if(meta.auth!==false && !store.state.auth){
    //return next({path: '/login', replace: true});
  }
  if(path==="/login" && store.state.auth){
    return next({path: '/welcome', replace: true});
  }

  next();
})

export default router;