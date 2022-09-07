import express from "express";
import cors from "cors";
import expressPlayground from "graphql-playground-middleware-express";
import "reflect-metadata";
import {graphqlHTTP} from "express-graphql";
import {schema} from "./Schema";
import {DataSource} from "typeorm";

const main = async () => {
    const port = process.env.PORT || "3001";
    const url = process.env.URL || "localhost";

    // database auth
    const db_username = process.env.DB_USERNAME || "postgres";
    const db_password = process.env.DB_PASSWORD || "example";
    const db_database = process.env.DB_NAME || "postgres";
    const db_port = Number(process.env.DB_PORT) || 5433;
    const db_host = process.env.DB_HOST || "db";

    const AppDataSource = new DataSource({
        type: "postgres",
        host: db_host,
        port: db_port,
        username: db_username,
        password: db_password,
        database: db_database,
        synchronize: true,
        logging: false,
        entities: [__dirname + "/Entities/*.{js,ts}"],
        subscribers: [],
        migrations: []
    });

    AppDataSource.initialize().catch((error) => console.log(error));

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/graphql", graphqlHTTP({schema, graphiql: true}));

    app.get("/playground", expressPlayground({endpoint: "/graphql"}));

    app.listen(port, () => {
        console.log(`Server ready at http://${url}:${port}/graphql`);
    });
}; 

main().catch((err) => {
    console.log(err);
});
