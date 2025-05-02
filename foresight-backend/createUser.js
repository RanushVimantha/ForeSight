const db = require('./db');
const bcrypt = require('bcryptjs');

async function createUser() {
  const username = 'admin';
  const plainPassword = 'password123';
  const role = 'admin';

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await db.query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hashedPassword, role]
  );

  console.log('Admin user created successfully!');
  process.exit();
}

createUser();
