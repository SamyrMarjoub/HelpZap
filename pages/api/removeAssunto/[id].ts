import knex from '../dbChat'

export default async function deleteMsg(req, res) {
    const id = req.query.id
    try {
        const result = await knex.raw(
            `DELETE FROM lh_abstract_subject_chat WHERE chat_id = ? and subject_id = ?`,
            [id, req.body.subject_id]
        ); res.json(result[0]);
    } catch (error) {
        res.send(error);
    }
}
