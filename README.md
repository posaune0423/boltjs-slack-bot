# boltjs-slack-bot

## Overview
This is a Slack app built with the [Bolt for JavaScript framework](https://slack.dev/bolt-js/).

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
git clone https://github.com/posaune0423/boltjs-slack-bot

# Change into the project
cd boltjs-slack-bot/

# Install the dependencies
yarn install
```

### 3. Start servers

[Setup ngrok](https://slack.dev/bolt-js/tutorial/getting-started#setting-up-events) to create a local requests URL for development.

#### forwarding local server to global ip
```zsh
yarn ngrok
```
#### 1. if you want to run the code locally, just run

```zsh
yarn start
```

#### 2. if you want to run the code emulating Google Cloud Function environment, then
```zsh
yarn gcf
```

### 4. How to deploy to Google Cloud Functions
```zsh
gcloud functions deploy slack \
--runtime nodejs10 \
--trigger-http \
--set-env-vars "SLACK_BOT_TOKEN=<your-bot-token>,SLACK_SIGNING_SECRET=<your-signing-secret>" \
--allow-unauthenticated
```
- End point should be like below

`https://<your-region>-<your-project-name>.cloudfunctions.net/slack/events`
