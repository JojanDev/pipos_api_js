import { ResponseProvider } from "../providers/ResponseProvider.js";
import ProductoVentaService from "../services/ProductoVentaService.js";

class ProductoVentaController {
  // Obtener todos los tipos de documentos
  static getAllProductosVentas = async (req, res) => {
    try {
      const response = await ProductoVentaService.getAllProductosVentas();
      // Validamos si no hay tipos de documentos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un tipo de documento por su ID
  static getProductoVentaById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al productoVenta para obtener el tipo de documento por su ID
      const response = await ProductoVentaService.getProductoVentaById(id);
      // Validamos si no hay tipo de documento
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo tipo de documento
  static createProductoVenta = async (req, res) => {
    const productoVenta = req.body;
    try {
      // Llamamos el método crear del modelo
      const response = await ProductoVentaService.createProductoVenta(
        productoVenta
      );
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el tipo de documento creado
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        201
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un tipo de documento
  static updateProductoVenta = async (req, res) => {
    const { id } = req.params;
    const productoVenta = req.body;
    try {
      // Llamamos al método actualizar del modelo
      const response = await ProductoVentaService.updateProductoVenta(
        id,
        productoVenta
      );
      // Validamos que la respuesta no tenga error
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }

      // Retornamos el tipo de documento actualizado
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        200
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un tipo de documento
  static deleteProductoVenta = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al productoVenta para eliminar el tipo de documento por su ID
      const response = await ProductoVentaService.deleteProductoVenta(id);
      // Validamos si no se pudo eliminar el tipo de documento
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Retornamos el tipo de documento eliminado
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un tipo de documento por su ID
  static getAllProductoVentaByVentaId = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al productoVenta para obtener el tipo de documento por su ID
      const response = await ProductoVentaService.getAllProductoVentaByVentaId(
        id
      );
      // Validamos si no hay tipo de documento
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default ProductoVentaController;
