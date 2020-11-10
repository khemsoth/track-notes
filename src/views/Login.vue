<template>
  <div>
    Login Page

    <form action="/api/login" method="POST">
    <div>
        <label>Username:</label>
        <input type="email" id="email" name="email"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" id="password" name="password"/>
    </div>
    <div>
        <button type="submit">Login</button>
    </div>
</form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login(e) {
      e.preventDefault()
      const user = {
        username: this.user.username,
        password: this.user.password
      }
      axios.post('/api/login', user)
        .then((res) => {
          console.log('Logged in')
          this.$router.push(this.$route.query.redirect || '/')
        })
        .catch((err) => {
          console.log('Cannot log in')
        })
      this.user.username = '',
      this.user.password = ''
    },
    testLogin() {
      axios.post('/ap')
    }
  }
}
</script>
