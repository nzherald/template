<script lang="ts">
  import { interactiveWidth } from "./stores";
  import Nested from "./Nested.svelte"
  export let component = "default";
  let width: number;
  $: $interactiveWidth = width;
</script>


<div bind:clientWidth={width}>
  {#if component === 'default'}
    <Nested />
  {:else}
    <Nested />
  {/if}
</div>
