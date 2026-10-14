// Link de redirección del test A/B de headline: https://TU-DOMINIO/clase
// Manda a cada persona a /a o a /b (50 y 50) y le deja una cookie para que, si vuelve
// a tocar el link, caiga siempre en la misma versión. Conserva los parámetros del
// anuncio (utm_*, fbclid…) para que el tracking no se pierda.
module.exports = function handler(req, res) {
  const m = (req.headers.cookie || "").match(/(?:^|;\s*)optin_ab=([AB])/);
  const version = m ? m[1] : (Math.random() < 0.5 ? "A" : "B");
  const url = req.url || "";
  const query = url.indexOf("?") > -1 ? url.slice(url.indexOf("?")) : "";
  res.setHeader("Set-Cookie", `optin_ab=${version}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`);
  res.setHeader("Cache-Control", "no-store");
  res.statusCode = 302;
  res.setHeader("Location", "/" + version.toLowerCase() + query);
  res.end();
};
