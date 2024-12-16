# Secret Santa Application

Welcome to the Secret Santa application! This project is built with **Next.js** (using the App Router) and deployed on Vercel. It allows users to organize and manage Secret Santa events seamlessly.

## Live Demo
You can access the live application here: [Secret Santa](https://secretsanta.victorolmos.com)

---

## Features
- **Modern Web Application**: Built with Next.js, leveraging its App Router for routing and server-side rendering capabilities.
- **Domain-Driven Design (DDD)**: Backend follows DDD principles, implemented within the `context` directory.
- **Real-time Updates**: User updates are delivered via WebSockets using the Ably service.
- **MongoDB for Persistence**: All application data is stored in a MongoDB database.
- **Reusable UI Components**: React-based UI components stored in the `components` directory.
- **Shared Utilities**: The `lib` directory contains shared utilities for both frontend and backend functionality.
- **Comprehensive Testing**: Tests are implemented in the `tests` directory and can be run with `npm run test`.

---

## Project Structure

```plaintext
├── app            # Next.js App Router structure
├── components     # React UI components
├── context        # Backend implementation following DDD principles
├── lib            # Shared utilities
├── public         # Static assets
├── tests          # Test files
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v20 or higher)
- **npm** (v10 or higher)

### Environment Variables

The following environment variables are required to run the application:

- `MONGODB_URI`: MongoDB connection string.
- `ABLY_API_KEY`: API key for the Ably service.
- `SECRET_KEY`: Secret key for encrypting the user token stored in cookies.

Create a `.env.local` file in the root directory and add the variables:

```env
MONGODB_URI=your-mongodb-uri
ABLY_API_KEY=your-ably-api-key
SECRET_KEY=your-secret-key
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/secretsanta.git
   cd secretsanta
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000).

---

## Testing

Run the tests with the following command:
```bash
npm run test
```

---

## Deployment

This application is deployed on Vercel. Follow these steps to deploy:

1. Push your code to a GitHub repository.
2. Link the repository to your Vercel account.
3. Add the required environment variables (`MONGODB_URI`, `ABLY_API_KEY`, `SECRET_KEY`) in the Vercel dashboard.
4. Deploy the project.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [MongoDB](https://www.mongodb.com/)
- [Ably](https://ably.com/)

