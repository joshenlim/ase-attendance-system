<template>
  <div class="card">
    <p class="header">Login to the system:</p>
    <div class="field-input">
      <p>Username:</p>
      <input type="text" />
    </div>
    <div class="field-input">
      <p>Password:</p>
      <input type="password" />
    </div>
    <div class="button button-primary">
      Log In
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginCard',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles/card';
@import '@/styles/fields';
@import '@/styles/button';

.card {
  text-align: left;
  width: 300px;
  margin: 0 auto;
}

.button {
  margin: 0 auto;
  margin-top: 25px;
  width: 100px;
}
</style>
