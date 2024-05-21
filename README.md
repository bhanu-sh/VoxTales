# VoxTales

VoxTales is an innovative storytelling podcast platform designed to connect creators and listeners through captivating narratives. Built with a robust stack including Next.js, React.js, MongoDB, Node.js, and TypeScript, VoxTales offers a seamless user experience with its modern architecture and intuitive interface.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Learn Mode](#learn-more)
- [Scripts](#scripts)
- [Deploy on Vercel](#deploy-on-vercel)

## Features

- **Dynamic User Model**: Roles for artists, regular users, and administrators.
- **Comprehensive Profile Management**: Users can curate their experience.
- **Community Engagement**: Follow favorite artists and foster community.
- **Security and Authentication**: Email verification and password recovery.
- **Podcast Management**: Effortlessly upload and manage podcast content.
- **Streamlined Navigation**: Powered by Next.js app routing.
- **Visually Appealing Design**: Crafted with TailwindCSS.

## Screenshots

### Home Page

![Home Page](/screenshots/home.png)

### Login Page

![Login Page](/screenshots/login.png)

### Signup Page

![Signup Page](/screenshots/signup.png)

### Artist Signup

![Artist Signup](/screenshots/artist_signup.png)

### Admin Signup

![Admin Signup](/screenshots/admin_signup.png)

### Profile Page

![Profile Page](/screenshots/profile_page.png)

### Profile Edit

![Profile Edit](/screenshots/profile_edit.png)

### Podcast Page

![Podcast Page](/screenshots/podcast.png)

### Upload Podcast

![Upload Podcast](/screenshots/upload.png)

### Podcast Player

![Podcast Player](/screenshots/player.png)

### Admin Dashboard

![Admin Dashboard](/screenshots/admin.png)

### Manage Users

![Manage Users](/screenshots/manage_users.png)

### Manage Artists

![Manage Artists](/screenshots/manage_artists.png)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bhanu-sh/voxtales.git
   cd voxtales

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Set up environment variables. Create a .env.local file in the root directory and add the following:

   MONGO_URI=MONGO_DB_URI
   TOKEN_SECRET=anything_you_like
   DOMAIN=http://localhost:3000
   MAILTRAP_USER=Get_from_MailTrap
   MAILTRAP_PASS=Get_from_MailTrap
   ADMIN_CODE=anything_you_like
   ARTIST_CODE=anything_you_like
   EDGE_STORE_ACCESS_KEY=Get_from_Edge_Store
   EDGE_STORE_SECRET_KEY=Get_from_Edge_Store

## Usage

1.  Run the development server:

    ```bash
    npm run dev

    ```

2.  Build for production:

    ```bash
    npm run build
    npm start

    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
