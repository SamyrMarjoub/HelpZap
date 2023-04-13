import knex from './db'

export default async function postMsg(req, res) {
  try {
    const result = await knex.raw(
      `insert into msgs (msg, titulo, id_usuario_criacao) values (?,?,?)`,
      [req.body.msg, req.body.titulo, req.body.userId]
    ); res.json(result[0]);
    // console.log(result[0])
  } catch (error) {
    res.send(error);
  }
}
