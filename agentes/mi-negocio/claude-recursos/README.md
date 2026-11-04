# Proyecto de Claude — Recursos personalizados Génesis

Un proyecto de claude.ai para que los closers (y los SDR) armen, en un par de minutos, **el recurso personalizado de cada lead**: un PDF de 4 páginas con la marca de Génesis, sus palabras, su cuenta y el SOP de la Skool de Manu que ataca su problema.

Es la **pieza 2** del proceso de ventas ("recurso sobre su problema"), la que el SDR promete en la primera llamada.

## Qué hay en esta carpeta

| Archivo | Qué es | Dónde va en claude.ai |
| --- | --- | --- |
| `01-instrucciones-del-proyecto.md` | El cerebro: cómo trabaja Claude y las reglas que no rompe | Se pega en **Instrucciones del proyecto** |
| `conocimiento/genesis-contexto.md` | Método, caso de Manu, cuenta canónica, avatar y voz | Se sube al **Conocimiento** |
| `conocimiento/guia-de-estilo-recursos.md` | Estructura, escritura y diseño de cada recurso | Se sube al **Conocimiento** |
| `conocimiento/plantilla-recurso.html` | La plantilla con los estilos de la marca (negro, hueso, naranja, Inter Tight / Inter, símbolo) | Se sube al **Conocimiento** |
| `conocimiento/ejemplo-recurso-cpa.html` | Un recurso terminado para un lead ficticio, como referencia | Se sube al **Conocimiento** |
| `conocimiento/ficha-del-lead.md` | Lo que el closer completa para cada lead | Se sube al **Conocimiento** (y los closers la tienen a mano) |
| `conocimiento/skool-indice.md` | Qué SOP de la Skool va para cada problema | Se sube al **Conocimiento** |
| `skool-*.md` / `.pdf` | **El contenido de la Skool de Manu** (falta cargarlo) | Se sube al **Conocimiento** |

## Armarlo (una sola vez, 20 minutos)

1. **Juntá la Skool.** Por cada SOP o clase de la Skool de Manu, un archivo `skool-[tema].md` (o PDF). Seguí los pasos de `skool-indice.md` y completá las dos tablas. **Sin esto, Claude no arma recursos**: está instruido para no inventar pasos.
2. En **claude.ai → Proyectos → Crear proyecto**. Nombre: `Génesis · Recursos personalizados`.
3. En **Instrucciones del proyecto**, pegá todo lo que está debajo de la línea en `01-instrucciones-del-proyecto.md`.
4. En **Conocimiento del proyecto**, subí todos los archivos de `conocimiento/` y los `skool-*`.
5. **Probalo** con un lead de prueba (ver abajo) antes de dárselo al equipo.
6. **Compartilo con los closers.** Con plan Team o Enterprise de Claude, el proyecto se comparte con los miembros de la organización desde **Compartir** (dales permiso de uso, no de edición, así nadie cambia las instrucciones). Con plan Pro o Max no se puede compartir: cada closer crea el proyecto en su cuenta con estos mismos archivos.

## Cómo lo usa el closer (por cada lead)

1. Abre un **chat nuevo dentro del proyecto** (un chat por lead).
2. Pega la ficha de `ficha-del-lead.md` completa con lo que tiene: respuestas del formulario de agenda, notas del SDR y números si los hay.
3. Claude le dice qué SOP va a usar, arma el recurso como **artefacto** y le da el mensaje de WhatsApp para mandarlo.
4. Si quiere cambios, los pide en el mismo chat.
5. **Descarga** el artefacto, lo abre en Chrome → **Imprimir** → **Guardar como PDF** (A4, márgenes "Ninguno", "Gráficos de fondo" activado).
6. Lo manda por el grupo de WhatsApp con el mensaje que le dio Claude.

**Prueba rápida:** pegá esto en un chat del proyecto y fijate que el resultado se parezca a `ejemplo-recurso-cpa.html`.

```
Nombre: Gonzalo · Marca: Química Norte · Vende: limpiador multiuso concentrado, Tiendanube · Factura 60M/mes
Objetivo: Poder pagar más por cada cliente y seguir siendo rentable
Lo que lo frena: El CPA me sube todos los meses
Hace cuánto y qué probó: hace como 8 meses que vengo así. cambiamos creativos todas las semanas, armamos un combo mas barato y contratamos una agencia 3 meses. nada movio la aguja
Números: margen 30.000 por pedido, CPA pasó de 18.000 a 29.000
Llamada: con Martín, jueves 15 a las 18 h
```

## Qué cuida el proyecto (para que nadie lo rompa)

- Solo usa la Skool, el contexto de Génesis y los datos del lead. **No inventa números, casos ni testimonios.**
- Muestra el qué y el por qué con una acción para esta semana; **el plan completo queda para la llamada** (la auditoría es el primer entregable pago).
- **Nada de venta en el documento:** sin precio, cuotas, cupos, garantía ni Mentoría.
- La voz de Manu y la lista de palabras prohibidas.

## Mantenimiento

- **Cambia la Skool** → actualizás el `skool-*` y el índice, y lo volvés a subir.
- **Cambia la marca** (el naranja exacto está pendiente) → se cambia `--naranja` en `plantilla-recurso.html` y en el ejemplo, y se vuelven a subir.
- **Cambia el contexto** (`CONTEXTO.md`, `marca-personal.md`) → se actualiza `genesis-contexto.md`.
