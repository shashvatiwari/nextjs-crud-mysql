import pool from '../db';

class Item {
  static async fetchAll() {
    const query = 'SELECT * FROM items';
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async findById(id) {
    const query = 'SELECT * FROM items WHERE id = ?';
    const values = [id];
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static async addProduct(image, name, quantity) {
    const query = 'INSERT INTO items (image, name, quantity) VALUES (?, ?, ?)';
    const values = [image, name, quantity];
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ success: true, insertId: results.insertId });
        }
      });
    });
  }

  static async deleteProduct(id) {
    const query = 'DELETE FROM items WHERE id = ?';
    const values = [id];
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else if (results.affectedRows === 0) {
          resolve({ success: false, message: 'Item not found' });
        } else {
          resolve({ success: true, message: 'Item deleted successfully' });
        }
      });
    });
  }

  static async updateProduct(id, image, name, quantity) {
    const query = 'UPDATE items SET image = ?, name = ?, quantity = ? WHERE id = ?';
    const values = [image, name, quantity, id];
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else if (results.affectedRows === 0) {
          resolve({ success: false, message: 'Item not found' });
        } else {
          resolve({ success: true, message: 'Item updated successfully' });
        }
      });
    });
  }
}

export default Item;
