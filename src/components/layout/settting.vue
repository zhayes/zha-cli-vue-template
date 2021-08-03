<template>
    <el-popper>
        <template #trigger>
            <div style="display:flex; align-items: center">
                <el-avatar
                    style="margin-right: 10px"
                    size="large" 
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                />
                {{username}}
            </div>
            
        </template>
        <div class="settingPad">
           <p @click="logout">退出登录</p>
        </div>
    </el-popper>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import {ElAvatar, ElPopper, ElMenu, ElMenuItem} from 'element-plus'
import {useStore} from 'vuex'

export default defineComponent({
    setup() {
        const store = useStore();
        const username = ref<string>("");

        
       watch(()=>store.state.loginInfo,()=>{
           username.value = store.state.loginInfo.username
       })

        return {
            username
        }
    },
    components:{
        ElAvatar,
        ElPopper,
        ElMenu, 
        ElMenuItem
    },
    methods:{
        logout(){
            this.$store.commit("clearAuth")
            this.$router.replace('/login')
        }
    },
    mounted(){
        this.$store.dispatch("getLoginInfo").then((data)=>{
            this.$store.commit("storageInfo", data)
        })
    }
})
</script>
<style lang="scss" scoped>
.settingPad{
    padding: 5px;
    &:hover{
        cursor: pointer;
    }
}
</style>