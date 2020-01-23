const supertest = require('supertest');
const server = require('./index');
const db = require('./data/config')

beforeEach(async () => {
  await db.seed.run()
})

test("welcome route", async () => {
  const res = await supertest(server).get('/')

  // Does it return the expected status code
  expect(res.status).toBe(200)
  // Does it return the expected data format
  expect(res.type).toBe("application/json")
  // Does it return the expected data
  expect(res.body.message).toMatch(/welcome/i)
})

test("get hobbits", async () => {
  const res = await supertest(server).get('/hobbits')

  expect(res.status).toBe(200)
  expect(res.type).toBe("application/json")
  expect(res.body.length).toBeGreaterThan(0)
  expect(res.body[0].id).toBe(1)
  expect(res.body[0].name).toBe('sam')
})

test("post hobbit route", async () => {
  const res = await supertest(server)
    .post('/hobbits')
    .send({ name: "larry" })

  expect(res.status).toBe(201)
  expect(res.type).toBe("application/json")
  expect(res.body).toEqual({ id: 5, name: "larry" })
})