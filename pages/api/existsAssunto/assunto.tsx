import knex from '../dbChat'

export default async function getData(req, res) {
    try {
        const result = await knex.raw(`SELECT * FROM lh_abstract_subject_chat WHERE subject_id = ${req.query.subject_id} AND chat_id = ${req.query.id}`);
        res.json(result[0]);

    } catch (error) {
        res.send(error);
    }
}
