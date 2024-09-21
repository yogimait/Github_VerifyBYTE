# GitHub OAuth Demo

This project demonstrates how to implement GitHub OAuth authentication in a React application. It checks if a user is following a specific GitHub account and provides access to protected content based on the follow status.

## Features

- GitHub OAuth authentication
- Follow status verification
- Protected routes
- Environment variable configuration

## Prerequisites

- Node.js (v14 or later)
- npm
- A GitHub account
- A registered GitHub OAuth application

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/github-oauth-demo.git
   cd github-oauth-demo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   VITE_GITHUB_CLIENT_ID=your_github_client_id
   VITE_GITHUB_CLIENT_SECRET=your_github_client_secret
   VITE_BYTE_GITHUB_USERNAME=BYTE_DEVS
   ```
   Replace `your_github_client_id`, `your_github_client_secret` with your actual values.

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

3. Click on "Login with GitHub" to authenticate.

4. The app will check if you're following the specified GitHub account and display the appropriate message.

## Building for Production

To create a production build, run:

```
npm run build
```

The built files will be in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
