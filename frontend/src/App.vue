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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.footer {
  margin-top: 10px;
  padding: 15px;
  background-color: lightgray;
  border-top: 1px solid #ccc;
  color: #000000;
  font-size: 14px;
  text-align: center;
  position: static;
}
</style>
