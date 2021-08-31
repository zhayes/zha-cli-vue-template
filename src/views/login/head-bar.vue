<template>
    <div class="head">
        <div style="background-color:#fff; height: 68px; position: relative; z-index: 10; display:flex; align-items:center; padding: 0 24px;">
            <img src="../../assets/img/head_logo.png" height="42"/>
        </div>
        <div class="head-content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {
           
        }
    },
})
</script>

<style lang="scss" scoped>
.head{
    display: flex;
    flex-direction: column;
    background-color: #EFF1F6;
    min-height: 100vh;

    .head-content{
        position: relative;
        flex: 1;
        width: 100%;
        background-image: url("../../assets/img/login_bg.png");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
}
</style>
