<template>
  <div class="all">
    <form v-on:submit="addNote" class="create-detail-form">
      <div class="detail">
      <label for="sim" class="detail-label">Sim: </label>
        <select v-model="notes.sim" name="sim" class="dropdown">
          <option value="" disabled></option> 
          <option 
          v-for='sim in sims' 
          :key="sim.name"
          >{{sim.name}}</option>
        </select>
      </div>
      <div class="detail">
      <label for="car">Car: </label>
        <input v-model="notes.car" type="text" name="car" placeholder="Ford GT GTE">
      </div>
      <div class="detail">
      <label for="track">Track: </label>
        <input v-model="notes.track" type="text" name="track" placeholder="Hungaroring">
      </div>
      <div class="detail">
      <label for="setup">Setup Name: </label>
        <input v-model="notes.setup" type="text" name="setup" placeholder="Race Dry">
      </div>
      <div class="detail">
      <label for="time">Time: </label>
        <input v-model="notes.time" type="text" name="time" placeholder="HH:MM:SS.XXX">
      </div>
      <div class="detail">
      <label for="session">Session: </label>
        <input v-model="notes.session" type="text" name="session" placeholder="Practice">
      </div>
      <div class="detail">
      <label for="goals">Goals: </label>
        <textarea v-model="notes.goals" type="text" name="goals" placeholder="Become familiar with car"></textarea>
      </div>
      <div class="detail">
      <label for="notes">Notes: </label>
        <textarea v-model="notes.notes" name="notes" cols="30" rows="10" placeholder="Results/Fastest lap/Other details"></textarea>
      </div>

      <input type="submit" value="Add New Note" class="add-btn">
    </form>
  </div>
  
</template>

<script>
import axios from 'axios';


export default {
  name: 'CreateDetail',
  props: {

  },
  data() {
    return {
      sims: [],
      notes: {
        sim: '',
        car: '',
        track: '',
        setup: '',
        goals: '',
        time: '',
        session: '',
        notes: ''
      }
    }
  },
  created() {
    let uri = 'http://localhost:3000/sims';
    axios.get(uri)
      .then(res =>{
        this.sims = res.data;
        this.sims.sort((a, b) => (a.name > b.name) ? 1 : -1);
      })
  },
  methods: {
    addNote(event) {
      event.preventDefault();
      const newNote = {
        sim: this.notes.sim,
        car: this.notes.car,
        track: this.notes.track,
        setup: this.notes.setup,
        goals: this.notes.goals,
        time: this.notes.time,
        session: this.notes.session,
        notes: this.notes.notes
      };
      this.$emit('add-note', newNote);
      this.notes.sim = '';
      this.notes.car = '';
      this.notes.track = '';
      this.notes.setup = '';
      this.notes.goals = '';
      this.notes.time = '';
      this.notes.session = '';
      this.notes.notes = '';
      /*
      axios.post(uri, note)
        .then(res => {
          console.log('new note saved'); 
          this.sims.sim = '';
          this.sims.car = '';
          this.sims.track = '';
          this.sims.setup = '';
          this.sims.goals = '';
          this.sims.time = '';
          this.sims.session = '';
          this.sims.notes = '';
        });
        /*
      let url = 'http://localhost:3000/sims';
        console.log(this.sims);
        axios.get(url)
          .then(res =>{
            this.sims = res.data;
            this.sims.sort((a, b) => (a.name > b.name) ? 1 : -1);
      })*/
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
 }
form > select {
  width: 100%;
}
.detail {
  width: 100vw;
}
</style>