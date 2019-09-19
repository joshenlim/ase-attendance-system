<template>
  <div class="page page-play">

    <div class="overlay overlay-game">
      <h1>{{ title }}</h1>
      <div class="cam-container">
        <video class="video-stream" ref="cam" autoplay muted playsinline></video>
        <canvas class="video-overlay" ref="overlay" width=400 height=500></canvas>
      </div>
    </div>

  </div>
</template>

<script src="../scripts/AttendanceStream.js"></script>
<style src="../styles/AttendanceStream.scss" lang="scss"></style>