import Usuario from "../models/Usuario.js";
import TipoDocumentoService from "./TipoDocumentoService.js";
import RolUsuario from "../models/RolUsuario.js";

class UsuarioService {
  static objUsuario = new Usuario();
  static objRolUsuario = new RolUsuario();

  /**
   * Obtiene todos los usuarios registrados
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de usuarios
   */
  static async getAllUsuarios() {
    try {
      const usuarios = await this.objUsuario.getAll();

      if (!usuarios || usuarios.length === 0)
        return {
          error: true,
          code: 404,
          message: "No hay usuarios registrados",
        };

      return {
        error: false,
        code: 200,
        message: "Usuarios obtenidos correctamente",
        data: usuarios,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene un usuario por su ID
   * @param {number} id - ID del usuario
   * @returns {Promise<Object>} Respuesta con éxito o error y el usuario
   */
  static async getUsuarioById(id) {
    try {
      const usuario = await this.objUsuario.getById(id);

      if (!usuario)
        return { error: true, code: 404, message: "Usuario no encontrado" };

      return {
        error: false,
        code: 200,
        message: "Usuario obtenido correctamente",
        data: usuario,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Crea un nuevo usuario
   * @param {Object} usuario - Datos del usuario a crear
   * @returns {Promise<Object>} Respuesta con éxito o error y el usuario creado
   */
  static async createUsuario(usuario) {
    try {
      const tipoDocumentoExistente =
        await TipoDocumentoService.getTipoDocumentoById(
          usuario.tipo_documento_id
        );
      if (tipoDocumentoExistente.error) return tipoDocumentoExistente;

      if (await this.objUsuario.getByDocumento(usuario.numero_documento))
        return {
          error: true,
          code: 409,
          message: "El número de documento ya está registrado.",
        };

      const usuarioCreado = await this.objUsuario.create(usuario);
      if (!usuarioCreado)
        return { error: true, code: 400, message: "Error al crear el Usuario" };

      return {
        error: false,
        code: 201,
        message: "Usuario creado correctamente",
        data: usuarioCreado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Actualiza un usuario existente
   * @param {number} id - ID del usuario a actualizar
   * @param {Object} usuario - Datos a actualizar
   * @returns {Promise<Object>} Respuesta con éxito o error y el usuario actualizado
   */
  static async updateUsuario(id, usuario) {
    try {
      const existente = await this.objUsuario.getById(id);
      if (!existente)
        return { error: true, code: 404, message: "Usuario no encontrado" };

      const usuarioActualizado = await this.objUsuario.update(id, usuario);
      if (!usuarioActualizado)
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el Usuario",
        };

      return {
        error: false,
        code: 200,
        message: "Usuario actualizado correctamente",
        data: usuarioActualizado,
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Elimina un usuario por su ID
   * @param {number} id - ID del usuario a eliminar
   * @returns {Promise<Object>} Respuesta con éxito o error
   */
  static async deleteUsuario(id) {
    try {
      const usuario = await this.objUsuario.getById(id);
      if (!usuario)
        return { error: true, code: 404, message: "Usuario no encontrado" };

      const usuarioEliminado = await this.objUsuario.delete(id);
      if (!usuarioEliminado)
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el Usuario",
        };

      return {
        error: false,
        code: 200,
        message: "Usuario eliminado correctamente",
      };
    } catch (error) {
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene los usuarios con rol de cliente (rol_id === 3)
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de usuarios clientes
   */
  static async getUsuariosClientes() {
    try {
      const usuarios = await this.getAllUsuarios();
      if (usuarios.error) return usuarios;

      const usuariosCliente = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );
            return rolesUsuario.some((rol) => rol.rol_id === 3)
              ? usuario
              : null;
          })
        )
      ).filter(Boolean);

      return {
        error: false,
        code: 200,
        message: "Usuarios clientes obtenidos correctamente",
        data: usuariosCliente,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene los usuarios con rol de veterinario (rol_id === 2)
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de usuarios veterinarios
   */
  static async getUsuariosVeterinarios() {
    try {
      const usuarios = await this.getAllUsuarios();
      if (usuarios.error) return usuarios;

      const usuariosVeterinarios = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );
            return rolesUsuario.some((rol) => rol.rol_id === 2)
              ? usuario
              : null;
          })
        )
      ).filter(Boolean);

      return {
        error: false,
        code: 200,
        message: "Usuarios veterinarios obtenidos correctamente",
        data: usuariosVeterinarios,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene los usuarios que no son clientes
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de usuarios no clientes
   */
  static async getAllUsuariosNoClientes() {
    try {
      const usuarios = await this.getAllUsuarios();
      if (usuarios.error) return usuarios;

      const usuariosNoClientes = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );
            return rolesUsuario.every((rol) => rol.rol_id !== 3)
              ? usuario
              : null;
          })
        )
      ).filter(Boolean);

      return {
        error: false,
        code: 200,
        message: "Usuarios no clientes obtenidos correctamente",
        data: usuariosNoClientes,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene los usuarios que son empleados (no cliente y no superadmin)
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de usuarios empleados
   */
  static async getAllUsuariosEmpleados() {
    try {
      const usuarios = await this.getAllUsuarios();
      if (usuarios.error) return usuarios;

      const usuariosEmpleados = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );
            return rolesUsuario.some(
              (rol) => rol.rol_id !== 3 && rol.rol_id !== 1
            )
              ? usuario
              : null;
          })
        )
      ).filter(Boolean);

      return {
        error: false,
        code: 200,
        message: "Usuarios empleados obtenidos correctamente",
        data: usuariosEmpleados,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }

  /**
   * Obtiene los usuarios que no son empleados (rol_id !== 2)
   * @returns {Promise<Object>} Respuesta con éxito o error y listado de usuarios no empleados
   */
  static async getAllUsuariosNoEmpleados() {
    try {
      const usuarios = await this.getAllUsuarios();
      if (usuarios.error) return usuarios;

      const usuariosNoEmpleados = (
        await Promise.all(
          usuarios.data.map(async (usuario) => {
            const rolesUsuario = await this.objRolUsuario.getAllByUsuarioId(
              usuario.id
            );
            return rolesUsuario.every((rol) => rol.rol_id !== 2)
              ? usuario
              : null;
          })
        )
      ).filter(Boolean);

      return {
        error: false,
        code: 200,
        message: "Usuarios no empleados obtenidos correctamente",
        data: usuariosNoEmpleados,
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: error.message };
    }
  }
}

export default UsuarioService;
