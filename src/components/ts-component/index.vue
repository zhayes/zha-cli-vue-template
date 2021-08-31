<template>
    <component :is="componentName"></component>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ts-component',
    props:{
        name: String
    },
    setup(props) {
        return {
            componentName: props.name
        }
    },
})
</script>
