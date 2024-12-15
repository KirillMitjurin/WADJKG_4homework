<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <footer class="footer">
    </footer>
  </div>
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
  color: #2c3e50;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}



footer {
  margin-top: 2%;
  padding: 20px;
  background-color: lightgray;
  color: #fff;
  text-align: center;
}

</style>
