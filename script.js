function submitQuestion() {
  const questionInput = document.getElementById("questionInput");
  const chatContainer = document.getElementById("chatContainer");

  // Display the user's question
  const userQuestion = questionInput.value.trim();
  if (userQuestion === "") return; // Ignore empty submissions

  const userMessage = document.createElement("div");
  userMessage.classList.add("user-message");
  userMessage.innerHTML = `<strong>You:</strong> ${userQuestion}`;
  chatContainer.appendChild(userMessage);

  questionInput.value = ""; // Clear the input field

  // Display a temporary loading message for the assistant response
  const loadingMessage = document.createElement("div");
  loadingMessage.classList.add("assistant-message");
  loadingMessage.textContent = "Loading...";
  chatContainer.appendChild(loadingMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom

  // Send the question to the Vercel API endpoint
  fetch('https://de-law-assistant.vercel.app/', { // Replace with your Vercel URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: userQuestion }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Replace the loading message with the actual response
      loadingMessage.innerHTML = `<strong>Assistant:</strong> ${data.answer || "Sorry, no answer found."}`;
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    })
    .catch(error => {
      loadingMessage.innerHTML = `<strong>Assistant:</strong> Error fetching answer. Please try again.`;
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
      console.error('Error fetching answer:', error); // Log the error for debugging
    });
}

// Listen for "Enter" key in the textarea to submit the question
const questionInput = document.getElementById("questionInput");
questionInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Prevents adding a new line
    submitQuestion();       // Calls the submit function
  }
});

// Optional: Add an event listener to the submit button (if you still have it)
const submitButton = document.getElementById("submitButton");
if (submitButton) {
  submitButton.addEventListener("click", submitQuestion);
}
