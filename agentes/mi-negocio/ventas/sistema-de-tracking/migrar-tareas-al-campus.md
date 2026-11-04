# Pasar las tareas del tracker al campus

Las tareas del lanzamiento hoy viven en el tracker de Vercel (sección **Tareas**), guardadas como un solo JSON (`tareas/tareas.json`) en el Blob privado. La idea es moverlas al panel de admin del campus (Supabase `genesis-platform`, ref `zanwrwysbmvgytfzymaz`) y manejarlas desde ahí.

## Qué tenés que hacer vos (3 pasos)

1. **Bajar las tareas con su estado actual.** Entrá al tracker en el navegador con tu usuario y, en la misma pestaña, abrí `https://<dominio-del-tracker>/api/tareas`. Te muestra un JSON con todas las tareas (estado, responsable, fechas, comentarios, historial). Guardalo como `tareas.json` (Ctrl+S).
2. **Abrir Claude Code en el repo del campus** y pasarle:
   - el archivo `tareas.json` del paso 1;
   - el prompt de abajo, completo;
   - los emails con los que entran Mati, Santi y Manu al campus (para asignar las tareas a sus perfiles).
3. **Avisarle si el tracker sigue o se apaga.** Recomendado: una vez que las tareas estén en el campus y lo hayas revisado, se dejan de usar en el tracker para no tener dos fuentes de verdad.

## Prompt para Claude Code en el repo del campus

```
Quiero un módulo de Tareas en el panel de admin del campus, y migrar ahí todas las tareas del tracker de ventas con su estado actual. Te adjunto tareas.json (es la respuesta de GET /api/tareas del tracker).

Formato de tareas.json: { ok, tareas: [...], personas, fases, estados, yo, faltan }. Cada tarea:
- id: texto, ej. "ADQ-03" (prefijo de la fase + número). Mantenerlo como código visible.
- titulo (≤200), fase, cantidad (1-999), responsable ("Mati" | "Santi" | "Manu" | ""), estado
- vence: "YYYY-MM-DD" o ""
- agente (≤300, el agente del repo que se usa), referencia (≤600), link (≤500, link al entregable), notas
- comentarios: [{ quien, cuando, texto }]
- historial: [{ quien, cuando, que }]
- creadoPor, creado, actualizado, actualizadoPor (fechas ISO)

Valores válidos:
- estados: Por hacer, En curso, En revisión, Hecha, Bloqueada
- fases (con prefijo y días respecto del webinar para la fecha límite por defecto):
  Adquisición ADQ -10 · Nutrición NUT -6 · Webinar WEB -1 · Post-webinar POST 0 · B:52 B52 0 · Bonus BON -3 · Sistemas SIS -10 · Equipo EQ sin fecha · Extras EXT sin fecha
  El webinar es el martes 17/11/2026. Si una tarea nueva no trae fecha, se calcula con eso.
- responsables: Mati, Santi, Manu. Mapearlos a sus perfiles del campus con estos emails: [COMPLETAR].

Qué necesito:
1. Tablas en Supabase (migración): tareas, comentarios e historial (o historial como jsonb si te parece más simple), con RLS para que solo el equipo admin las vea y edite. Responsable como FK a profiles, guardando también el nombre corto.
2. Migración de datos: cargar todas las tareas de tareas.json respetando id, estado, responsable, fechas, comentarios e historial tal cual. Antes de cargar, mostrame cuántas hay por fase y por estado para que lo compare con el tracker.
3. Módulo Tareas en el panel de admin, con lo mismo que tenía el tracker:
   - Tablero por estado (una columna por estado, con su color, arrastrar la tarjeta para cambiar el estado).
   - Lista agrupada por fase con filtros: responsable, fase, estado, vencidas.
   - «Mis tareas» del usuario logueado, ordenadas por fecha límite.
   - Resumen por persona (cuántas tiene, hechas, vencidas).
   - Ficha de la tarea: editar todos los campos, comentar y ver el historial (quién cambió qué y cuándo).
   - Crear y borrar tareas.
   Colores de estado: Por hacer amarillo, En curso azul, En revisión violeta, Hecha verde, Bloqueada rojo.
4. Cada cambio queda en el historial con quién y cuándo. Si dos personas editan a la vez, que no se pisen.

Seguí el estilo y los componentes que ya usa el panel de admin. Mostrame el plan antes de tocar la base de producción.
```
