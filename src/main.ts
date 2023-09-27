//import Axios from 'axios';
import * as bootstrap from 'bootstrap'
// Define a function to sanitize input
function sanitizeInput(input: string): string {
  // Remove any non-alphanumeric characters, except for spaces, periods, commas, and hyphens
  return input.replace(/[^a-zA-Z0-9\s.,\-]/g, '');
}

// Function to convert hours to minutes
function hoursToMinutes(hours: number): number {
  return hours * 60;
}

function setPhoneCountryCode(phoneNumber: string): string {
  // Check if the phone number starts with a zero
  if (phoneNumber.startsWith('0')) {
    // Replace the first zero with +234
    return phoneNumber.replace('0', '+234');
  }

  // If the phone number doesn't start with a zero, return it as is
  return phoneNumber;
}

// Get form element references
const form = document.getElementById('myForm') as HTMLFormElement;
const fullNameInput = document.getElementById('full_name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const bookingDatetimeInput = document.getElementById('booking_datetime') as HTMLInputElement;
const durationInput = document.getElementById('duration_hours') as HTMLInputElement;
const serviceTypeInput = document.getElementById('service_type') as HTMLInputElement;
const additionalNotesInput = document.getElementById('additional_notes') as HTMLInputElement;
const locationInput = document.getElementById('location') as HTMLInputElement;
const toastLiveExample = document.getElementById('liveToast') as Element;

// Add a submit event listener to the form
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

  // Sanitize the form data
  const sanitizedData = {
    business_id: 'business123',
    client: {
      full_name: sanitizeInput(fullNameInput.value),
      email: emailInput.value,
      phone: setPhoneCountryCode(phoneInput.value),
    },
    booking_datetime: bookingDatetimeInput.value,
    duration_minutes: hoursToMinutes(Number(durationInput.value)),
    service_type: sanitizeInput(serviceTypeInput.value),
    additional_notes: sanitizeInput(additionalNotesInput.value),
    location: sanitizeInput(locationInput.value),
  };
  console.log(phoneInput.value);
  console.log(sanitizedData);
  try {

    // Send a POST request to the endpoint
    const response = await fetch('https://gq1ggscc42.execute-api.us-east-1.amazonaws.com/dev/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
    });

    if (response.ok) {
      console.log('Data sent successfully');
      form.reset();
      toastBootstrap.show();
    } else {
      console.error('Failed to send data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
