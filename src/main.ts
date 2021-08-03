import { createApp, Component } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from './utils/request'
import 'element-plus/packages/theme-chalk/src/base.scss'
import { ElButton, ElSelect, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';
import { SFCWithInstall } from 'element-plus/lib/utils/types';
import {formRules} from './utils/util'

const app = createApp(App);

const components:Component[] = [
    ElButton,
    ElSelect,
    ElForm,
    ElFormItem,
    ElInput
];

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $message: SFCWithInstall<any>;
    }
}

components.forEach((component:any)=> {
    app.component(component.name, component)
})

app.
use(store).
use(router).
use(axios).
use(ElMessage).
use(formRules).
mount('#app')
