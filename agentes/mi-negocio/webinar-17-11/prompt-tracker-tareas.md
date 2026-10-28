# Prompt: tracker de tareas

Pegalo en Claude Code con este repo abierto. Arma la sección **Tareas** dentro del tracker que ya existe (`mi-negocio/ventas/sistema-de-tracking/app/`), así usa el mismo login y el mismo deploy.

---

```
Quiero sumar una sección «Tareas» al tracker de ventas (mi-negocio/ventas/sistema-de-tracking/app/) para organizar el lanzamiento del webinar del 17/11 entre Mati, Santi y Manu.

Antes de escribir código leé:
- mi-negocio/webinar-17-11/README.md, contexto.md y tareas.md (tareas.md es la carga inicial).
- El README y la especificación del tracker, lib/auth.js, lib/store.js, lib/cache.js, api/comprobante.js (Blob privado) e index.html, para seguir el mismo estilo: JS sin framework, funciones en api/, archivos estáticos, nada de build.

Qué tiene que hacer:

1. Tareas con: id, título, fase (Adquisición, Nutrición, Webinar, Post-webinar, B:52, Bonus, Sistemas, Equipo, Extras), cantidad, responsable (Mati, Santi o Manu; puede quedar sin asignar), estado (Por hacer, En curso, En revisión, Hecha, Bloqueada), fecha límite, agente del repo, referencia, link al entregable, notas y comentarios. Guardá quién creó la tarea, quién la cambió y cuándo (historial).
2. Crear, editar, asignar, reasignar, cambiar estado y borrar tareas desde la app. Cualquier usuario logueado puede hacer todo.
3. Vistas:
   - Tablero por estado (kanban, arrastrar para cambiar de estado).
   - Lista agrupada por fase, con filtros por responsable, estado, fase y vencidas.
   - «Mis tareas»: lo del usuario logueado, ordenado por fecha límite.
   - Resumen por persona: cuántas tiene, cuántas hechas, cuántas vencidas.
4. Importación inicial: un botón en Configuración que crea las tareas de mi-negocio/webinar-17-11/tareas.md (parseá las tablas; el id de la tabla es el id de la tarea). Si ya existe una tarea con ese id, no la pisa.
5. Al tocar el agente de una tarea, que muestre la frase para pedirlo en Claude Code («usá el agente de …») y la ruta de la referencia.
6. Fechas límite: proponé una por defecto según la fase y el calendario de README.md (lo de adquisición, antes del 08/11). Se editan a mano.
7. Mapeo de usuario a persona: el nombre de USERS_JSON decide si sos Mati, Santi o Manu. Si alguno de los tres no está en USERS_JSON, avisame cómo cargarlo; no inventes claves.

Dónde guardar: las tareas no son leads, así que no van a GHL. Usá el Blob store privado que ya tiene el proyecto (un JSON de tareas), con control de versión para que dos personas editando a la vez no se pisen (si cambió entre que leíste y guardaste, reintentá sobre la versión nueva). En modo demo, en memoria como el resto.

Al terminar:
- Sumá tests al estilo de test/flujo.test.js (crear, asignar, cambiar estado, importar sin duplicar, dos escrituras a la vez) y corrélos.
- Actualizá el README del tracker con la sección nueva.
- Trabajá en una rama claude/tracker-tareas y no hagas push sin preguntarme.
```
