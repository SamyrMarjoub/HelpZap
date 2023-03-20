import connection from '../dbChat'

export default async function getData(req, res) {
    await connection.connect((err) => {
        if (err) throw err;
        connection.query(`SELECT * FROM lh_abstract_subject_chat WHERE subject_id = ${req.query.subject_id} AND chat_id = ${req.query.id}`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                //
                res.json(result)
            }
        })
    });

}
