/**
 * RAMIT BATRA | Shared Footer Component & Helpers
 */
document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically if element present
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
