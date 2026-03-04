# 🐳 Guía de Despliegue con Docker – eCommerce FullStack

Este documento detalla los pasos necesarios para clonar, configurar y desplegar el entorno completo de la aplicación utilizando contenedores Docker.

---

## 🚀 Pasos para el Despliegue

Siga este orden para asegurar que todos los servicios se vinculen correctamente.

---

## 1️⃣ Clonar el Repositorio

Abra una terminal y ejecute:

```bash
git clone https://github.com/elangelsp/eCommerce-fullStack
cd eCommerce-fullStack
```

---

## 2️⃣ Levantar los Contenedores

Asegúrese de tener Docker Desktop activo y ejecute:

```bash
docker-compose up --build
```

Este comando:

- Construye las imágenes del Frontend
- Construye el Backend
- Configura Nginx
- Descarga MySQL
- Descarga phpMyAdmin

---

## 🌐 Mapeo de Puertos y Rutas

| Servicio | URL Local | Puerto | Descripción |
|----------|-----------|-----------|-------------|
| Frontend | http://localhost | 80 (Nginx) | Interfaz de usuario principal |
| API Backend | http://localhost/api | 5000 | Endpoint de la API |
| phpMyAdmin | http://localhost:8080 | 8080 | Gestión visual de la base de datos |
| Base de Datos | localhost:3306 | 3306 | Servidor MySQL 8.0 |

---

## 🔐 Credenciales de Acceso

### 🗄️ Base de Datos y phpMyAdmin

- Host: database (dentro de Docker) o localhost (desde fuera)
- Usuario Root: root
- Password Root: root
- Usuario App: angel
- Password App: 123456
- Base de datos: eCommerce

---

## 👤 Usuarios de Aplicación (Test)

| Rol | Email | Contraseña |
|-------|-------------------|------------|
| Administrador | angel@example.com | 123456 |
| Cliente | juan@example.com | 123456 |

---

## 📁 Estructura de Rutas del Proyecto

```bash
./frontend         → Código fuente React (Vite)
./backend          → Servidor Node.js y modelos DB
./database/init.sql → Script de inicialización automática
./web              → Configuración Nginx (Proxy inverso)
```

---

## ⚠️ Notas de Mantenimiento

### Persistencia

Los datos de la base de datos se guardan en el volumen:

```
eCommerce_vol
```

No se borrarán al apagar los contenedores.

### Logs

Para ver logs en tiempo real:

```bash
docker logs -f nombre_contenedor
```
