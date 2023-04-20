import knex from '../db'

export default async function updateEmail(req, res) {
    const id = req.query.id
//    console.log(req.query.id)
    try {
        const result = await knex.raw(
            `UPDATE emailconfig SET text = ?, emailpadrao = ? WHERE type = ?`,
            [req.body.text, req.body.email, id]
        ); res.json(result[0]);
        
    } catch (error) {
        res.send(error);
    }
}
