En el campus quiero poder seguir las métricas del **VSL nuevo** de la landing de registro del webinar del 17/11, y compararlo con lo que ya medimos (visitas, opt-ins, calificados). Hacé estos cambios.

## Contexto

- La landing de registro está publicada en **applygenesis.com**. El link de los anuncios es `https://applygenesis.com/clase` y reparte 50/50 entre dos versiones:
  - **d1:** titular + bajada + **VSL** + formulario.
  - **d3:** titular + bajada + formulario, **sin video**.
  - Las versiones viejas (a1…c3) siguen andando por su link fijo, pero ya no reciben tráfico de pauta.
- La landing ya le manda al campus, por la Edge Function `ingest`, la **visita** (`/ingest/visita`), el **registro** (`/ingest/optin`), la entrada al **grupo** (`/ingest/grupo`) y la **aplicación** (`/ingest/aplicacion`). La versión viaja en `tracking.ab` (`"d1"`, `"d3"`…). No cambies cómo se guardan esos eventos: la landing está publicada y mandando datos.
- **Cambió el VSL.** El video está en **vTurb (ConverteAI)**:
  - **VSL nuevo:** player `6af7f23efe9c64e8f3d1c34c` (video `6af7f22ed3d9169508d17088`).
  - **VSL anterior:** player `6af0436bd779234bdaf8cdf5` (video `6af0432aa315ca7972372bd5`).
  - Cuenta de vTurb: `f742aa68-fd02-43e3-862f-368d962ade9f`.
  - El nuevo se ve en todas las versiones que tienen video (d1, y a1, a2, b1… por link fijo). d3 y las demás versiones «3» no cargan video.
  - **Fecha del cambio:** [COMPLETAR: día y hora en que se publicó, hora Argentina]. Antes de esa hora, las visitas de d1 vieron el VSL anterior.

## Qué quiero ver

1. **Del VSL nuevo** (por día, y total desde la fecha del cambio):
   - reproducciones y **play rate** (reproducciones / visitas de las versiones con video)
   - tiempo promedio visto
   - **retención**: qué % sigue mirando a los 25%, 50%, 75% y 100% del video, y la curva si vTurb la da
   - si vTurb lo da, cuántos llegan al momento del pitch o del CTA
2. **Cruzado con el campus**, solo para **d1**:
   - visitas, opt-ins y **conversión de la landing** (opt-ins / visitas)
   - calificados y **calificados por visitante**
   - entraron al grupo de WhatsApp
3. **Comparaciones:**
   - **d1 con el VSL nuevo vs d1 con el VSL anterior** (antes y después de la fecha del cambio): conversión, calificados por visitante y retención del video.
   - **d1 (VSL nuevo) vs d3 (sin video)** desde la fecha del cambio: lo mismo. d3 puede convertir más por no tener video, pero traer gente menos calificada.
   - Separá los dos períodos por la fecha del cambio. No mezcles datos del VSL anterior con los del nuevo.

## De dónde sacar los datos del video

- Hoy la landing **no manda ningún evento del video** al campus (ni play ni % visto). Los datos de reproducción y retención están en **vTurb**.
- Fijate en la documentación de vTurb si hay una **API de analytics** para traer las métricas por player y por día. **No inventes endpoints:** si no encontrás la documentación o el plan no la incluye, frená y avisame.
- Si hace falta un token de vTurb, **pedímelo** y guardalo como secreto de Supabase (no en el código ni en la base). Traé los datos con una función programada (por ejemplo, una vez por hora), no en cada carga del tablero.
- **Si la API de vTurb no alcanza**, proponeme un evento nuevo `/ingest/vsl` que mande la landing: qué campos necesitás (por ejemplo `tracking.ab`, `player`, `evento` = play / 25 / 50 / 75 / 100, segundos vistos) y cómo deduplicarlo por sesión. No lo actives sin que te lo confirme: el cambio en la landing lo hago yo aparte.

## Cómo verificarlo

- Mostrame los números del VSL nuevo de las últimas 24 horas y compará el total de reproducciones con lo que muestra el panel de vTurb para el player `6af7f23efe9c64e8f3d1c34c`. Tienen que coincidir o explicar la diferencia.
- Mirá el tablero en desktop y en celular.

Cuando termines, decime qué tablas, funciones y pantallas tocaste, y mostrame cómo se ven la comparación d1 nuevo vs d1 anterior y la de d1 vs d3.
