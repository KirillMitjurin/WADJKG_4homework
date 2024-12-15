<template>
  <div class="flex-container">
    <div class="flex-side"></div>

    <div class="content">
      <div class="header">
        <button v-if="authResult" @click="Logout" class="logout-button">Logout</button>
      </div>
      <div v-for="post in posts" :key="post.id" class="post-list">
        <div class="post" @click="editPost(post)">
          <div class="post-header">
            <div></div>
            <div class="post-date">{{ post.formattedDate }}</div>
          </div>
          <div class="post-text">{{ post.text }}</div>
        </div>
      </div>
      <div class="button-container">
        <router-link :to="{ name: 'addPost' }">
          <button class="action-button">Add Post</button>
        </router-link>
        <button v-if="authResult" @click="Delete" class="action-button">Delete All Posts</button>
      </div>
    </div>

    <div class="flex-side"></div>
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
          this.posts = data.map((post) => ({
            ...post,
            formattedDate: this.formatDate(post.create_time),
          }));
        })
        .catch((error) => console.error("Error fetching posts:", error));
    },

    formatDate(isoString) {
      const date = new Date(isoString);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
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
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px;
  height: 100vh;
}

.flex-side {
  flex: 1; 
  max-width: 400px;
  padding: 20px;
  text-align: center;
  margin: 10px;
  border-radius: 15px;
  background-color: lightgray;
  height: 90%;
}

.content {
  flex: 0 0 600px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.logout-button {
  background-color: rgb(58, 118, 140);
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  color: white;
}

.logout-button:hover {
  background-color: rgb(0, 98, 120);
}

.post {
  width: 400px;
  max-width: 400px;
  padding: 20px;
  margin-top: 2%;
  background-color: #e0e0e0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  word-wrap: break-word;
  overflow-wrap: break-word;

}


.post-text {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.post-date {
  text-align: right;
  font-size: 14px;
  color: #000000;

}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
}

.action-button {
  background-color: rgb(58, 118, 140);
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  color: white;
}

.action-button:hover {
  background-color: rgb(0, 98, 120);
}
</style>
