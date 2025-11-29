const pg = require('pg');
const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'ICTCOORdb'
});

async function checkSchema() {
  await client.connect();
  
  console.log('=== Students Table Schema ===');
  const studentsSchema = await client.query(`
    SELECT column_name, data_type FROM information_schema.columns 
    WHERE table_name = 'students' 
    ORDER BY ordinal_position
  `);
  console.log(studentsSchema.rows);
  
  console.log('\n=== Early Registration Table Schema ===');
  const erSchema = await client.query(`
    SELECT column_name, data_type FROM information_schema.columns 
    WHERE table_name = 'early_registration' 
    ORDER BY ordinal_position
  `);
  console.log(erSchema.rows);
  
  console.log('\n=== Test Query: Check for type mismatch ===');
  try {
    const testQuery = await client.query(`
      SELECT 
        'ER' || er.id::text as id,
        er.id as enrollment_id
      FROM early_registration er
      WHERE NOT EXISTS (
        SELECT 1 FROM students st WHERE st.enrollment_id = er.id::integer
      )
      LIMIT 1
    `);
    console.log('Test query successful:', testQuery.rows);
  } catch (err) {
    console.error('Test query failed:', err.message);
  }
  
  await client.end();
}

checkSchema().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
