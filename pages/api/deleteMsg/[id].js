import knex from '../db'

export default async function deleteMsg(req, res) {
  const id = req.query.id
  try {
    const result = await knex.raw(
      `DELETE FROM msgs WHERE id = ?`,
      [id]
    ); res.json(result[0]);
  } catch (error) {
    res.send(error);
  }
}


