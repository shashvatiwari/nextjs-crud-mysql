import Item from "../../../lib/models/item";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const item = await Item.findById(id);
        if (!item) {
          res.status(404).json({ error: "Item not found" });
          return;
        }
        res.status(200).json({ item });
      } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({ error: "Unable to fetch item" });
      }
      break;

    case "PUT":
      const { image, name, quantity } = req.body;
      try {
        const updatedItem = await Item.updateProduct(id, image, name, quantity);
        if (!updatedItem.success) {
          res.status(404).json({ error: "Item not found" });
          return;
        }
        res.status(200).json({ item: updatedItem });
      } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Unable to update item" });
      }
      break;

    case "DELETE":
      try {
        const deleteResult = await Item.deleteProduct(id);
        if (!deleteResult.success) {
          res.status(404).json({ error: "Item not found" });
          return;
        }
        res.status(200).json({ message: "Item deleted successfully" });
      } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Unable to delete item" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
