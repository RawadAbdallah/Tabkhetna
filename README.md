<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> Tabkhetna.
>
> A social media platform designed for food and cooking enthusiasts is a specialized online community that brings together individuals who share a common passion for all things related to food. This platform aims to create a space where users can connect, interact, and engage with others who have a similar interest in culinary arts, gastronomy, and the joy of cooking.

### User Stories

#### User

- As a user, I want to to share my recipes to everyone.
- As a user, I want to to gain more achievements to grab much more attention.
- As a user, I want to chat with others.
- As a user, I want to share my comments on other recipes.
- As a user, I want to contact for help.

<br>

<!-- Prototyping -->
<img src="./readme/title3.svg"/>


> I designed Tabkhetna using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience, I've gone during the coding process through some changes, so it might look a bit different in the app(in a better way).

### Wireframes

| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/wireframes/login_wireframe.png) | ![fsdaf](./readme/demo/wireframes/register_wireframe.png) | ![fsdaf](./readme/demo/wireframes/home_wireframe.png) |



### Mockups


| Login Screen  | Profile Screen | Cookmates Screen |
| ---| ---| ---|
| ![Login](./readme/demo/mockups/login.png) | ![profile](./readme/demo/mockups/profile.png) | ![cookmates](./readme/demo/mockups/cookmates.png) 
<br><br>

<!-- Implementation -->
<img src="./readme/title5.svg"/>

> Using the wireframes and mockups as a guide, we implemented the Tabkhetna app with the following features:

### User Screens (Web)

| Login screen  | Register screen |
| ---| ---|
| ![Login](./readme/demo/login.png) | ![register](./readme/demo/register.png) |
| Home screen  | Challenges screen |
| ![Home](./readme/demo/home.png) | ![profile](./readme/demo/screens/challenges.png) |
| Loading screen | Login & Register animation
| ![Loading](./readme/demo/screens/loading.gif) | ![Auth Page](./readme/demo/screens/loginregister.gif)

<br><br>

### User Screens (Mobile)

| Login screen  | Header screen |
| ---| ---|
| ![Login](./readme/demo/screens/login-mobile.png) | ![header](./readme/demo/screens/header.gif) |
| Chat screen  | Profile screen |
| ![chat](./readme/demo/screens/chat-mobile.gif) | ![profile](./readme/demo/screens/profile-mobile.png) 
| Challenges Screen | Home Screen
| ![challenges](./readme/demo/screens/challenges-mobile.png) | ![home](./readme/demo/screens/home-mobile.png)




<!-- Tech stack -->
<img src="./readme/title4.svg"/>


### Tabkhetna is built using the following technologies:
<img src="./readme/mern.png" />
- MongoDB (Databaes)
- Express.js (web app framework)
- React (Front-end libarary)
- Node.js (Server runtime)

<br><br>

<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

### Crafting words for better recipes with Gemini AI

- In my project, I made sure that AI understands and respond better. By choosing words carefully, I help the AI give you the right recipe info when you use Gemini AI. It's like telling it exactly what you want, and I do that to make it work better for you.
- AI would respond with either the missing ingredients or instructions for the chosen recipe post.
<br><br>
<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

###   AWS deploying:

- This project backend is hosted on an AWS EC2 server, ensuring reliable and scalable deployment. Here's my server ip address 13.39.86.160, check it out.


<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

- In this project, I tested my APIs to make sure my code works well. I checked each part of the software step by step, found and fixed problems early on. For testing my Node.js app, I used Jest and SuperTest. Here's a snapshot from my testing: 

<img src="./readme/tests.png">

<br><br>


<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up Tabkhetna locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free Gemini API Key at [Gemini](https://www.gemini.com/).
2. Clone the repository:

    ```bash
    git clone https://github.com/RawadAbdallah/Tabkhetna.git
    ```

3. Install NPM packages:

    ```bash
    npm install
    ```

4. Copy `.example.env` and fill in the required information.
5. Run the frontend app:
   ```bash
   npm run dev
   ```
6. Run the backend app:
   ```bash
   npm start
   ```


Now, you should be able to run Express locally and explore its features.
