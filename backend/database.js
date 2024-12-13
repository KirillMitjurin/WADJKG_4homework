const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "parool",
    database: "testWad",
    host: "localhost",
    port: "5432"
});

const execute = async (query) => {
    try {
        const client = await pool.connect(); // Установить соединение
        const res = await client.query(query); // Выполнить запрос
        client.release(); // Освободить соединение
        return res;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const createTblQueryPost = `
    CREATE TABLE IF NOT EXISTS "posts" (
        "id" SERIAL PRIMARY KEY,
        "text" TEXT NOT NULL,
        "create_time" TIMESTAMP NOT NULL
    );`;

const insertDataQuery = `
    WITH data (text, create_time) AS (
        VALUES
            ('Tartu Town Hall Square', '2024-11-02 22:45:23'::TIMESTAMP),
            ('This post does not have a picture but is still very important to share with everyone.', '2024-11-02 17:22:47'::TIMESTAMP)
    )
    INSERT INTO posts(text, create_time)
    SELECT d.text, d.create_time
    FROM data d
    WHERE NOT EXISTS (
        SELECT 1
        FROM posts p
        WHERE p.text = d.text AND p.create_time = d.create_time
    );`;

(async () => {
    const createTableResult = await execute(createTblQueryPost);
    if (createTableResult) {
        console.log('Table "posts" is created or already exists.');
    }

    const insertDataResult = await execute(insertDataQuery);
    if (insertDataResult) {
        console.log('Data inserted into "posts" table successfully.');
    } else {
        console.log('Failed to insert data into "posts" table.');
    }
})();

module.exports = pool;