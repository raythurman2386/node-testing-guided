const db = require("../data/config");
const hobbitsModel = require('./hobbits-model');

beforeEach(async () => {
  await db.seed.run()
})

describe("hobbits model", () => {
  test("list hobbits", async () => {
    const res = await hobbitsModel.list()
    expect(res.length).toBeGreaterThan(0)
  })

  test("findById", async () => {
    const res = await hobbitsModel.findById(1)
    expect(res.name).toBe("sam")
  })

  test("insert hobbit", async () => {
    await hobbitsModel.insert({ name: "bobby" })
    const hobbits = await db("hobbits").select()
    expect(hobbits).toHaveLength(5)
  })

  test("update hobbit", async () => {
    await hobbitsModel.update(1, { name: "gaffer" })
    const hobbit = await hobbitsModel.findById(1)
    expect(hobbit.name).toBe('gaffer')
  })

  test("remove hobbit", async () => {
    await hobbitsModel.remove(1)
    const hobbits = await hobbitsModel.list()
    expect(hobbits).toHaveLength(3)
  })
})