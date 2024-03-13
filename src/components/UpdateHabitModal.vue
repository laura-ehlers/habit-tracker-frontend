<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
const emit = defineEmits(['update-habit'])
const showModal = ref(false)
const props = defineProps(['habit'])

const updateHabitForm = reactive({
  updated_habit_name: props.habit.habit_name,
  updated_category: props.habit.category,
  updated_periodicity: props.habit.periodicity,
  checked: false,
  streak: 1
})

const handleUpdateSubmit = () => {
  const payload = {
    habit_name: updateHabitForm.updated_habit_name,
    category: updateHabitForm.updated_category,
    periodicity: updateHabitForm.updated_periodicity,
    checked: updateHabitForm.checked,
    streak: updateHabitForm.streak
  }
  updateHabit(payload, props.habit.id)
  initForm()
}

const updateHabit = (habit, habitID) => {
  const path = `http://127.0.0.1:5000/habits/${habitID}`
  axios
    .put(path, habit)
    .then(() => {
      emit('update-habit')
      toggleShowModal()
    })
    .catch((error) => {
      console.log(error)
    })
}
const initForm = () => {
  updateHabitForm.updated_habit_name = ''
  updateHabitForm.updated_category = ''
  updateHabitForm.updated_periodicity = []
}

const toggleShowModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <!-- Open the modal using ID.showModal() method -->
  <button class="btn btn-warning" @click="toggleShowModal">Update</button>
  <dialog
    id="update_habit_modal"
    class="modal modal-bottom sm:modal-middle"
    :class="{ 'modal-open': showModal }"
  >
    <div class="modal-box">
      <h3 class="font-bold text-lg my-4">Fill out the fields to update the habit!</h3>
      <form>
        <div>
          <label for="habit_name" class="form-label block uppercase text-xs font-bold mt-2"
            >Habit name:</label
          >
          <input
            type="text"
            id="habit_name"
            class="input input-bordered w-full max-w-xs my-3"
            v-model="updateHabitForm.updated_habit_name"
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
            class="input input-bordered w-full max-w-xs my-2"
            v-model="updateHabitForm.updated_category"
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
            v-model="updateHabitForm.updated_periodicity"
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
        <button type="submit" class="btn btn-success" @click="handleUpdateSubmit">Update</button>
      </div>
    </div>
  </dialog>
</template>
