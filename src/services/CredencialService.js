import Credencial from "../models/Credencial.js";
import Usuario from "../models/Usuario.js";
import UsuarioService from "./UsuarioService.js";
import bcrypt from "bcrypt";

const saltRounds = 10; // Número de rondas para generar el hash de contraseñas

class CredencialService {
  static objCredencial = new Credencial();
  static objUsuario = new Usuario();

  /**
   * Obtiene todas las credenciales registradas en el sistema
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de credenciales
   */
  static async getAllCredenciales() {
    try {
      // Consultamos todas las credenciales
      const credenciales = await this.objCredencial.getAll();

      // Validamos si no existen registros
      if (!credenciales || credenciales.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay credenciales registradas",
        };

      // Retornamos las credenciales encontradas
      return {
        error: false,
        code: 200,
        message: "Credenciales obtenidas correctamente",
        data: credenciales,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene una credencial específica por su ID
   * @param {number} id - ID de la credencial
   * @returns {Promise<Object>} Respuesta con éxito o error y la credencial encontrada
   */
  static async getCredencialById(id) {
    try {
      // Buscamos credencial por su identificador
      const credencial = await this.objCredencial.getById(id);

      // Si no existe, devolvemos error
      if (!credencial)
        return { error: true, code: 404, message: "Credencial no encontrada" };

      // Si existe, retornamos la credencial
      return {
        error: false,
        code: 200,
        message: "Credencial obtenida correctamente",
        data: credencial,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea una nueva credencial para un usuario
   * @param {Object} credencial - Datos de la credencial (usuario_id, usuario, contrasena, etc.)
   * @returns {Promise<Object>} Respuesta con éxito o error y la credencial creada
   */
  static async createCredencial(credencial) {
    try {
      // Validamos que el usuario exista antes de asignarle credenciales
      const usuarioExistente = await UsuarioService.getUsuarioById(
        credencial.usuario_id
      );
      if (usuarioExistente.error) return usuarioExistente;

      // Validamos si el usuario ya tiene credenciales registradas
      const credencialUsuario = await this.objCredencial.getByUsuarioId(
        credencial.usuario_id
      );
      if (credencialUsuario && credencialUsuario.length > 0)
        return {
          error: true,
          code: 409,
          message: "El usuario ya tiene credenciales registradas.",
        };

      // Validamos si el nombre de usuario ya está en uso
      const nombreUsuarioExistente = await this.objCredencial.getByUsuario(
        credencial.usuario
      );
      if (nombreUsuarioExistente)
        return {
          error: true,
          code: 409,
          message: "El nombre de usuario ya está registrado.",
        };

      // Encriptamos la contraseña antes de guardarla
      if (credencial.contrasena)
        credencial.contrasena = await bcrypt.hash(
          credencial.contrasena,
          saltRounds
        );

      // Guardamos la credencial en la base de datos
      const credencialCreado = await this.objCredencial.create(credencial);

      // Validamos si no se pudo crear
      if (!credencialCreado)
        return {
          error: true,
          code: 400,
          message: "Error al crear la credencial",
        };

      // Retornamos credencial creada con éxito
      return {
        error: false,
        code: 201,
        message: "Credencial creada correctamente",
        data: credencialCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza una credencial existente
   * @param {number} id - ID de la credencial
   * @param {Object} credencial - Datos a actualizar
   * @returns {Promise<Object>} Respuesta con éxito o error y credencial actualizada
   */
  static async updateCredencial(id, credencial) {
    try {
      // Validamos que la credencial exista
      const existente = await this.objCredencial.getById(id);
      if (!existente)
        return { error: true, code: 404, message: "Credencial no encontrada" };

      // Actualizamos la credencial
      const credencialActualizado = await this.objCredencial.update(
        id,
        credencial
      );

      if (!credencialActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la credencial",
        };

      return {
        error: false,
        code: 200,
        message: "Credencial actualizada correctamente",
        data: credencialActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina una credencial por ID
   * @param {number} id - ID de la credencial
   * @returns {Promise<Object>} Respuesta con éxito o error
   */
  static async deleteCredencial(id) {
    try {
      // Validamos que la credencial exista antes de eliminar
      const credencial = await this.objCredencial.getById(id);
      if (!credencial)
        return { error: true, code: 404, message: "Credencial no encontrada" };

      // Ejecutamos eliminación
      const eliminado = await this.objCredencial.delete(id);

      if (!eliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar la credencial",
        };

      return {
        error: false,
        code: 200,
        message: "Credencial eliminada correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene la credencial de un usuario por su ID
   * @param {number} usuario_id - ID del usuario
   * @returns {Promise<Object>} Respuesta con éxito o error y la credencial del usuario
   */
  static async getCredencialByUsuarioId(usuario_id) {
    try {
      // Buscamos credencial vinculada a un usuario específico
      const credencial = await this.objCredencial.getByUsuarioId(usuario_id);

      if (!credencial)
        return {
          error: true,
          code: 404,
          message: "Credencial de usuario no encontrada",
        };

      // Retornamos la primera credencial encontrada (suponiendo 1 por usuario)
      return {
        error: false,
        code: 200,
        message: "Credencial obtenida correctamente",
        data: credencial,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene la credencial de un usuario por su nombre de usuario
   * @param {string} usuario - Nombre de usuario
   * @returns {Promise<Object>} Respuesta con éxito o error y credencial del usuario
   */
  static async getCredencialByUsuario(usuario) {
    try {
      // Buscamos credencial según nombre de usuario
      const credencial = await this.objCredencial.getByUsuario(usuario);

      if (!credencial)
        return {
          error: true,
          code: 404,
          message: "Credencial de usuario no encontrada",
        };

      return {
        error: false,
        code: 200,
        message: "Credencial obtenida correctamente",
        data: credencial,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default CredencialService;
