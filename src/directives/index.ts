import moment from 'moment';
import {App, Directive, FunctionDirective, ObjectDirective, watch} from 'vue';

export const directives:any = {
    formatTime(el:HTMLElement, binding:any){
        const content = el.innerText;
        const timeStr = moment(Number(content)).format(binding.value);
       
        if(el && el.parentNode){
            el.outerHTML = timeStr;
        };
        
    },
    formatEmpty(el:HTMLElement, {value='--'}){
        if(el && el.parentNode){
            el.outerHTML = !el.innerText ? value : el.innerText;
        };
    }
}

export default {
    install(app:App){
        Object.keys(directives).forEach((key:string)=>{
            const options:any = directives[key];
            app.directive(key, options);
        })
    }
}