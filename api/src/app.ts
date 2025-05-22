import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Documentación Swagger UI en /docs
setupSwagger(app);

// Html UI para la API
app.get('/', (_req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Trav Hotel API UI</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
      background: #f9f9f9;
    }
    input, button {
      margin: .5rem 0;
      padding: .5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #007BFF;
      color: white;
      border: none;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0056b3;
    }
    .endpoint {
      margin-right: 1rem;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 4px;
      max-width: 100%;
      overflow-x: auto;
    }
    a {
      display: inline-block;
      margin-top: 1rem;
      color: #007BFF;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Trav Hotel API UI</h1>
    <a href="/docs" target="_blank">🔍 Ver documentación Swagger</a>

  <h2>1. Login</h2>
  <input id="user" placeholder="Usuario" value="admin" /><br/>
  <input id="pass" type="password" placeholder="Password" value="password123" /><br/>
  <button id="btnLogin">Login</button>
  <p>Token: <span id="token" style="font-weight: bold;"></span></p>

  <h2>2. Llamar a rutas protegidas</h2>
  <button class="endpoint" data-path="/employees">Empleados</button>
  <button class="endpoint" data-path="/guests">Huéspedes</button>
  <button class="endpoint" data-path="/rooms">Habitaciones</button>

  <h2>3. Resultado</h2>
  <pre id="output">–</pre>



  <script>
    const btnLogin = document.getElementById('btnLogin');
    const tokenSpan = document.getElementById('token');
    const output = document.getElementById('output');

    btnLogin.onclick = async () => {
      const user = document.getElementById('user').value;
      const pass = document.getElementById('pass').value;
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });
      const body = await res.json();
      if (body.token) {
        tokenSpan.textContent = body.token;
        localStorage.setItem('apiToken', body.token);
      } else {
        alert(body.message || 'Error de login');
      }
    };

    document.querySelectorAll('.endpoint').forEach(btn => {
      btn.onclick = async () => {
        const path = btn.getAttribute('data-path');
        const token = localStorage.getItem('apiToken');
        if (!token) {
          alert('Primero haz login');
          return;
        }
        const res = await fetch('/api' + path, {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        const json = await res.json();
        output.textContent = JSON.stringify(json, null, 2);
      };
    });
  </script>
</body>
</html>
  `);
});


app.use('/api', routes);

export default app;
