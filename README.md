# credit-card-activation
A simple webpage to allow their customers to activate their credit card.
## About 
### Build Status
[![Connex Credit Activation Portal CI->CD](https://github.com/Diogenesoftoronto/credit-card-activation/actions/workflows/main.yaml/badge.svg)](https://github.com/Diogenesoftoronto/credit-card-activation/actions/workflows/main.yaml)
### Credit Card Activation
The app allows you to activate your credit card. You can activate your credit card by entering the credit card number and the expiration date. The expiration date should be in the format of MM/YY.
### Motivations and Points of Progress
I built this app for a take home interview challenge for the company connex. You can vist the site to try it out yourself [here](https://connex-credit-card-activation.herokuapp.com/). You can also download the docker image here if you want a running instance of the app to deploy in a swarm. 😎

I focused more on functionality and scalability with this app than on styling as the position is for a backend one. The app is written in JS, I could add to this app by writing it on typescript to preserve type safety or I could do have made it with gin on golang. 
## Setup
There's multiple options to setup the application and get it running. You can setup only on your local machine or you can pull the image from docker hub and get things running that way. (install from npm may be coming soon).

### Docker Hub
First, you'll want to pull the image from the Docker Hub [website](https://hub.docker.com/repository/docker/diogenesoftoronto/connex-credit-activation). This requires you to have docker installed on your machine which you can find the instructions to on the docker site.

After pulling the image from the Docker Hub, you'll need to run the following command to get the app running.

```bash
docker run -p 1984:<your_port> credit-card-activation
```
You need to make sure that the port you are fowarding to is open on your local machine.

After running the image from the Docker Hub, you'll need to go to the localhost:<your_port> and see the app running there. And there you have it! 🎉

### locally
Make sure to have the repository cloned to your local machine. You can do that by opening your terminal and typing the following command. You will require git to do this. You can also download the files directly from the github repo.

```bash
git clone https://github.com/diogenesoftoronto/credit-card-activation
```
You can run the app locally by running the following command.

```bash
npm install && npm start
```

You need to create an env file and put in a valid authkey and port that you want the app to connect to. You can do that by running the following command:

```bash
touch .env
echo "AUTH_KEY=<your_auth_key>" >> .env
echo "PORT=<your_port>" >> .env
```
NOTE: You'll need to have node and npm installed on your machine. congrats on that! 🎉

That is all you need to do to get the app running.

## Credits
This app was built by [@diogenesoftoronto](https://www.github.com/diogenesoftoronto/) for the connex company.

## License
This app is licensed under the MIT license.

## Contributing
This app is open source and you can contribute to it by opening an issue or pull request on [Github](https://github.com/diogenesoftoronto/credit-card-activation)

