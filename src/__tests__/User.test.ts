import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe("Users", ()=>{
   
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })
    const email = new Date().getTime().toString() + "gmail.com"
    it("should be able to create a new user", async ()=>{
        const response = await request(app).post('/users')
        .send({
            email,
            name: 'User Example'
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")

    })
    it("should not be able to create a new user with the same email", async ()=>{
        const response = await request(app).post('/users')
        .send({
            email,
            name: 'User Example'
        })
        expect(response.status).toBe(400)
    })
})