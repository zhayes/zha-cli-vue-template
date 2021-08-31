<template>
  <head-bar>
  <div class="login_page">
    <div class="form_wrap">
      <el-form :model="loginForm" ref="formEl">
        <h2>系统登录</h2>
        <el-form-item
          prop="username"
          :rules="rules.name"
        >
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入手机号或用户名"
            class="tssl_login_input"
            v-model="loginForm.username"
            autocomplete="on"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="rules.pwd"
        >
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            class="tssl_login_input"
            type="password"
            show-password
            v-model="loginForm.password"
            @keydown.enter="submitForm"
            maxlength="20"
          />
        </el-form-item>
        <!-- <el-form-item
          prop="verify_code"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'change' },
          ]"
          style="margin-bottom: 48px"
        >
          <el-input
            placeholder="请输入图形验证码"
            class="tssl_login_input"
            v-model="loginForm.verify_code"
            @keydown.enter="submitForm"
          >
            <template #suffix
              ><img
                :src="`/api/api/uc/verifyCode/captcha${imgCode}`"
                class="codeImg"
                @click="setImgCode"
            /></template>
          </el-input>
        </el-form-item> -->

        <el-button
          type="primary"
          class="tssl_login_btn"
          style="width: 100%"
          @click="submitForm"
          :loading="loading"
          >登录</el-button>
      </el-form>

        <!-- <div style="margin-top: 18px">
            <router-link 
                to="/forget" 
                style="text-decoration: none; color: #4e80f8"
            >忘记密码</router-link>
        </div> -->
    </div>
  </div>
  </head-bar>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import headBar from "./head-bar.vue";

export default defineComponent({
  setup() {
    return {
      imgCode: ref<string>(""),
      loginForm: reactive({
        username: "",
        password: "",
        grant_type: "uc_password",
        verify_code: "",
        applicationType: 1,
        companyTraderId: 1
      }),
      loading: ref(false),
      rules:{
        pwd: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { trigger: 'change', message: '禁用特殊字符', validator(rule:any, value:string){
            return /^[\w]+$/.test(value);
          }}
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'change'},
          { trigger: 'change', message: '禁用特殊字符', validator(rule:any, value:string){
            return /^[\w]+$/.test(value);
          }}
        ]
      }
    };
  },
  components: {
    headBar,
  },
  methods: {
    setImgCode() {
      this.imgCode = `?${new Date().getTime()}`;
    },
    submitForm() {
      const formEl = this.$refs.formEl as HTMLFormElement;
      formEl.validate((valid: boolean) => {
        if (!valid) return;
        this.loading = true;
        this.$store
          .dispatch("login", {...this.loginForm, password:  btoa(this.loginForm.password)})
          .then((data) => {
            this.$store.commit("storageAuth", data);
            this.$message.success("登录成功");
            this.$router.replace("/node/config");
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
  },
});
</script>
<style lang="scss">
.login_page {
  .form_wrap {
    position: absolute;
    width: 400px;
    box-sizing: border-box;
    margin: auto;
    padding: 50px 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    box-shadow: 0px 10px 16px 0px #eff1f6;
    border-radius: 4px;
    border: 1px solid #eff1f6;

    h2 {
      margin-bottom: 40px;
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #4e576b;
      line-height: 45px;
    }

    .codeImg{
        height: 58px;
    }
  }
}
</style>
