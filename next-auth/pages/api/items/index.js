import Item from "../../../lib/models/item";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const items = await Item.fetchAll();
        res.status(200).json({ items });
      } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Unable to fetch items" });
      }
      break;

    case "POST":
      const { image, name, quantity } = req.body;
      try {
        const newItem = await Item.addProduct(image, name, quantity);
        res.status(201).json({ item: newItem });
      } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ error: "Unable to add item" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
