import {App} from 'vue';
import {useAxios} from '../../utils/request';
import qs from 'qs';
const {get, post} = useAxios();


export default {
    login(app:App, params:{username:string, password:string, verify_code:string}) {
        return post("/xxx", qs.stringify({...params}), {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
    }
}