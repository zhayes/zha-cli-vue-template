<template>
  <el-aside width="200px" style="background-color: #4E576B; padding: 0 12px; box-sizing: border-box; overflow:hidden">
    <div
      style="
        margin: auto;
        margin-top: 10px;
        height: var(--el-header-height);
        background-color: #999;
        height: 50px;
      "
    />
    <el-menu
      :default-active="selected"
      text-color="#999999"
      active-text-color="#ffffff"
      backgroundColor="#4E576B"
      :collapse-transition="true"
      :unique-opened="true"
      mode="vertical"
    >
      <sdie-item :data="routes"/>
    </el-menu>
  </el-aside>
</template>
<script lang="ts">
import { defineComponent, computed, ComputedRef} from "vue";
import {useRouter, useRoute} from 'vue-router'
import SdieItem from './side-item.vue';
import logo from '@/assets/img/logo';
import {
  ElAside,
  ElMenu,
} from "element-plus";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selected:ComputedRef<any> = computed(()=>(route.meta.selected))

    return {
      routes: router.options.routes,
      logo,
      selected
    };
  },
  components: {
    ElAside,
    ElMenu,
    SdieItem
  },
  mounted(){

  }
});
</script>