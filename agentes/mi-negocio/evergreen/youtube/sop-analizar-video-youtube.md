# SOP · Cómo analizar un video de YouTube

Para qué sirve: desarmar un video de referencia (de un competidor, de un outlier o de Manu) y sacar qué se puede usar en los videos de Génesis. No es un resumen del video. La idea es entender **por qué funciona** y **qué parte de eso se puede copiar** con el avatar y el mecanismo de Manu.

Se usa junto con [`funnel-youtube.md`](funnel-youtube.md) (biblioteca de videos, patrones de packaging ya detectados) y con `CONTEXTO.md` (avatar, dolores, método B.A.S.E.).

**Regla de oro:** de una referencia se toma la **estructura**, no el tema. Cada cosa que se anota tiene que terminar en «esto en Manu sería…».

---

## 0. Antes de empezar: elegir bien qué analizar

No se analiza cualquier video. Se analiza uno que **rindió más que lo normal en su canal**.

- **Índice de outlier** = vistas del video ÷ promedio de vistas de los últimos 10-15 videos del canal.
  - Menos de 2x: video normal. No vale la pena desarmarlo salvo que el tema sea exacto.
  - De 2x a 5x: bueno. Se analiza.
  - Más de 5x: outlier. Prioridad. Algo del packaging o del tema le pegó al avatar.
- **Vistas ÷ suscriptores** del canal: si pasa de 1, el video salió del público propio y lo empujó el algoritmo a gente nueva (sirve para TOF).
- Anotar la **fecha**: un video de hace 3 años con muchas vistas puede ser antigüedad, no packaging.

## 1. Conseguir el material

Hace falta: **link, título, miniatura, transcripción con tiempos, el video (o capturas) y los comentarios.**

| Qué | Cómo |
| --- | --- |
| Título, canal y miniatura | Con el link alcanza. Claude los trae solo (la miniatura en alta calidad: `https://i.ytimg.com/vi/<ID>/maxresdefault.jpg`). |
| Transcripción con tiempos | En YouTube: «…más» debajo del video → «Mostrar transcripción» → copiar y pegar. O desde la computadora: `yt-dlp --skip-download --write-auto-subs --sub-langs es,en <link>`. |
| El video | Subir el `.mp4`, o desde la computadora `yt-dlp <link>`. Si no se puede, capturas de pantalla del minuto 0, 0:30, 1:00 y una por cada sección. |
| Comentarios | Los 20 más votados, copiados. Son la voz del avatar respondiendo al video. |
| Datos del canal | Suscriptores y vistas de los últimos 10-15 videos (para el índice de outlier). |

> Desde el servidor de Claude en la nube YouTube bloquea las descargas («confirmá que no sos un bot»). El título y la miniatura sí salen; la transcripción y el video hay que pasarlos a mano o bajarlos desde la computadora.

## 2. Los 10 bloques del análisis

Se completan en orden. Cada bloque cierra con **«Para Manu:»**: qué se toma y cómo se adapta.

### Bloque 1 · Packaging: título + miniatura

El packaging decide si el video se ve. Se analiza **antes de mirar el video**, como lo vería el avatar en el feed.

**Título**
- Estructura (dejar el esqueleto con huecos): «hago $X/mes. te explico por qué ___ te aleja de ___».
- Tipo de promesa: resultado, confesión, error, secreto, comparación, «en vivo», caso.
- ¿Hay número? ¿Es concreto (275M) o redondo (100M)?
- Persona: primera («hago», «tardé») o segunda («tu marca», «estás»).
- Formato entre paréntesis: «(en vivo)», «(case study)», «(copiame)».
- Curiosidad: ¿qué pregunta abre que solo se cierra mirando?
- Largo (los que rinden suelen estar por debajo de 60 caracteres para que no se corten).

**Miniatura**
- Cuántos elementos tiene (lo ideal: 3 o menos: cara, número, una palabra o una pantalla).
- Qué texto tiene y si **repite** el título (malo) o lo **completa** (bueno).
- Emoción de la cara: seria, sorprendida, señalando. ¿Hacia dónde mira?
- Contraste y color: ¿se lee en el tamaño de un celular? (Probar achicándola a 150 px de ancho.)
- Prueba visual: un tablero, un número tachado, un antes → después.

**El cruce título + miniatura** (lo más importante del bloque):
- ¿Qué dolor del avatar toca? ¿Qué deseo?
- ¿Cuál de las dos piezas lleva el dolor y cuál la promesa?
- Prueba de los 2 segundos: si el avatar ve solo esto, ¿entiende para quién es y qué gana?

### Bloque 2 · El hook (primeros 30 segundos)

Transcribir palabra por palabra los primeros 30 segundos y marcar:
- **Confirmación del click:** ¿repite o cumple la promesa del título en los primeros 5 segundos? (Si no, la gente se va.)
- **Frase gancho:** número, afirmación polémica, resultado, pregunta.
- **Lo que se ve:** cámara, pantalla, b-roll, texto en pantalla.
- **Mini roadmap:** ¿anuncia qué va a mostrar? ¿cuántos puntos?
- **Identificación:** «si tenés una marca que…», a quién deja afuera.
- **Autoridad:** ¿la dice («soy experto») o la muestra (tablero, captura, resultado)?
- **Loop abierto:** qué promete para más adelante («al final te muestro…»).

### Bloque 3 · Estructura y ritmo

Armar el mapa del video con tiempos:

| Tiempo | Sección | Qué pasa | Para qué está (retener, enseñar, probar, vender) |
| --- | --- | --- | --- |
| 0:00-0:30 | Hook | | |
| … | | | |

Después anotar:
- Cuántos **loops** abre y dónde los cierra.
- Dónde están los **re-enganches** (cada 2-3 minutos: «pero acá viene lo importante», un cambio de plano, un número nuevo).
- Dónde caería la gente: secciones largas sin pantalla, sin número o sin historia.
- Duración total y si se justifica.

### Bloque 4 · Cómo habla y los tonos

- **Registro:** de colega a colega, de mentor, de profesor, de amigo que te avisa.
- **Velocidad y pausas:** ¿habla rápido? ¿Usa silencios antes de los números importantes?
- **Energía:** pareja o con picos. ¿En qué momentos sube?
- **Vocabulario:** jerga del nicho que usa sin explicar (señal de que habla con el avatar avanzado) y palabras que explica.
- **Frases propias:** muletillas, latiguillos, frases que repite (son marca).
- **Cómo se posiciona:** de igual a igual, desde arriba, desde «yo estuve ahí».
- **Polaridad:** contra quién o contra qué va (el «enemigo»: los gurús, Meta, el CPA, la agencia).
- **Honestidad:** ¿admite errores, muestra números malos, dice «esto no es para vos si…»?

Copiar 5 a 10 frases textuales que muestren el tono.

### Bloque 5 · Los dolores del avatar

Para cada dolor que toca el video:

| Dolor (cómo lo dice él) | Cómo lo dice el avatar de Génesis | Profundidad (síntoma / problema / consecuencia / identidad) | Cómo lo muestra (historia, número, frase del cliente, pantalla) | Minuto |
| --- | --- | --- | --- | --- |

Preguntas para cada uno:
- ¿Lo nombra con **las palabras del avatar** o con las del experto?
- ¿Llega a la **consecuencia** (lo que le cuesta: plata, tiempo, tranquilidad, la familia) o se queda en el síntoma?
- ¿Muestra el **costo oculto** (lo que el avatar no sabe que está perdiendo)?
- ¿Culpa al avatar o le saca la culpa («no es tu culpa, te enseñaron mal»)?

Cruzarlo con los dolores de Génesis (`funnel-youtube.md`, sección 1): **inestabilidad** (el principal), CPA, margen, metadependencia, competencia y copias, producto que «no sirve para suscripción», estancamiento.

### Bloque 6 · Cómo muestra la solución

- **El paradigma que rompe:** creencia vieja → creencia nueva. Escribirlo en una línea.
- **El mecanismo:** ¿tiene nombre propio? ¿Lo explica con una cuenta, un dibujo, una analogía, un caso?
- **Cuánto muestra:** el qué, el porqué, el cómo. Qué se guarda (lo que se guarda es lo que vende).
- **Lógica:** ¿se puede seguir el razonamiento paso a paso? ¿Usa números del avatar o los suyos?
- **Por qué fallan las otras soluciones:** ¿las nombra? ¿Las desarma con argumento o con burla?
- **El puente a la oferta:** cómo pasa de «esto es lo que hay que hacer» a «esto lo hago con vos».

### Bloque 7 · Cómo aporta valor

- ¿Qué se lleva el que mira aunque no compre? (Una cuenta, un marco, una checklist, una frase.)
- ¿Se puede aplicar **hoy**, con los números propios?
- ¿El valor está en la **información**, en el **marco** (cómo pensar el problema) o en la **prueba** (ver que se puede)?
- Densidad: ¿cuántas ideas útiles por minuto? ¿Hay relleno?

### Bloque 8 · Prueba y autoridad

- Tipo de prueba: resultados propios, de clientes, en vivo, capturas, terceros.
- Cuándo aparece la primera prueba (minuto).
- ¿Es específica (números, nombres, fechas) o genérica («muchos alumnos»)?
- ¿Muestra el antes o solo el después?

### Bloque 9 · Edición

Si el video es «cara a cámara sin edición», se anota eso y se pasa. Si tiene edición:
- **Formato de plano:** cámara completa, pantalla con cámara en la esquina, b-roll, entrevista, en vivo.
- **Ritmo de cortes:** cada cuántos segundos cambia algo en pantalla (contar 1 minuto del medio).
- **Zooms y movimientos:** para qué los usa (marcar una frase, un número).
- **Texto en pantalla:** subtítulos, números grandes, palabras clave, bullets del roadmap.
- **Gráficos y pantallas:** tableros, Miro, calculadora, capturas.
- **Sonido:** música (¿cambia por sección?), efectos en los números o en las transiciones.
- **Color y look:** cálido, frío, oscuro; set, luz, ropa.
- **Qué edición está al servicio de la retención** y cuál es decoración.

Para Manu, separar: lo que se puede hacer con el estilo actual (pantalla compartida con cámara en la esquina) y lo que pide más producción.

### Bloque 10 · CTAs y comentarios

**CTAs**
- Cuántos, en qué minuto, qué piden (suscribirse, otro video, link, WhatsApp, aplicar).
- ¿Hay CTA temprano (al 10% del video)?
- Cómo cierra el video: ¿manda a otro video (efecto maratón)?
- Qué dice la descripción y el comentario fijado.

**Comentarios** (los 20 más votados)
- Qué frases del avatar aparecen (sirven tal cual para hooks y anuncios).
- Qué preguntas dejan (temas de próximos videos).
- Objeciones (material para el banco de objeciones de `ventas/`).
- Qué parte del video citan (lo que más pegó).

## 3. Cierre: qué se lleva Génesis

Terminar siempre con esta tabla. Si no hay al menos 3 filas, el análisis no sirvió.

| Qué tomar | De qué bloque | Cómo queda en Manu | Para qué video (YT-#) o pieza |
| --- | --- | --- | --- |
| | | | |

Y además:
- **Título modelado para Manu:** 3 versiones.
- **Miniatura modelada para Manu:** descripción en 1 línea (máximo 3 elementos).
- **Hook modelado para Manu:** los primeros 15 segundos, palabra por palabra.
- **Qué NO copiar:** lo que funciona por ser de esa persona o ese nicho, y lo que choca con las reglas de Génesis (no spoilear la clase, no prometer auditoría gratis, no inventar números ni marcas).

Si el packaging es nuevo, sumarlo a «Patrones de las referencias» en [`funnel-youtube.md`](funnel-youtube.md).

## 4. Dónde se guarda

`mi-negocio/evergreen/youtube/analisis/AAAA-MM-DD-<canal>-<tema-corto>.md`, con la miniatura al lado (`.jpg` con el mismo nombre). Arriba de todo: link, canal, fecha, vistas, suscriptores, índice de outlier y duración.

## 5. Checklist rápido

- [ ] El video es outlier en su canal (2x o más), o el tema es exacto.
- [ ] Título y miniatura analizados antes de mirar el video.
- [ ] Primeros 30 segundos transcriptos palabra por palabra.
- [ ] Mapa de estructura con tiempos.
- [ ] 5 a 10 frases textuales del tono.
- [ ] Cada dolor cruzado con un dolor de Génesis.
- [ ] Creencia vieja → nueva en una línea.
- [ ] Edición: ritmo de cortes contado en 1 minuto.
- [ ] 20 comentarios leídos, frases del avatar copiadas.
- [ ] Tabla final con 3 filas o más, título, miniatura y hook modelados para Manu.
