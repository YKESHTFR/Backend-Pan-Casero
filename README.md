<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" width="120" alt="Postgres Logo" /></a>
  <a href="https://docs.docker.com/" target="blank"><img src="https://docs.deepwavedigital.com/Tutorials/img/docker_logo.png" width="280" alt="Docker Logo" /></a>
</p>

# 🍞 Pan Casero API

API desarrollada con **NestJS**, **PostgreSQL** y **Docker** 

NestJS – Framework progresivo para Node.js

PostgreSQL – Base de datos relacional

Docker – Contenedores para entornos consistentes

---

1. 🧬 Clonar el proyecto
---
2. ⚙️ Instalación
```
yarn install
```
---

3. 🧬 Clonar el archivo 
```
.env.template
``` 
y renombrarlo a 
```
.env
```
---

4. 🔧 Cambiar las variables de entorno
---

5. 🐘 Levantar el contenedor de base de datos, Metabase y Keycloak
```
docker-compose up -d
```
---

6. 🐘 Levantar el proyecto
```
yarn start:dev
```
---
7. 📄 Documentación de la API Para acceder a la documentación de la API una vez lanzado el proyecto diríjase a 
```
http://localhost:3000/api#/
```
---
8. Imagen de la documentación
![Doc API](/src/helpers/images/DocAPI.png)
---
# Hecho por: 
```
👤 Yesid Bolaños - (🧠 Backend) - 👤 Gabriel Peña - (🎨 Frontend / Diseño) - 👤 Jimena Cabrera - (🧪 QA)
```