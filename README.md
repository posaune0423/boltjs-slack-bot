# boltjs-slack-bot

## Overview
This script is based on [bolt-js-getting-started-app.git](https://github.com/slackapi/bolt-js-getting-started-app.git) built by Slack.

## Running locally

### 1. Setup environment variables

```zsh
# Replace with your signing secret and token
export SLACK_BOT_TOKEN=<your-bot-token>
export SLACK_SIGNING_SECRET=<your-signing-secret>
```

### 2. Setup your local project

```zsh
# Clone this project onto your machine
git clone https://github.com/slackapi/bolt-js-getting-started-app.git

# Change into the project
cd bolt-js-getting-started-app/

# Install the dependencies
npm install
```

### 3. Start servers

[Setup ngrok][3] to create a local requests URL for development.

```zsh
npm run ngrok
npm run start
```
