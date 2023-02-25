const request = require('supertest');
const app = require('../app.js');
const { faker } = require('@faker-js/faker')
const prisma = require('../../prisma/prisma.js');

let token = null;

beforeAll(async () => {
    console.log("BEFORE RUNNING COUNTER TESTS RESET THE DATABASE \n npx prisma migrate reset   (select 'yes' when prompted)");
})

beforeEach(async () => {
    // Login the user
    const res = await request(app)
        .post('/users/login')
        .send({
            email: 'admin@admin.com',
            password: 'admin'
        })
        .expect(200)
        .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
})


// Test the increment route
describe('POST /counter/increment', () => {
    test('It should increment the counter', async () => {
        // The counter with id 1 belongs to the user with id 1
        const res = await request(app)
            .post('/counter/increment')
            .set('Authorization', token)
            .send({
                counterId: 1
            })
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('counterName');
        expect(res.body).toHaveProperty('counterValue');
        expect(res.body).toHaveProperty('user');
    })

    test('It should not increment the counter if the counter does not belong to the user', async () => {
        // The counter with id 2 belongs to the user with id 2
        const res = await request(app)
            .post('/counter/increment')
            .set('Authorization', token)
            .send({
                counterId: 2
            })
            .expect(403)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the counter id is not provided', async () => {
        const res = await request(app)
            .post('/counter/increment')
            .set('Authorization', token)
            .send({})
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the counter id is not a number', async () => {
        const res = await request(app)
            .post('/counter/increment')
            .set('Authorization', token)
            .send({
                counterId: 'test'
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the token is not provided', async () => {
        const res = await request(app)
            .post('/counter/increment')
            .send({
                counterId: 1
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the token is invalid', async () => {
        const res = await request(app)
            .post('/counter/increment')
            .set('Authorization', 'test')
            .send({
                counterId: 1
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })
})

// Repeat the same tests for the decrement route
describe('POST /counter/decrement', () => {
    test('It should decrement the counter', async () => {
        // The counter with id 1 belongs to the user with id 1
        const res = await request(app)
            .post('/counter/decrement')
            .set('Authorization', token)
            .send({
                counterId: 1
            })
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('counterName');
        expect(res.body).toHaveProperty('counterValue');
        expect(res.body).toHaveProperty('user');
    })

    test('It should not decrement the counter if the counter does not belong to the user', async () => {
        // The counter with id 2 belongs to the user with id 2
        const res = await request(app)
            .post('/counter/decrement')
            .set('Authorization', token)
            .send({
                counterId: 2
            })
            .expect(403)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the counter id is not provided', async () => {
        const res = await request(app)
            .post('/counter/decrement')
            .set('Authorization', token)
            .send({})
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the counter id is not a number', async () => {
        const res = await request(app)
            .post('/counter/decrement')
            .set('Authorization', token)
            .send({
                counterId: 'test'
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the token is not provided', async () => {
        const res = await request(app)
            .post('/counter/decrement')
            .send({
                counterId: 1
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the token is invalid', async () => {
        const res = await request(app)
            .post('/counter/decrement')
            .set('Authorization', 'test')
            .send({
                counterId: 1
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })
})

// Repeat the same tests for the reset route
describe('POST /counter/reset', () => {
    test('It should reset the counter', async () => {
        // The counter with id 1 belongs to the user with id 1
        const res = await request(app)
            .post('/counter/reset')
            .set('Authorization', token)
            .send({
                counterId: 1
            })
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('counterName');
        expect(res.body).toHaveProperty('counterValue');
        expect(res.body).toHaveProperty('user');
    })

    test('It should not reset the counter if the counter does not belong to the user', async () => {
        // The counter with id 2 belongs to the user with id 2
        const res = await request(app)
            .post('/counter/reset')
            .set('Authorization', token)
            .send({
                counterId: 2
            })
            .expect(403)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not reset the counter if the counter id is not provided', async () => {
        const res = await request(app)
            .post('/counter/reset')
            .set('Authorization', token)
            .send({})
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not reset the counter if the counter id is not a number', async () => {
        const res = await request(app)
            .post('/counter/reset')
            .set('Authorization', token)
            .send({
                counterId: 'test'
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not reset the counter if the token is not provided', async () => {
        const res = await request(app)
            .post('/counter/reset')
            .send({
                counterId: 1
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not reset the counter if the token is invalid', async () => {
        const res = await request(app)
            .post('/counter/reset')
            .set('Authorization', 'test')
            .send({
                counterId: 1
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })
})

// Test the create counter route
describe('POST /counter/create', () => {
    test('It should create a counter', async () => {
        const res = await request(app)
            .post('/counter/create')
            .set('Authorization', token)
            .send({
                counterName: faker.random.word()
            })
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('counterName');
        expect(res.body).toHaveProperty('counterValue');
        expect(res.body).toHaveProperty('user');
    })

    test('It should not create a counter if the counter name is not provided', async () => {
        const res = await request(app)
            .post('/counter/create')
            .set('Authorization', token)
            .send({})
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not create a counter if the counter name is not a string', async () => {
        const res = await request(app)
            .post('/counter/create')
            .set('Authorization', token)
            .send({
                counterName: 1
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not create a counter if the token is not provided', async () => {
        const res = await request(app)
            .post('/counter/create')
            .send({
                counterName: 'test'
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not create a counter if the token is invalid', async () => {
        const res = await request(app)
            .post('/counter/create')
            .set('Authorization', 'test')
            .send({
                counterName: 'test'
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not create a counter if the counter name is already taken', async () => {
        const res = await request(app)
            .post('/counter/create')
            .set('Authorization', token)
            .send({
                counterName: 'test'
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not create a counter if the counter name is too long', async () => {
        const res = await request(app)
            .post('/counter/create')
            .set('Authorization', token)
            .send({
                counterName: 'test'.repeat(100)
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })
})

// Test the get all counters route
describe('GET /counter/all', () => {
    test('It should get all the counters', async () => {
        const res = await request(app)
            .get('/counter/all')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('counters');
    })

    test('It should not get all the counters if the token is not provided', async () => {
        const res = await request(app)
            .get('/counter/all')
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not get all the counters if the token is invalid', async () => {
        const res = await request(app)
            .get('/counter/all')
            .set('Authorization', 'test')
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })
})

// Test the increment alternative route
describe('POST /counter/incrementAlternative', () => {
    test('It should increment the counter', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 1,
                incrementAmount: 5
            })
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('message');
    })

    test('It should not increment the counter if the counter does not belong to the user', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 2,
                incrementAmount: 5
            })
            .expect(403)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the counter id is not provided', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .set('Authorization', token)
            .send({
                incrementAmount: 5
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the increment Amount is not provided', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 1
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the counter id is not a number', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 'test',
                incrementAmount: 5
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the increment Amount is not a number', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 1,
                incrementAmount: 'test'
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the increment Amount is a negative number', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 1,
                incrementAmount: -1
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the token is not provided', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .send({
                counterId: 1,
                incrementAmount: 5
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not increment the counter if the token is invalid', async () => {
        const res = await request(app)
            .post('/counter/incrementAlternative')
            .set('Authorization', 'test')
            .send({
                counterId: 1,
                incrementAmount: 5
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })
})

// Test the decrement alternative route
describe('POST /counter/decrementAlternative', () => {
    test('It should decrement the counter', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 1,
                decrementAmount: 5
            })
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('message');
    })

    test('It should not decrement the counter if the counter does not belong to the user', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 2,
                decrementAmount: 5
            })
            .expect(403)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the counter id is not provided', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .set('Authorization', token)
            .send({
                decrementAmount: 5
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the decrement Amount is not provided', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 1
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the counter id is not a number', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 'test',
                decrementAmount: 5
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the decrement Amount is not a number', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 1,
                decrementAmount: 'test'
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the decrement Amount is a negative number', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .set('Authorization', token)
            .send({
                counterId: 1,
                decrementAmount: -1
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the token is not provided', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .send({
                counterId: 1,
                decrementAmount: 5
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not decrement the counter if the token is invalid', async () => {
        const res = await request(app)
            .post('/counter/decrementAlternative')
            .set('Authorization', 'test')
            .send({
                counterId: 1,
                decrementAmount: 5
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })
})

// Test the delete counter route
describe('POST /counter/delete', () => {
    test('It should delete the counter', async () => {
        // The counter with id 1 belongs to the user with id 1
        // Create a counter
        const counter = await prisma.prisma.counter.create({
            data: {
                counterName: 'toBeDeleted',
                counterValue: 0,
                userId: {
                    connect: {
                        id: 1
                    }
                },
                dateCreated: new Date(),
                dateUpdated: new Date()
            }
        })

        const res = await request(app)
            .post('/counter/delete')
            .set('Authorization', token)
            .send({
                counterId: counter.id
            })
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('message');
    })

    test('It should not delete the counter if the counter does not belong to the user', async () => {
        // The counter with id 2 belongs to the user with id 2
        const res = await request(app)
            .post('/counter/delete')
            .set('Authorization', token)
            .send({
                counterId: 2
            })
            .expect(403)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not delete the counter if the counter id is not provided', async () => {
        const res = await request(app)
            .post('/counter/delete')
            .set('Authorization', token)
            .send({})
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not delete the counter if the counter id is not a number', async () => {
        const res = await request(app)
            .post('/counter/delete')
            .set('Authorization', token)
            .send({
                counterId: 'test'
            })
            .expect(400)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not delete the counter if the token is not provided', async () => {
        const res = await request(app)
            .post('/counter/delete')
            .send({
                counterId: 1
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not delete the counter if the token is invalid', async () => {
        const res = await request(app)
            .post('/counter/delete')
            .set('Authorization', 'test')
            .send({
                counterId: 1
            })
            .expect(401)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })

    test('It should not delete the counter if the counter does not exist', async () => {
        const res = await request(app)
            .post('/counter/delete')
            .set('Authorization', token)
            .send({
                counterId: 100
            })
            .expect(404)
            .expect('Content-Type', /json/);
        expect(res.body).toHaveProperty('error');
    })
})
