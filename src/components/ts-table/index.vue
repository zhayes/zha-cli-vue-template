<template>
<div v-loading="loading" element-loading-background="rgba(225, 225, 225, 0.5)" element-loading-text="加载中...">
  <el-table  :data="data" v-bind="tableProps" stripe style="width: 100%">
    <el-table-column label="序号" width="50" v-if="!hideIndex">
        <template #default="scope">
            {{(pageNum-1)*pageSize + scope.$index + 1}}
        </template>
    </el-table-column>
    <slot></slot>
  </el-table>
  
  <el-pagination
    v-if="!!!hidePagination"
    style="text-align: center; margin-top: 70px"
    background
    layout="prev, pager, next, sizes"
    :total="Number(total)"
    :page-size="pageSize"
    :current-page="pageNum"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
    :page-sizes="[10, 20, 50, 100, 200]"
  >
  </el-pagination>
</div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'

export default defineComponent({
    name: 'ts-table',
    inheritAttrs:false,
    props:{
      data: Array,
      total: {
        type: [Number,String],
        default: 0
      },
      pageSize: {
        default: 10,
        type: Number
      },
      pageNum: {
        default: 1,
        type: Number
      },
      loading: Boolean,
      hideIndex: Boolean
    },
    setup(props,context){
      const {onSizeChange, onCurrentChange, hidePagination, ...tableProps} = context.attrs;
      const data = ref(props.data);
      const total = ref(props.total);
      const pageSize = ref(props.pageSize);
      const pageNum = ref(props.pageNum);
      const loading = ref(props.loading);

      watch(props, (newProps)=>{
        data.value = newProps.data;
        total.value = newProps.total;
        pageSize.value = newProps.pageSize;
        pageNum.value = newProps.pageNum;
        loading.value = newProps.loading;
      })

      return {
        onSizeChange, 
        onCurrentChange, 
        hidePagination,
        data,
        total,
        pageSize,
        pageNum,
        loading,
        tableProps
      };
    }
})
</script>
