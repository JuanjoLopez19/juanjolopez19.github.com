# Juanjo López Portfolio

Portfolio personal construido con [GitProfile](https://github.com/arifszn/gitprofile), [React](https://react.dev/), [Vite](https://vite.dev/), [TypeScript](https://www.typescriptlang.org/) y [Tailwind CSS](https://tailwindcss.com/).

El sitio muestra información de GitHub, proyectos destacados, experiencia, formación, habilidades, publicaciones y enlaces sociales a partir de una configuración centralizada en [`gitprofile.config.ts`](./gitprofile.config.ts).

## Características

- Perfil cargado desde la API pública de GitHub.
- Secciones configurables para proyectos, skills, experiencia, educación, certificaciones y publicaciones.
- Tema claro / oscuro con persistencia en `localStorage`.
- SEO básico, Google Analytics y soporte PWA.
- Diseño tipo terminal, adaptado al contenido del portfolio.

## Requisitos

- Node.js 20 o superior.
- `pnpm` 10.x.

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm run dev
```

La aplicación se ejecuta con Vite en modo desarrollo.

## Build de producción

```bash
pnpm run build
```

## Vista previa del build

```bash
pnpm run preview
```

## Lint y formato

```bash
pnpm run check
pnpm run check:fix
pnpm run lint
pnpm run lint:fix
pnpm run format
pnpm run format:fix
```

## Configuración

La personalización principal vive en [`gitprofile.config.ts`](./gitprofile.config.ts).

Ahí puedes cambiar:

- Usuario de GitHub.
- Base de despliegue (`base`).
- Proyectos de GitHub en modo manual o automático.
- Proyectos externos.
- SEO.
- Redes sociales.
- Enlace al CV.
- Skills.
- Experiencia laboral.
- Educación.
- Certificaciones.
- Publicaciones.
- Blog.
- Tema por defecto y opciones visuales.
- Activación de PWA.

## Despliegue

Este repo incluye GitHub Actions para desplegar en GitHub Pages:

- [`deploy.yml`](./.github/workflows/deploy.yml) ejecuta el build y publica en `main`.
- [`test-deploy.yml`](./.github/workflows/test-deploy.yml) valida `check` y `build` en pull requests.

Si despliegas en GitHub Pages bajo una subruta, ajusta `base` en `gitprofile.config.ts`.

## Docker

También puedes levantar el proyecto con Docker Compose:

```bash
docker compose up --build
```

El contenedor expone la app en `http://localhost:5173`.

## Estructura

- [`src/components`](./src/components) contiene la UI principal y las secciones del portfolio.
- [`src/constants`](./src/constants) agrupa constantes y valores compartidos.
- [`src/utils`](./src/utils) incluye sanitización de configuración, tema y utilidades.
- [`src/data/colors.json`](./src/data/colors.json) define colores de lenguajes para repositorios.
- [`public`](./public) contiene iconos, manifest y assets estáticos.

## Licencia

MIT. Consulta el archivo [`LICENSE`](./LICENSE) para más detalles.
