En el campus quiero seguir las métricas del **VSL PRIME**, el VSL nuevo de la landing de registro del webinar del 17/11, y compararlo con los VSL anteriores y con la versión sin video. Hacé estos cambios.

## Contexto

- La landing de registro está publicada en **applygenesis.com**. El link de los anuncios es `https://applygenesis.com/clase` y reparte 50/50 entre dos versiones:
  - **d1:** titular + bajada + **VSL** + formulario.
  - **d3:** titular + bajada + formulario, **sin video**.
  - Las versiones viejas (a1…c3) siguen andando por su link fijo, pero ya no reciben tráfico de pauta.
- La landing ya le manda al campus, por la Edge Function `ingest`, la **visita** (`/ingest/visita`), el **registro** (`/ingest/optin`), la entrada al **grupo** (`/ingest/grupo`) y la **aplicación** (`/ingest/aplicacion`). La versión viaja en `tracking.ab` (`"d1"`, `"d3"`…). No cambies cómo se guardan esos eventos: la landing está publicada y mandando datos.
- **Cambió el VSL otra vez.** Los videos están en **vTurb (ConverteAI)**, cuenta `f742aa68-fd02-43e3-862f-368d962ade9f`:

  | VSL | Player | Video | Período en la landing |
  |---|---|---|---|
  | **PRIME (el nuevo)** | `6af964c8c9d7117ea1c58a33` | `6af96413504e9e302adeefc2` | desde el 15/11/2026, ~05:00 hora Argentina |
  | Anterior (v2) | `6af7f23efe9c64e8f3d1c34c` | `6af7f22ed3d9169508d17088` | hasta el 15/11/2026, ~05:00 |
  | El del 19/10 (v1) | `6af0436bd779234bdaf8cdf5` | `6af0432aa315ca7972372bd5` | antes del v2 |

  - **Fecha del cambio a PRIME:** 15/11/2026 ~05:00 hora Argentina, cuando se publicó la landing. Usá como hora exacta la del **primer play del player PRIME** en vTurb y decime cuál quedó.
  - Si ya armaste el tracking del VSL v2 (prompt `prompt-tracking-vsl-nuevo.md`), **no lo borres**: agregá PRIME como un período más. Si no lo armaste, armalo ahora con los tres VSL.
  - PRIME se ve en todas las versiones que tienen video (d1, y a1, a2, b1… por link fijo). d3 y las demás versiones «3» no cargan video.

## Qué quiero ver

1. **Del VSL PRIME** (por día, y total desde la fecha del cambio):
   - reproducciones y **play rate** (reproducciones / visitas de las versiones con video)
   - tiempo promedio visto
   - **retención**: qué % sigue mirando al 25%, 50%, 75% y 100% del video, y la curva si vTurb la da
   - si vTurb lo da, cuántos llegan al momento del pitch o del CTA
2. **Cruzado con el campus**, solo para **d1**:
   - visitas, opt-ins y **conversión de la landing** (opt-ins / visitas)
   - calificados y **calificados por visitante**
   - entraron al grupo de WhatsApp
3. **Comparaciones:**
   - **d1 con PRIME vs d1 con el VSL anterior (v2)**: conversión, calificados por visitante y retención del video.
   - **d1 (PRIME) vs d3 (sin video)** desde la fecha del cambio: lo mismo. d3 puede convertir más por no tener video, pero traer gente menos calificada.
   - Separá cada período por su fecha de cambio. No mezcles datos de un VSL con los de otro.
   - Si un período tiene pocos datos (menos de ~300 visitas en d1), marcalo como «poca muestra» en vez de sacar conclusiones.

## De dónde sacar los datos del video

- Hoy la landing **no manda ningún evento del video** al campus (ni play ni % visto). Los datos de reproducción y retención están en **vTurb**.
- Fijate en la documentación de vTurb si hay una **API de analytics** para traer las métricas por player y por día. **No inventes endpoints:** si no encontrás la documentación o el plan no la incluye, frená y avisame.
- Si hace falta un token de vTurb, **pedímelo** y guardalo como secreto de Supabase (no en el código ni en la base). Traé los datos con una función programada (por ejemplo, una vez por hora), no en cada carga del tablero.
- Guardá los players en una tabla o config (player, video, nombre, desde, hasta), no escritos a mano en el código, así el próximo cambio de VSL es agregar una fila.
- **Si la API de vTurb no alcanza**, proponeme un evento nuevo `/ingest/vsl` que mande la landing: qué campos necesitás (por ejemplo `tracking.ab`, `player`, `evento` = play / 25 / 50 / 75 / 100, segundos vistos) y cómo deduplicarlo por sesión. No lo actives sin que te lo confirme: el cambio en la landing lo hago yo aparte.

## Cómo verificarlo

- Mostrame los números de PRIME de las últimas 24 horas y compará el total de reproducciones con lo que muestra el panel de vTurb para el player `6af964c8c9d7117ea1c58a33`. Tienen que coincidir o explicar la diferencia.
- Confirmá que después de la fecha del cambio no entran reproducciones nuevas al player v2 `6af7f23efe9c64e8f3d1c34c` desde la landing (si entran, avisame: puede haber una página que todavía tiene el player viejo).
- Mirá el tablero en desktop y en celular.

Cuando termines, decime qué tablas, funciones y pantallas tocaste, y mostrame cómo se ven la comparación d1 PRIME vs d1 v2 y la de d1 vs d3.
