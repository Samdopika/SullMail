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
  
      alert("Emails sent successfully!");
    } else {
      alert("Please enter valid email addresses.");
    }
  }
  
  function sendEmail(recipient, body) {
    // Code to send the email using a server-side API or email service provider
    // Replace this with your own implementation or integration
    // Example: AJAX request to a server-side endpoint
    /*
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/send-email", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Email sent to: " + recipient);
      }
    };
    xhr.send(JSON.stringify({ recipient: recipient, body: body }));
    */
  }
  