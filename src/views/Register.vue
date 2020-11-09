<template>
  <div>
    Register Page

    <form v-on:submit="registerNewUser" class="new-user-register">
      <div class="detail">
        <label for="username">Username: </label>
        <input type="text" name="username" v-model="newUser.username">
      </div>
      <div class="detail">
        <label for="password">Password: </label>
        <input type="password" name="password" v-model="newUser.password">
      </div>
      <div class="detail">
        <label for="firstName">First Name: </label>
        <input type="text" name="firstName" v-model="newUser.firstName">
      </div>
      <div class="detail">
        <label for="lastName">Last Name: </label>
        <input type="text" name="lastName" v-model="newUser.lastName">
      </div>
      <div class="detail">
        <label for="email">Email: </label>
        <input type="email" name="email" v-model="newUser.email">
      </div>

      <input type="submit" value="Register" class="add-btn">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  components: {

  },
  data() {
    return {
      newUser: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  },
  methods: {
    registerNewUser(e) {
      e.preventDefault() 
      console.log('starting new registration')
      const newUser = {
        username: this.newUser.username,
        password: this.newUser.password,
        firstName: this.newUser.firstName,
        lastName: this.newUser.lastName,
        email: this.newUser.email
      }
      console.log('new user created')
      axios.post('/api/users', 
        newUser
      ).then((res) => {console.log(res)} ,
        (err) => {console.log(err)})
      this.newUser.username = ''
      this.newUser.password = ''
      this.newUser.firstName = ''
      this.newUser.lastName = ''
      this.newUser.email = ''
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