<template>
  <nav>
    <router-link to="/">Home</router-link> |
<!--     <router-link to="/signup">SignUp</router-link> | -->
<!--     <router-link to="/login">LogIn</router-link> | -->
    <router-link to="/about">Contact Us</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(8, 78, 110);
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: rgb(58, 118, 140);
}
nav a.router-link-exact-active {
  color: #42b983;
}
:hover {
  color: rgb(0, 98, 120);
}
</style>
