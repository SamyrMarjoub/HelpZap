import knex from '../dbChat'

export default async function getData(req, res) {
    const id = req.query.id
    try {
        const result = await knex.raw(`SELECT a.subject_id, b.name FROM lh_abstract_subject_chat a, lh_abstract_subject b WHERE a.subject_id = b.id and chat_id = ${id}`);
        res.json(result[0]);
        // console.log(result[0])
    } catch (error) {
        res.send(error);
    }

}
