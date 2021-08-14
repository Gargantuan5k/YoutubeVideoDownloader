# YouTube Video Downloader

## Introduction

> A web-application to download videos from YouTube! You can download a video in .mp4 format in all available qualities :)

## Installation

<strong>The app is already <a href="https://youtubevid-downloader.herokuapp.com" target="_blank">deployed on Heroku</a>. To run it on localhost on your own device, or on a different server, follow these instructions:<br /></strong>

Requirements:<br />
* Git
* Node.js

Open your terminal and type in the following commands: 
```shell
git clone https://github.com/Gargantuan5k/YoutubeVideoDownloader.git
cd YoutubeVideoDownloader/
```
Next, open the `script.js` file in the `public` folder in a text editor, for example:
```shell
nano public/script.js
```
Edit line 1: change the `host` variable to 
```js
"http://127.0.0.1:5000/"
```
You can replace `http://127.0.0.1:5000` with the IP and port of a different server if you choose.
(NOTE: The trailing / is important) <br />
Save and exit the text editor, back to the terminal. <br />
Type the following command in the terminal: (Install nodeJS first if you don't have it already)
```shell
node code.js
```
Now, open your web browser and go to the url: `http://127.0.0.1:5000/` (Or another server's IP, if applicable)
