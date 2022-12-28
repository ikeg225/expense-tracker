import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = await client.db('expenses');
  const { person, date, category, description, amount } = req.body;

  const collection = await db.collection(person);
  collection.insertOne({ date : date, category : category, description : description, amount : amount });

  res.status(200).json({ message: 'Success' });
}
