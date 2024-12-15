<template>
  <div class="form">
    <h3>Sign Up</h3>
    <form @submit.prevent="SignUp">
      <label for="email">Email</label>
      <input type="email" name="email"  required v-model="email">
      <label for="password">Password</label>
      <input type="password" name="password" required v-model="password">

      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="container">
        <button @click="SignUp" class="SignUp">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
name: "SignUp", 

data: function() {
    return {
   email: '',
   password: '',
   error: '',
  }
  },
  methods: {


SignUp() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Signup failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error.message);
          this.error = error.message;
        });
    },
  }, 
};
</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto;
  background: rgb(167, 154, 154);
  text-align: left;
  padding: 40px;
  border-radius: 20px;
  font-size: 1.2em;
}
h3 {
  text-align: center;
  color: rgb(8, 78, 110);
}
p {
  color: darkred;
}
label {
  color: rgb(8, 78, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: black;
  border-radius: 4px;
}
button {
  background: rgb(58, 118, 140);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background: rgb(0, 98, 120);
}
.SignUp {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 50%; 
}
.container {
  display: flex;
  justify-content: center;
}
</style>