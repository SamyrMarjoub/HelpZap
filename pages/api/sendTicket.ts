import knex from './db'

export default async function postMsg(req, res) {
  try {
    const result = await knex.raw(
      `insert into tickets (nome, email, text) values (?,?,?)`,
      [req.body.name, req.body.email, req.body.text]
    ); res.json(result[0]);
    // console.log(result[0])
  } catch (error) {
    res.send(error);
  }
}
