import axios, { AxiosRequestConfig, AxiosInstance, Canceler, AxiosResponse } from 'axios';
import { App } from "vue";
import {ElMessage} from 'element-plus';
import store from '@/store';
import router from '@/router';
import { 
    basicToken, 
    API_whiteList, 
    availableRefreshTime, 
    errStatusHandles, 
    filterErrorMsgApis,  
    specifyApiInOutOfRefreshingCode
} from './request.config';

const BASE_URL:string = import.meta.env.VITE_BASE_URL as string;

const cancelToken = axios.CancelToken;

class AxiosRequest {

    axiosInstance: AxiosInstance
    post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>
    get: AxiosInstance['get']
    waitRefreshTokenRequestList: any[]
    axiosConfig: AxiosRequestConfig = {
        baseURL: BASE_URL,
        withCredentials: true,
        timeout: 10000
    }

    constructor() {
        this.axiosInstance = axios.create(this.axiosConfig);
        
        this.post = (url: string, data: any, config?: AxiosRequestConfig) => {
            //对传入的字符串数据进行统一的两边去空格处理
            if (data && Object.prototype.toString.call(data) === "[object Object]") {
                Object.keys(data).forEach((key) => {
                    if (typeof data[key] === 'string') {
                        data[key] = data[key].trim();
                        if (!data[key]) delete data[key];
                    }
                })
            }


            return this.axiosInstance.post.call(this, url, data, config);
        };
        this.get = this.axiosInstance.get;

        this.waitRefreshTokenRequestList = [];

        this.bindInterceptor();
    }

    pendingList: { u: string, f: Canceler }[] = [];


    commonRequest = (req: any) => {//定义请求报文
        this.removePending(req);
        req.cancelToken = new cancelToken((c) => {
            if (API_whiteList.indexOf(req.url) == -1) {
                this.pendingList.push({ u: req.url + '&' + req.method, f: c });
            }
        });


        return new Promise((resolve, reject) => {
            const time = new Date().getTime();
            
            if(req.data && Object.prototype.toString.call(req.data)==="[object Object]"){
                req.data.timestamp = time;
            }

            const reqFun = ()=>{
                const auth:any = store.state.auth || {};

                if(!specifyApiInOutOfRefreshingCode.includes(req.url)){
                    req.headers['Authorization'] = `${auth.token_type} ${auth.access_token}`;
                    store.commit("updateLatestFetchTime");
                }else{
                    req.headers['Authorization'] = basicToken;
                }

                resolve(req);
            }
      
            //======================================  处理刷新token接口逻辑 开始
           
            if(store.state.auth && store.state.auth.expirationTime && !specifyApiInOutOfRefreshingCode.includes(req.url)){

                const {latestFetchTime, auth} = store.state;

                //已经过期
                if(auth.expirationTime && auth.expirationTime<time){
                    //在刷新时效范围之内,则启用刷新token操作；
                    if(latestFetchTime && (time - latestFetchTime < availableRefreshTime)){
                        this.waitRefreshTokenRequestList.push(reqFun);

                        //调用刷新接口
                        const len = this.waitRefreshTokenRequestList.length;
                        
                        if(len>1) return;

                        store.dispatch("login",{grant_type: 'refresh_token', refresh_token: auth.refresh_token}).then((data)=>{
                            store.commit("storageAuth", data);

                            while(this.waitRefreshTokenRequestList.length){
                                const cb = this.waitRefreshTokenRequestList.shift();
                                cb();
                            }
                        });
                    }else{//不在有效刷新期内，既然已经过期，就直接退出重新登录；
                        ElMessage.closeAll();
                        ElMessage.warning("已过期，请重新登录！");

                        store.commit("clearAuth");
                        router.replace("/login");
                    }
                    
                    return;
                }
                
            }
            //====================================================处理刷新token接口逻辑 结束

            reqFun();

        });
    }


    commonResponse = (res: AxiosResponse<any>) => {//响应报文
        return new Promise((resolve, reject) => {
            this.removePending(res);

            if (res.status != 200) {
                ElMessage.error("网络异常")
                reject('网络异常');
                return;
            }

            if (res.data && res.data.code != 'SUCCESS' && res.data.errorMsg) {

                if(!filterErrorMsgApis.includes(res.config.url as string)){
                    ElMessage.error(res.data.errorMsg);
                }
                
                reject(res.data);
            }
            resolve(res.data);
        })
    }

    removePending = (config: any) => {//取消重复的请求
        for (let p = 0; p < this.pendingList.length; p++) {
            if (this.pendingList[p].u === config.url + '&' + config.method) {
                this.pendingList[p].f();
                this.pendingList.splice(p, 1);
            }
        }
    }

    bindInterceptor = () => {//绑定拦截器

        this.axiosInstance.interceptors.request.use((req: any): Promise<any> => {
            return this.commonRequest(req);
        }, (err: any) => {
            console.log(err);
            return Promise.reject(err)
        });


        this.axiosInstance.interceptors.response.use((res: AxiosResponse): Promise<any> => {
            return this.commonResponse(res);
        }, (err: any) => {
            ElMessage.closeAll();

            if(err.message?.includes("timeout")){
                ElMessage({
                    message: "请求超时",
                    type: 'error'
                })
            }

            if (axios.isCancel(err)) {
                console.error('重复请求已经取消')
            }
            
            if(err.response && err.response.data){
                const {error, error_description} = err.response.data
                ElMessage({
                    dangerouslyUseHTMLString: true,
                    message: error_description || error,
                    type: 'error'
                })
            }

            if(err.response && err.response.status!=200){
                errStatusHandles[err.response.status] && errStatusHandles[err.response.status](err.response);
            }
            
            throw new Error(err)
        });
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $axios: AxiosRequest;
    }
}

const axiosRequst = new AxiosRequest();

export default {
    install(app: App) {
        app.config.globalProperties.$axios = axiosRequst;
    }
}

export const useAxios = ()=>{
    return axiosRequst;
}