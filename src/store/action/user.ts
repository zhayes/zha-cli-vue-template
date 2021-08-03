import {App} from 'vue';
import {AxiosRequest} from '../../utils/request';
import qs from 'qs';
const {get, post} = new AxiosRequest();


export default {
    login(app:App, params:{username:string, password:string, verify_code:string}) {
        return post("/oauth/token", qs.stringify({...params, password: btoa(params.password)}), {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
    },
    getLoginInfo(app:App){
        return get("/api/uc/user/getLoginInfo");
    }
}