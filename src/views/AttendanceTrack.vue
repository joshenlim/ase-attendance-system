<template>
  <div class="attendance-track">
    <h1 class="header">Attendance Track</h1>

    <div class="search-fields">
      <div class="field-input">
        <p>COURSE CODE</p>
        <input v-model="courseCodeSearch" @input="searchCourseCode()" @click="toggleSearch()" type="text" />
        <ul class="search-list" v-bind:class="{ showSearchList: (courseCodeSearch.length > 0 && showSearch) }">
          <li v-for="course in courseFilterResults" v-bind:key="course.code" v-on:click="selectCourse(course)">
            {{ course.code }} - {{ course.name }}
          </li>
        </ul>
      </div>

      <div class="field-input">
        <p>LAB GROUP</p>
        <input v-model="selectedCourseGroup" @click="toggleGroupList()" class="dropdown" type="text" readonly />
        <ul class="search-list" v-bind:class="{ showSearchList: showGroupList }">
          <li v-for="group in selectedCourse.groups" v-bind:key="group" v-on:click="selectGroup(group)">
            {{ group }}
          </li>
        </ul>
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

    <div class="empty-table" v-if="!studentList">
      <p>Select a Course Code to begin viewing attendance records</p>
    </div>

    <ul class="attendance-table" v-else-if="studentList.length > 0">
      <li class="row" v-for="(student, index) in studentList" v-bind:key="student.matric">
        <div class="column id">{{ index + 1 }}</div>
        <div class="column matric">{{ student.matric }}</div>
        <div class="column">{{ student.name }}</div>
        <div class="column lab-att" v-for="(status, session) in student.attendance" v-bind:key="session">
          {{ attendanceStatus[status] }}
        </div>
      </li>
    </ul>

    <div class="empty-table" v-else>
      <p>Lab Group has no students assigned to it</p>
    </div>

    <router-link class="icon-link" to="/lab-select">
      Back
    </router-link>
  </div>
</template>

<script src="../scripts/AttendanceTrack.js"></script>
<style src="../styles/AttendanceTrack.scss" scoped lang="scss"></style>