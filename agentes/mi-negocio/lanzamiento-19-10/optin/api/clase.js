// Link de redirección del test de 3 versiones de la landing: https://TU-DOMINIO/clase
// Manda a cada persona a /1, /2 o /3 en partes iguales y le deja una cookie para que, si
// vuelve a tocar el link, caiga siempre en la misma versión. Conserva los parámetros del
// anuncio (utm_*, fbclid…) para que el tracking no se pierda.
//   1 = video y el formulario abajo · 2 = formulario arriba del video · 3 = formulario sin video
const VERSIONES = ["1", "2", "3"];

module.exports = function handler(req, res) {
  const m = (req.headers.cookie || "").match(/(?:^|;\s*)optin_v=([123])/);
  const version = m ? m[1] : VERSIONES[Math.floor(Math.random() * VERSIONES.length)];
  const url = req.url || "";
  const query = url.indexOf("?") > -1 ? url.slice(url.indexOf("?")) : "";
  res.setHeader("Set-Cookie", `optin_v=${version}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`);
  res.setHeader("Cache-Control", "no-store");
  res.statusCode = 302;
  res.setHeader("Location", "/" + version + query);
  res.end();
};
