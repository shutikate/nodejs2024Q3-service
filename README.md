## Home Library Service

Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

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

##### Running the server

```ruby
npm run start
```
The server will be running on http://localhost:4000` (4000 as default).

After starting the app you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/

#### Testing

After application running open new terminal and enter:

To run all tests without authorization

```ruby
npm run test
```

To run only one of all test suites

```ruby
npm run test -- <path to suite>
```

#### Auto-fix and format

```ruby
npm run lint
```

```ruby
npm run format
```
