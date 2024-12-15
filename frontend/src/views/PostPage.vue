<template>
  <div class="post-page">
    <h2>A Post</h2>
    <form @submit.prevent="updatePost">
      <div class="form-group">
        <label for="body">Body</label>
        <input
          type="text"
          id="body"
          v-model="postBody"
          placeholder="Enter updated post body"
          required
        />
      </div>
      <div class="button-group">
        <button type="submit">Update</button>
        <button type="button" @click="deletePost">Delete</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostPage",
  data() {
    return {
      postBody: "", // Holds the body of the post
      postId: this.$route.params.id, // Get the ID from the route
    };
  },
  methods: {
    // Fetch the specific post
    async fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${this.postId}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        this.postBody = data.text;
      } catch (err) {
        console.error(err.message);
        alert("Failed to load post. Please try again.");
        this.$router.push("/");
      }
    },
    // Update the post
    async updatePost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${this.postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ text: this.postBody }),
        });
        if (!response.ok) throw new Error("Failed to update post");
        alert("Post updated successfully!");
<<<<<<< HEAD
        this.$router.push("/");
=======
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
      } catch (err) {
        console.error(err.message);
        alert("Failed to update post. Please try again.");
      }
    },
    // Delete the post
    async deletePost() {
      if (!confirm("Are you sure you want to delete this post?")) return;
      try {
        const response = await fetch(`http://localhost:3000/posts/${this.postId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to delete post");
        alert("Post deleted successfully!");
        this.$router.push("/");
      } catch (err) {
        console.error(err.message);
        alert("Failed to delete post. Please try again.");
      }
    },
  },
  mounted() {
    this.fetchPost(); // Fetch the post data when the component is mounted
  },
};
</script>

<style scoped>
.post-page {
  margin: 50px auto;
  max-width: 400px;
  text-align: center;
  background: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #444;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #339266;
}
</style>
