<script setup>
import axios from 'axios'
import { reactive, ref } from 'vue'
import AddHabitModal from './AddHabitModal.vue'
import AlertComponent from './AlertComponent.vue'
import UpdateHabitModal from './UpdateHabitModal.vue'

const msg = 'Habits Page'
const habits = ref([])
const alertState = reactive({
  showAlert: false,
  message: ''
})

const getHabits = () => {
  const path = 'http://127.0.0.1:5000/habits'
  axios
    .get(path)
    .then((res) => {
      habits.value = res.data.habits
    })
    .catch((error) => {
      console.log(error)
    })
}

function formatDate(date) {
  const d = new Date(date * 1000)
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
}

function addHabitCompleted() {
  getHabits()
  alertState.message = 'Habit successfully added!'
  alertState.showAlert = true
}

function updateHabit() {
  getHabits()
  alertState.message = 'Habit successfully updated!'
  alertState.showAlert = true
}

function handleDeleteHabit(habit) {
  deleteHabit(habit.id)
}

function deleteHabit(habitID) {
  const path = `http://127.0.0.1:5000/habits/${habitID}`
  axios
    .delete(path)
    .then(() => {
      getHabits()
      alertState.message = 'Habit successfully deleted!'
      alertState.showAlert = true
    })
    .catch((error) => {
      console.log(error)
    })
}

getHabits()
</script>

<template>
  <div>
    <h1 class="bg-red-400">{{ msg }}</h1>
    <AlertComponent v-if="alertState.showAlert" :message="alertState.message" />
    <AddHabitModal @add-habit="addHabitCompleted()" />
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr class="hover">
            <th>Habit</th>
            <th>Category</th>
            <th>periodicity</th>
            <th>Date Created</th>
            <th>Checked?</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr class="hover" v-for="(habit, idx) in habits" :key="idx">
            <td>{{ habit.habit_name }}</td>
            <td>{{ habit.category }}</td>
            <td>{{ habit.periodicity }}</td>
            <td>{{ formatDate(habit.date_created) }}</td>
            <td>{{ habit.checked }}</td>

            <td>
              <div class="btn-group flex space-x-2" role="group">
                <UpdateHabitModal @update-habit="updateHabit" :habit="habit" />
                <button type="button" class="btn btn-error" @click="handleDeleteHabit(habit)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
