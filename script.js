document.getElementById("emailForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;
  var recipientList = document.getElementById("recipientList").value;

  var fileInput = document.getElementById("fileInput");
  if (fileInput.files.length > 0) {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      var recipients = extractEmailsFromCSV(contents);
      if (recipients.length > 0) {
        recipientList += "\n" + recipients.join("\n");
        document.getElementById("recipientList").value = recipientList;
      }
      sendEmails(subject, message, recipients);
    };
    reader.readAsText(file);
  } else {
    var recipients = recipientList.split("\n");
    sendEmails(subject, message, recipients);
  }
});

function sendEmails(subject, message, recipients) {
  if (recipients.length > 0) {
    var emailBody = "Subject: " + subject + "\n\n" + message;

    for (var i = 0; i < recipients.length; i++) {
      var recipient = recipients[i];
      sendEmail(recipient, emailBody);
    }

    // Use Swal.fire() instead of alert()
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Emails sent successfully!',
      confirmButtonColor: '#4CAF50',
      background: '#282828',
    });
  } else {
    // Use Swal.fire() instead of alert()
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please enter valid email addresses.',
      confirmButtonColor: '#4CAF50',
      background: '#282828',
    });
  }
}

function sendEmail(recipient, body) {
  // Create the data to send
  var data = {
      recipient: recipient,
      body: body
  };
  
  // Send a POST request to the server
  fetch("/send-email", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(function(response) {
      // The request completed successfully
      console.log("Email sent to: " + recipient);
  })
  .catch(function(error) {
      // There was an error
      console.error("Error:", error);
  });
}

