<template>
  <div class="page page-play">

    <div class="overlay overlay-game">
      <h1>{{ title }}</h1>
      <div class="cam-container">
        <video class="video-stream" ref="cam" autoplay muted playsinline></video>
        <canvas class="video-overlay" ref="overlay" width=400 height=500></canvas>
      </div>
    </div>

    <!-- <div :class="['overlay', 'overlay-finished', { 'overlay-visible': showFinished }]">
      <div class="gameover">
        Game over!
      </div>
      <div class="result">
        You lasted: {{finalTime}}
      </div>
      <div class="buttons">
        <button class="btn btn-start">
          Make an angry face to try again! 😠😠😠
        </button>
      </div>
    </div> -->

    <!-- <div :class="['overlay', 'overlay-laugh', { 'overlay-visible': showLaugh }]">
      <div class="smiley">😠</div>
    </div> -->

    <!-- <div :class="['overlay', 'overlay-countdown', { 'overlay-visible': showCountdown }]">
      <Countdown ref="countdown" initialNumber="3" />
    </div> -->

  </div>
</template>

<script src="../scripts/AttendanceStream.js"></script>
<style src="../styles/AttendanceStream.scss" lang="scss"></style>