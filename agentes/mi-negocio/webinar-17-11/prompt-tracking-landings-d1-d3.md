En el sistema de tracking (`agentes/mi-negocio/ventas/sistema-de-tracking/app`) quiero poder seguir el test nuevo de la landing de registro del webinar del 17/11: las versiones **d1** y **d3**. Hoy los datos ya llegan, pero el tablero no los muestra bien. Hacé estos cambios.

## Contexto

- La landing (`agentes/mi-negocio/lanzamiento-19-10/optin/index.html`, publicada en applygenesis.com) manda la versión en `tracking.ab`, tanto en la visita (`/api/public/visita`) como en el registro (`/api/public/optin`). El tracking ya acepta cualquier valor alfanumérico, así que `"d1"` y `"d3"` se guardan sin tocar nada.
- Desde el **12/11 a las 19:59 (hora Argentina)**, el link de los anuncios (`/clase`) reparte 50/50 **solo entre d1 y d3**. Los 4 anuncios activos de adquisición (D3_V1, D3_V2, D3_V4, D4_V1) apuntan a `/clase`.
  - **d1:** titular nuevo + bajada + VSL + formulario.
  - **d3:** titular nuevo + bajada + formulario, sin video.
  - Titular de las dos: «Te regalo mis sistemas con los que facturo $275M/Mes solo de recompras y sin depender de Meta».
  - Bajada de las dos: «¿Tu ecommerce de consumibles depende de conseguir clientes nuevos todos los meses para facturar? Te muestro mi plan paso a paso para facturar +$100M/mes solo de recompras, en vivo y gratis.»
- Antes (12/11 hasta las 19:59) `/clase` repartía entre a2 y a3. Antes de eso, el 12/11 a la madrugada, entre las 9 versiones a1…c3. Esas versiones siguen existiendo por link directo, pero ya no reciben tráfico de pauta.

## Qué hay que cambiar

1. **Nombres de las versiones** (`VERSION_NOMBRE` en `app/index.html`, línea ~2287). Hoy solo tiene 1, 2, 3, A y B, y el resto sale como «Landing d1» sin descripción. Agregá:
   - `d1`: «Te regalo mis sistemas · con VSL (desde 12/11)»
   - `d3`: «Te regalo mis sistemas · sin video (desde 12/11)»
   - `a1`/`a2`/`a3`: «Copia mi modelo (60M→270M) · video+form / form+video / sin video»
   - `b1`/`b2`/`b3`: «Copia y Pega… $270M con 40% margen» con los mismos 3 órdenes
   - `c1`/`c2`/`c3`: «Te regalo el secreto… +270M y +40% margen» con los mismos 3 órdenes
   - `cpa`, `margen`, `meta`: «Landing por dolor: CPA / Margen / Meta»

2. **El test d1 vs d3 se compara solo entre ellas.** En `api/anuncios.js`, el cálculo de `test` (ganador y confianza) toma las dos mejores de *todas* las versiones con datos en el rango. Con a1…c3 y las landings por dolor mezcladas, el «va ganando» puede quedar en una versión vieja con 3 visitas.
   - Agregá el grupo `["d1", "d3"]` a la lista de grupos que siempre salen juntos (como `["1","2","3"]` y `["A","B"]`), así d3 aparece aunque tenga 0.
   - Cuando haya datos de d1 o d3, calculá `ganador` y `confianza` **solo entre d1 y d3**.
   - Las demás versiones pueden seguir apareciendo en la tabla, pero en una sección aparte («Versiones anteriores»), sin «va ganando».

3. **Rango por defecto del test.** Las visitas se guardan por día, sin hora. Sumá en Configuración (en `settings`, como `inicioLanzamiento`) un campo **«Inicio del test de landing»**, con valor por defecto `2026-11-12`. Cuando se mira la pestaña Landings sin rango elegido, la comparación d1 vs d3 arranca desde esa fecha. El 12/11 entero se puede contar: d1 y d3 no existían antes de las 19:59, así que no hay datos viejos con esas etiquetas.

4. **Qué mostrar de cada versión** (debe salir en la tarjeta y en la tabla de la pestaña Anuncios → Landings):
   - visitantes
   - opt-ins
   - **conversión de la landing** (opt-ins / visitantes)
   - calificados y % de calificados
   - calificados por visitante
   - entraron al grupo de WhatsApp
   - el gráfico de conversión por día

   La comparación que importa es d1 vs d3 en **conversión** y en **calificados por visitante**: d3 puede convertir más por no tener video, pero traer gente menos calificada.

5. **Que la ficha del lead muestre la versión.** En el detalle del lead, junto al origen, mostrá «Landing: d1» / «Landing: d3» (el campo `ab` que ya se guarda), con el nombre de `VERSION_NOMBRE`.

## Cómo verificarlo

- Corré los tests que hay (`app/test/flujo.test.js`) y sumá un caso: visitas y leads con `ab` = `d1`, `d3` y `a2`.
  - El `test.ganador` sale solo de d1/d3.
  - `d3` aparece aunque tenga 0.
  - `a2` queda en «Versiones anteriores».
- Mirá la pestaña Landings en modo demo con datos de ejemplo de d1 y d3, en desktop y en celular.
- No cambies cómo se guardan las visitas ni el endpoint de opt-in: la landing ya está publicada y mandando datos.

Cuando termines, decime qué archivos tocaste y mostrame cómo se ve la comparación d1 vs d3.
