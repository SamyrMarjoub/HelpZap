import knex from './db'

export default async function getEmail(req, res) {
  const id = req.query.id
  try {
    const result = await knex.raw(`select * from emailconfig`);
    res.json(result[0]);
    // console.log(result[0])
  } catch (error) {
    res.send(error);
  }
}
