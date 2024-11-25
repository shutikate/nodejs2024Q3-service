## Home Library Service

Task: REST service: Containerization and Database (PostgreSQL) & ORM

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop](https://docs.docker.com/get-started/get-docker/) on Mac, Windows or Linux

### Getting Started

#### Installation

1. Clone this repository:

```ruby
git clone https://github.com/shutikate/nodejs2024Q3-service
```

2. Navigate to the project directory and switch to `develop` branch:

```ruby
git checkout dev-part3
```

3. Install the dependencies:

```ruby
npm install
```

#### Configuration

4. Create .env file (based on .env.example): ./.env

##### Running the docker

5. Start Docker containers:

```ruby
docker compose up -d
```

##### After run of the application and the Docker images will be created:

6. Check Docker containers is started:

```ruby
docker ps
```

7. OpenAPI documentation:

You can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/

#### Testing

8. Run all tests:

```ruby
npm run test:auth
```

9. Scan application image for security vulnerabilities:

```ruby
npm run docker:scan
```

#### Auto-fix and format

```ruby
npm run lint
```

```ruby
npm run format
```

#### Uninstall the application

- stop containers

```ruby
docker compose down
```

- remove Docker app image

```ruby
docker image rm nodejs2024q3-service-library-app
```

- remove Docker postgres image

```ruby
docker image rm postgres
```

- remove Docker prisma-migrate image

```ruby
docker image rm nodejs2024q3-service-prisma-migrate
```

- remove Docker volumes

```ruby
docker volume rm nodejs2024q3-service_postgres-data
```

