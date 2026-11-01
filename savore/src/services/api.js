const API_BASE_URL = 'http://localhost:5000/api';

// Book a table
export const bookTable = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  return response.json();
};

// Fetch menu items
export const getMenu = async () => {
  const response = await fetch(`${API_BASE_URL}/menu`);
  return response.json();
};

// Send contact message
export const sendContactMessage = async (contactData) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  return response.json();
};