	-- ============================================
	-- CREACIÓN DE BASE DE DATOS ORDENADA
	-- ============================================
	DROP DATABASE IF EXISTS veterinaria_pipos;
	CREATE DATABASE veterinaria_pipos;
	USE veterinaria_pipos;

	-- Tablas independientes primero
	CREATE TABLE tipos_documentos (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(255) NOT NULL
	);

	CREATE TABLE roles(
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre varchar(30) NOT NULL,
        descripcion varchar(100) NOT NULL
	);

	CREATE TABLE permisos (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(255) NOT NULL
	);

	CREATE TABLE especies (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(255) NOT NULL
	);

	CREATE TABLE tipos_productos(
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre varchar(50) NOT NULL
	);

	CREATE TABLE info_medicamentos (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(255) NOT NULL,              
		uso_general VARCHAR(255) NOT NULL,                  
		via_administracion VARCHAR(100) NOT NULL,           
		presentacion VARCHAR(100) NOT NULL,                 
		informacion_adicional TEXT                
	);

	-- Dependientes de las anteriores
	CREATE TABLE usuarios (
		id INT AUTO_INCREMENT PRIMARY KEY,
		tipo_documento_id INT NOT NULL,
		numero_documento VARCHAR(50) NOT NULL,
		nombre VARCHAR(255) NOT NULL,
		telefono VARCHAR(20) NOT NULL,
		correo VARCHAR(255),
		direccion VARCHAR(255) NOT NULL,
		FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documentos(id)
	);

	CREATE TABLE roles_usuarios(
    
		id INT AUTO_INCREMENT PRIMARY KEY,
		rol_id INT NOT NULL,
		usuario_id INT NOT NULL,
		FOREIGN KEY (rol_id) REFERENCES roles(id),
		FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
	);

	CREATE TABLE credenciales (
		id INT AUTO_INCREMENT PRIMARY KEY,
		usuario_id INT NOT NULL UNIQUE,
		usuario VARCHAR(100) UNIQUE NOT NULL,
		contrasena VARCHAR(255) NOT NULL,
		FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
	);

	CREATE TABLE permisos_roles (
		id INT AUTO_INCREMENT PRIMARY KEY,
		permiso_id INT NOT NULL,
		rol_id INT NOT NULL,
		FOREIGN KEY (permiso_id) REFERENCES permisos(id),
		FOREIGN KEY (rol_id) REFERENCES roles(id)
	);

	CREATE TABLE razas (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(255) NOT NULL,
		especie_id INT NOT NULL,
		FOREIGN KEY (especie_id) REFERENCES especies(id)
	);

	CREATE TABLE mascotas (
		id INT AUTO_INCREMENT PRIMARY KEY,
		usuario_id INT NOT NULL,
		nombre VARCHAR(255) NOT NULL,
		raza_id INT NOT NULL,
		edad_semanas INT,
		sexo ENUM('macho', 'hembra', 'desconocido') NOT NULL,
		estado_vital BOOLEAN DEFAULT TRUE,
		FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
		FOREIGN KEY (raza_id) REFERENCES razas(id)
	);

	CREATE TABLE antecedentes (
		id INT AUTO_INCREMENT PRIMARY KEY,
		mascota_id INT NOT NULL,
		titulo varchar(100) NOT NULL,
		diagnostico TEXT NOT NULL,
		fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,	
		activo boolean default true,
		FOREIGN KEY (mascota_id) REFERENCES mascotas(id)
	);	

	CREATE TABLE tratamientos(
		id INT AUTO_INCREMENT PRIMARY KEY,
		antecedente_id INT NOT NULL,
		usuario_id INT NOT NULL,
		titulo varchar(100) NOT NULL,
		descripcion TEXT NOT NULL,
		fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		activo boolean default true,
		FOREIGN KEY (antecedente_id) REFERENCES antecedentes(id),
		FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
	);
    
    CREATE TABLE medicamentos (
		id INT AUTO_INCREMENT PRIMARY KEY,
		info_medicamento_id INT NOT NULL,
		precio DECIMAL(10,2) NOT NULL,
		fecha_caducidad DATE,
		cantidad INT NOT NULL,
		numero_lote VARCHAR(100),
		FOREIGN KEY (info_medicamento_id) REFERENCES info_medicamentos(id)
	);

	-- Servicios ofrecidos
	CREATE TABLE servicios (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(255) NOT NULL,
		descripcion TEXT NOT NULL,
		precio DECIMAL(10,2) NOT NULL
	);

	-- Productos en inventario
	CREATE TABLE productos (	
		id INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(255) NOT NULL,
		precio DECIMAL(10,2) NOT NULL,
		descripcion TEXT,
		fecha_caducidad DATE,
		tipo_producto_id INT NOT NULL,
		stock INT NOT NULL,
		FOREIGN KEY (tipo_producto_id) REFERENCES tipos_productos(id)
	);

	CREATE TABLE medicamentos_tratamientos (
		id INT AUTO_INCREMENT PRIMARY KEY,
		tratamiento_id INT NOT NULL,
		info_medicamento_id INT NOT NULL, 
		dosis VARCHAR(100) DEFAULT 'No aplica',
		frecuencia_aplicacion VARCHAR(100) NOT NULL,
		duracion INT NOT NULL,
		activo boolean default true,
		FOREIGN KEY (tratamiento_id) REFERENCES tratamientos(id),	
		FOREIGN KEY (info_medicamento_id) REFERENCES info_medicamentos(id)
	);

	CREATE TABLE ventas (
		id INT AUTO_INCREMENT PRIMARY KEY,
		fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		total DECIMAL NOT NULL,	
		monto DECIMAL NOT NULL,	
        vendedor_id INT NOT NULL,
        comprador_id INT NOT NULL,
        estado ENUM('completada', 'pendiente'),
		FOREIGN KEY (vendedor_id) REFERENCES usuarios(id),
        FOREIGN KEY (comprador_id) REFERENCES usuarios(id)
	);
    
	CREATE TABLE medicamentos_ventas (
		id INT AUTO_INCREMENT PRIMARY KEY,
		venta_id INT NOT NULL,
		medicamento_id INT NOT NULL,
		precio DECIMAL NOT NULL,
		valor_adicional DECIMAL DEFAULT 0,
		cantidad INT NOT NULL,        
		subtotal DECIMAL NOT NULL,
		FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id),
		FOREIGN KEY (venta_id) REFERENCES ventas(id)
	);
    
    CREATE TABLE servicios_ventas (
		id INT AUTO_INCREMENT PRIMARY KEY,
		venta_id INT NOT NULL,
		servicio_id INT NOT NULL,
		precio DECIMAL NOT NULL,
		valor_adicional DECIMAL DEFAULT 0,
		cantidad INT NOT NULL,        
		subtotal DECIMAL NOT NULL,
		FOREIGN KEY (servicio_id) REFERENCES servicios(id),
		FOREIGN KEY (venta_id) REFERENCES ventas(id)
	);
    
    CREATE TABLE productos_ventas (
		id INT AUTO_INCREMENT PRIMARY KEY,
		venta_id INT NOT NULL,
		producto_id INT NOT NULL,
		precio DECIMAL NOT NULL,
		valor_adicional DECIMAL DEFAULT 0,
		cantidad INT NOT NULL,        
		subtotal DECIMAL NOT NULL,
		FOREIGN KEY (producto_id) REFERENCES productos(id),
		FOREIGN KEY (venta_id) REFERENCES ventas(id)
	);
