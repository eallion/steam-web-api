export default async function handler(req, res) {
  try {
    const url = `https://steam-web-api.pages.dev/IPlayerService/GetOwnedGames/v0001/?${req.url.split('?')[1]}`;
    const response = await fetch(url);
    const data = await response.text();

    if (!response.ok) {
      return res.status(response.status).send(data);
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
