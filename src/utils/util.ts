import { App } from "vue";

const rules = {
    mobile: [{ required: true, pattern: /^1[23456789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }],
    password: [{ required: true, min: 6, max: 8, message: '长度必须大于6位长度在 6 到 18 个字符之间', trigger: 'blur' }],
    required: [{ required: true, message: '必填', trigger: 'change' }],
}

export const formRules = {
    install(app: App) {
        app.config.globalProperties.$formRules = rules
    }
}