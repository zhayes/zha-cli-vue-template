import store from '@/store';
import router from '@/router';

export const basicToken = `Basic xxxx`;

//过滤特定的接口地址，以下路径不进入重复取消队列
export const API_whiteList: [string?] = [
   
]

//过期后未操作时间在1个小时以内,则调用一次token刷新接口
export const availableRefreshTime = 3600*1*1000;

//response.status!=200的状态操作;
export const errStatusHandles: any = {
    401:(response:any)=>{
        store.commit("clearAuth");
        router.replace("/login");
    }
}

//指定的接口报错，不弹出错误提示
export const filterErrorMsgApis:string[] = [

];

//特定接口不需要走刷新token接口时机判断
export const specifyApiInOutOfRefreshingCode:string[] = [
   
]