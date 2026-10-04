const { sesion } = require("../lib/auth");
const store = require("../lib/store");

module.exports = async function handler(req, res) {
  const s = sesion(req);
  if (!s) return res.status(200).json({ ok: true, user: null, demo: store.DEMO });
  const settings = await store.getSettings();
  return res.status(200).json({ ok: true, user: s, demo: store.DEMO, settings });
};
