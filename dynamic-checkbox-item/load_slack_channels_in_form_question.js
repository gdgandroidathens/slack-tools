var IGNORED_CHANNELS = [
  'chat',
  'slack-questions'
]
var FORM_ID = ''
var SLACK_API_CHANNELS_URL = ''

function onOpen () {
  var form = FormApp.openById(FORM_ID)
  var requestResponse = UrlFetchApp.fetch(SLACK_API_CHANNELS_URL)
  var parsedJsonResponse = JSON.parse(requestResponse.getContentText())
  var isSlackResponseOk = parsedJsonResponse.ok

  if (!isSlackResponseOk) return

  var eligibleChannels = prepareEligibleChannels(parsedJsonResponse)

  var checkBoxItem = sanitizedCheckBoxItem(form)

  eligibleChannels = eligibleChannels.map(function (channel) {
    return checkBoxItem.createChoice(channel.name)
  })

  checkBoxItem
    .setTitle('Select the channels you will probably join:')
    .setChoices(eligibleChannels)
}

function prepareEligibleChannels (parsedJsonResponse) {
  return parsedJsonResponse.channels.reduce(function (filteredChannels, channel) {
    if (isChannelEligible(channel)) {
      filteredChannels.push({
        name: channel.name,
        topic: channel.topic.value
      })
    }
    return filteredChannels
  }, [])
}

function isChannelEligible (channel) {
  return !channel.is_general
    && !channel.is_archived
    && !channel.is_private
    && channel.is_channel
    && !isIgnoredChannel(channel)
}

function isIgnoredChannel (channel) {
  return IGNORED_CHANNELS.indexOf(channel.name) > -1
}

function sanitizedCheckBoxItem (form) {
  var checkBoxItem = findFirstItem(form)

  if (checkBoxItem != null) {
    form.deleteItem(checkBoxItem)
  }

  checkBoxItem = createCheckBoxItem(form)

  return checkBoxItem
}

function findFirstItem (form) {
  return form.getItems()[0]
}

function createCheckBoxItem (form) {
  return form.addCheckboxItem()
}

function listFormItems () {
  var form = FormApp.openById(FORM_ID)
  var items = form.getItems()

  for (var i in items) {
    Logger.log(items[i].getTitle() + ': ' + items[i].getId())
  }
}
