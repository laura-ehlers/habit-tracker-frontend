<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['add-habit'])

const showModal = ref(false)

const addHabitForm = reactive({
  habit_name: '',
  category: '',
  periodicity: '',
  checked: false,
  streak: 1
})

const handleAddSubmit = () => {
  const payload = {
    habit_name: addHabitForm.habit_name,
    category: addHabitForm.category,
    periodicity: addHabitForm.periodicity,
    checked: addHabitForm.checked,
    streak: addHabitForm.streak
  }
  addHabit(payload)
  initForm()
}

const addHabit = (habit) => {
  const path = 'http://127.0.0.1:5000/habits'
  axios
    .post(path, habit)
    .then(() => {
      emit('add-habit')
      toggleShowModal()
    })
    .catch((error) => {
      console.log(error)
    })
}
const initForm = () => {
  addHabitForm.habit_name = ''
  addHabitForm.author = ''
  addHabitForm.category = []
}

const toggleShowModal = () => {
  showModal.value = !showModal.value
}

const handleAddReset = () => {
  initForm()
}
</script>

<template>
  <!-- Open the modal using ID.showModal() method -->
  <button class="btn btn-success my-2" @click="toggleShowModal">Add Habit</button>
  <dialog
    id="add_habit_modal"
    class="modal modal-bottom sm:modal-middle"
    :class="{ 'modal-open': showModal }"
  >
    <div class="modal-box">
      <h3 class="font-bold text-lg my-4">Fill out the fields to add a habit!</h3>
      <form>
        <div>
          <label for="habit_name" class="form-label block uppercase text-xs font-bold mt-2"
            >Habit name:</label
          >
          <input
            type="text"
            id="habit_name"
            placeholder="Enter the habit name"
            class="input input-bordered w-full max-w-xs my-3"
            v-model="addHabitForm.habit_name"
            required
          />
        </div>
        <div>
          <label for="category" class="form-label block uppercase text-xs font-bold mt-3"
            >Category:</label
          >
          <input
            type="text"
            id="category"
            placeholder="Enter the habit category"
            class="input input-bordered w-full max-w-xs my-2"
            v-model="addHabitForm.category"
            required="true"
          />
        </div>
        <div>
          <label for="periodicity" class="form-label block uppercase text-xs font-bold mt-3"
            >Periodicity:</label
          >
          <select
            id="periodicity"
            class="select select-bordered w-full max-w-xs my-2"
            v-model="addHabitForm.periodicity"
            required
          >
            <option disabled selected>What is the periodicity?</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
        </div>
      </form>
      <div class="modal-action">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            @click="toggleShowModal"
          >
            ✕
          </button>
        </form>
        <button type="submit" class="btn btn-success" @click="handleAddSubmit">Submit</button>
        <button type="reset" class="btn btn-error" @click="handleAddReset">Reset</button>
      </div>
    </div>
  </dialog>
</template>
