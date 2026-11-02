// services/smsService.js
const fetch = require('node-fetch'); // Ensure node-fetch is installed

// Function to send SMS
const sendSms = async (phoneNumber, otp) => {
  try {
    const apiUrl = 'http://api.infoskysolution.com/httpapi/QueryStringReceiver';

    // Construct query parameters
    const params = new URLSearchParams({
      ver: '1.0',
      key: 'GBzU0Hamn17qbGQVOTe3ng==', // Use environment variable for API key
      encrpt: '0',
      dest: phoneNumber,
      send: 'KRBYKT',
      text: `Dear customer, use this one-time password ${otp} to log in to your Karnataka Rajya Balija Yuvashakthi account. Thanks Webs Beetle`,
      dlt_entity_id: '1201161323551277278',
      dlt_template_id: '1207173142472944340',
      dlt_tm_id: '1702158272976429534', // Removed incorrect `&` symbol
    });

    // Make the API request
    const otpResponse = await fetch(`${apiUrl}?${params.toString()}`);
    const result = await otpResponse.text(); // Parse response as text

    // Check the response for success
    if (result.includes('Statuscode=200')) {
      console.log('OTP sent successfully:', result);
      return otp; // Return the OTP for further use
    } else {
      console.error('hi, API response:', result);
      throw new Error('Hello');
    }
  } catch (error) {
    console.error('Error sending SMS:', error.message); // Log detailed error
    throw new Error('Failed to send SMS');
  }
};

module.exports = { sendSms };
