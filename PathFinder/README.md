# Chatbot and Frontend

This readme provides step-by-step instructions for running the chatbot and frontend components. The chatbot is built using Rasa, and the frontend is a simple HTML file. Follow these steps to run both components.

Prerequisites
Before you begin, ensure that you have the following prerequisites installed on your system:

Rasa

## Step 1: Run the Chatbot

Navigate to the chatbot directory:

```bash
cd chatbot
```

Start the Rasa server with CORS enabled:

```bash
rasa run --enable-api --cors "*"
```

This command will start the Rasa chatbot server and enable cross-origin resource sharing (CORS) to allow communication with the frontend.

## Step 2: Run the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Open the index.html file in a web browser. You can do this by `double clicking` the file or running the file.

This will open the frontend interface in your web browser, allowing you to interact with the chatbot.

## Step 3: Interact with the Chatbot

You can now interact with the chatbot through the frontend interface by typing messages in the input field and receiving responses from the chatbot.
