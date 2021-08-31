<template>
    <el-upload
        class="upload-demo"
        ref="upload"
        v-bind="attrs"
        :on-remove="removeHandle"
        :on-change="changeHandle"
        :file-list="fileList"
        :auto-upload="false">
        <el-button>
            <el-icon>
                <upload-filled />
            </el-icon>
            选取文件
       </el-button>
    </el-upload>
</template>
<script>
import {ref, watch, toRaw} from 'vue';
import {UploadFilled} from '@element-plus/icons'
import useFormItem from '@/use/useFormItem';
export default {
    components:{
        UploadFilled
    },
    emits:["update:modelValue"],
    props:{
        modelValue: Array
    },
    setup(props, {attrs, emit}){
        const {formEmit} = useFormItem();
        const fileList = ref(props.modelValue);

        watch(()=>(props.modelValue), (v)=>{
            fileList.value = v;
        })

        const changeHandle = (f, flist)=>{
            fileList.value = flist;
            emit("update:modelValue", fileList.value)
            formEmit(toRaw(fileList.value)); 
        }

        const removeHandle = changeHandle

        return {
            attrs,
            fileList,
            changeHandle,
            removeHandle
        }
    }
}
</script>