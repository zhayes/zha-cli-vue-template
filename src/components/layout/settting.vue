<template>
    <div style="display:flex; align-items: center; height:100%; font-size: 14px; color: #ffffff">
        <!-- <el-avatar
            style="margin-right: 8px; height: 24px; width:24px;"
            size="large" 
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        /> -->  
        <div>
            {{username}}
        </div>
        
        <el-popconfirm
            title="您确定要退出登录？"
            @confirm="logout"
        >
            <template #reference>
                <div 
                    style="padding: 0 22px; background-color:#6290FF; height: 100%; display:flex; align-items:center; font-size:inherit; cursor:pointer; margin-left: 18px; white-space:nowrap" 
                >
                    <switch-button style="width: 15px"/>
                    &nbsp;
                    退出
                </div>
            </template>
        </el-popconfirm>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import {ElAvatar, ElPopper, ElMenu, ElMenuItem} from 'element-plus'
import {SwitchButton} from '@element-plus/icons'
import {useStore} from 'vuex'

export default defineComponent({
    setup() {
        const store = useStore();
        const username = ref<string>("");

        
       watch(()=>store.state.loginInfo,()=>{
           username.value = store.state.loginInfo?.username
       })

        return {
            username
        }
    },
    components:{
        ElAvatar,
        ElPopper,
        ElMenu, 
        ElMenuItem,
        SwitchButton
    },
    methods:{
        logout(){
            this.$store.commit("clearAuth")
            this.$router.replace('/login')
        }
    },
    mounted(){
        
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