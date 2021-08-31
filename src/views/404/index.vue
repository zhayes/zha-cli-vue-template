<template>
    <div style="display:flex; align-items:center; min-width: 100vw; min-height: 100vh; justify-content: center;">
        <img :src="not_found" style="display:block; margin: auto; max-width: 100%;" />
    </div>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import not_found from '@/assets/img/404.png';

export default defineComponent({
    setup() {
        return {
            not_found
        }
    },
})
</script>
