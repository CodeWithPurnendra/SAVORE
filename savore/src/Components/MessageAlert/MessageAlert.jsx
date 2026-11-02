export default function MessageAlert({ message, type = 'success' }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div style={{
      backgroundColor: isSuccess ? '#d4edda' : '#f8d7da',
      color: isSuccess ? '#155724' : '#721c24',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '16px',
      textAlign: 'center',
      fontWeight: '500'
    }}>
      {message}
    </div>
  );
}