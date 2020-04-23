const request = require('supertest')

const server = require('./server');
const db = require('../data/dbConfig')

describe('server', () => {
    describe('GET /', () => {
        it('should return 200 OK', () => {
            // make GET request
            return request(server).get('/') // using .then so we can use the jest library
            .then(res => {
                // assert that the HTTP status code is 200. This is an async op. You can 1) return it (infront of request) or async await, seen later
                expect(res.status).toBe(200)
            })
        })
    });

    describe("POST /hobbits", () => {
        beforeEach(async () =>{
            await db('hobbits').truncate()
        })
        it('should return 201 on success', () => {
            return request(server).post('/hobbits')
            .send({name: 'gaffer'})
            .then(res => {
                expect(res.status).toBe(201);
            })
        });
        it('should return a message to the db', () => {
            return request(server).post('/hobbits')
            .send({name: 'gaffer'})
            .then(res => {
                expect(res.body.message).toBe("Hobbit created successfully");
            })
        });
        it('should a hobbit to db', async function() {
            const hobbitName = 'gaffer';
            const existing = await db('hobbits').where({name: hobbitName});
            expect(existing).toHaveLength(0)
            await request(server).post('/hobbits')
            .send({name: hobbitName})
            .then(res => {
                expect(res.body.message).toBe("Hobbit created successfully");
            })

            const inserted = await db('hobbits').where({name: hobbitName});
            expect(inserted).toHaveLength(1)
        });
    });
});