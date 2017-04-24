# Invite Requests
This directory contains the Google Script we are using in order to receive invite requests through Slack itself. We are using an in-house created Google Form for the task. This makes the invitation management much much easier for admins 💃

## Installation

* Create a Slack incoming webhook for your Slack team: https://api.slack.com/incoming-webhooks
* Open your Invite request Google Form, and open up the Script Editor. In the current version of Google Forms it is located on the 'More'([like so](https://cloud.githubusercontent.com/assets/1665273/25342930/6fba7d28-2905-11e7-9058-3509e8bc262d.png)).
* Create a new `File` and paste the content of `invite_to_slack.gs`
* Replace `SLACK_INCOMING_WEBHOOK_URL` default value, with the one you created previously
* Replace `your_form_id` with the `id` of your own form (hint: you can find it at the browser's URL bar)
* You are good to go :smile:
