import { createApp, Component } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from './utils/request'
import 'element-plus/packages/theme-chalk/src/base.scss'
import directives from '@/directives'
import { SFCWithInstall } from 'element-plus/lib/utils/types';
import TsTable from '@/components/ts-table/index.vue';
import TsComponent from '@/components/ts-component/index.vue';
import '@/assets/css/main.scss'
import {
    ElForm, ElFormItem, ElButton, ElInput, ElSelect, ElOption, ElIcon, ElTable, ElPagination, ElHeader, ElPopconfirm, ElTableColumn, ElAvatar, ElDialog, ElMessage, ElTabs, ElTabPane, ElRow, ElCol, ElInputNumber, ElSpace, ElLoading, ElMessageBox, ElUpload
} from 'element-plus';

import { ArrowLeft, ArrowRight, Minus, Plus } from "@element-plus/icons";
import Message from 'element-plus/lib/el-message/src/message';
import {ElMessageBoxShortcutMethod} from 'element-plus/lib/el-message-box/src/message-box.type';

const app = createApp(App);

const components:Component[] = [
    TsTable,
    TsComponent,
    ArrowLeft, 
    ArrowRight, 
    Minus, 
    Plus,
    ElForm, ElFormItem, ElButton, ElInput, ElInputNumber, ElSelect, ElOption, ElIcon, ElTable, ElPagination, ElHeader, ElPopconfirm, ElTableColumn, ElAvatar, ElDialog, ElTabs, ElTabPane, ElRow, ElCol, ElSpace, ElUpload
];

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $message: SFCWithInstall<typeof Message>
        $confirm: SFCWithInstall<ElMessageBoxShortcutMethod>
    }
}

components.forEach((component:any)=> {
    app.component(component.name, component)
})

app.
use(store).
use(router).
use(axios).
use(directives).
use(ElMessage).
use(ElMessageBox).
use(ElLoading).
mount('#app')
