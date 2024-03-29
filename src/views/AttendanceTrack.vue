<template>
  <div class="attendance-track">

    <div class="notification-bar" v-bind:class="[{'show-notif': showNotif}, notification.status]">
      {{ notification.message }}
    </div>

    <div class="modal" v-bind:class="{ 'modal-open': showModal }">
      <div class="window">
        <img class="close" src="../assets/close.svg" @click="toggleEmailPopup()"/>
        <p class="title">Email Notification for Absentees</p>
        <div class="field-input">
          <p>Subject</p>
          <input v-model="emailSubject" type="text" />
        </div>
        <div class="field-input">
          <p>Recipients</p>
          <input v-model="selectedSession" @click="toggleSessionList()" class="dropdown" type="text" readonly />
          <ul class="search-list" v-bind:class="{ showSearchList: showSessionList }">
            <li v-for="session in selectedCourse.sessions" v-bind:key="session" v-on:click="selectSession(session)">
              {{ session }} Absentees
            </li>
          </ul>
        </div>

        <div class="recipient-list" v-if="emailRecipients.length > 0">
          <div class="recipient" v-for="recipient in emailRecipients" v-bind:key="recipient.name">{{ recipient.email }}</div>
        </div>

        <div class="recipient-list" v-else>
          No absentees in this lab group
        </div>

        <div class="field-input">
          <p>Message</p>
          <textarea v-model="emailMessage" rows="4"/>
        </div>

        <div class="button button-primary" style="margin-top: 20px;" v-bind:class="{'disable-send': emailRecipients.length == 0, showSpinner: sendStatus == 'sending', 'btn-success': sendStatus == 'success'}" @click="sendEmailNotif()">
          <span v-if="sendStatus == null">Send Email</span>
          <span v-else-if="sendStatus == 'sending'" class="loader"></span>
          <span v-else-if="sendStatus == 'success'">Successfully Sent Emails!</span>
        </div>
      </div>
    </div>

    <h1 class="header">Attendance Track</h1>

    <div class="row">
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

      <div class="other-actions">
        <div class="button push-notif-btn" @click="toggleEditAttendance()" v-bind:class="{ 'btn-disabled': !selectedCourseGroup}">
          <img src="../assets/edit-icon.svg" />
          <span v-if="!editAttendance">Edit Attendance</span>
          <span v-else>Stop Editting</span>
        </div>

        <div class="button push-notif-btn" @click="toggleEmailPopup()" v-bind:class="{ 'btn-disabled': !selectedCourseGroup}">
          <img src="../assets/email-icon.svg" />
          <span>Send Email Alert</span>
        </div>
      </div>
    </div>

    <div class="headers">
      <div class="column id">No.</div>
      <div class="column matric">Matric. No.</div>
      <div class="column thumbnail">Img</div>
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
        <div class="column thumbnail">
          <div @mouseover="showThumbnailPopup(student.matric)" @mouseleave="closeThumbnailPopup()" class="thumbnail-image" :style="{'background-image': `url(\'${getThumbnail(student.matric)}\')`}"></div>
          <div class="thumbnail-popup" v-bind:class="{'show-popup': activeThumbnailPopup == student.matric}">
            <img :src="`${getThumbnail(student.matric)}`" />
          </div>
        </div>
        <div class="column">{{ student.name }}</div>
        <div class="column lab-att" v-for="(status, session) in student.attendance" v-bind:key="session">
          {{ attendanceStatus[status] }}
          <span v-if="editAttendance" v-on:click="selectStudentAtt(student, session)">
            <img src="@/assets/dropdown.svg" />
          </span>
          <ul class="search-list att-status-list" v-bind:class="{ showSearchList: activeEdit.student == student.matric && activeEdit.session == session }">
            <li v-for="status in attendanceStatus" v-bind:key="status" v-on:click="updateStudentAtt(student, session, status)">
              {{ status }}
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <div class="empty-table" v-else>
      <p>Lab Group has no students assigned to it</p>
    </div>

    <a class="back-btn" @click="$router.go(-1)">
      Back
    </a>
  </div>
</template>

<script src="../scripts/AttendanceTrack.js"></script>
<style src="../styles/AttendanceTrack.scss" scoped lang="scss"></style>