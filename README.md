# ⭐ Star Wars Blog — React Project

Aplicación web desarrollada con **React** que consume la API pública **SWAPI** para explorar el universo de Star Wars.

Este proyecto forma parte de mi portfolio personal y ha sido diseñado para consolidar conceptos avanzados de React como **gestión de estado global con Context + useReducer**, **paginación**, **rutas dinámicas** y **arquitectura escalable**.

🌐 Live demo: Próximamente (Render / Vercel)

---

## 🚀 Funcionalidades principales

- 📜 Listado de entidades del universo Star Wars:
  - Personajes
  - Películas
  - Naves
  - Planetas
  - Especies
  - Vehículos
- 🔍 Páginas de **detalle individual** para cada entidad (excepto películas)
- ⭐ Sistema de **favoritos global**, accesible desde cualquier sección
- ♻️ Paginación conectada a la API
- 🎥 Vídeo de fondo en loop para ambientación
- ✨ Interfaz con estética Star Wars (neón, blur, transiciones)
- 📱 Diseño responsive

---

## 🧠 Tecnologías utilizadas

- **React**
- **React Router DOM**
- **Context API**
- **useReducer**
- **Fetch API**
- **CSS personalizado**
- **SWAPI (swapi.tech)**

---

## 🗂️ Arquitectura y gestión de estado

El estado global de la aplicación se gestiona mediante **Context API + useReducer**, lo que permite:

- Centralizar los datos obtenidos de la API
- Manejar estados de carga y error de forma consistente
- Gestionar una lista de favoritos compartida entre componentes
- Reducir prop drilling
- Facilitar la escalabilidad del proyecto

Cada entidad (people, films, starships, etc.) mantiene su propio slice de estado.

---

## ▶️ Instalación y ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Instalar dependencias:
```bash
npm install

```

3. Ejecutar proyecto:
```bash
npm run start

```

## 🧠 Arquitectura del proyecto

```bash
src/
├─ js/
│  ├─ components/
│  │  ├─ Characters.jsx
│  │  ├─ Films.jsx
│  │  ├─ Starships.jsx
│  │  ├─ Planets.jsx
│  │  ├─ Species.jsx
│  │  ├─ Vehicles.jsx
│  │  ├─ Favorites.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Footer.jsx
│  │  ├─ MainPage.jsx
│  │  ├─ Home.jsx
│  │  └─ VideoBackground.jsx
│  │
│  ├─ componentsDetails/
│  │  ├─ CharactersDetails.jsx
│  │  ├─ PlanetsDetails.jsx
│  │  ├─ SpeciesDetails.jsx
│  │  ├─ StarshipsDetails.jsx
│  │  └─ VehiclesDetails.jsx
│  │
│  ├─ store/
│  │  ├─ actions.js
│  │  ├─ initialStore.js
│  │  └─ reducer.js
│  │
│  ├─ AppContexts.jsx
│  └─ main.jsx
│
├─ styles/
│  └─ index.css
```
## 🔧 Puntos a mejorar (trabajo futuro)

Este proyecto ha sido una base sólida, pero hay varios aspectos que se pueden optimizar y ampliar:

🧹 Orden y limpieza de archivos

Separar mejor lógica, vistas y utilidades

Normalizar nombres y carpetas

💾 Persistencia en localStorage

Guardar favoritos y datos de la API para evitar pérdidas al recargar

Reducir llamadas innecesarias a la API

🔎 Sistema de búsqueda

Filtro por nombre en cada sección

Búsqueda avanzada usando propiedades del objeto (ej. género, planeta, tipo)

⚡ Optimización de rendimiento

Memoización de componentes

Carga diferida (lazy loading) de vistas de detalle


## 🧠 Aprendizajes clave

Diseño de una aplicación React con estado global real

Uso práctico de useReducer en un proyecto completo

Consumo y normalización de datos de una API externa

Gestión de rutas dinámicas

Enfoque en experiencia de usuario y diseño visual

## 👤 Autor

Cristian Trapiello
Proyecto personal desarrollado como parte de mi proceso de aprendizaje y crecimiento como desarrollador frontend.