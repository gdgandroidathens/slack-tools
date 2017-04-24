/**
 * About
 * Google Apps Script to post a message on Slack
 * when someone responds to a Google Form.
 *
 * Uses Slack incoming webhooks - https://api.slack.com/incoming-webhooks
 * and FormsResponse - https://developers.google.com/apps-script/reference/forms/form-response
 *
 *
 * Original Author
 * Akash A <https://github.com/akash1810>
 *
 * Update Author
 * AndroidDevs-GR Slack Team <https://github.com/androiddevs-gr/>
 *
 *
 * Usage
 * Free to use.
 */

// Create an incoming webhook here - https://api.slack.com/incoming-webhooks
var SLACK_INCOMING_WEBHOOK_URL = "your_slack_incoming_webhook_url";

function onSubmit() {

  var form = FormApp.openById('your_form_id');

  var formResponses = form.getResponses();
  var responsesCount = formResponses.length;

  var lastPosition = responsesCount - 1;

  var lastResponse = lastPosition >= 0 ? formResponses[lastPosition] : null;

  if(lastResponse == null) return;

  var messageFields = [
    {"title": "When", "value": lastResponse.getTimestamp()}
  ];

  var itemResponses = lastResponse.getItemResponses();

  for (var i = 0; i < itemResponses.length; i++) {
    var question = itemResponses[i].getItem().getTitle();
    var answer = itemResponses[i].getResponse();

    messageFields.push({"title": question, "value": answer});
  }

  var summaryAttachment = {
    "fallback": form.getTitle(),
    "pretext": "New response submitted to: " + form.getTitle(),
    "title": form.getTitle() + " (responses)",
    "title_link": "https://docs.google.com/spreadsheets/d/" + form.getDestinationId(),
    "fields": messageFields,
    "color": "#393939"
  };

  var options = {
    "method" : "post",
    "payload": JSON.stringify({
      "username": "Google Forms",
      "icon_emoji": ":speech_balloon:",
      "attachments": [summaryAttachment]
    })
  };

   UrlFetchApp.fetch(SLACK_INCOMING_WEBHOOK_URL, options);
};
