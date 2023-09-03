import {preprocessMeltUI} from "@melt-ui/pp";
import sequence from "svelte-sequential-preprocessor";
import {vitePreprocess} from '@astrojs/svelte';
export default {
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()])
};
