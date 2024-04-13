## The Application

This application built with Vite + React.

### Table of Contents

- Getting Started
- Compose sample application
- Technologies
- Contributing

### Getting Started

To get started with the project, follow these steps:

1. Clone this repository to your local machine:

`git clone <repository-url>`

2. Change directory to the project folder:

`cd react-meduzzen`

3.  Install the project dependencies:

`npm install`

4. Start the development server:

`npm run dev`

5. Open your web browser and navigate to `http://localhost:3000` to access the
   application.

### Compose sample application

1. Project structure:

```
.
├── src
├── ...
├── Dockerfile
└── README.md
```

2. Build the Docker image:

`docker build -t <user-name>/<image-name> .`

3. Run the image locally:

`docker run -it --rm -p 3000:3000 --name <container-name> <user-name>/<image-name>`

4. Build and run the the image locally:

`docker-compose up`

5. After the application starts, navigate to:

`http://localhost:3000` in your web browser.

6. Push the image to a private repository:

`docker push <user-name>/<image-name>`

### Technologies

- React
- Vite
- React Router
- Redux

### Contributing

Contributions are welcome! If you'd like to contribute to the project, please
follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Open a pull request to the development branch.
