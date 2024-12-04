const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();

const Mercado_Pago = Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN || "",
});

Mercado_Pago.post("/", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Validar que el producto exista en el arreglo
    const product = menuData.find((item) => item.id === productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Crear preferencia en Mercado Pago
    const preference = {
      items: [
        {
          title: product.title,
          description: product.description,
          picture_url: product.image,
          unit_price: parseFloat(product.price),
          quantity: parseInt(quantity, 10),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: process.env.SUCCESS_URL || "http://localhost:5173/",
        failure: process.env.FAILURE_URL || "http://localhost:3000/fallo",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
});

module.exports = Mercado_Pago;
