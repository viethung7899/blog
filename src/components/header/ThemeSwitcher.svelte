<script lang="ts">
  import { createDropdownMenu, melt } from '@melt-ui/svelte';
  const {
    elements: { menu, item, trigger },
  } = createDropdownMenu({
    positioning: {
      placement: 'bottom-end',
    },
  });

  const themes = ['light', 'dark', 'system'] as const;
  const setTheme = (theme: (typeof themes)[number]) => {
    if (theme === 'system') {
      localStorage.removeItem('theme');
      document.documentElement.setAttribute(
        'data-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      );
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  };
</script>

<button class="btn btn-sm btn-ghost btn-square" use:melt={$trigger}>
  <!-- Sun -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-4 h-4 dark:hidden"
    ><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path
      d="M12 20v2"
    /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path
      d="M2 12h2"
    /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path
      d="m19.07 4.93-1.41 1.41"
    /></svg
  >
  <!-- Moon -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-4 h-4 hidden dark:block"
    ><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
  >
  <span class="sr-only">Toggle theme</span>
</button>
<ul class="menu bg-base-200 w-24 rounded-box" use:melt={$menu}>
  {#each themes as theme}
    <li
      use:melt={$item}
      class="cursor-pointer hover:bg-base-content/20 p-2 rounded-md capitalize"
      on:m-click={() => setTheme(theme)}
    >
      {theme}
    </li>
  {/each}
</ul>
