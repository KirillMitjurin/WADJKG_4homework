<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div v-for="post in posts" :key="post.id" class="post-list">
      <div class="post" @click="editPost(post)">
        <div class="post-header">
          <div></div>
          <div class="post-date">{{ post.create_time }}</div>
        </div>
        <img v-if="post.imageUrl" :src="post.imageUrl" class="post-image" alt="Post Image" />
        <div class="post-text">{{ post.text }}</div>
        <div class="post-footer"></div>
      </div>
    </div>
    <div class="container">
      <router-link :to="{ name:'addPost'}"> 
        <button class="left">Add Post </button> 
      </router-link>
      <button v-if="authResult" @click="Delete" class="left">Delete All Posts</button>
    </div>
  </div>
</template>

<script>
import auth from "../auth";

export default {
  name: "HomeView",
  data() {
    return {
      posts: [],
      authResult: auth.authenticated(),
    };
  },
  methods: {
    // Logout handler
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(() => {
          console.log("JWT removed");
          this.$router.push("/login");
        })
        .catch((e) => console.error("Error during logout", e));
    },
    // Delete all posts
    Delete() {
      fetch("http://localhost:3000/posts/delete", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => response.json())
        .then(() => {
          console.log("All posts deleted");
          this.getPosts(); // Refresh post list
        })
        .catch((e) => console.error("Error deleting posts", e));
    },
    // Fetch posts from the server
    getPosts() {
      fetch("http://localhost:3000/posts", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.posts = data;
        })
        .catch((error) => console.error("Error fetching posts:", error));
    },
    // Redirect to post details
    editPost(post) {
        this.$router.push(`/posts/${post.id}`); 
      },
    // Placeholder for AddPost
    AddPost() {
      console.log("Add post functionality not yet implemented.");
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style scoped>
/* Your existing styles, slightly cleaned up for clarity */
body {
  margin: 20px 40px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  background: #fafafa;
}

.post-list {
  background-color: #d3d3d3;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
  cursor: pointer;
}

.post-list:hover {
  background-color: #c3c3c3;
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
  font-family: "Quicksand", sans-serif;
  color: #444;
}

button {
  margin-top: 30px;
  border-radius: 36px;
  background: #fee996;
  border: 0;
  font-weight: 700;
  padding: 10px 16px;
  letter-spacing: 2px;
}

.center {
  margin: auto;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%;
}

.container {
  display: flex;
  justify-content: center;
}
</style>
