<template>
  <div>
    <CreateDetail v-on:add-note="addNote" />

    <h2>Results: </h2>

    <ul class="note-list">
      <li 
      class="note-item"
      :key="note.id"
      v-for="note in notes"
      >
      Sim: {{ note.sim }} 
      Car: {{ note.car }}
      Track: {{ note.track }}
      Setup: {{ note.setup }}
      Goals: {{ note.goals }}
      Time: {{ note.time }}
      Session: {{ note.session }}
      Notes: {{ note.notes }}
      </li>
    </ul>
  </div>
  
</template>

<script>
import axios from 'axios';
import CreateDetail from '@/components/CreateDetail.vue';

export default {
  name: 'NotesList',
  components: {
    CreateDetail,
  },
  props: ['noteslist'],
  data() {
    return {
      notes: []
    }
  },
  created() {
    let uri = 'http://localhost:3000/notes';
    axios.get(uri)
      .then(res => {
        this.notes = res.data
      })
  },
  methods: {
    addNote(newNote) {
      const {
        sim, 
        car, 
        track, 
        setup,
        goals,
        time, 
        session,
        notes,
      } = newNote
      axios.post('/api/notes', {
        sim,
        car,
        track,
        setup,
        goals,
        time,
        session,
        notes
      }).then(res => this.notes.push(newNote))
    }
  }

}
</script>

<style scoped>

</style>