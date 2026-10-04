// Motor de los formularios públicos: una pregunta por pantalla.
// Cada página define sus pasos y qué hacer al terminar:
//
//   Formulario({
//     pasos: [ { clave, tipo: "tel"|"texto"|"largo"|"opciones", titulo, ayuda, opciones, otro, placeholder } ],
//     enviar: async (respuestas) => { ... }   // muestra la pantalla final
//   });
//
// Las opciones se eligen con un toque (avanza solo) o con las teclas A, B, C…
// Los campos de texto avanzan con Enter. Se puede volver atrás.

(function () {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => { const d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; };
  const LETRAS = "ABCDEFGHIJ";
  const icCheck = '<svg class="ic" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>';
  const icFlecha = '<svg class="ic" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const icAtras = '<svg class="ic" viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';

  window.Formulario = function ({ pasos, enviar }) {
    const r = {};          // respuestas
    const otros = {};      // texto del "Otro" por clave
    let i = 0, direccion = 1, enviando = false;

    function progreso() {
      $("#progreso").style.width = Math.round((i / pasos.length) * 100) + "%";
      $("#pasoN").textContent = i < pasos.length ? `${i + 1} de ${pasos.length}` : "";
    }

    function pintar() {
      progreso();
      const p = pasos[i];
      const main = $("#main");
      let h = `<div class="pantalla ${direccion < 0 ? "atras" : ""}">`;
      if (i > 0) h += `<button class="volver" id="volver">${icAtras}Anterior</button>`;
      h += `<h2 id="tit">${esc(p.titulo)}</h2>`;
      if (p.ayuda) h += `<p class="ayuda">${esc(p.ayuda)}</p>`; else h += `<div style="height:18px"></div>`;

      if (p.tipo === "opciones") {
        h += `<div class="opciones" role="radiogroup" aria-labelledby="tit">`;
        p.opciones.forEach((o, k) => {
          const on = r[p.clave] === o;
          h += `<button class="op ${on ? "on" : ""}" role="radio" aria-checked="${on}" data-v="${esc(o)}"><span class="tecla">${LETRAS[k]}</span><span>${esc(o)}</span><span class="chk">${icCheck}</span></button>`;
        });
        if (p.otro) {
          const on = r[p.clave] === "Otro";
          h += `<button class="op ${on ? "on" : ""}" role="radio" aria-checked="${on}" data-v="Otro"><span class="tecla">${LETRAS[p.opciones.length]}</span><span>Otro</span><span class="chk">${icCheck}</span></button>`;
          h += `</div><div class="otro ${on ? "on" : ""}" id="otroBox"><input class="campo-txt" id="otroTxt" placeholder="Contanos con tus palabras" value="${esc(otros[p.clave] || "")}"></div>`;
          h += `<div class="acciones" id="accOtro" style="${on ? "" : "display:none"}"><button class="btn" id="seguir">Siguiente${icFlecha}</button></div>`;
        } else {
          h += `</div>`;
        }
      } else {
        const tipo = p.tipo === "tel" ? 'type="tel" inputmode="tel" autocomplete="tel"' : 'type="text"';
        h += p.tipo === "largo"
          ? `<textarea class="campo-txt" id="campo" placeholder="${esc(p.placeholder || "Escribí acá…")}">${esc(r[p.clave] || "")}</textarea>`
          : `<input class="campo-txt" id="campo" ${tipo} placeholder="${esc(p.placeholder || "")}" value="${esc(r[p.clave] || "")}" ${p.tipo === "texto" ? 'autocomplete="given-name"' : ""}>`;
        h += `<div class="acciones"><button class="btn" id="seguir">${i === pasos.length - 1 ? "Enviar" : "Siguiente"}${icFlecha}</button>
              <span class="pista-tecla">o tocá <b>${p.tipo === "largo" ? "Ctrl + Enter" : "Enter ↵"}</b></span></div>`;
      }
      h += `<div class="error" id="error" role="alert"></div></div>`;
      main.innerHTML = h;

      if ($("#volver")) $("#volver").onclick = atras;
      if (p.tipo === "opciones") {
        main.querySelectorAll(".op").forEach((b) => (b.onclick = () => elegir(b.dataset.v)));
        if ($("#seguir")) $("#seguir").onclick = seguirOtro;
        if ($("#otroTxt")) $("#otroTxt").addEventListener("keydown", (e) => { if (e.key === "Enter") seguirOtro(); });
      } else {
        $("#seguir").onclick = seguirTexto;
        const c = $("#campo");
        c.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && (p.tipo !== "largo" || e.ctrlKey || e.metaKey)) { e.preventDefault(); seguirTexto(); }
        });
        setTimeout(() => c.focus(), 60);
      }
    }

    function error(t) { $("#error").textContent = t; }

    function elegir(v) {
      const p = pasos[i];
      r[p.clave] = v;
      if (v === "Otro") {
        pintar();
        setTimeout(() => $("#otroTxt") && $("#otroTxt").focus(), 60);
        return;
      }
      // Marca la opción y avanza solo, con una pausa corta para que se vea la elección.
      document.querySelectorAll(".op").forEach((b) => { const on = b.dataset.v === v; b.classList.toggle("on", on); b.setAttribute("aria-checked", on); });
      setTimeout(avanzar, 260);
    }

    function seguirOtro() {
      const p = pasos[i];
      const t = ($("#otroTxt").value || "").trim();
      if (!t) return error("Contanos cuál es, así lo tenemos en cuenta.");
      otros[p.clave] = t;
      avanzar();
    }

    function seguirTexto() {
      const p = pasos[i];
      const v = ($("#campo").value || "").trim();
      if (p.tipo === "tel") {
        const dig = v.replace(/\D/g, "");
        if (dig.length < 8) return error("Revisá el número: tiene que incluir el código de país (por ejemplo +54 9 11 2345 6789).");
      } else if (!v) {
        return error(p.tipo === "largo" ? "Contanos aunque sea en una línea." : "Completá este dato para seguir.");
      } else if (p.tipo === "texto" && v.length < 2) {
        return error("Escribí tu nombre.");
      }
      r[p.clave] = v;
      avanzar();
    }

    function avanzar() {
      if (i < pasos.length - 1) { i++; direccion = 1; pintar(); window.scrollTo({ top: 0 }); return; }
      terminar();
    }
    function atras() { if (i > 0) { i--; direccion = -1; pintar(); } }

    async function terminar() {
      if (enviando) return;
      enviando = true;
      // Arma las respuestas finales: "Otro" se guarda con el texto escrito.
      const final = {};
      for (const p of pasos) {
        const v = r[p.clave];
        final[p.clave] = v === "Otro" ? "Otro: " + (otros[p.clave] || "") : v;
      }
      $("#progreso").style.width = "100%";
      $("#pasoN").textContent = "";
      $("#main").innerHTML = `<div class="pantalla cargando"><div class="spinner"></div><span>Un segundo…</span></div>`;
      try {
        await enviar(final, reiniciar);
      } catch (e) {
        enviando = false;
        i = pasos.length - 1; pintar();
        error(e.message || "No se pudo enviar. Probá de nuevo.");
      }
    }

    // Vuelve al principio conservando las respuestas (para el "volver a completar").
    function reiniciar(desdeClave) {
      enviando = false;
      const k = pasos.findIndex((p) => p.clave === desdeClave);
      i = k >= 0 ? k : 0; direccion = -1;
      pintar();
    }

    // Teclas A, B, C… para elegir opciones.
    document.addEventListener("keydown", (e) => {
      if (enviando || i >= pasos.length) return;
      const p = pasos[i];
      if (!p || p.tipo !== "opciones") return;
      if (/input|textarea/i.test((document.activeElement || {}).tagName || "")) return;
      const k = LETRAS.indexOf(e.key.toUpperCase());
      const lista = p.otro ? [...p.opciones, "Otro"] : p.opciones;
      if (k >= 0 && k < lista.length) { e.preventDefault(); elegir(lista[k]); }
    });

    pintar();
  };

  window.Formulario.esc = esc;
})();
