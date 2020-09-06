<script>
  import { interactiveWidth } from "./stores";
  import Nested from "./Nested.svelte";
</script>

<style lang="less">
  #wrapper {
    margin: 20px;
    border: 1px solid slateblue;
    border-radius: 16px;
  }
</style>

<div id="wrapper" bind:clientWidth={$interactiveWidth}>
  <Nested />
</div>
