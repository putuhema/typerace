<script lang="ts">
  export let time: number;
  let intervalId: NodeJS.Timeout;

  export function startTimer() {
    intervalId = setInterval(() => {
      if (time > 0) {
        time -= 1;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  export function stopTimer() {
    clearInterval(intervalId);
  }
</script>

<span>:{time}</span>
