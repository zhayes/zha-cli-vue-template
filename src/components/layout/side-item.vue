<script lang="tsx">
import { defineComponent } from 'vue';

import {
  ElSubmenu,
  ElMenuItem,
} from "element-plus";


export default defineComponent({
    name:'side-item',
    props:{
        data: {
            type: Array,
            value: []
        }
    },
    setup(props) {
        let data:any = [];

        props?.data?.map((item:any)=>{
            if(item.path==="/"){
                data = item.children;
            }
        })

        data = data.filter((item:any)=>{
            return !!!item?.meta?.hidden
        })


        const renderItem = (data:[])=>{

            return data.map((item:any, index)=>{
                if(item.hidden) return null

                if(item.children && item.children.length){
                    return (
                        <el-submenu index={item?.meta?.title} key={item?.meta?.title}>
                            {{
                               title: ()=>(<><i class="el-icon-message"></i>{item?.meta?.title}</>),
                               default: renderItem(item.children as [])
                            }}
                        </el-submenu>
                    )
                }else{
                    return (
                        <el-menu-item index={item?.meta?.title}>
                            <router-link to={item.path}>{item?.meta?.title}</router-link>
                        </el-menu-item>
                    )
                }
            })
        }

        return ()=>{
            return renderItem(data as []);
        }
    },
    components: {
        ElSubmenu,
        ElMenuItem
    },
})
</script>
<style lang="scss">
.el-menu-item.is-active {
  background-color: #2f69f4 !important;
}
.el-submenu__title,
.el-menu-item {
  &:hover {
    color: #fff !important;
  }
}

.el-menu-item {
  color: inherit;
  a {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    display: block;
  }
}
</style>