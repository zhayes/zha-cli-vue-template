
<template>
  <el-container style="min-height: 100vh">
    <side />
    <el-container style="background-color:#eaeaea">
      <el-header height="42px" style="background-color: #4E80F8; box-shadow: 0 1px 4px #999; display:flex; flex-direction: row-reverse; align-items:center; padding-right:0">
        <setting />
      </el-header>
      <!-- <breadcrumb /> -->
      <el-main style="padding-top:0; display:flex; align-items:center; flex-direction: column;">
          <section style="flex:1; width: 100%; boxSizing:border-box;">
            <router-view />
          </section>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {ElContainer, ElAside, ElHeader, ElMain, ElFooter} from 'element-plus';
import Side from './side.vue';
import Setting from './settting.vue';
import Breadcrumb from './breadcrumb.vue';

export default defineComponent({
  name: 'App',
  components: {
    ElContainer, 
    ElAside, 
    ElHeader, 
    ElMain, 
    ElFooter, 
    Side, 
    Breadcrumb,
    Setting
  }
})
</script>

<style>

</style>
