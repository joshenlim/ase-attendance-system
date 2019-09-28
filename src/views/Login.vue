<template>
  <div class="home">
    <div class="card" v-bind:class="{ fadeInCard: showCard }">
      <p class="header">Lab Attendance Registration</p>
      <div class="field-input">
        <p>USERNAME</p>
        <input type="text" />
      </div>
      <div class="field-input">
        <p>PASSWORD</p>
        <input type="password" />
      </div>
      <div class="button button-primary" v-on:click="login" v-bind:class="{ showSpinner: loggingIn }">
        <span v-if="!loggingIn">Login</span>
        <span v-else class="loader"></span>
      </div>
    </div>
  </div>
</template>

<script src="../scripts/Login.js"></script>
<style scoped src="../styles/Login.scss" lang="scss"></style>
