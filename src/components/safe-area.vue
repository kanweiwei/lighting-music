<template>
  <div class="safe-area"></div>
</template>

<script>
export default {};
</script>

<style>
.safe-area {
  padding-top: constant(safe-area-inset-top) !important;
  padding-top: env(safe-area-inset-top) !important;
}
</style>