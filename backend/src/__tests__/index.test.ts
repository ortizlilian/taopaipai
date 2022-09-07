const url = 'http://127.0.0.1:3001';
const request = require("supertest")(url);

jest.setTimeout(45000);

let countExercises = 0;

describe("GraphQL Tests", () => {
    test("List all exercises", (done) => {
        let query = `{ getAllExercises { id, name } }`;

        request.post("/graphql").send({query: query}).expect(200).end((err : any, res : any) => {
            if (err) 
                return done(err);
            
            countExercises = res.body.data.getAllExercises.length;
            done();
        })
    });
})

export {}
