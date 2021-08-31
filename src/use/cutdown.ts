import { ref, reactive, onUnmounted, computed, Ref } from 'vue';

export default (initTime = 60):{seconds:Ref<number>, cutdown:Function} => {
  const seconds = ref(initTime);
  let timer: any = null;

  const cutdown = () => {
    if (timer) return;
    timer && clearInterval(timer);
    timer = setInterval(() => {
      seconds.value -= 1;
      if (seconds.value === 0) {
        clearInterval(timer);
        timer = null;
        seconds.value = initTime;
      }
    }, 1000)
  }

  onUnmounted(() => {
    timer && clearInterval(timer);
    timer = null;
  })

  return {
    seconds,
    cutdown
  }
}