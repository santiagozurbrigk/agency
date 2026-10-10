// De qué fuente viene una visita o un registro, a partir de los parámetros del link
// (UTMs y fbclid que guarda la landing). Se usa para visitas y registros por igual.

function fuenteDe(t) {
  t = t || {};
  const src = String(t.utm_source || "").toLowerCase();
  const med = String(t.utm_medium || "").toLowerCase();
  if (src === "instagram" && med === "bio") return "Instagram · bio";
  if (src === "facebook" || t.fbclid || t.ad_id) return "Anuncios de Meta";
  if (src) return src.charAt(0).toUpperCase() + src.slice(1) + (med ? ` · ${med}` : "");
  return "Directo / sin UTM";
}

module.exports = { fuenteDe };
