<template>
  <div class="home">
    <NotesList />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateDetail from '@/components/CreateDetail.vue';
import NotesList from '@/components/NotesList.vue';

export default {
  name: 'Home',
  components: {
    CreateDetail,
    NotesList
  }
}
</script>
