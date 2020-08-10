<script>
  import Nested from './Nested.svelte';
  export let name;
</script>

<style lang="less">
  div {
    h1 {
      color: steelblue;
    }
  }
</style>

<div>
  <h1>Hello {name}!</h1>
  <Nested />
</div>
