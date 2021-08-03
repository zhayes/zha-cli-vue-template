<template>
    <div class="form_wrap">
        <el-form :model="loginForm" ref="formEl" >
            <h2>管理系统</h2>
            <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'change' }]">
                <el-input placeholder="请输入用户名" v-model="loginForm.username"  />
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'change' }]">
                <el-input placeholder="请输入密码" type="password" show-password v-model="loginForm.password" />
            </el-form-item>
            <el-form-item prop="verify_code" :rules="[{ required: true, message: '请输入验证码', trigger: 'change' }]">
                <el-input placeholder="请输入图形验证码" v-model="loginForm.verify_code" @keydown.enter="submitForm">
                    <template #suffix><img :src="`/api/xxx${imgCode}`" @click="setImgCode"/></template>
                </el-input>
            </el-form-item>

            <el-button type="primary" style="width:100%" @click="submitForm" :loading="loading">登录</el-button>
        </el-form>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
    setup() {
        return {
            imgCode: ref<string>(''),
            loginForm: reactive({
                username: '',
                password: '',
                grant_type: 'df_uc_password',
                verify_code: '',
                applicationType: 2
            }),
            loading: ref(false)
        }
    },
    methods:{
        setImgCode(){
            this.imgCode = `?${new Date().getTime()}`
        },
        submitForm(){
            const formEl = this.$refs.formEl as HTMLFormElement;
            formEl.validate((valid:boolean)=>{
                if(!valid) return;
                this.loading = true;
                this.$store.dispatch("login", this.loginForm).then((data)=>{
                    this.$store.commit("storageAuth", data);
                    this.$message.success("登录成功");
                    this.$router.replace("/welcome");
                }).catch(()=>{
                    this.loading = false;
                })
            })
            
        }
    }
})
</script>
<style lang="scss" scoped>
.form_wrap{
    position: absolute;
    min-width:200px;
    width: 40%;
    max-width: 400px;
    margin:auto;
    padding: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #e1e1e1;
    box-shadow: 0px 2px 10px #e1e1e1;

    h2{
        text-align: center;
        margin-bottom: 30px;
    }

}
</style>
