<script>
  import { interactiveWidth } from "./stores";
  import Nested from "./AppButton.svelte";
</script>


<div id="wrapper" bind:clientWidth={$interactiveWidth}>
  <Nested />
</div>
