<template>
  <div style="height: 50px; display:flex; align-items:center; padding-left:var(--el-main-padding);">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.title" :to="{ path: item.path }">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

export default defineComponent({
    setup() {
      const route = useRoute();
      let breadcrumb = ref<any>([]);

      watchEffect(() => {
        const matched = route.matched.filter((item:any)=>{
          return route.path===item.path && item.meta && item.meta.breadcrumb && item.meta.breadcrumb.length
        })[0]
        breadcrumb.value = matched?.meta?.breadcrumb || [];
      })

      return {
        breadcrumb
      }
    },
    components:{
        ElBreadcrumb,
        ElBreadcrumbItem
    }
})
</script>
