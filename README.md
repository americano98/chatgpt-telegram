# Telegram Bot with ChatGPT
### About
This repository contains a Telegram Bot that uses OpenAI's ChatGPT as its backend. The bot provides conversational services to users through Telegram.

### Installation and starting
To install this repository on your local machine, you can use the following steps:

* Clone the repository by running in your terminal or command prompt:
`git clone https://github.com/americano98/chatgpt-telegram.git`
* Install the dependencies by running npm install in the project directory:
`npm install`
* Setup variables in* the .env file
* Starting the project using:
`npm run start`

### Variables
In order to run the bot, you need to get access tokens for both Telegram and OpenAI.

To get a Telegram bot token, you need to talk to the [BotFather](https://t.me/BotFather) on Telegram and follow the instructions to create a new bot.
To get an OpenAI [API key](https://platform.openai.com/account/api-keys), you need to sign up for an account on OpenAI and create a new API key.
After you have obtained these access tokens, you need to set them as environment variables. The recommended way to do this is by using a .env file in the project directory. Here is an example of what the .env file should look like:

```
TELEGRAM_TOKEN=<your-telegram-bot-token>
OPENAI_TOKEN=<your-openai-api-key>
```
### Starting Guide for Telegram Bot Development
Familiarize yourself with the Telegram Bot API by reading the official documentation.
Choose a programming language and framework that you are comfortable with. For this repository - Node.js and TypeScript were used.
Design the conversation flow for your bot. Think about what you want the bot to do and how you want it to interact with users.
Write code to handle incoming messages from users and generate responses using the ChatGPT API.
Test your bot thoroughly before deploying it to a production environment.
Continuously monitor and improve your bot to provide the best user experience possible.