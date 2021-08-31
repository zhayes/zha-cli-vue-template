import { createStore, Store } from 'vuex';
import persistedState from 'vuex-persistedstate';
import action from './action';

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

export interface AUTH{
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
  expirationTime?: number
}

export interface IState{
    loginInfo?:{}|null,
    auth: AUTH|null,
    latestFetchTime: number|null
}

export default createStore({
    plugins: [
      persistedState({ storage: window.localStorage, paths:["auth", "latestFetchTime"] })
    ],
    state () {
      return {
        loginInfo: null,//用户登录信息
        auth: null,
        latestFetchTime: null,//最近一次接口请求的时间
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
        state.auth = data as AUTH;
        const expires_in = state.auth.expires_in;
        state.auth.expirationTime = new Date().getTime()+ (expires_in*1000)//过期时间
      },
      clearAuth(state:IState){
        state.auth = null;
      },
      updateLatestFetchTime(state:IState){
        state.latestFetchTime = new Date().getTime();
      }
    },
    actions:{
      ...action
    } as any
  })