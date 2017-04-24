# Invite Requests
This directory contains the script we are using in order to receive invite requests through Slack itself. This make the invitation management much much easier for admins to manage 💃

# Installation

* Create a Slack invoming webhook for your Slack team: https://api.slack.com/incoming-webhooks
* Open your Invitations Google Form, go to Settings and locate `Script editor` ![Script Editor](http://image.prntscr.com/image/a69f445f4d5143449ab30b3961eb219b.png)
* Create a new `File` and paste the content of `invite_to_slack.gs` [invite_to_slack.gs](https://github.com/androiddevs-gr/slack-tools/blob/master/invite-to-slack/invite_to_slack.gs)
* Replace `SLACK_INCOMING_WEBHOOK_URL` default value, with the one you created previously
* Replace `your_form_id` with the `id` of your own form (hint: you can find it at the browser's URL bar)
* You are good to go :smile:
