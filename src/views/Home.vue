<template>
  <div class="home">
    <h1>Lab Attendance Registration System</h1>
    <LoginCard />
  </div>
</template>

<script>
import LoginCard from '@/components/LoginCard.vue'

export default {
  name: 'home',
  components: {
    LoginCard
  }
}
</script>

<style scoped lang="scss">
h1 {
  margin-top: -50px;
  font-weight: 500;
  margin-bottom: 50px;
}
</style>
