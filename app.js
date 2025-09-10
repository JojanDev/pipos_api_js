import express from "express"; // Importa el módulo Express para crear la aplicación
import dotenv from "dotenv"; // Importa dotenv para cargar variables de entorno desde un archivo .env
import cors from "cors"; // Importa cors para habilitar CORS en la aplicación
import cookieParser from "cookie-parser"; // Importa cookie-parser para manejar cookies

import rutas from "./src/routes/index.js"; // Importa las rutas definidas en el archivo de rutas
import { ResponseProvider } from "./src/providers/ResponseProvider.js"; // Importa el proveedor de respuestas para manejar la respuesta de la API
import authenticate from "./src/middlewares/auth/authenticate.js"; // Importa el middleware de autenticación

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Crear la instancia de Express
const app = express(); // Inicializa la aplicación Express
const API_BASE_PATH = process.env.API_BASE_PATH || "/pipos_api"; // Define la ruta base de la API

// Middlewares globales
app.use(cors({ origin: true, credentials: true })); // Habilita CORS para permitir solicitudes desde otros dominios
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos URL-encoded
app.use(cookieParser()); // Middleware para parsear cookies en las solicitudes

// Rutas dinámicas
rutas.forEach(({ path, router, publico }) => {
  if (publico) {
    // Si la ruta es pública, no requiere autenticación
    app.use(API_BASE_PATH + path, router);
  } else {
    // Si la ruta no es pública, aplica middleware de autenticación
    app.use(API_BASE_PATH + path, authenticate, router);
  }
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  const mensaje = `Recurso no encontrado: [${req.method}] ${req.originalUrl}`; // Mensaje de error indicando método y URL
  return ResponseProvider.error(res, mensaje, 404); // Envía una respuesta de error 404
});

// Inicio del servidor
const port = process.env.PORT || 3000; // Define el puerto de ejecución del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}${API_BASE_PATH}`); // Mensaje en consola indicando que el servidor está en funcionamiento
});
