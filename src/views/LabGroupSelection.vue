<template>
  <div class="about">
    <div class="card">
      <p class="header">Select Course Details</p>

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
        <p>COURSE INDEX</p>
        <input v-model="selectedCourseIndex" @click="toggleIndexList()" class="prevent-highlight" type="text" readonly />
        <ul class="search-list" v-bind:class="{ showSearchList: showIndexList }">
          <li v-for="index in selectedCourse.index" v-bind:key="index" v-on:click="selectIndex(index)">
            {{ index }}
          </li>
        </ul>
      </div>

      <div class="button-group">
        <div class="button" v-bind:class="{ hideButton: launching }">
          <router-link to="/">Back</router-link>
        </div>
        <div class="button button-primary" v-on:click="launchAttendance" v-bind:class="{ showSpinner: launching }">
          <span v-if="!launching">Launch</span>
          <span v-else class="loader"></span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script src="../scripts/LabGroupSelection.js"></script>
<style scoped src="../styles/LabGroupSelection.scss" lang="scss"></style>