import knex from '../dbChat'

export default async function postMsg(req, res) {
  const chat_id = req.query.id
  try {
    const result = await knex.raw(
      `insert into lh_abstract_subject_chat (subject_id, chat_id) values (?,?)`,
      [req.body.subject_id, chat_id]
    ); res.json(result[0]);
    // console.log(result[0])
  } catch (error) {
    res.send(error);
  }

}
