<script lang="tsx">
import { h, defineComponent } from 'vue';
import {useRouter} from 'vue-router'

import {
  ElSubmenu,
  ElMenuItem,
} from "element-plus";


export default defineComponent({
    name:'side-item',
    props:{
        data: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        const router = useRouter();

        let data = props?.data?.filter((item:any)=>{
            return !!!item?.meta?.hidden
        })

        const renderItem = (data:[])=>{

            return data.map((item:any, index)=>{
                if(item.hidden) return null

                const showChildren = !!item?.children?.filter((item:any)=>{
                    return !item.hidden
                }).length;

                if(showChildren){
                    return (
                        <el-submenu index={item?.meta?.title} key={item?.meta?.title}>
                            {{
                               title: ()=>(<><ts-component name={item?.meta?.icon} style="margin-right: 9px"/> {item?.meta?.title}</>),
                               default: ()=>renderItem(item.children as [])
                            }}
                        </el-submenu>
                    )
                }else{
                    return (
                        <el-menu-item index={item?.meta?.title} onClick={()=>(router.push(item.path))}>
                            <ts-component name={item?.meta?.icon}/> {item?.meta?.title}
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

</style>