// Set timestamp when the form page loads
const timestampField = document.getElementById("timestamp");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}


// Open membership modal
function openModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.showModal();
  }
}


// Close membership modal
function closeModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.close();
  }
}