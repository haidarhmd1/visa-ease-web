# Visa Ease

Visa Ease is a project that aims to simplify visa management and user administration. The project consists of a React Native mobile application (see here. https://github.com/haidarhmd1/visa-ease-app), a Node.js backend, and a React.js web dashboard for administrative tasks.

### TODO

[Backend]

- [ ] Add unit tests for component
- [ ] Add gitHub CI/CD
- [ ] Implement various API Endpoints

[Dashboard]

- [ ] Add unit tests for component
- [ ] Add gitHub CI/CD
- [ ] Finish up further components

## About

Visa Ease streamlines the visa management process by offering a mobile application for users and a web dashboard for administrators. **_Please note that this projects repo is currently a work in progress_**.

- **Node.js Backend:**

  - API Endpoint 1: Description
  - API Endpoint 2: Description
  - ...

- **React Web Dashboard:**

  - User Management: Create, update, and delete users.
  - Visa Entry Management: Manage visa entries for users.
  - General Settings: Configure application settings.
  - ... (still wip)

  ## Getting Started

To use it in collaboration with the React Native Project, follow these steps to set up and run the Visa Ease project locally.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/haidarhmd1/visa-ease-web.git
   cd visa-ease
   ```

   Install dependencies for the backend:

   ```sh
    cd backend
    yarn install
   ```

   Install dependencies for the web dashboard:

   ```sh
    cd dashboard
    yarn start
   ```

   Run the Project:

   ```sh
    yarn docker:up
   ```

Access the web dashboard at http://localhost:5173.

### Tech Stack

- Backend:

  - Node.js
  - Express.js
  - Typescript
  - Prisma

- Frontend (Web):
  - React
  - Typescript
  - Tailwind
  - axios
  - antd
  - vite

### License

This project is licensed under the MIT License.

### Contact

For any questions or want to reach out: Haidar.hmd1@gmail.com | on
<a href="https://www.linkedin.com/in/haidar-hammoud-775602124/">LinkedIn</a>
