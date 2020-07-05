<template>
  <div>
    Login Page

    <form action="http://localhost:3000/login" method="POST" >
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
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
      console.log(this.user.username)
      e.preventDefault()
      const user = {
        username: this.user.username,
        password: this.user.password
      }
      axios.post('http://localhost:3000/login', {
        username,
        password
      })
    }
  }
}
</script>
