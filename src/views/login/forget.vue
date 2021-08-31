<template>
  <head-bar>
    <div class="forget-page">
      <div class="form_wrap">
        <router-link
          to="/login"
          style="
            display: flex;
            align-items: center;
            font-size: 16px;
            padding: 20px 24px;
            border-bottom: 1px solid #eff1f6;
          "
        >
          <arrow-left style="width: 16px" /> 返回登录
        </router-link>
        <div style="padding: 30px 60px 47px 60px">
          <el-form :model="resetForm" ref="formEl">
            <h2>重置密码</h2>
            <el-form-item
              prop="mobile"
              :rules="[
                { required: true, pattern: /^1[2-9]\d{9}$/,  message: '请输入正确的手机号', trigger: 'change' },
              ]"
            >
              <el-input
                prefix-icon="el-icon-user"
                placeholder="请输入手机号"
                class="tssl_login_input"
                v-model="resetForm.mobile"
                maxlength="20"
              />
            </el-form-item>
            <el-form-item
              prop="messageCode"
              :rules="[
                {
                  required: true,
                  message: '请输入手机验证码',
                  trigger: 'change',
                },
              ]"
            >
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="请输入手机验证码"
                class="tssl_login_input"
                type="password"
                v-model="resetForm.messageCode"
                maxlength="20"
              >
              <template #suffix>
                <div
                  @click="getSmsVerifyCode"
                  style="padding: 0 16px; border-left: 1px solid #DADBDE; line-height: 20px; color:#4E80F8; cursor:pointer; user-select:none">
                  {{seconds===60 ? '发送验证码' : `${seconds}s`}}
                </div>
              </template>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
                { required: true, message: '请输入新密码', trigger: 'change' },
              ]"
            >
              <el-input
                prefix-icon="el-icon-user"
                placeholder="请输入新密码"
                class="tssl_login_input"
                type="password"
                v-model="resetForm.password"
                maxlength="20"
              />
            </el-form-item>
            <el-form-item
              prop="confirmPassword"
              :rules="[
                { required: true, message: '请重复新密码', trigger: 'change'},
              ]"
            >
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="请重复新密码"
                class="tssl_login_input"
                type="password"
                v-model="resetForm.confirmPassword"
                maxlength="20"
              />
            </el-form-item>

            <el-button
              prefix-icon="el-icon-lock"
              type="primary"
              class="tssl_login_btn"
              style="width: 100%"
              @click="submitForm"
              :loading="loading"
              >立即重置</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </head-bar>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import headBar from "./head-bar.vue";
import {phone}  from "@/utils/regex";
import useCutdown from "@/use/cutdown";

export default defineComponent({
  setup() {
    const {seconds, cutdown} = useCutdown();

    return {
      resetForm: reactive({
        mobile:"",
        messageCode: "",
        password: "",
        confirmPassword: ""
      }),
      seconds,
      loading: ref(false),
      cutdown
    };
  },
  components: {
    headBar
  },
  methods: {
    getSmsVerifyCode(){
      if(this.seconds!=60)return;
      if(!this.resetForm.mobile.match(phone)) return this.$message.warning("手机号错误");

      this.$store.dispatch("getSmsVerifyCode", this.resetForm.mobile).then(()=>{
        this.$message.success("获取成功");
        this.cutdown();
      })
    },
    submitForm() {
      const formEl = this.$refs.formEl as HTMLFormElement;
      formEl.validate((valid: boolean) => {
        if (!valid) return;
        if(this.resetForm.password!==this.resetForm.confirmPassword){
          return this.$message.warning("两次密码不一致");
        }

        this.loading = true;
        this.$store
          .dispatch("resetPasswordByMobile", {
            ...this.resetForm,
            password: undefined,
            confirmPassword: undefined,
            loginPwd: btoa(this.resetForm.password)
          })
          .then((data) => {
            this.$message.success("重置成功");
            this.$router.replace("/login");
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
.forget-page {
  .form_wrap {
    position: absolute;
    width: 500px;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    box-shadow: 0px 10px 16px 0px #eff1f6;
    border-radius: 4px;
    border: 1px solid #eff1f6;

    h2 {
      margin-bottom: 30px;
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #4e576b;
      line-height: 45px;
    }

    .codeImg {
      height: 58px;
    }

    .tssl_login_input {
      input {
        background-color: #eff1f6 !important;
        box-shadow: 0px 4px 6px 0px #dadbde inset;
        border-radius: 4px;
        height: 58px;
        font-size: 16px;
      }
      .el-input__suffix {
        .el-input__suffix-inner {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }

      .el-input__prefix {
        display: flex;
        align-items: center;
        font-size: 16px;
      }
    }

    .tssl_login_btn {
      height: 58px;
      font-size: 18px;
      background: #4e80f8;
      border-radius: 4px;
      box-shadow: 0px 2px 4px 0px #b2bfdf inset, 0px 4px 1px 0px #7ea4ff inset, 0px -5px 1px 0px #2e63e2 inset!important;
      border: none;
    }

    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
