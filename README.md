# urlshortener
Just another clone of url shortener that converts your long link to a short link, designed to work in PC browser and Mobile browser.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Install Nodejs v12.13.x : https://nodejs.org/en/
2. Get a Bitly access token (you have to register your own account!)  
2.1 Sign-in or signup an Bitly  
2.2 Click this link to go to your oauth app page: https://bitly.com/a/oauth_apps  
2.3
![click `generate access token`](https://i.imgur.com/D8Q1QOr.png)
2.4
![enter your password, an access token will be shown after this](https://i.imgur.com/vG7wD6e.png)

### Installing

A step by step series of examples that tell you how to get a development env running

1. Open a terminal in the directory to where you want the project to be.

2. Clone the project

```
git clone https://github.com/Kanosakl/urlshortener.git
```

3. Navigate into the directory

```
cd urlshortener
```

4. Install dependency

```
npm i
```
note: if you have installed node.js *but* `npm` command is not found, maybe try exiting and opening a new command prompt.

5. Install parcel-bundler globally (this is for bundling the front-end)

```
npm i -g parcel-bundler
```

6. Bundle the front-end

```
npm run build
```

7. Create a copy of `.env.example` and rename it to `.env`
NOTE: don't just rename `.env.example` file, that file must exist side by side with `.env` file!

Linux/Mac
```
cp .env.example .env
```

Windows
```
copy .env.example .env
```

8. Add in the following information in .env (all variables must not be blank!)
```
PORT=3000
BITLY_API_TOKEN=<your bitly access token>
BITLY_API_PATH=https://api-ssl.bitly.com
```

9. Run the local development server
```
npm run start
```

The terminal should output "listening at port <your port here>"
If so, you should be able to access the website by navigating to http://localhost:3000
  
![url shortener webpage](https://i.imgur.com/jpN0NrG.png)

## Built With

* [reactjs](https://reactjs.org/) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [parceljs](https://parceljs.org/) - Used to bundle front-end

## Authors

* **Davion Teh** - *Initial work* - [Kanosakl](https://github.com/Kanosakl)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
