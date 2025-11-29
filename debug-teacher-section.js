const pg = require('pg');
const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'ICTCOORdb'
});

async function checkData() {
  await client.connect();
  
  console.log('=== Teachers ===');
  const teachers = await client.query('SELECT id, first_name, last_name FROM teachers LIMIT 5');
  console.log(teachers.rows);
  
  console.log('\n=== Sections ===');
  const sections = await client.query('SELECT id, section_name, adviser_teacher_id, adviser_name FROM sections LIMIT 5');
  console.log(sections.rows);
  
  console.log('\n=== Students by Section ===');
  const students = await client.query('SELECT id, full_name, section_id FROM students WHERE section_id IS NOT NULL LIMIT 10');
  console.log(students.rows);
  
  console.log('\n=== Teacher 1 Info ===');
  const teacher1 = await client.query('SELECT id, first_name, last_name FROM teachers WHERE id = 1');
  console.log(teacher1.rows);
  
  console.log('\n=== Sections with Teacher 1 ===');
  const secWithTeacher = await client.query('SELECT id, section_name, adviser_teacher_id FROM sections WHERE adviser_teacher_id = 1');
  console.log(secWithTeacher.rows);
  
  await client.end();
}

checkData().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
