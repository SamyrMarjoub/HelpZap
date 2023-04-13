import knex from '../db'

export default async function getData(req, res) {

  const id = req.query.id
  try {
    const result = await knex.raw(`select * from msgs where id_usuario_criacao = ?`, [id]);
    res.json(result[0]);
    // console.log(result[0])
  } catch (error) {
    res.send(error);
  }
}
