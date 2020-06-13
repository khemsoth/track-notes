<template>
  <div class="home">
    <CreateDetail />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateDetail from '@/components/CreateDetail.vue'

export default {
  name: 'Home',
  components: {
    CreateDetail
  }
}
</script>
