## Trav Hotel Admin API

Esta API en **TypeScript** basada en **Express** sirve de backend para el dashboard de Trav Hotel. Incluye autenticación JWT, rutas REST para empleados, huéspedes y habitaciones, pruebas automáticas con Jest + Supertest y documentación Swagger UI.

---

### 📁 Estructura del Proyecto

```
api/
├── src/
│   ├── app.ts               # Configuración de Express, CORS, JSON, rutas y Swagger
│   ├── server.ts            # Arranque del servidor (app.listen)
│   ├── routes.ts            # Definición de todas las rutas (/login, /employees, /guests, /rooms)
│   ├── swagger.ts           # Configuración Swagger-JSDoc y Swagger-UI
│   ├── middleware/
│   │   └── auth.ts          # JWT checkToken middleware
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── employeeController.ts
│   │   ├── guestController.ts
│   │   └── roomController.ts
│   ├── services/
│   │   └── services.ts      # employeeService, guestService, roomService (CRUD sobre JSON)
│   ├── interfaces/
│   │   └── models.ts        # Interfaces Employee, Guest, Room
│   └── data/
│       ├── employees.json
│       ├── guests.json
│       └── roomList.json
├── test/                    # Pruebas Jest + Supertest
│   ├── auth.test.ts
│   └── employees.test.ts
├── .env                     # Variables de entorno
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

### 🚀 Instalación

1. Clona o sitúa el proyecto en tu máquina y accede a la carpeta `api/`:
   ```bash
   cd Miranda_Api/api
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con al menos:
   ```
   SECRET_KEY=TuClaveSuperSecreta
   PORT=3000
   HOTEL_NAME=Trav Hotel Admin API
   ```

---

### 🔧 Configuración de TypeScript

**`tsconfig.json`**:

- `rootDir": "."` para incluir `src/` y `test/`
- `outDir": "./dist"`
- `strict`, `esModuleInterop` y `skipLibCheck` activados
- `include: ["src", "test"]`

---

### 📦 Scripts NPM

```json
"scripts": {
  "dev": "nodemon --watch src --exec ts-node src/server.ts",
  "test": "jest"
}
```

- **`npm run dev`**: arranca el servidor en modo desarrollo (watch + ts-node).
- **`npm test`**: ejecuta las pruebas con Jest.

---

### ⚙️ Arranque del Servidor

- **`src/app.ts`** monta:
  - CORS, body-parser JSON
  - Swagger UI en `/docs`
  - UI HTML interactiva en `/` (login + llamadas protegidas + link a `/docs`)
  - Rutas bajo `/api` (login + rutas protegidas)
- **`src/server.ts`** llama a `app.listen(PORT)` y loguea la URL.

---

### 🔐 Autenticación

- **`POST /api/login`**
  - Body `{ username, password }`
  - Hardcoded: `{ admin, password123 }`
  - Devuelve `{ token }` (JWT firmado con `SECRET_KEY`)
- **Middleware `checkToken`** en `src/middleware/auth.ts`:
  - Verifica header `Authorization: Bearer <token>`
  - Devuelve 401 si falta o mal formateado, 403 si inválido/expirado

---

### 📚 Rutas REST

Bajo `/api`, protegidas por JWT (tras `/login`):

- **Employees** (`src/controllers/employeeController.ts`)
  - `GET    /api/employees`
  - `GET    /api/employees/:id`
  - `POST   /api/employees`
  - `PUT    /api/employees/:id`
  - `DELETE /api/employees/:id`

- **Guests** (`src/controllers/guestController.ts`)
  - `GET    /api/guests`
  - `GET    /api/guests/:id`
  - `POST   /api/guests`
  - `PUT    /api/guests/:id`
  - `DELETE /api/guests/:id`

- **Rooms** (`src/controllers/roomController.ts`)
  - `GET    /api/rooms`
  - `GET    /api/rooms/:id`
  - `POST   /api/rooms`
  - `PUT    /api/rooms/:id`
  - `DELETE /api/rooms/:id`

---

### 🧪 Pruebas Automáticas

- **`test/auth.test.ts`**:
  - Login correcto → HTTP 200 + token válido
  - Login incorrecto → HTTP 401
  - Acceso a ruta protegida sin token → HTTP 401
  - Acceso con token inválido → HTTP 403

- **`test/employees.test.ts`**:
  - GET `/api/employees` sin token → 401
  - GET `/api/employees` con token → 200 + array
  - POST `/api/employees` crea un nuevo empleado → 201 + objeto creado

Ejecutar con:
```bash
npm test
```

---

### 📖 Documentación Swagger

- Montada en **`/docs`** gracias a **swagger-jsdoc** + **swagger-ui-express**.
- Los controladores usan comentarios JSDoc `@openapi` para definir paths, parámetros y responses.
- En `src/swagger.ts` se definen los **schemas** de los modelos:
  - **Employee**, **Guest**, **Room** (propiedades, tipos y ejemplos)
  - Security scheme `bearerAuth` para JWT

Abre [http://localhost:3000/docs](http://localhost:3000/docs) para explorar la API.

---

¡Y eso es todo! Con esto tienes una API completa en TypeScript con:

- Estructura modular (controllers, services, interfaces, middleware)
- Autenticación JWT
- Pruebas automatizadas
- Documentación interactiva Swagger
- Mini-UI HTML para login y exploración rápida

Puedes seguir extendiéndola añadiendo validadores, más endpoints o conectando a una base de datos real. ¡Éxitos con tu integración!
