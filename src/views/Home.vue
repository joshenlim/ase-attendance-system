<template>
  <div class="home">
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
