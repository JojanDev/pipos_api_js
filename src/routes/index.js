import tiposDocumentos from "./tiposDocumentosRoutes.js";
import especies from "./especiesRoutes.js";
import tiposProductos from "./tiposProductosRoutes.js";
import infoMedicamentos from "./infosMedicamentosRoutes.js";
import mascotas from "./mascotasRoutes.js";
import antecedentes from "./antecedentesRoutes.js";
import tratamientos from "./tratamientosRoutes.js";
import medicamentosTratamientos from "./medicamentosTratamientosRoutes.js";
import razas from "./razasRoutes.js";
import ventas from "./ventasRoutes.js";
import medicamentosVentas from "./medicamentosVentasRoutes.js";
import roles from "./rolesRoutes.js";
import permisos from "./permisosRoutes.js";
import permisosRoles from "./permisosRolesRoutes.js";
import usuarios from "./usuariosRoutes.js";
import rolesUsuarios from "./rolesUsuariosRoutes.js";
import medicamentos from "./medicamentosRoutes.js";
import servicios from "./serviciosRoutes.js";
import productosVentas from "./productosVentasRoutes.js";
import serviciosVentas from "./serviciosVentasRoutes.js";
import productos from "./productosRoutes.js";
import auth from "./authRoutes.js";
import credenciales from "./credencialesRoutes.js";

// Array con todas las rutas base de la API
const rutas = [
  { path: "/tipos-documentos", router: tiposDocumentos }, // Rutas de tipos de documento
  { path: "/especies", router: especies }, // Rutas de especies
  { path: "/tipos-productos", router: tiposProductos }, // Rutas de tipos de producto
  { path: "/info-medicamentos", router: infoMedicamentos }, // Rutas de información de medicamentos
  { path: "/mascotas", router: mascotas }, // Rutas de mascotas
  { path: "/antecedentes", router: antecedentes }, // Rutas de antecedentes
  { path: "/tratamientos", router: tratamientos }, // Rutas de tratamientos
  { path: "/medicamentos-tratamientos", router: medicamentosTratamientos }, // Rutas de medicamentos en tratamientos
  { path: "/razas", router: razas }, // Rutas de razas
  { path: "/ventas", router: ventas }, // Rutas de ventas
  { path: "/medicamentos-ventas", router: medicamentosVentas }, // Rutas de medicamentos en ventas
  { path: "/roles", router: roles }, // Rutas de roles
  { path: "/permisos", router: permisos }, // Rutas de permisos
  { path: "/permisos-roles", router: permisosRoles }, // Rutas de permisos-roles
  { path: "/usuarios", router: usuarios }, // Rutas de usuarios
  { path: "/roles-usuarios", router: rolesUsuarios }, // Rutas de roles-usuarios
  { path: "/medicamentos", router: medicamentos }, // Rutas de medicamentos
  { path: "/servicios", router: servicios }, // Rutas de servicios
  { path: "/productos-ventas", router: productosVentas }, // Rutas de productos en ventas
  { path: "/servicios-ventas", router: serviciosVentas }, // Rutas de servicios en ventas
  { path: "/productos", router: productos }, // Rutas de productos
  { path: "/auth", router: auth, publico: true }, // Rutas de autenticación (públicas)
  { path: "/credenciales", router: credenciales }, // Rutas de credenciales
];

export default rutas;
