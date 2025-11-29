const pg = require('pg');
const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'ICTCOORdb'
});

async function fixTeacherSection() {
  await client.connect();
  
  console.log('Setting adviser_teacher_id for section 1...');
  const result = await client.query(
    `UPDATE sections 
     SET adviser_teacher_id = 1, adviser_name = 'John Renz Panganiban Macalintal'
     WHERE id = 1 
     RETURNING id, section_name, adviser_teacher_id, adviser_name`
  );
  console.log('Updated section:', result.rows[0]);
  
  await client.end();
}

fixTeacherSection().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
