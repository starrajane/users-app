# Next.JS User App

A simple Next.js application where Users can view a list of users displayed as cards and create new users via a modal form with validations.

## Features
-   **Users Page**: Displays a list of users from a JSON file.
-   **User Cards**: Each card shows the user's name, company, and email.
-   **Create User**: Button to open a modal with a form to add a new user.
-   **Form Validations**: Client-side validations for the required fields in the create user form.
-   **Persistence**: New users are added to the list and saved in the Users.json file.


## Installation

1. Clone the repository: 
```console
git clone https://github.com/starrajane/users-app
```
2. Install dependencies:
```console
npm install
```

3. **Before running the app**: Place a `Users.json` file in the `data` folder with initial user data. 

	This file is gitignored for privacy, so this must be added locally.

4. Run the development server:
```console
npm run dev
```

5. Open [http://localhost:3000/users](http://localhost:3000/users) in your browser.


## Usage
-   Navigate to  `/users`  to view the list of users.
-   Click "Create User" to open the modal and fill out the form.
-   Submit the form to add a new user (validations will prevent invalid submissions).
