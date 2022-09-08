"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
require("reflect-metadata");
const express_graphql_1 = require("express-graphql");
const Schema_1 = require("./Schema");
const typeorm_1 = require("typeorm");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || "3001";
    const url = process.env.URL || "localhost";
    // database auth
    const db_username = process.env.DB_USERNAME || "postgres";
    const db_password = process.env.DB_PASSWORD || "example";
    const db_database = process.env.DB_NAME || "postgres";
    const db_port = Number(process.env.DB_PORT) || 5433;
    const db_host = process.env.DB_HOST || "db";
    const AppDataSource = new typeorm_1.DataSource({
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
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({ schema: Schema_1.schema, graphiql: true }));
    app.get("/playground", (0, graphql_playground_middleware_express_1.default)({ endpoint: "/graphql" }));
    app.listen(port, () => {
        console.log(`Server ready at http://${url}:${port}/graphql`);
    });
});
main().catch((err) => {
    console.log(err);
});
