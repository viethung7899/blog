<script lang="ts">
  export let show = true
  export let className: string | undefined
</script>

<span class={show ? "text-transparent" : `text-base-100 opacity-0 ${className || "mr-[-0.5em]"}`}>
  <slot />
</span>

<style>
  span {
    transition:
      color 200ms ease-in-out,
      margin 200ms ease-in-out;
  }
</style>
