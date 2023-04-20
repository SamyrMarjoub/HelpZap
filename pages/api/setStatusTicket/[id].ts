import knex from '../db'

export default async function setStatusTicket(req, res) {
  const status = req.body.status
// console.log(req.query.id, status)
    const id = req.query.id
  try {
    const result = await knex.raw(
      `UPDATE tickets SET status = ? WHERE id = ?`,
      [status, id]
    ); res.json(result[0]);
    // console.log(result[0])
  } catch (error) {
    res.send(error);
  }
}
