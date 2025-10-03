import { db } from "../config/db";

export const createUsersTable = async () =>  {
    let conn;
    try { 
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();

        // Execute query to create a new table
        await conn.query("CREATE TABLE IF NOT EXISTS db1.users ( \
                        id INT(11) unsigned NOT NULL AUTO_INCREMENT, \
                        email VARCHAR(75), \
                        password VARCHAR(50) NOT NULL, \
                        PRIMARY KEY (id))");
        console.log("Users table created.");
    } catch (err) {
        // Print error
        console.log(err);
    } finally {
        // Release the connection back into the connection pool
        if (conn) await conn.release();
		db.pool.end();
    }
}