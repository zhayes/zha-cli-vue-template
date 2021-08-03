import axios, { AxiosRequestConfig, AxiosInstance, Canceler, AxiosResponse } from 'axios';
import { App } from "vue";
import {ElMessage} from 'element-plus';
import store from '../store';


//环境接口
interface EnvType {
    development: string
    production: string
}

const apiConfig: EnvType = {//接口环境变量
    development: "",
    production: ""
}
const envStr = import.meta.env.MODE as ("development" | "production");

export const baseURL = apiConfig[envStr];



const cancelToken = axios.CancelToken;

//过滤特定的接口地址，以下路径不进入重复取消队列
const API_whiteList: [string?] = [
    
]

//特定的code状态码(code!=2000)执行的操作
const specifyCodeHandles: any = {
    
}
//特定接口不需要走刷新token接口时机判断
const specifyApiInOutOfRefreshingCode = [
    
]


export class AxiosRequest {

    axiosInstance: AxiosInstance
    post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>
    get: AxiosInstance['get']
    waitRefreshTokenRequestList: any[]
    axiosConfig: AxiosRequestConfig = {
        baseURL: '/api',
        withCredentials: true
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
            const auth:any = store.state.auth || {};
            req.headers['Authorization'] = req.url.includes('/oauth/token') ? `Basic aGVuZ2JveTpjaGFwdGVy` : `Bearer ${auth.access_token}`
            
            resolve(req);
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

            const { code } = res.data;
            if (res.data && res.data.code != 'SUCCESS' && res.data.errorMsg) {
                ElMessage.error(res.data.errorMsg);
                reject(res.data);
            }

            const handler = specifyCodeHandles[code];
            handler && handler(resolve, reject)
          
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
            if (axios.isCancel(err)) {
                console.error('重复请求已经取消')
            }
            
            if(err.response && err.response.data.error_description){
                ElMessage.error(err.response.data.error_description)
            }

            if(err.response.status!=200){
                ElMessage.error(err.response.statusText)
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

export default {
    install(app: App) {
        app.config.globalProperties.$axios = new AxiosRequest();
    }
}