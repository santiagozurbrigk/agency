# El criterio de base: cortes, planos y zoom

> Esto es lo que trae la skill para todos. Sirve para editar desde el día uno, pero no es tu
> estilo: lo que escribas en `estilo.md` le gana a esto. Si una regla de acá no te sirve,
> escribí en `estilo.md` la tuya y listo.

## La regla madre: cada corte tiene un porqué

Nada se pone porque "toca". Ni un corte cada tantos segundos, ni un zoom cada tanto. Cada cambio
de plano y cada zoom tiene que poder contestar **por qué va acá y no medio segundo antes**. Por
eso en `edicion.json` cada plano y cada zoom lleva su campo `"por"`: si no se puede escribir el
porqué, no va.

De dónde sale: Walter Murch (el editor de *Apocalypse Now*) ordena los motivos para cortar y pone
arriba de todo la emoción y la historia; el ritmo y la regla técnica van abajo. Y lo que se midió
en videos cortos va para el mismo lado: cortar más rápido no retiene más, retiene el corte que
tiene motivo.

## 1. Los cortes: qué se saca

- **Los silencios.** Todo hueco más largo que `cortes.silencioMax` se corta. El script lo hace
  solo (`proponer-cortes.mjs`).
- **Las tomas repetidas.** Cuando la frase se dice dos o tres veces, queda la ÚLTIMA dicha
  entera, que casi siempre es la buena. Se detecta leyendo el texto de los tramos: dos tramos
  seguidos que arrancan igual son la misma frase repetida.
- **Las muletillas sueltas** ("eh", "este", un "bueno" que no lleva a nada) cuando están solas
  entre dos pausas.
- **Lo que no se saca:** la respiración antes de una frase importante y la pausa después de un
  número. Esa pausa es la que deja que el número se lea.
- Un corte nunca parte una palabra. Por eso existe el aire antes y después.

## 2. Los planos: qué lleva la información en cada frase

El plano lo decide **qué está cargando la información en esa frase**: tu cara o lo que mostrás.

| Qué hace la frase | Plano | Zoom |
|---|---|---|
| **Hook** (los primeros 1-3 s) | Mitad y mitad, o cámara con texto encima. Siempre algo visual además de la cara antes del primer segundo | — |
| **Muestra** (una demo, la pantalla, algo moviéndose, el nombre de la herramienta) | Lo que mostrás en pantalla completa (`broll`) | Nunca |
| **Prueba** (un número, "es gratis", un resultado) | Mitad y mitad, con la prueba arriba | Nunca |
| **Dolor o pregunta** al que mira | Mitad y mitad | — |
| **Giro o veredicto** ("pero", "el problema es", "por eso") | Cámara sola | Desde la primera palabra hasta el final de la frase |
| **CTA** | Cámara sola con la palabra clave grande | Sin zoom |

- **El plano cambia donde cambia la función de la frase**, nunca a mitad de una idea.
- Si no tenés material para mostrar arriba, no hay mitad y mitad: queda cámara, y el énfasis lo
  hace el zoom.
- Si un plano de `broll` dura mucho más que lo que se tarda en entender lo que se ve, volvé a
  la cara: la cara es lo que sostiene la atención entre muestra y muestra.

## 3. El zoom: solo donde hay algo que subrayar

- El zoom subraya una frase. Va en el giro, en el veredicto, en lo que querés que se lleve
  grabado. **Nunca arranca en un conector** ("y", "que", "entonces"): arranca en la palabra
  que importa.
- Se sostiene hasta el final de la frase y se suelta en el corte siguiente. Un zoom que entra y
  sale en medio segundo se ve como un error.
- Es seco (de un cuadro al otro), no una animación lenta.
- Cuánto: entre 10% y 20% (`zoom.cuanto` 1.10 a 1.20). Menos que eso no se nota; más, se pierde
  el encuadre.
- Nunca dos zooms seguidos sin una frase en el medio.

## 4. El hook

- En el primer segundo tiene que haber **algo visual además de tu cara**: un texto, un logo, un
  número, lo que muestra el video. La cara sola en el arranque es el hook más fácil de pasar.
- El texto del hook dice lo mismo que vos, más corto. No lo complementa: lo repite.
- El hook se va cuando cambia el primer plano o a los 3 segundos, lo que pase primero.

## 5. Los subtítulos

- Pocas palabras por línea (2 a 4). La palabra que se está diciendo, resaltada.
- En mitad y mitad van en la costura del medio; con la cámara sola, abajo de la cara, nunca
  encima de la boca.
- **Se revisan a mano siempre.** La transcripción se equivoca en los nombres propios, las marcas
  y los números. Antes de entregar, se leen todos y se corrigen en `palabras.json`.
- En el CTA se apagan los subtítulos: la palabra clave grande los reemplaza.

## 6. Lo que se verifica antes de entregar

1. La foto del segundo 0,3: ¿hay algo además de la cara?
2. Una foto en cada cambio de plano: ¿se lee lo de arriba?, ¿la cara está entera abajo?
3. Una foto en cada zoom: ¿la cara queda adentro?
4. Los subtítulos leídos de punta a punta: nombres, marcas y números bien escritos.
5. La duración total, y si se cortó una frase a la mitad.
