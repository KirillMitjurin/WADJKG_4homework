<template>
  <div class="add-post">
    <h2>Add Post</h2>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="body">Body</label>
        <input
          type="text"
          id="body"
          v-model="postBody"
          placeholder="Enter post body"
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "addPost",
  data() {
    return {
      postBody: "", // Input field model
    };
  },
  methods: {
    // Send POST request to add a new post
    async submitPost() {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Send cookies for authentication
          body: JSON.stringify({ text: this.postBody }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error adding post:", error);
          alert(error.error || "Failed to add post");
        } else {
          alert("Post added successfully!");
          this.$router.push("/"); // Redirect to Home page
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },
  },
};
</script>

<style scoped>
.add-post {
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

button {
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
