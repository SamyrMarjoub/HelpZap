import knex from '../db'

export default async function updateMsg(req, res) {
  const id = req.query.id
  try {
    const result = await knex.raw(
      `UPDATE msgs SET msg = ?, titulo = ? WHERE id = ?`,
      [req.body.msg, req.body.titulo, id]
    ); res.json(result[0]);
    // console.log(result[0])
  } catch (error) {
    res.send(error);
  }
}
