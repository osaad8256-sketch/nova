const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();

    const db = client.db("testDB");
    const users = db.collection("users");

    console.log("=== INSERT ONE ===");
    const user1 = await users.insertOne({ name: "Ahmed", age: 25, city: "Cairo" });
    const user2 = await users.insertOne({ name: "Ali", age: 30, city: "Alex" });

    console.log(user1.insertedId, user2.insertedId);

    console.log("=== INSERT MANY ===");
    const result = await users.insertMany([
      { name: "u1", age: 27, city: "A" },
      { name: "u2", age: 27, city: "B" },
      { name: "u3", age: 27, city: "C" },
      { name: "u4", age: 27, city: "D" },
      { name: "u5", age: 27, city: "E" },
      { name: "u6", age: 22, city: "F" },
      { name: "u7", age: 23, city: "G" },
      { name: "u8", age: 24, city: "H" },
      { name: "u9", age: 25, city: "I" },
      { name: "u10", age: 26, city: "J" },
    ]);

    console.log("Inserted:", result.insertedCount);

    console.log("=== FIND age=27 ===");
    const data = await users.find({ age: 27 }).toArray();
    console.log(data);

    console.log("=== LIMIT 3 ===");
    const limited = await users.find({ age: 27 }).limit(3).toArray();
    console.log(limited);

    console.log("=== FIND ONE ===");
    const one = await users.findOne({ _id: user1.insertedId });
    console.log(one);

    console.log("=== COUNT ===");
    const count = await users.countDocuments({ age: 27 });
    console.log(count);

    console.log("=== UPDATE ONE ===");
    const update1 = await users.updateOne(
      { _id: user1.insertedId },
      { $set: { name: "Updated Ahmed" }, $inc: { age: 1 } }
    );
    console.log(update1.modifiedCount);

    console.log("=== UPDATE MANY ===");
    const updateMany = await users.updateMany({}, { $inc: { age: 5 } });
    console.log(updateMany.modifiedCount);

    console.log("=== DELETE ONE ===");
    const delete1 = await users.deleteOne({ _id: user2.insertedId });
    console.log(delete1.deletedCount);

    console.log("=== DELETE MANY ===");
    const deleteMany = await users.deleteMany({ age: { $gt: 40 } });
    console.log(deleteMany.deletedCount);

  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();