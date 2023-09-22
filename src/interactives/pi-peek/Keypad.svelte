<script>
  export let value = ""
  const select = (num) => () => (value += num)
  const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
</script>

<div class="keypad grid grid-cols-3 gap-2 self-center">
  {#each NUMS as num}
    <button class="btn btn-circle btn-ghost btn-lg" on:click={select(num)}>{num}</button>
  {/each}
  <button class="btn btn-circle btn-ghost btn-lg col-start-2" on:click={select(0)}>0</button>
  <!-- Delete -->
  <button
    class="btn btn-circle btn-ghost btn-lg"
    on:click={() => {
      if (value) value = value.slice(0, -1)
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" /><line
        x1="18"
        x2="12"
        y1="9"
        y2="15"
      /><line x1="12" x2="18" y1="9" y2="15" /></svg
    ></button
  >
</div>
