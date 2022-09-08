# taopaipai
Tao Pai Pai is a web based application designed to assist users during their workouts by counting
repetitions of the exercises and keeping track of sets, hence discharging the users from these
repetitive and tedious tasks, so they can focus all attention and energy on properly performing
the exercises

# Dependencies
- Docker [(lastest version)](https://www.docker.com/products/docker-desktop/)

# Step by Step to run this app locally

There is Docker support via `docker-compose.yml` in the root folder of the project. Please use Docker to run this project locally on your computer.

The existent configuration has 3 containers as described:
- `backend` runs the GraphQL API service at http://localhost:3001/graphql.
- `frontend` runs the React client at http://localhost:3000/
- `db` runs a basic Postgres database service on port 5433.

To start the containers on Docker, please execute on the terminal the command:
```
docker compose -f "docker-compose.yml" up -d --build
```

With the containers initialized, it's time to insert the first data load into the database, for that navigate to:

http://localhost:3001/playground

And then insert an exercise data using one of the templates available in the `./graphql` directory.

- createExercise_Bicep_Curl.graphql
- createExercise_Dead_Lift.graphql
- createExercise_Front_Squat.graphql
- createExercise_Lateral_Raise.graphql
- createExercise_Shoulder_Press.graphql

After inserting the data, navigate to http://localhost:3000/app and you will be able to see the list of exercises.