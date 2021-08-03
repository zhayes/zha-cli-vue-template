import { createStore, Store } from 'vuex';
import VuexPersistence from 'vuex-persist';
import action from './action'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state:IState)=>{
    return {
      loginInfo: state.loginInfo,
      auth: state.auth
    }
  }
})


declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

export interface IState{
    loginInfo?:{}|null,
    auth?: {}|null,
}

export default createStore({
    plugins: [
      vuexLocal.plugin
    ],
    state () {
      return {
        loginInfo: null,//用户登录信息
        auth: null,
        breadcrumb: []
      } as IState
    },
    mutations: {
      storageInfo(state:IState, info:any){
        state.loginInfo = info;
      },
      clearInfo(state:IState){
        state.loginInfo = null;
      },
      storageAuth(state:IState, data:any){
        state.auth = data;
      },
      clearAuth(state:IState){
        state.auth = null;
      }
    },
    actions:{
      ...action
    } as any
  })