<script>
  import Handle from "./Handle.svelte"
  let scrollY = 0

  $: isTop = scrollY <= 0
</script>

<svelte:window bind:scrollY />
<a
  href="/"
  class="
  bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-mono text-sm font-semibold text-transparent"
>
  <h2 class="inline-flex">
    <Handle show={!isTop}>&lsqb;</Handle>
    <span>v</span>
    <Handle show={isTop} className="mr-[-2.5em]">iet-</Handle>
    <span>h</span>
    <Handle show={isTop} className="mr-[-2.5em]">ung&nbsp;</Handle>
    <span>ng</span>
    <Handle show={isTop} className="mr-[-2.5em]">uyen</Handle>
    <Handle show={!isTop}>&rsqb;</Handle>
  </h2>
</a>
