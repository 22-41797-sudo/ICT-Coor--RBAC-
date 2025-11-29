require('dotenv').config();
const emailService = require('./email-service');

async function testEmail() {
    console.log('Testing email service...');
    console.log('GMAIL_USER:', process.env.GMAIL_USER);
    console.log('GMAIL_PASSWORD length:', process.env.GMAIL_PASSWORD ? process.env.GMAIL_PASSWORD.length : 'NOT SET');
    console.log('GMAIL_PASSWORD:', process.env.GMAIL_PASSWORD ? '***' + process.env.GMAIL_PASSWORD.slice(-4) : 'NOT SET');
    console.log('GMAIL_FROM_NAME:', process.env.GMAIL_FROM_NAME);
    
    // Test enrollment email
    const result1 = await emailService.sendEnrollmentStatusUpdate(
        'mainagasanfranciscointegrateds@gmail.com',
        'Test Student',
        'TEST-TOKEN-12345',
        'approved'
    );
    
    console.log('Result 1 (Enrollment Approved):', result1);
    
    // Wait 2 seconds
    await new Promise(r => setTimeout(r, 2000));
    
    // Test document email
    const result2 = await emailService.sendDocumentRequestStatusUpdate(
        'mainagasanfranciscointegrateds@gmail.com',
        'Test Student',
        'TEST-DOC-TOKEN',
        'Transcript',
        'ready'
    );
    
    console.log('Result 2 (Document Ready):', result2);
}

testEmail().catch(console.error).finally(() => process.exit(0));
