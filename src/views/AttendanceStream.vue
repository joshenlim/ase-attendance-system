<template>
  <div class="attendance">
    <h1 class="header">Lab Attendance Registration</h1>
    <div class="container">

      <div class="card fix-card-width">
        <div class="course-detail-line">
          <p class="title">Course:</p>
          <p class="description">{{ code }} - {{ course }}</p>
        </div>
        <div class="course-detail-line">
          <p class="title">Venue:</p>
          <p class="description">{{ venue }}</p>
        </div>
        <div class="course-detail-line">
          <p class="title">Group:</p>
          <p class="description">{{ group }}</p>
        </div>
        <div class="course-detail-line">
          <p class="title">Session:</p>
          <p class="description">Lab {{ session }}</p>
        </div>
        <div class="course-detail-line">
          <p class="title">Timing:</p>
          <p class="description">{{ day }}; {{ startTime }} - {{ endTime }}</p>
        </div>
      </div>

      <div class="cam-container">
        <div class="video-loading" v-if="!detectionReady">Initializing Facial Identifier</div>
        <video class="video-stream" ref="cam" v-bind:class="{ blurVideo: !detectionReady }" autoplay muted playsinline></video>
        <canvas class="video-overlay" ref="overlay" width=400 height=500></canvas>
      </div>

      <div class="column">
        <div class="card fix-card-width">
          <p class="title">Registered Student</p>

          <!-- Empty State -->
          <div class="detected-student" v-if="detected === ''">
            <div class="thumbnail" :style="{ backgroundImage: `url(${avatarUrl})` }"></div>
            <div class="student-details">
              <p class="no-student">No Student Detected</p>
            </div>
          </div>

          <!-- Error State -->
          <div class="detected-student" v-else-if="detected === 'unknown'">
            <div class="thumbnail" :style="{ backgroundImage: `url(${avatarUrl})` }"></div>
            <div class="student-details">
              <p class="no-student">Unknown Student Detected</p>
            </div>
          </div>

          <!-- Success State -->
          <div class="detected-student" v-else>
            <div class="thumbnail" :style="{ backgroundImage: `url(${avatarUrl})` }"></div>
            <div class="student-details">
              <p>{{ detected.matric }}</p>
              <p>{{ detected.name }}</p>
              <p><span>Lab Seat: </span>{{ detected.seat }}</p>
            </div>
          </div>

        </div>

        <div class="card fix-card-width participants">
          <p class="title">Participants ({{ studentList.length }})</p>
          <ul class="student-list">
            <li class="student" v-for="student in studentList" v-bind:key="student.seat">
              <div class="name">
                <input type="checkbox" :checked="student.attendance == 1" disabled/>
                <span>{{ student.name }}</span>
              </div>
              <div>{{ student.seat }}</div>
            </li>
          </ul>
        </div>
      </div>

    </div>
    
    <a class="back-btn" v-on:click="selectLabGroup">Back</a>

  </div>
</template>

<script src="../scripts/AttendanceStream.js"></script>
<style src="../styles/AttendanceStream.scss" scoped lang="scss"></style>