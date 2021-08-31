<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup(){
    const store = useStore();
    const router = useRouter();

    const storageHandle = (e:any)=>{
      try{
        const storageArea = e.storageArea;
        console.log(storageArea.vuex)
        const vuex = JSON.parse(storageArea.vuex || '{}');
        if(!vuex || !vuex.auth){
          store.commit("clearAuth");
          router.replace("/login");
        }
      }catch(err){
        console.log(err);
      }
    }

    onMounted(()=>{
      window.addEventListener("storage", storageHandle);
    })

    onUnmounted(()=>{
      window.removeEventListener("storage", storageHandle);
    })

    return {
      locale: zhCn,
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
