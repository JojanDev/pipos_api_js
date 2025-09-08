import express from "express";

import TipoDocumentoController from "../controllers/TipoDocumentoController.js";
import {
  validarTipoDocumento,
  validarTipoDocumentoParcial,
} from "../middlewares/entities/tiposDocumentos/tipoDocumentoValidator.js";
import authorize from "../middlewares/auth/authorize.js";

const router = express.Router();

// Obtener todos los tipos de documentos
router.get(
  "/",
  authorize("tipo-documento.read"),
  TipoDocumentoController.getAllTiposDocumentos
);

// Obtener un tipo de documento por ID
router.get(
  "/:id",
  authorize("tipo-documento.read"),
  TipoDocumentoController.getTipoDocumentoById
);

// Crear un nuevo tipo de documento
router.post(
  "/",
  authorize("tipo-documento.create"),
  validarTipoDocumento,
  TipoDocumentoController.createTipoDocumento
);

// Actualizar un tipo de documento
router.put(
  "/:id",
  authorize("tipo-documento.update"),
  validarTipoDocumento,
  TipoDocumentoController.updateTipoDocumento
);

// Actualizar un tipo de documento parcialmente
router.patch(
  "/:id",
  authorize("tipo-documento.update"),
  validarTipoDocumentoParcial,
  TipoDocumentoController.updateTipoDocumento
);

// Eliminar un tipo de documento
router.delete(
  "/:id",
  authorize("tipo-documento.delete"),
  TipoDocumentoController.deleteTipoDocumento
);

export default router;
