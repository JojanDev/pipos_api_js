import Permiso from "../models/Permiso.js";
// import Usuario from "../models/Usuario.js";

/**
 * Servicio encargado de manejar la lógica de negocio
 * relacionada con los permisos.
 *
 * Se apoya en el modelo `Permiso` para interactuar con la base de datos.
 */
class PermisoService {
  // Instancia única del modelo Permiso
  static objPermiso = new Permiso();
  // static objUsuario = new Usuario();

  /**
   * Obtiene todos los permisos registrados.
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getAllPermisos() {
    try {
      // Obtenemos todos los permisos
      const permisos = await this.objPermiso.getAll();

      // Validamos si no hay permisos registrados
      if (!permisos || permisos.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay permisos registrados",
        };

      return {
        error: false,
        code: 200,
        message: "Permisos obtenidos correctamente",
        data: permisos,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene un permiso específico por su ID.
   * @param {number} id - Identificador del permiso
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async getPermisoById(id) {
    try {
      const permiso = await this.objPermiso.getById(id);

      if (!permiso)
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrado",
        };

      return {
        error: false,
        code: 200,
        message: "Permiso obtenido correctamente",
        data: permiso,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea un nuevo permiso en la base de datos.
   * @param {Object} permiso - Datos del permiso a crear
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async createPermiso(permiso) {
    try {
      // Creamos el permiso
      const permisoCreado = await this.objPermiso.create(permiso);

      if (permisoCreado === null)
        return {
          error: true,
          code: 400,
          message: "Error al crear el Permiso",
        };

      return {
        error: false,
        code: 201,
        message: "Permiso creado correctamente",
        data: permisoCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza un permiso existente.
   * @param {number} id - ID del permiso a actualizar
   * @param {Object} permiso - Nuevos datos del permiso
   * @returns {Promise<Object>} Objeto con estructura {error, code, message, data}
   */
  static async updatePermiso(id, permiso) {
    try {
      // Validamos que el permiso exista
      const existente = await this.objPermiso.getById(id);
      if (!existente) {
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrado",
        };
      }

      // Ejecutamos la actualización
      const permisoActualizado = await this.objPermiso.update(id, permiso);

      if (permisoActualizado === null)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Permiso",
        };

      return {
        error: false,
        code: 200,
        message: "Permiso actualizado correctamente",
        data: permisoActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina un permiso de la base de datos.
   * @param {number} id - ID del permiso a eliminar
   * @returns {Promise<Object>} Objeto con estructura {error, code, message}
   */
  static async deletePermiso(id) {
    try {
      // Validamos que el permiso exista
      const permiso = await this.objPermiso.getById(id);
      if (!permiso)
        return {
          error: true,
          code: 404,
          message: "Permiso no encontrado",
        };

      // Ejecutamos la eliminación
      const permisoEliminado = await this.objPermiso.delete(id);
      if (!permisoEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Permiso",
        };

      return {
        error: false,
        code: 200,
        message: "Permiso eliminado correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default PermisoService;
