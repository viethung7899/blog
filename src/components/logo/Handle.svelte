<script lang="ts">
  export let show = true
  export let className: string | undefined
</script>

<span class={show ? "opacity-100" : `opacity-0 ${className || "mr-[-0.5em]"}`}>
  <slot />
</span>

<style>
  span {
    transition:
      opacity 500ms ease-in-out,
      margin 500ms ease-in-out;
  }
</style>
