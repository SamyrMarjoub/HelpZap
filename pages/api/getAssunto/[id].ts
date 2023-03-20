import connection from '../dbChat'

export default async function getData(req, res) {
    const id = req.query.id
    await connection.connect((err) => {
        if (err) throw err;

        connection.query(`SELECT a.subject_id, b.name FROM lh_abstract_subject_chat a, lh_abstract_subject b WHERE a.subject_id = b.id and chat_id = ${id}`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                //
                res.json(result)
            }
        })
    });

}
