<template>
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
}
nav a {
  font-weight: bold;
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
}
</style>
