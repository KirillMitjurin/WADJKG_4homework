const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json()); 
app.use(cookieParser());

const secret = "gdgdhdbcb770785rgdzqws"; // Move this to an environment variable for security.
const maxAge = 60 * 60; // JWT expires in 1 hour.

const generateJWT = (id) => jwt.sign({ id }, secret, { expiresIn: maxAge });

// Server startup
app.listen(port, () => {
    console.log("Server is listening to port " + port);
});

// Authentication check
app.get('/auth/authenticate', (req, res) => {
    const token = req.cookies.jwt;
    let authenticated = false;

<<<<<<< HEAD
    if (token) {
        jwt.verify(token, secret, (err) => {
            if (!err) authenticated = true;
            res.send({ authenticated });
        });
    } else {
        res.send({ authenticated });
=======
// is used to check whether a user is authenticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('Authentication request arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('Token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('User is authenticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('User is NOT authenticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
    }
});

// User signup
app.post('/auth/signup', async (req, res) => {
    try {
<<<<<<< HEAD
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password, salt);

        const authUser = await pool.query(
            "INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *", 
            [email, bcryptPassword]
=======
        console.log("Signup request arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            console.log("User already exists");
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
        );

        const token = generateJWT(authUser.rows[0].id);
        res.status(201)
           .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
           .json({ user_id: authUser.rows[0].id });
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// User login
app.post('/auth/login', async (req, res) => {
    try {
<<<<<<< HEAD
=======
        console.log("Login request arrived");
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
<<<<<<< HEAD
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });
=======
        //console.log("validPassword:" + validPassword);
        if (!validPassword) {
            console.log("Incorrect password");
            return res.status(401).json({ error: "Incorrect password" });
        }
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3

        const token = generateJWT(user.rows[0].id);
        res.status(201)
           .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
           .json({ user_id: user.rows[0].id });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await pool.query('SELECT * FROM posts');
        res.status(200).json(posts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a specific post by ID
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (post.rows.length === 0) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

<<<<<<< HEAD
// Add a new post
app.post('/posts', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, secret);
        const { text } = req.body;
        const create_time = new Date();
=======

// Add a new post
app.post('/posts', async (req, res) => {
    const token = req.cookies.jwt; // Check the JWT token
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, secret); // Verify JWT
        const { text } = req.body; // Extract post body from request
        const create_time = new Date(); // Use current timestamp
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3

        if (!text) return res.status(400).json({ error: "Post body is required" });

        const result = await pool.query(
<<<<<<< HEAD
            "INSERT INTO posts (text, create_time) VALUES ($1, $2) RETURNING *", 
=======
            "INSERT INTO posts (text, create_time) VALUES ($1, $2) RETURNING *",
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
            [text, create_time]
        );

        res.status(201).json({ post: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

<<<<<<< HEAD
// Update a specific post by ID
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        if (!text) return res.status(400).json({ error: "Post body is required" });

        const result = await pool.query(
            "UPDATE posts SET text = $1 WHERE id = $2 RETURNING *", 
            [text, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: "Post not found" });
        res.status(200).json({ post: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete ALL posts
app.post('/posts/delete', async (req, res) => { 
    try {
        await pool.query('TRUNCATE TABLE posts RESTART IDENTITY');
        res.status(200).json({ message: 'All posts deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

=======
>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
// Delete a specific post by ID
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Post not found" });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

<<<<<<< HEAD
// Logout a user (clears JWT)
app.get('/auth/logout', (req, res) => {
    res.status(202).clearCookie('jwt').json({ message: "Cookie cleared" });
});
=======

// Logout a user = delete the jwt
app.get('/auth/logout', (req, res) => {
    console.log('Delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
}); 

// Update a specific post by ID
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        if (!text) return res.status(400).json({ error: "Post body is required" });

        const result = await pool.query(
            "UPDATE posts SET text = $1 WHERE id = $2 RETURNING *",
            [text, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Post not found" });

        res.status(200).json({ post: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

>>>>>>> 09a6ba01779c683b905ba572dd15df644ef18dc3
