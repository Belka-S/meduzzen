## mern-tstarter Application

This application built with Vite + React.

### Table of Contents

- Getting Started
- Compose sample application
- Technologies
- Contributing

### Getting Started

To get started with the project, follow these steps:

1. Clone this repository to your local machine:

`git clone` <repository-url>

2. Change directory to the project folder:

`cd mern-tstarter`

3.  Install the project dependencies:

`npm install`

4. Start the development server:

`npm run dev`

5. Open your web browser and navigate to `http://localhost:3000/mern-tstarter`
   to access the application.

### Compose sample application

Project structure:

```
.
├── src
├── ...
├── Dockerfile
└── README.md
```

[compose.yaml\_](compose.yaml)

```
services:
  frontend:
    build:
      context: frontend
    ...
    ports:
      - 3000:3000
    ...
  server:
    container_name: server
    restart: always
    build:
      context: server
      args:
        NODE_PORT: 3000
    ports:
      - 3000:3000
    ...
    depends_on:
      - mongo
  mongo:
    container_name: mongo
    restart: always
    ...
```

The compose file defines an application with three services

Snippet of frontend(ReactJS)`DockerFile`

You will find this `DockerFile`.

```bash
# Create image based on the official Node image from dockerhub
FROM node:20-alpine
#Argument that is passed from docer-compose.yaml file
ARG FRONT_END_PORT
# Create app directory
WORKDIR /app
#Echo the argument to check passed argument loaded here correctly
RUN echo "Argument port is : $FRONT_END_PORT"
# Copy dependency definitions
COPY package.json .
COPY package-lock.json .
# Install dependecies
RUN npm ci
# Get all the code needed to run the app
COPY . .
# Expose the port the app runs in
EXPOSE ${FRONT_END_PORT}
# Serve the app
CMD ["npm", "start"]
```

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
