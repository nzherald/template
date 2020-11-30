<script>
  import { interactiveWidth } from "./stores";
  export let inapp = false
  let width;
  let height;
  $: $interactiveWidth = width;
  $: if (window?.hasOwnProperty("ReactNativeWebView")) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        width,
        height,
      })
    );
  }
</script>

<div
  id="wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
  class:inapp>
  {#if inapp}
    {#await import('./AppButton.svelte') then c}
      <svelte:component this={c.default} {inapp} />
    {/await}
    {:else}
    {#await import('./Nested.svelte') then c}
      <svelte:component this={c.default} />
    {/await}
    {/if}
</div>
