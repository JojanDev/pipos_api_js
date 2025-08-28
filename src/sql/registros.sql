-- ==========================================
-- DATOS BÁSICOS DEL SISTEMA
-- ==========================================

-- Insertar roles
INSERT INTO roles (nombre) VALUES
('admin'),
('operativo'),
('veterinario');

-- Insertar tipos de documento
INSERT INTO tipos_documento (nombre) VALUES
('Cédula de ciudadanía'),
('Tarjeta de identidad'),
('Cédula de extranjería'),
('Pasaporte');

-- ===========================
-- INFORMACIÓN PERSONAL (Personal y Clientes)
-- ===========================

INSERT INTO informacion_clientes_personal (id_tipo_documento, numero_documento, nombre, telefono, correo, direccion) VALUES
-- Personal (primeros 7 registros)
(1, '12345678', 'Dr. María Rodríguez', '3001234567', 'maria.admin@veterinaripipos.com', 'Calle 45 #12-34'),                 -- Admin
(1, '87654321', 'Ana López García', '3109876543', 'ana.empleado@veterinaripipos.com', 'Carrera 15 #23-45'),                 -- Empleado
(1, '11223344', 'Carlos Mendoza', '3201122334', 'carlos.empleado@veterinaripipos.com', 'Diagonal 20 #45-67'),               -- Empleado
(1, '55667788', 'Sofia Herrera', '3155667788', 'sofia.empleado@veterinaripipos.com', 'Calle 30 #67-89'),                     -- Empleado
(1, '99887766', 'Luis Torres Vega', '3209988776', 'luis.empleado@veterinaripipos.com', 'Avenida 25 #78-90'),                 -- Empleado
(1, '44556677', 'Dr. Pedro Castaño', '3204455667', 'pedro.veterinario@veterinaripipos.com', 'Carrera 50 #20-40'),            -- Veterinario
(1, '33445566', 'Dra. Laura Martínez', '3103344556', 'laura.veterinaria@veterinaripipos.com', 'Calle 12 #30-50'),            -- Veterinario

-- Clientes (siguientes 12 registros)
(1, '23456789', 'Juan Carlos Pérez', '3112345678', 'juancarlos@gmail.com', 'Calle 10 #15-20'),
(1, '34567890', 'Laura Fernanda Gómez', '3123456789', 'laurafernanda@hotmail.com', 'Carrera 8 #25-30'),
(1, '45678901', 'Miguel Ángel Rodríguez', '3134567890', 'miguel.rodriguez@yahoo.com', 'Diagonal 12 #35-40'),
(2, '56789012', 'Carmen Patricia Silva', '3145678901', 'carmensilva@outlook.com', 'Calle 22 #45-50'),
(1, '67890123', 'Roberto Carlos Martínez', '3156789012', 'robertocm@gmail.com', 'Avenida 5 #55-60'),
(1, '78901234', 'Claudia Alejandra Ruiz', '3167890123', 'claudiaruiz@hotmail.com', 'Carrera 18 #65-70'),
(3, '89012345', 'Fernando José Castro', '3178901234', 'fernandocastro@yahoo.com', 'Calle 35 #75-80'),
(1, '90123456', 'Diana Patricia Morales', '3189012345', 'dianamorales@gmail.com', 'Diagonal 28 #85-90'),
(1, '01234567', 'Andrés Felipe Vargas', '3190123456', 'andresvargas@outlook.com', 'Avenida 40 #95-100'),
(2, '12345670', 'Mónica Lucía Jiménez', '3101234567', 'monicalucia@hotmail.com', 'Calle 50 #105-110'),
(1, '23456701', 'Eduardo Ramón Sánchez', '3112345670', 'eduardosanchez@gmail.com', 'Carrera 32 #115-120'),
(1, '34567012', 'Paola Andrea Delgado', '3123456701', 'paolaandrea@yahoo.com', 'Diagonal 45 #125-130');

-- ===========================
-- PERSONAL (vinculado con id_info anterior)
-- ===========================
INSERT INTO personal (id_info, id_rol, usuario, contrasena, activo) VALUES
(1, 1, 'johan', 'johan123', true),                    -- Admin
(2, 2, 'ana_lopez', 'empleado456', true),              -- Empleado
(3, 2, 'carlos_mendoza', 'carlos789', true),           -- Empleado
(4, 2, 'sofia_herrera', 'sofia012', true),             -- Empleado
(5, 2, 'luis_torres', 'luis345', true),                -- Empleado
(6, 3, 'pedro_vet', 'veterinario123', true),           -- Veterinario
(7, 3, 'laura_vet', 'veterinaria456', true);           -- Veterinario

-- Insertar clientes (12 clientes)
INSERT INTO clientes (id_info) VALUES 
(6), (7), (8), (9), (10), (11), (12), (13), (14), (15), (16), (17);

-- ==========================================
-- ESPECIES, RAZAS Y MASCOTAS
-- ==========================================

-- Insertar especies
INSERT INTO especies (nombre) VALUES
('Perro'),
('Gato'),
('Conejo'),
('Hamster'),
('Ave');

-- Insertar razas
INSERT INTO razas (nombre, id_especie) VALUES
-- Perros
('Labrador Retriever', 1), ('Golden Retriever', 1), ('Bulldog Francés', 1), ('Pastor Alemán', 1),
('Chihuahua', 1), ('Poodle', 1), ('Beagle', 1), ('Rottweiler', 1),
-- Gatos
('Siamés', 2), ('Persa', 2), ('Maine Coon', 2), ('British Shorthair', 2),
('Ragdoll', 2), ('Bengalí', 2),
-- Conejos
('Enano Holandés', 3), ('Cabeza de León', 3), ('Angora', 3),
-- Hamsters
('Sirio', 4), ('Chino', 4),
-- Aves
('Canario', 5), ('Periquito', 5), ('Cacatúa', 5);

-- Insertar mascotas (mínimo 1 por cliente) con estado_vital como boolean
INSERT INTO mascotas (id_cliente, nombre, id_raza, edad_semanas, sexo, estado_vital) VALUES
-- Cliente 1: Juan Carlos - 2 mascotas
(1, 'Max', 1, 104, 'macho', TRUE),
(1, 'Luna', 9, 78, 'hembra', TRUE),
-- Cliente 2: Laura Fernanda - 1 mascota
(2, 'Rocky', 3, 52, 'macho', TRUE),
-- Cliente 3: Miguel Ángel - 1 mascota
(3, 'Princesa', 10, 130, 'hembra', TRUE),
-- Cliente 4: Carmen Patricia - 1 mascota
(4, 'Toby', 5, 26, 'macho', TRUE),
-- Cliente 5: Roberto Carlos - 2 mascotas
(5, 'Coco', 21, 8, 'macho', TRUE),
(5, 'Pelusa', 15, 16, 'hembra', TRUE),
-- Cliente 6: Claudia Alejandra - 1 mascota
(6, 'Simba', 2, 156, 'macho', TRUE),
-- Cliente 7: Fernando José - 1 mascota
(7, 'Mia', 11, 91, 'hembra', TRUE),
-- Cliente 8: Diana Patricia - 1 mascota
(8, 'Bruno', 4, 182, 'macho', TRUE),
-- Cliente 9: Andrés Felipe - 1 mascota
(9, 'Nala', 12, 65, 'hembra', TRUE),
-- Cliente 10: Mónica Lucía - 1 mascota
(10, 'Zeus', 8, 208, 'macho', TRUE),
-- Cliente 11: Eduardo Ramón - 1 mascota
(11, 'Lola', 6, 39, 'hembra', TRUE),
-- Cliente 12: Paola Andrea - 1 mascota
(12, 'Whiskers', 13, 143, 'macho', TRUE);


-- ==========================================
-- ANTECEDENTES MÉDICOS
-- ==========================================

-- Insertar antecedentes (cada mascota tiene al menos 1)
INSERT INTO antecedentes (id_mascota, titulo, diagnostico) VALUES
-- Max (mascota 1)
(1, 'Otitis externa', 'Infección del oído externo con secreción purulenta y mal olor'),
(1, 'Control de peso', 'Sobrepeso de 3kg respecto al peso ideal para su raza y edad'),
-- Luna (mascota 2)
(2, 'Vacunación anual', 'Aplicación de vacunas múltiples según calendario sanitario'),
-- Rocky (mascota 3)
(3, 'Alergia alimentaria', 'Reacción alérgica a proteínas de pollo, dermatitis severa'),
-- Princesa (mascota 4)
(4, 'Gingivitis', 'Inflamación de encías con acumulación de sarro dental'),
-- Toby (mascota 5)
(5, 'Luxación de rótula', 'Luxación de rótula grado II, requiere tratamiento conservador'),
-- Coco (mascota 6)
(6, 'Revisión general', 'Chequeo preventivo de ave joven, estado general bueno'),
-- Pelusa (mascota 7)
(7, 'Parásitos intestinales', 'Presencia de coccidios en heces, diarrea intermitente'),
-- Simba (mascota 8)
(8, 'Herida por mordedura', 'Laceración profunda en extremidad anterior derecha'),
-- Mia (mascota 9)
(9, 'Infección urinaria', 'Cistitis bacteriana con hematuria y disuria'),
-- Bruno (mascota 10)
(10, 'Displasia de cadera', 'Displasia bilateral leve, manejo conservador'),
-- Nala (mascota 11)
(11, 'Dermatitis atópica', 'Dermatitis alérgica estacional con prurito intenso'),
-- Zeus (mascota 12)
(12, 'Torsión gástrica', 'Episodio de torsión gástrica leve, tratamiento exitoso'),
-- Lola (mascota 13)
(13, 'Conjuntivitis', 'Inflamación ocular bilateral con secreción mucosa'),
-- Whiskers (mascota 14)
(14, 'Problemas dentales', 'Acumulación de sarro y gingivitis leve en felino adulto');

-- ==========================================
-- TRATAMIENTOS
-- ==========================================

-- Insertar tratamientos (cada antecedente tiene al menos 1)
INSERT INTO antecedentes_tratamientos (id_antecedente, id_personal, titulo, descripcion) VALUES
-- Otitis externa (Max)
(1, 6, 'Limpieza ótica', 'Limpieza profunda del canal auditivo con solución especializada cada 12 horas'),
(1, 7, 'Antibiótico tópico', 'Aplicación de gotas antibióticas después de cada limpieza'),
-- Control de peso (Max)
(2, 6, 'Dieta hipocalórica', 'Cambio a alimento light con control de porciones y ejercicio dirigido'),
-- Vacunación (Luna)
(3, 7, 'Aplicación de vacunas', 'Administración de vacuna múltiple vía subcutánea'),
(3, 6, 'Observación post-vacunal', 'Monitoreo por 30 minutos después de la aplicación'),
-- Alergia alimentaria (Rocky)
(4, 6, 'Dieta hipoalergénica', 'Cambio a alimento con proteína hidrolizada por 8 semanas'),
(4, 7, 'Antihistamínico', 'Administración de antihistamínico para control del prurito'),
-- Gingivitis (Princesa)
(5, 7, 'Profilaxis dental', 'Limpieza dental bajo anestesia con remoción de sarro'),
(5, 6, 'Antibiótico oral', 'Tratamiento antibiótico post-procedimiento'),
-- Luxación de rótula (Toby)
(6, 6, 'Fisioterapia', 'Ejercicios de rehabilitación y fortalecimiento muscular'),
(6, 7, 'Antiinflamatorio', 'Control del dolor e inflamación con AINES'),
-- Revisión general (Coco)
(7, 6, 'Desparasitación', 'Antiparasitario interno según peso y especie'),
-- Parásitos intestinales (Pelusa)
(8, 7, 'Antiparasitario específico', 'Tratamiento contra coccidios con sulfamidas'),
(8, 6, 'Probióticos', 'Restauración de flora intestinal normal'),
-- Herida por mordedura (Simba)
(9, 6, 'Sutura', 'Limpieza quirúrgica y sutura de herida profunda'),
(9, 7, 'Antibiótico profiláctico', 'Prevención de infección secundaria'),
-- Infección urinaria (Mia)
(10, 7, 'Antibiótico específico', 'Tratamiento dirigido según antibiograma'),
(10, 6, 'Acidificante urinario', 'Modificación del pH urinario para prevenir recurrencia'),
-- Displasia de cadera (Bruno)
(11, 6, 'Condroprotector', 'Suplemento articular para protección del cartílago'),
(11, 7, 'Control de peso', 'Mantenimiento de peso ideal para reducir carga articular'),
-- Dermatitis atópica (Nala)
(12, 7, 'Champú medicado', 'Baños semanales con champú antiinflamatorio'),
(12, 6, 'Corticoide', 'Control del prurito con corticoides a dosis baja'),
-- Torsión gástrica (Zeus)
(13, 6, 'Descompresión gástrica', 'Sondaje gástrico para liberación de gases'),
(13, 7, 'Fluidoterapia', 'Rehidratación y estabilización electrolítica'),
-- Conjuntivitis (Lola)
(14, 7, 'Limpieza ocular', 'Lavado ocular con solución salina estéril'),
(14, 6, 'Colirio antibiótico', 'Aplicación tópica cada 6 horas por 7 días'),
-- Problemas dentales (Whiskers)
(15, 6, 'Limpieza dental felina', 'Profilaxis dental adaptada para felinos');


-- ==========================================
-- INFORMACIÓN DE MEDICAMENTOS (AMPLIA)
-- ==========================================

INSERT INTO medicamentos_info (nombre, uso_general, via_administracion, presentacion, informacion_adicional) VALUES
-- Antibióticos
('Amoxicilina', 'Infecciones bacterianas leves a moderadas', 'oral', 'tabletas/suspensión', 'Penicilina semisintética de amplio espectro'),
('Cefalexina', 'Infecciones bacterianas de piel y tejidos blandos', 'oral', 'cápsulas', 'Cefalosporina de primera generación'),
('Enrofloxacina', 'Infecciones bacterianas graves', 'oral/inyectable', 'tabletas/solución', 'Fluoroquinolona veterinaria'),
('Clindamicina', 'Infecciones anaeróbicas y de cavidad oral', 'oral', 'cápsulas', 'Especialmente útil en infecciones dentales'),
('Doxiciclina', 'Infecciones por rickettsias y clamidia', 'oral', 'tabletas', 'Tetraciclina de amplio espectro'),

-- Antiinflamatorios
('Meloxicam', 'Dolor e inflamación articular', 'oral/inyectable', 'suspensión/inyección', 'AINE selectivo COX-2'),
('Carprofeno', 'Dolor post-quirúrgico y artritis', 'oral', 'tabletas masticables', 'AINE específico veterinario'),
('Firocoxib', 'Osteoartritis y dolor crónico', 'oral', 'tabletas', 'COX-2 selectivo de larga duración'),
('Prednisolona', 'Inflamación y reacciones alérgicas', 'oral', 'tabletas', 'Corticosteroide sistémico'),

-- Antiparasitarios
('Ivermectina', 'Parásitos externos e internos', 'tópica/oral', 'pipetas/tabletas', 'No usar en razas sensibles (Collie)'),
('Fenbendazol', 'Parásitos intestinales', 'oral', 'pasta/polvo', 'Benzimidazol de amplio espectro'),
('Praziquantel', 'Parásitos planos (tenias)', 'oral', 'tabletas', 'Específico para cestodos'),
('Imidacloprid', 'Pulgas y garrapatas', 'tópica', 'pipetas', 'Neonicotinoide de larga duración'),

-- Productos tópicos
('Clorhexidina', 'Antiséptico para heridas', 'tópica', 'solución', 'Amplio espectro antimicrobiano'),
('Sulfadiazina de plata', 'Quemaduras y heridas infectadas', 'tópica', 'crema', 'Antimicrobiano y cicatrizante'),
('Óxido de zinc', 'Protección y cicatrización', 'tópica', 'pomada', 'Astringente y protector'),

-- Productos oftálmicos
('Gentamicina colirio', 'Infecciones oculares bacterianas', 'tópica', 'gotas oftálmicas', 'Aminoglucósido para uso ocular'),
('Dexametasona colirio', 'Inflamación ocular', 'tópica', 'gotas oftálmicas', 'Corticosteroide oftálmico'),

-- Productos óticos
('Oticure', 'Infecciones del oído', 'tópica', 'gotas óticas', 'Combinación antibiótico-antifúngico'),
('Ceruminolítico', 'Limpieza y remoción de cerumen', 'tópica', 'solución ótica', 'Disolvente de cera auricular'),

-- Medicamentos cardíacos
('Enalapril', 'Insuficiencia cardíaca', 'oral', 'tabletas', 'Inhibidor de la ECA'),
('Furosemida', 'Edema pulmonar y ascitis', 'oral/inyectable', 'tabletas/inyección', 'Diurético de asa'),

-- Suplementos
('Condroitín sulfato', 'Protección articular', 'oral', 'tabletas', 'Condroprotector natural'),
('Omega-3', 'Salud de piel y pelo', 'oral', 'cápsulas', 'Ácidos grasos esenciales'),
('Probióticos veterinarios', 'Salud intestinal', 'oral', 'polvo/pasta', 'Flora bacteriana beneficiosa'),

-- Anestésicos
('Ketamina', 'Anestesia general', 'inyectable', 'vial', 'Anestésico disociativo'),
('Lidocaína', 'Anestesia local', 'inyectable/tópica', 'ampollas/gel', 'Anestésico local amídico'),

-- Vitaminas
('Complejo B', 'Deficiencias vitamínicas', 'inyectable/oral', 'ampollas/jarabe', 'Vitaminas del grupo B'),
('Vitamina C', 'Antioxidante y cicatrizante', 'oral/inyectable', 'tabletas/ampollas', 'Ácido ascórbico');

-- ==========================================
-- MEDICAMENTOS EN INVENTARIO
-- ==========================================

INSERT INTO medicamentos (id_medicamento_info, precio, fecha_caducidad, cantidad, numero_lote) VALUES
-- Inventario de medicamentos con diferentes lotes y cantidades
(1, 2500.00, '2026-03-15', 50, '20240001'),
(1, 2500.00, '2026-08-20', 30, '20240002'),
(2, 3200.00, '2025-12-10', 25, '20240003'),
(3, 4500.00, '2026-06-18', 40, '20240004'),
(4, 3800.00, '2026-01-25', 20, '20240005'),
(5, 2800.00, '2026-09-12', 35, '20240006'),
(6, 1500.00, '2026-04-30', 60, '20240007'),
(7, 2200.00, '2026-07-15', 45, '20240008'),
(8, 3500.00, '2026-11-08', 30, '20240009'),
(9, 1200.00, '2025-10-22', 40, '20240010'),
(10, 800.00, '2026-05-18', 100, '20240011'),
(11, 1500.00, '2026-12-05', 25, '20240012'),
(12, 2000.00, '2026-08-14', 35, '20240013'),
(13, 1800.00, '2026-03-28', 80, '20240014'),
(14, 500.00, '2026-06-10', 200, '20240015'),
(15, 1200.00, '2026-09-25', 15, '20240016'),
(16, 600.00, '2027-01-12', 50, '20240017'),
(17, 2500.00, '2025-11-18', 20, '20240018'),
(18, 1800.00, '2025-12-30', 25, '20240019'),
(19, 3200.00, '2026-02-14', 30, '20240020'),
(20, 800.00, '2027-05-20', 40, '20240021'),
(21, 2800.00, '2026-10-08', 35, '20240022'),
(22, 1500.00, '2025-09-15', 50, '20240023'),
(23, 4500.00, '2026-12-22', 20, '20240024'),
(24, 3800.00, '2026-07-30', 60, '20240025'),
(25, 2200.00, '2026-04-12', 45, '20240026'),
(26, 5200.00, '2025-08-28', 15, '20240027'),
(27, 800.00, '2026-11-15', 100, '20240028'),
(28, 1200.00, '2025-10-05', 80, '20240029'),
(29, 1500.00, '2026-03-18', 70, '20240030');

-- ==========================================
-- MEDICAMENTOS RECETADOS EN TRATAMIENTOS
-- ==========================================

INSERT INTO medicamentos_tratamiento (id_tratamiento, id_medicamento_info, dosis, frecuencia_aplicacion, duracion) VALUES
(1, 20, '3-4 gotas', 'Después de cada limpieza', 7),
(1, 19, '2-3 gotas', 'Cada 12 horas', 10),
(2, 19, '2-3 gotas', 'Cada 8 horas', 7),
(2, 14, 'Limpiar zona', 'Antes de medicamento', 7),
(7, 9, '0.5mg/kg', 'Cada 12 horas', 14),
(8, 1, '250mg', 'Cada 8 horas', 5),
(8, 14, 'Enjuague', 'Después de comidas', 7),
(9, 4, '150mg', 'Cada 12 horas', 7),
(11, 6, '0.1mg/kg', 'Cada 24 horas', 10),
(12, 11, '25mg/kg', 'Dosis única, repetir en 15 días', 1),
(13, 5, '100mg', 'Cada 12 horas', 10),
(14, 25, '1 sobre', 'Cada 24 horas', 15),
(15, 27, '2-3ml', 'Anestesia local para sutura', 1),
(15, 14, 'Limpiar', 'Antes de suturar', 1),
(16, 1, '500mg', 'Cada 8 horas', 7),
(16, 15, 'Aplicar', 'Cada 12 horas en herida', 10),
(17, 3, '5mg/kg', 'Cada 12 horas', 14),
(19, 23, '1 tableta', 'Cada 24 horas', 60),
(21, 14, 'Champú', '2 veces por semana', 30),
(22, 9, '0.25mg/kg', 'Cada 48 horas', 21),
(25, 14, 'Limpiar', 'Cada 6 horas', 7),
(26, 17, '1-2 gotas', 'Cada 6 horas', 7),
(27, 4, '100mg', 'Cada 12 horas post-limpieza', 5);

-- ==========================================
-- TIPOS DE PRODUCTOS Y PRODUCTOS
-- ==========================================

INSERT INTO tipos_productos (nombre) VALUES 
('Accesorio'),
('Alimento'),
('Higiene'),
('Juguete'),
('Medicina'),
('Suplemento');

INSERT INTO productos (nombre, precio, descripcion, fecha_caducidad, id_tipo, stock) VALUES 
-- Accesorios
('Collar Reflectivo Talla S', 15000.00, 'Collar ajustable con tira reflectiva para perros pequeños', '2030-01-01', 1, 45),
('Collar Reflectivo Talla M', 18000.00, 'Collar ajustable con tira reflectiva para perros medianos', '2030-01-01', 1, 38),
('Collar Reflectivo Talla L', 22000.00, 'Collar ajustable con tira reflectiva para perros grandes', '2030-01-01', 1, 25),
('Correa Extensible 3m', 35000.00, 'Correa retráctil para paseos cómodos', '2030-01-01', 1, 20),
('Transportadora Pequeña', 85000.00, 'Guacal para transporte de mascotas hasta 5kg', '2030-01-01', 1, 12),
('Transportadora Mediana', 120000.00, 'Guacal para transporte de mascotas hasta 15kg', '2030-01-01', 1, 8),
('Cama Ortopédica M', 95000.00, 'Cama memory foam para perros medianos', '2030-01-01', 1, 15),
('Bebedero Automático', 45000.00, 'Dispensador de agua con sensor', '2030-01-01', 1, 18),

-- Alimentos
('Concentrado DogChow Cachorro 3kg', 45000.00, 'Alimento para cachorros hasta 12 meses', '2025-08-15', 2, 30),
('Concentrado DogChow Adulto 10kg', 120000.00, 'Alimento seco para perros adultos', '2025-12-20', 2, 25),
('Concentrado Premium Gato 2kg', 38000.00, 'Alimento premium para gatos adultos', '2025-10-30', 2, 40),
('Alimento Hills Prescription i/d 1.5kg', 85000.00, 'Dieta veterinaria para problemas digestivos', '2025-09-12', 2, 15),
('Snacks Dentales Perro', 25000.00, 'Premios para higiene dental canina', '2025-11-25', 2, 60),
('Alimento Conejo Premium 1kg', 22000.00, 'Pellets nutritivos para conejos', '2025-07-18', 2, 20),

-- Higiene
('Shampoo Suave Cachorros 250ml', 28000.00, 'Shampoo hipoalergénico con avena', '2027-03-10', 3, 35),
('Shampoo Antipulgas 300ml', 32000.00, 'Shampoo con insecticida natural', '2026-11-15', 3, 28),
('Toallitas Húmedas 80und', 18000.00, 'Toallitas de limpieza para mascotas', '2026-05-20', 3, 50),
('Pasta Dental Canina', 24000.00, 'Pasta enzimática para limpieza dental', '2026-12-08', 3, 22),
('Cortaúñas Profesional', 35000.00, 'Cortaúñas de acero inoxidable', '2030-01-01', 3, 15),
('Cepillo Doble Cara', 15000.00, 'Cepillo para desenredar y pulir', '2030-01-01', 3, 40),

-- Juguetes
('Pelota de Goma Pequeña', 8000.00, 'Pelota resistente para perros pequeños', '2030-12-31', 4, 80),
('Pelota de Goma Mediana', 12000.00, 'Pelota resistente para perros medianos', '2030-12-31', 4, 65),
('Cuerda de Algodón 30cm', 15000.00, 'Juguete de cuerda para morder', '2030-12-31', 4, 45),
('Ratón de Peluche Gatos', 6000.00, 'Juguete con catnip para felinos', '2030-12-31', 4, 90),
('Hueso de Nylon M', 18000.00, 'Hueso masticable sabor pollo', '2030-12-31', 4, 35),
('Túnel Plegable Gatos', 42000.00, 'Túnel de juego con múltiples entradas', '2030-12-31', 4, 12),

-- Medicina (algunos productos médicos básicos)
('Solución Salina 500ml', 12000.00, 'Solución para limpieza de heridas', '2026-06-30', 5, 25),
('Vendaje Elástico 7.5cm', 8000.00, 'Venda autoaderente para vendajes', '2028-01-15', 5, 100),
('Gasas Estériles 10x10cm', 15000.00, 'Paquete de 20 gasas estériles', '2027-09-20', 5, 40),
('Jeringa 5ml (Paquete 10)', 18000.00, 'Jeringas desechables estériles', '2026-12-31', 5, 50),

-- Suplementos
('Multivitamínico Perros', 35000.00, 'Suplemento vitamínico completo', '2025-11-30', 6, 30),
('Omega 3 para Mascotas', 45000.00, 'Cápsulas de aceite de pescado', '2025-10-15', 6, 25),
('Probiótico Digestivo', 52000.00, 'Suplemento para salud intestinal', '2025-08-28', 6, 20),
('Calcio + Vitamina D', 28000.00, 'Suplemento para huesos y dientes', '2026-01-10', 6, 35);

-- ==========================================
-- SERVICIOS VETERINARIOS
-- ==========================================

INSERT INTO servicios (nombre, descripcion, precio) VALUES
('Consulta General', 'Examen clínico completo con diagnóstico y plan de tratamiento. Incluye revisión física, toma de signos vitales y recomendaciones preventivas.', 45000),
('Vacunación', 'Aplicación de vacunas según el protocolo sanitario específico para cada especie. Incluye múltiple, rabia y otras vacunas especializadas.', 35000),
('Desparasitación', 'Tratamiento antiparasitario interno y externo. Incluye evaluación coprológica y selección del antiparasitario más adecuado.', 25000),
('Cirugía Menor', 'Procedimientos quirúrgicos ambulatorios como sutura de heridas, remoción de tumores pequeños, extracción dental simple.', 120000),
('Cirugía Mayor', 'Procedimientos quirúrgicos complejos bajo anestesia general. Incluye esterilización, cirugías ortopédicas, cirugías abdominales.', 350000),
('Profilaxis Dental', 'Limpieza dental profunda bajo anestesia con ultrasonido. Incluye evaluación radiográfica dental y pulimento final.', 180000),
('Exámenes de Laboratorio', 'Análisis clínicos completos: hemograma, química sanguínea, examen coprológico, uroanálisis y pruebas específicas.', 85000),
('Radiografías', 'Estudios radiográficos digitales para diagnóstico de fracturas, displasias, cuerpos extraños y evaluaciones pre-quirúrgicas.', 65000),
('Ecografías', 'Estudios ecográficos abdominales y reproductivos. Ideal para diagnóstico de gestación, masas abdominales y evaluación de órganos.', 75000),
('Hospitalización', 'Cuidado intensivo 24/7 para pacientes que requieren monitoreo constante, fluidoterapia o tratamientos especializados.', 95000),
('Grooming Completo', 'Servicio de estética integral: baño medicado, corte de pelo, limpieza de oídos, corte de uñas y expresión de glándulas anales.', 55000),
('Eutanasia Humanitaria', 'Procedimiento compasivo para mascotas en estado terminal. Incluye asesoramiento pre y post procedimiento para la familia.', 80000);

-- ==========================================
-- VENTAS Y DETALLES DE VENTAS
-- ==========================================

INSERT INTO ventas (id_cliente, id_personal, fecha_creado, total, monto, estado) VALUES
-- Ventas del último mes (totales corregidos)
(1, 2, '2024-07-15 10:30:00', 198500.00, 198500.00, 'completada'),  -- Suma: 128000 + 70000 + 30500
(3, 3, '2024-07-18 14:20:00', 92000.00, 92000.00, 'completada'),     -- Suma: 42000 + 50000  
(5, 1, '2024-07-22 09:15:00', 261500.00, 261500.00, 'completada'),   -- Suma: 220000 + 70000 + 16500
(2, 4, '2024-07-25 16:45:00', 41500.00, 41500.00, 'completada'),     -- Suma: 28000 + 13500
(7, 2, '2024-07-28 11:30:00', 159000.00, 159000.00, 'completada'),   -- Suma: 135000 + 26500
(4, 5, '2024-08-02 08:45:00', 129000.00, 129000.00, 'completada'),   -- Suma: 68000 + 50000 + 18000
(6, 3, '2024-08-05 13:20:00', 127000.00, 127000.00, 'completada'),   -- Suma: 92000 + 38000
(9, 1, '2024-08-08 10:15:00', 208000.00, 208000.00, 'completada'),   -- Suma: 105000 + 70000 + 13500 + 20000
(8, 4, '2024-08-10 15:30:00', 223000.00, 217000.00, 'pendiente'),    -- Suma: 92000 + 68000 (monto menor por estar pendiente)
(11, 2, '2024-08-11 12:00:00', 49000.00, 48000.00, 'pendiente');     -- Suma: 34500 + 16500 (monto menor por estar pendiente)

INSERT INTO detalles_ventas (id_venta, id_producto, id_servicio, id_medicamento, precio, cantidad, subtotal, valor_adicional) VALUES
-- Venta 1: Cliente 1 (Juan Carlos) - Total: 198,500
(1, 10, NULL, NULL, 120000.00, 1, 128000.00, 8000),  -- (120000*1) + 8000 = 128000
(1, NULL, 1, NULL, 50000.00, 1, 70000.00, 20000),    -- (50000*1) + 20000 = 70000
(1, 17, NULL, NULL, 28000.00, 1, 30500.00, 2500),    -- (28000*1) + 2500 = 30500

-- Venta 2: Cliente 3 (Miguel Ángel) - Total: 92,000
(2, 11, NULL, NULL, 38000.00, 1, 42000.00, 4000),    -- (38000*1) + 4000 = 42000
(2, NULL, 2, NULL, 35000.00, 1, 50000.00, 15000),    -- (35000*1) + 15000 = 50000

-- Venta 3: Cliente 5 (Roberto Carlos) - Total: 261,500
(3, NULL, 5, NULL, 180000.00, 1, 220000.00, 40000),  -- (180000*1) + 40000 = 220000
(3, NULL, 1, NULL, 50000.00, 1, 70000.00, 20000),    -- (50000*1) + 20000 = 70000
(3, 30, NULL, NULL, 15000.00, 1, 16500.00, 1500),    -- (15000*1) + 1500 = 16500

-- Venta 4: Cliente 2 (Laura Fernanda) - Total: 41,500
(4, 13, NULL, NULL, 25000.00, 1, 28000.00, 3000),    -- (25000*1) + 3000 = 28000
(4, 24, NULL, NULL, 6000.00, 2, 13500.00, 1500),     -- (6000*2) + 1500 = 13500

-- Venta 5: Cliente 7 (Fernando José) - Total: 159,000
(5, NULL, 6, NULL, 120000.00, 1, 135000.00, 15000),  -- (120000*1) + 15000 = 135000
(5, 19, NULL, NULL, 24000.00, 1, 26500.00, 2500),    -- (24000*1) + 2500 = 26500

-- Venta 6: Cliente 4 (Carmen Patricia) - Total: 129,000
(6, NULL, 1, NULL, 50000.00, 1, 68000.00, 18000),    -- (50000*1) + 18000 = 68000
(6, 9, NULL, NULL, 45000.00, 1, 50000.00, 5000),     -- (45000*1) + 5000 = 50000
(6, 21, NULL, NULL, 8000.00, 2, 18000.00, 2000),     -- (8000*2) + 2000 = 18000

-- Venta 7: Cliente 6 (Claudia Alejandra) - Total: 127,000
(7, NULL, 7, NULL, 80000.00, 1, 92000.00, 12000),    -- (80000*1) + 12000 = 92000
(7, 33, NULL, NULL, 35000.00, 1, 38000.00, 3000),    -- (35000*1) + 3000 = 38000

-- Venta 8: Cliente 9 (Andrés Felipe) - Total: 208,000
(8, NULL, 4, NULL, 85000.00, 1, 105000.00, 20000),   -- (85000*1) + 20000 = 105000
(8, NULL, 1, NULL, 50000.00, 1, 70000.00, 20000),    -- (50000*1) + 20000 = 70000
(8, 29, NULL, NULL, 12000.00, 1, 13500.00, 1500),    -- (12000*1) + 1500 = 13500
(8, 31, NULL, NULL, 18000.00, 1, 20000.00, 2000),    -- (18000*1) + 2000 = 20000

-- Venta 9: Cliente 8 (Diana Patricia) - PENDIENTE - Total: 223,000
(9, 12, NULL, NULL, 85000.00, 1, 92000.00, 7000),    -- (85000*1) + 7000 = 92000
(9, NULL, 1, NULL, 50000.00, 1, 68000.00, 18000),    -- (50000*1) + 18000 = 68000

-- Venta 10: Cliente 11 (Eduardo Ramón) - PENDIENTE - Total: 49,000
(10, 18, NULL, NULL, 32000.00, 1, 34500.00, 2500),   -- (32000*1) + 2500 = 34500
(10, 20, NULL, NULL, 15000.00, 1, 16500.00, 1500);   -- (15000*1) + 1500 = 16500
