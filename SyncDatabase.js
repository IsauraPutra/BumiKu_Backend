import db from "./config/Database.js";
import Product from "./models/ProductModel.js";
import User from "./models/UserModel.js";

const syncDb = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
};

syncDb();
