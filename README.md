## Home Library Service

Task: REST service: Containerization and Database (PostgreSQL) & ORM

### Getting Started

#### Installation

1. Clone this repository:

```ruby
git clone https://github.com/shutikate/nodejs2024Q3-service
```

2. Navigate to the project directory and switch to `develop` branch:

```ruby
git checkout develop
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
docker compose up --build
```

##### After run of the application and the Docker images will be created:

open new terminal:

6. Check Docker containers is started:

```ruby
docker ps
```

7. OpenAPI documentation:

You can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/

#### Testing

8. Run all tests:

without authorization

```ruby
npm run test
```

To run only one of all test suites

```ruby
npm run test -- <path to suite>
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

