<template>
  <div class="attendance">
    <h1 class="header">Lab Attendance Registration</h1>
    <div class="container">

      <div class="card fix-card-width">
        <div class="course-detail-line">
          <p class="title">Course:</p>
          <p class="description">{{ code }}</p>
        </div>
        <div class="course-detail-line">
          <p class="title">Group:</p>
          <p class="description">{{ group }}</p>
        </div>
      </div>

      <div class="cam-container">
        <video class="video-stream" ref="cam" autoplay muted playsinline></video>
        <canvas class="video-overlay" ref="overlay" width=400 height=500></canvas>
      </div>

      <div class="card fix-card-width">

      </div>

    </div>
    
    <router-link class="back-btn" to="/lab-select">Back</router-link>

  </div>
</template>

<script src="../scripts/AttendanceStream.js"></script>
<style src="../styles/AttendanceStream.scss" scoped lang="scss"></style>