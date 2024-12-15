document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = e.target;
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML = `
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Sending...</span>
        `;

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        showNotification("Message sent successfully!", "success");
        form.reset();
      } catch (error) {
        showNotification("Failed to send message. Please try again.", "error");
        console.error("Error:", error);
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }

  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } shadow-lg transform translate-y-0 opacity-100 transition-all duration-500`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("translate-y-full", "opacity-0");
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
});
