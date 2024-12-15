<template>
<<<<<<< HEAD
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <footer class="footer">
    </footer>
  </div>
=======
  <nav class="header">
    <router-link to="/">Home</router-link> |
<!--     <router-link to="/signup">SignUp</router-link> | -->
<!--     <router-link to="/login">LogIn</router-link> | -->
    <router-link to="/about">Contact Us</router-link>
  </nav>
  <router-view />
  <footer class="footer">
    <p>Tartu 2024</p>
  </footer>
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
</template>

<style>
#app {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(8, 78, 110);
}
.header {
  background: rgb(167, 154, 154);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
}
nav {
  padding: 30px;
  background-color: lightgray;
  border-radius: 25px;
  margin: auto;
  width: 50%;
}
nav a {
  font-weight: bold;
<<<<<<< HEAD
  color: #2c3e50;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
=======
  color: rgb(0, 50, 110);
}
nav a.router-link-exact-active {
  color: rgb(0, 50, 110);
}
:hover {
  color: rgb(0, 98, 120);
}
.footer {
  background: rgb(167, 154, 154);
  padding: 10px;
  border-radius: 20px;
  text-align: center;
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
}

</style>
