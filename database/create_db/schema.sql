-- ============================================
-- Sistema de Gestión de Citas Médicas
-- ============================================

CREATE TABLE IF NOT EXISTS medico (
    id_medico BIGSERIAL PRIMARY KEY,
    nombre_medico VARCHAR(100) NOT NULL,
    apellido_medico VARCHAR(100) NOT NULL,
    telefono_medico VARCHAR(15) NOT NULL,
    correo_medico VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_correo_medico ON medico(correo_medico);
CREATE INDEX IF NOT EXISTS idx_nombre_medico ON medico(nombre_medico, apellido_medico);

-- ============================================
CREATE TABLE IF NOT EXISTS especialidad (
    id_especialidad BIGSERIAL PRIMARY KEY,
    nombre_especialidad VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_nombre_especialidad ON especialidad(nombre_especialidad);

-- ============================================
CREATE TABLE IF NOT EXISTS medico_especialidad (
    id_medico_especialidad BIGSERIAL PRIMARY KEY,
    id_medico BIGINT NOT NULL,
    id_especialidad BIGINT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_medico) REFERENCES medico(id_medico) ON DELETE CASCADE,
    FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad) ON DELETE CASCADE,
    UNIQUE (id_medico, id_especialidad)
);

CREATE INDEX IF NOT EXISTS idx_medico ON medico_especialidad(id_medico);
CREATE INDEX IF NOT EXISTS idx_especialidad ON medico_especialidad(id_especialidad);

-- ============================================
CREATE TABLE IF NOT EXISTS paciente (
    id_paciente BIGSERIAL PRIMARY KEY,
    nombre_paciente VARCHAR(100) NOT NULL,
    apellido_paciente VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono_paciente VARCHAR(15) NOT NULL,
    correo_paciente VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_correo_paciente ON paciente(correo_paciente);
CREATE INDEX IF NOT EXISTS idx_nombre_paciente ON paciente(nombre_paciente, apellido_paciente);

-- ============================================
CREATE TYPE estado_cita_enum AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA');

CREATE TABLE IF NOT EXISTS cita (
    id_cita BIGSERIAL PRIMARY KEY,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    motivo_cita VARCHAR(255) NOT NULL,
    estado_cita estado_cita_enum NOT NULL DEFAULT 'PENDIENTE',
    id_paciente BIGINT NOT NULL,
    id_medico BIGINT NOT NULL,
    id_especialidad BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente) ON DELETE RESTRICT,
    FOREIGN KEY (id_medico) REFERENCES medico(id_medico) ON DELETE RESTRICT,
    FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_fecha_cita ON cita(fecha_cita);
CREATE INDEX IF NOT EXISTS idx_estado_cita ON cita(estado_cita);
CREATE INDEX IF NOT EXISTS idx_medico_fecha ON cita(id_medico, fecha_cita, hora_cita);
CREATE INDEX IF NOT EXISTS idx_paciente ON cita(id_paciente);