<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div class="post-list" v-for="post in posts" :key="post.post_id">
      <div class="post">
        <div class="post-header">
          <div></div>
          <div class="post-date">{{ post.create_time }}</div>
        </div>
        <img v-if="post.imageUrl" :src="post.imageUrl" class="post-image" alt="Post Image" />
        <div class="post-text">{{ post.text }}</div>
        <div class="post-footer">
        </div>
      </div>
    </div>
    <div class="container">
      <button v-if="authResult" @click="Logout" class="left">add post</button>
      <button v-if="authResult" @click="Delete" class="left">delete all posts </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "../auth";

export default {
  name: "HomeView",
  components: {
  },
  data: function () {
    return {
      posts: [],
      authResult: auth.authenticated(),
    };
  },
  methods: {
    // Метод для выхода
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', // Для работы с cookies
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('jwt removed');
          this.$router.push("/login");
        })
        .catch((e) => {
          console.log(e);
          console.log("error logout");
        });
    },
    Delete() {
        fetch("http://localhost:3000/posts/delete", {
            method: "POST",
            credentials: 'include', // Для отправки cookies (если необходимо)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log('All posts deleted');
            this.getPosts();  // Перезапуск получения постов для обновления интерфейса
        })
        .catch((e) => {
            console.log(e);
            console.log("Error deleting posts");
        });
    },

      
    getPosts() {
      fetch("http://localhost:3000/posts", {
        method: "GET",
        credentials: 'include', 
      })
        .then((response) => response.json())
        .then((data) => {
          this.posts = data; 
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    },
  },
  mounted() {
    this.getPosts(); 
  },
};
</script>

<style scoped>
body {
  margin: 20px 40px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  background: #fafafa;
  position: relative;
}

.post-list {
  background-color: #d3d3d3;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    resize: none;
    width: 400px; 
}

h3 {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  color: #444;
  background: #7e9756;
}

p {
  background: #796dbd;
}

h1,
h2,
h3,
h4,
ul,
li,
a,
input,
label,
button,
div,
footer {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  color: #444;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 80px;
}

input {
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}

label {
  display: block;
  margin: 20px 0 10px;
}

button {
  margin-top: 30px;
  border-radius: 36px;
  background: #FEE996;
  border: 0;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
}

nav {
  display: flex;
  align-items: center;
}


.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%;
}

.container {
  display: flex;
  justify-content: center;
}
</style>
