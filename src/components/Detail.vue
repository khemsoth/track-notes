<template>
  <div class="detail-list">
    <ul
      class="detail"
      :key="detail.id"
      v-for="detail in details"
    >
      <li>
        Sim: {{ detail.sim }}
      </li>
      <li>
        Car: {{ detail.car }}
      </li>
      <li>
        Track: {{ detail.track }}
      </li>
      <li>
        Setup: {{ detail.setup }}
      </li>
      <li>
        Goals: {{ detail.goals }}
      </li>
      <li>
        Time: {{ detail.time }}
      </li>
      <li>
        Session: {{ detail.session }}
      </li>
      <li>
        Notes: {{ detail.notes }}
      </li>
    </ul>    
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Detail',
  props: {

  },
  data() {
    return {
      details: []
    }
  },
  created() {
    let uri = 'http://localhost:3000/notes';
    axios.get(uri)
      .then(res => {
        this.details = res.data
      })
  }
}
</script>

<style scoped>

  .detail-list {
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }

  .detail > li {
    list-style-type: none;

  }

</style>