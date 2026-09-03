# Control financiero PWA

Esta carpeta convierte el formulario de Google Apps Script en una aplicación web instalable.

## Qué hace cada archivo

- `index.html`: carcasa instalable que muestra el formulario.
- `manifest.webmanifest`: nombre, colores, orientación, icono y modo de apertura.
- `sw.js`: guarda la carcasa de la PWA en el teléfono.
- `icons/`: iconos de instalación.
- `apps-script-doGet.gs`: copia de referencia de la función que se pega en Google Apps Script. **No se sube al repositorio.**

## Paso 1: permitir que la PWA muestre Apps Script

1. Abre el proyecto de Apps Script conectado a tu hoja.
2. En `Code.gs`, reemplaza solamente la función `doGet()` con el contenido de `apps-script-doGet.gs`.
3. No borres `obtenerOpciones()` ni `guardarMovimiento()`.
4. Guarda los cambios.
5. Entra en **Implementar > Administrar implementaciones**.
6. Edita la implementación actual, selecciona **Nueva versión** y pulsa **Implementar**.

## Paso 2: crear el repositorio

1. En GitHub, pulsa **New repository**.
2. Usa el nombre `control-financiero-pwa`.
3. Elige **Public**.
4. Crea el repositorio.
5. Extrae este ZIP en tu computadora.
6. Sube a la raíz del repositorio solamente los archivos indicados abajo.

En la raíz deben aparecer directamente:

```text
index.html
manifest.webmanifest
sw.js
README.md
icons/
```

No subas `apps-script-doGet.gs`. Esa función se pega dentro del archivo
`Code.gs` del editor de Google Apps Script.

## Paso 3: activar GitHub Pages

1. Dentro del repositorio, abre **Settings**.
2. En el menú lateral, selecciona **Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/root`.
5. Pulsa **Save**.
6. Espera unos minutos y abre la dirección que GitHub muestre.

Normalmente tendrá esta forma:

```text
https://TU-USUARIO.github.io/control-financiero-pwa/
```

## Paso 4: instalarla

1. Abre la dirección de GitHub Pages en Chrome desde Android.
2. Pulsa **Instalar aplicación** cuando aparezca el botón.
3. Si no aparece, usa el menú del navegador y selecciona **Instalar aplicación** o **Añadir a pantalla de inicio**.

La propiedad `display: standalone` elimina la barra de direcciones, pero conserva la barra de estado del teléfono. Para ocultar también la barra de estado, cambia en `manifest.webmanifest`:

```json
"display": "standalone"
```

por:

```json
"display": "fullscreen"
```

Se recomienda `standalone`, porque se siente como una aplicación sin ocultar la hora y la batería.

## Importante

El formulario todavía necesita Internet para comunicarse con Apps Script y Google Sheets. El service worker guarda la carcasa de la aplicación, pero no puede registrar movimientos sin conexión.

`ALLOWALL` permite insertar el formulario en esta PWA, pero también permite que otros sitios intenten insertarlo. Por ahora no muestres saldos ni información privada dentro de la página pública. Más adelante conviene agregar autenticación real.
