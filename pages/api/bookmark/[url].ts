export default async function handle(req, res) {
  const URL = req.query.url
  res.json({ message: URL })
}
