<template>
  <div class="attendance-track">
    <h1 class="header">Attendance Track</h1>

    <div class="search-fields">
      <div class="field-input">
        <p>COURSE CODE</p>
        <input v-model="courseCodeSearch" @input="searchCourseCode()" @click="toggleSearch()" type="text" />
      </div>

      <div class="field-input">
        <p>LAB GROUP</p>
        <input v-model="selectedCourseGroup" @click="toggleGroupList()" class="dropdown" type="text" readonly />
      </div>
    </div>

    <div class="headers">
      <div class="column id">No.</div>
      <div class="column matric">Matric. No.</div>
      <div class="column">Students</div>
      <div class="column lab-att">Lab 1</div>
      <div class="column lab-att">Lab 2</div>
      <div class="column lab-att">Lab 3</div>
      <div class="column lab-att">Lab 4</div>
      <div class="column lab-att">Lab 5</div>
    </div>
    <ul class="attendance-table">
      <li class="row" v-for="(student, index) in studentList" v-bind:key="student.matric">
        <div class="column id">{{ index + 1 }}</div>
        <div class="column matric">{{ student.matric }}</div>
        <div class="column">{{ student.name }}</div>
        <div class="column lab-att" v-for="(status, session) in student.attendance" v-bind:key="session">
          {{ attendanceStatus[status] }}
        </div>
      </li>
    </ul>

    <router-link class="icon-link" to="/lab-select">
      Back
    </router-link>
  </div>
</template>

<script src="../scripts/AttendanceTrack.js"></script>
<style src="../styles/AttendanceTrack.scss" scoped lang="scss"></style>