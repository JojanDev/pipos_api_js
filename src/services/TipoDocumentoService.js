import TipoDocumento from "../models/TipoDocumento.js";

class TipoDocumentoService {
  static objTipoDocumento = new TipoDocumento();

  /**
   * Obtiene todos los tipos de documentos registrados
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de tipos de documentos
   */
  static async getAllTiposDocumentos() {
    try {
      const tiposDocumentos = await this.objTipoDocumento.getAll();

      if (!tiposDocumentos || tiposDocumentos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay tipos de documentos registradas",
        };

      return {
        error: false,
        code: 200,
        message: "Tipos de documentos obtenidos correctamente",
        data: tiposDocumentos,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene un tipo de documento por su ID
   * @param {number} id - ID del tipo de documento
   * @returns {Promise<Object>} Respuesta con éxito o error y el tipo de documento
   */
  static async getTipoDocumentoById(id) {
    try {
      const tipoDocumento = await this.objTipoDocumento.getById(id);

      if (!tipoDocumento)
        return {
          error: true,
          code: 404,
          message: "Tipo de documento no encontrado",
        };

      return {
        error: false,
        code: 200,
        message: "Tipo de documento obtenido correctamente",
        data: tipoDocumento,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea un nuevo tipo de documento
   * @param {Object} tipoDocumento - Datos del tipo de documento a crear
   * @returns {Promise<Object>} Respuesta con éxito o error y el tipo de documento creado
   */
  static async createTipoDocumento(tipoDocumento) {
    try {
      const tipoDocumentoCreado = await this.objTipoDocumento.create(
        tipoDocumento
      );

      if (!tipoDocumentoCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear el tipo de documento",
        };

      return {
        error: false,
        code: 201,
        message: "Tipo de documento creado correctamente",
        data: tipoDocumentoCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza un tipo de documento existente
   * @param {number} id - ID del tipo de documento a actualizar
   * @param {Object} tipoDocumento - Datos a actualizar
   * @returns {Promise<Object>} Respuesta con éxito o error y el tipo de documento actualizado
   */
  static async updateTipoDocumento(id, tipoDocumento) {
    try {
      const existente = await this.objTipoDocumento.getById(id);

      if (!existente)
        return {
          error: true,
          code: 404,
          message: "Tipo de documento no encontrado",
        };

      const tipoDocumentoActualizado = await this.objTipoDocumento.update(
        id,
        tipoDocumento
      );

      if (!tipoDocumentoActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el tipo de documento",
        };

      return {
        error: false,
        code: 200,
        message: "Tipo de documento actualizado correctamente",
        data: tipoDocumentoActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina un tipo de documento por su ID
   * @param {number} id - ID del tipo de documento a eliminar
   * @returns {Promise<Object>} Respuesta con éxito o error
   */
  static async deleteTipoDocumento(id) {
    try {
      const tipoDocumento = await this.objTipoDocumento.getById(id);

      if (!tipoDocumento)
        return {
          error: true,
          code: 404,
          message: "Tipo de documento no encontrado",
        };

      const tipoDocumentoEliminado = await this.objTipoDocumento.delete(id);

      if (!tipoDocumentoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el tipo de documento",
        };

      return {
        error: false,
        code: 200,
        message: "Tipo de documento eliminado correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default TipoDocumentoService;
