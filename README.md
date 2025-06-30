# Certiflash Quest Forge

Certiflash Quest Forge is an interactive, gamified learning platform designed to help users prepare for certification exams. It provides a dynamic and engaging way to study key concepts through a quiz-based format.


## ✨ Features

- **Interactive Quizzes**: Test your knowledge with a wide range of questions covering all major domains of the AWS ML exam.
- **Gamified Learning**: Earn experience points (XP), build up your learning streak, and level up as you master new concepts.
- **Module-Based Studying**: Quizzes are organized into modules based on the official exam guide, including topics like SageMaker, Data Storage, AI Services, and more.
- **Progress Tracking**: A personal dashboard to monitor your performance, track completed modules, and review your question history.
- **Real-time Data Sync**: User progress and quiz content are synced with Firebase/Firestore, allowing for a persistent experience.
- **Anonymous Authentication**: Start learning immediately without the need for a formal sign-up process.

## 🚀 Technologies Used

This project is built with a modern, component-based architecture using the following technologies:

- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and customizable components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) for data fetching and caching.
- **Routing**: [React Router](https://reactrouter.com/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine. Using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) is recommended.

### Firebase Setup

1.  Create a new project on the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new Web App in your Firebase project.
3.  Copy the `firebaseConfig` object from your project settings.
4.  This project is set up to load Firebase configuration at runtime. You will need to make your configuration available through a script or environment variables that set the `window.__firebase_config` variable.

### Installation

1.  **Clone the repository**
    ```sh
    git clone <YOUR_GIT_URL>
    cd certiflash-quest-forge
    ```

2.  **Install NPM packages**
    ```sh
    npm install
    ```

3.  **Run the development server**
    ```sh
    npm run dev
    ```
    This will start the Vite development server, and you can view your application at `http://localhost:5173` (or another port if 5173 is busy).

## 📂 Project Structure

The main application code is located in the `src/` directory:

-   `src/components/`: Contains all the React components, including UI elements from `shadcn/ui` and custom components like `QuizPage`, `ProgressDashboard`, and `ModulesGrid`.
-   `src/data/`: Includes the raw quiz data (`awsMLQuestions.ts`) before it's synced to Firestore.
-   `src/pages/`: Contains the main page components that are mapped to routes. `Index.tsx` is the core of the application.
-   `src/lib/`: Utility functions.
-   `src/App.tsx`: The main application component that sets up routing and global providers.
-   `src/main.tsx`: The entry point of the React application.
