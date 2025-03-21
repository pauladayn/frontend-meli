# Mercado Libre Frontend Challenge

Este proyecto es una aplicación web desarrollada como parte del desafío de frontend para Mercado Libre. La aplicación permite a los usuarios buscar productos, ver detalles de los mismos y realizar otras interacciones relacionadas con el comercio electrónico.

Para ver el proyecto live ingresá a https://frontend-meli.onrender.com

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Express**: Framework para construir el servidor backend.
- **Axios**: Cliente HTTP para realizar solicitudes a la API de Mercado Libre.
- **React Router**: Manejo de rutas en la aplicación.
- **Vite**: Herramienta de desarrollo para aplicaciones modernas.
- **SSR (Server-Side Rendering)**: Renderizado del lado del servidor para mejorar el SEO y la experiencia del usuario.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión 16 o superior)
- **pnpm** (gestor de paquetes)

---

## Estructura del Proyecto

### Frontend: Atomic Design

El frontend sigue el enfoque de **Atomic Design**, que organiza los componentes en niveles jerárquicos para facilitar la reutilización y el mantenimiento del código.

- **Atoms**: Componentes básicos e indivisibles, como botones, inputs, etiquetas, etc.
- **Molecules**: Combinaciones de átomos que forman bloques funcionales, como un formulario de búsqueda.
- **Organisms**: Combinaciones de moléculas y átomos que forman secciones completas de la interfaz, como un encabezado o un listado de productos.
- **Templates**: Estructuras de página que organizan organismos y definen el diseño general.
- **Pages**: Implementaciones finales de las plantillas con datos específicos.


### Backend: RESTful
- El backend sigue un enfoque basado en REST con una separación clara de responsabilidades, similar al patrón MVC.
- **Routes**: Define las rutas de la API y delega la lógica a los controladores.
- **Controllers**: Contienen la lógica para manejar las solicitudes HTTP y procesar las respuestas.
- **Services**: Encapsulan la lógica de negocio y las interacciones con APIs externas (como la API de Mercado Libre).
- **Handlers**: Manejan casos específicos o transformaciones de datos.
- **Utils**: Funciones auxiliares reutilizables.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git@github.com:pauladayn/frontend-meli.git
   cd tu-repositorio 
   cd meli-app


2. Instalá las dependencias del proyecto
 ``` pnpm install   ```

3. Configura el entorno del proyecto:

  Crea un archivo `.env` en la raíz del proyecto y agregá las siguientes variables de entorno:

CLIENT_SECRET=tu_client_secret
CLIENT_ID=tu_client_id
REDIRECT_URI=https://tu-dominio.com/callback

Para obtener estos datos vas a tener que seguir estas guías:

- [Crea tu primera app](https://developers.mercadolibre.com.ar/es_ar/crea-una-aplicacion-en-mercado-libre-es)
- [Autenticación y autorización](https://developers.mercadolibre.com.ar/es_ar/autenticacion-y-autorizacion)

La clave está en registrar un redirectUri que te permita probar el proyecto de forma local, en mi caso use [ngrok](https://dashboard.ngrok.com/get-started/setup/macos), para generar un https mágico y lo sumé a la lista de redirects en el formulario de creación de mi app. Así poder interceptar la llamada a /callback y seguir con la autenticación de OAuth para obtener el token de accesso. 

Una vez que tenes tus credenciales estas listo para continuar.


