import fs from 'fs';
import path from 'path';
import pool from './db'; // Adjust the path according to your project structure

async function createTables() {
  const schemaPath = path.join(__dirname, 'schema.sql'); // Adjust the path if needed

  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  pool.query(schema, (error, results) => {
    if (error) {
      console.error("Error creating tables:", error);
    } else {
      console.log("Tables created successfully");
    }
  });
}

// Call this function when your application starts
createTables();
