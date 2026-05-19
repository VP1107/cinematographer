/**
 * Google Apps Script for Portfolio Contact Form Integration
 * 
 * Instructions:
 * 1. Create a new Google Sheet (or open an existing one).
 * 2. Go to Extensions > Apps Script.
 * 3. Replace any code in the editor with this code.
 * 4. Update the `receiverEmail` variable with your target email address (currently tapanvyas@gmail.com).
 * 5. Save the project (click the floppy disk icon).
 * 6. Click "Deploy" (top right) > "New deployment".
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. Set the configuration:
 *    - Description: Portfolio Contact Form API
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"
 * 9. Click "Deploy" and authorize the necessary permissions.
 * 10. Copy the generated Web App URL and set it in your Contact.jsx or .env file.
 */

function doPost(e) {
  // Setup CORS-like responses (headers are returned inside text output)
  var responseHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    // 1. Parse post data
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        // Fallback for form-urlencoded or other raw text types
        data = e.parameter;
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var name = data.name || "Anonymous";
    var email = data.email || "";
    var subject = data.subject || "Contact Form Inquiry";
    var message = data.message || "";
    var timestamp = new Date();

    // 2. Write to Google Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
      // Format header row (bold & light orange background)
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#ffe5b4");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([timestamp, name, email, subject, message]);

    // 3. Send Email to Receiver (Cinematographer)
    var receiverEmail = "vatsalpandya2007@gmail.com";
    var receiverSubject = "New Contact Submission: " + subject;
    var receiverBody = 
      "Hello Tapan,\n\n" +
      "You have a new inquiry from your cinematography portfolio contact form:\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Subject: " + subject + "\n" +
      "Date: " + timestamp.toLocaleString() + "\n\n" +
      "Message:\n" + message + "\n\n" +
      "---\n" +
      "This email was sent automatically via Google Apps Script.";

    MailApp.sendEmail({
      to: receiverEmail,
      subject: receiverSubject,
      body: receiverBody,
      replyTo: email
    });

    // 4. Send Confirmation Email to Sender (Visitor)
    if (email) {
      var senderSubject = "Thank you for reaching out - Tapan Vyas";
      var senderBody = 
        "Dear " + name + ",\n\n" +
        "Thank you for contacting me. I have received your message regarding '" + subject + "' and will review it shortly.\n\n" +
        "Here is a copy of the message you sent:\n" +
        "------------------------------------\n" +
        message + "\n" +
        "------------------------------------\n\n" +
        "Best regards,\n\n" +
        "Tapan Vyas\n" +
        "Cinematographer\n" +
        "vatsalpandya2007@gmail.com";

      MailApp.sendEmail({
        to: email,
        subject: senderSubject,
        body: senderBody
      });
    }

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Submission saved and emails sent successfully."
    }))
    .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error processing submission: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    result: "success",
    message: "Google Apps Script Contact Form Endpoint is active."
  }))
  .setMimeType(ContentService.MimeType.JSON);
}
