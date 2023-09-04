<script lang="ts">
  import { createDropdownMenu, melt } from '@melt-ui/svelte';
  import {Sun, Moon} from 'lucide-svelte'
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
  <Sun class="w-4 h-4 dark:hidden" />
  <Moon class="w-4 h-4 hidden dark:block" />
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
