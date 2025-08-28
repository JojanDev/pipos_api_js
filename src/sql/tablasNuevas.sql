-- ============================================
-- ESTRUCTURA DE BASE DE DATOS - VETERINARIA PIPOS
-- ============================================
drop database if exists veterinaria_pipos;
create database veterinaria_pipos;
USE veterinaria_pipos;

DROP TABLE IF EXISTS elementos_ventas;
DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS servicios;
DROP TABLE IF EXISTS medicamentos_tratamientos;
DROP TABLE IF EXISTS medicamentos;
DROP TABLE IF EXISTS info_medicamentos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS tipos_productos;
DROP TABLE IF EXISTS tratamientos;
DROP TABLE IF EXISTS antecedentes;
DROP TABLE IF EXISTS mascotas;
DROP TABLE IF EXISTS razas;
DROP TABLE IF EXISTS especies;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS roles_usuarios;
DROP TABLE IF EXISTS permisos;
DROP TABLE IF EXISTS permisos_roles;
DROP TABLE IF EXISTS tipos_documentos;
DROP TABLE IF EXISTS elementos;
DROP TABLE IF EXISTS credenciales;

-- Tabla de tipos de documento
CREATE TABLE tipos_documentos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL
);

-- Información personal de clientes y empleados
CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_tipo_documento INT NOT NULL,
	numero_documento VARCHAR(50) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	telefono VARCHAR(20) NOT NULL,
	correo VARCHAR(255),
	direccion VARCHAR(255) NOT NULL,
	FOREIGN KEY (id_tipo_documento) REFERENCES tipos_documentos(id)
);

-- Tabla de roles del sistema
CREATE TABLE roles(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255) NOT NULL
);

CREATE TABLE roles_usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Personal de la veterinaria
CREATE TABLE credenciales (
	id_usuario INT NOT NULL PRIMARY KEY,
	usuario VARCHAR(100) UNIQUE NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
    #activo boolean default true,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Especies de animales
CREATE TABLE especies (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL
);

-- Razas por especie
CREATE TABLE razas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	id_especie INT NOT NULL,
	FOREIGN KEY (id_especie) REFERENCES especies(id)
);

-- Mascotas de los clientes
CREATE TABLE mascotas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	id_raza INT NOT NULL,
	edad_semanas INT,
	sexo ENUM('macho', 'hembra', 'desconocido') NOT NULL,
	estado_vital BOOLEAN DEFAULT TRUE,
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
	FOREIGN KEY (id_raza) REFERENCES razas(id)
);

-- Antecedentes médicos de mascotas
CREATE TABLE antecedentes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_mascota INT NOT NULL,
    titulo varchar(100) NOT NULL,
	diagnostico TEXT NOT NULL,
	fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,	
    activo boolean default true,
	FOREIGN KEY (id_mascota) REFERENCES mascotas(id)
);	

-- Tratamientos de los antecedentes
CREATE TABLE tratamientos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_antecedente INT NOT NULL,
    id_usuario INT NOT NULL,
    titulo varchar(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo boolean default true,
    FOREIGN KEY (id_antecedente) REFERENCES antecedentes(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tipos de productos
CREATE TABLE tipos_productos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) NOT NULL
);

-- Productos generales del inventario

-- Información general de medicamentos
CREATE TABLE info_medicamentos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,              
	uso_general VARCHAR(255),                  
	via_administracion VARCHAR(100),           
	presentacion VARCHAR(100),                 
	informacion_adicional TEXT                 
);

-- Medicamentos en inventario
CREATE TABLE medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_info_medicamento INT NOT NULL,    
    precio DECIMAL NOT NULL,
    fecha_caducidad DATE,
	cantidad INT NOT NULL,
	numero_lote VARCHAR(100),
    FOREIGN KEY (id_info_medicamento) REFERENCES info_medicamentos(id)
);

CREATE TABLE servicios(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL NOT NULL
);

CREATE TABLE productos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	precio DECIMAL NOT NULL,
	descripcion TEXT,
	fecha_caducidad DATE,
	id_tipo int NOT NULL,
	stock INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipos_productos(id)
);

CREATE TABLE elementos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    
);
-- Medicamentos recetados en tratamientos
CREATE TABLE medicamentos_tratamientos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_tratamiento INT NOT NULL,
	id_info_medicamento INT NOT NULL, 
	dosis VARCHAR(100) DEFAULT 'No aplica',
	frecuencia_aplicacion VARCHAR(100),
	duracion INT,
	activo boolean default true,
	FOREIGN KEY (id_tratamiento) REFERENCES tratamientos(id),	
	FOREIGN KEY (id_info_medicamento) REFERENCES info_medicamentos(id)
);

-- Servicios ofrecidos

-- Ventas realizadas
CREATE TABLE ventas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_comprador INT,
    id_vendedor INT,
	fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	total DECIMAL NOT NULL,	
    monto DECIMAL NOT NULL,	
    estado ENUM('completada', 'pendiente'),
	FOREIGN KEY (id_comprador) REFERENCES usuarios(id),
    FOREIGN KEY (id_vendedor) REFERENCES usuarios(id)
);

-- Detalles de cada venta
CREATE TABLE elementos_ventas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_venta INT NOT NULL,
	id_elemento INT,
    precio DECIMAL NOT NULL,
    valor_adicional DECIMAL DEFAULT 0,
	cantidad INT NOT NULL,        
	subtotal DECIMAL NOT NULL,
    FOREIGN KEY (id_elemento) REFERENCES elementos(id),
	FOREIGN KEY (id_venta) REFERENCES ventas(id)
);
