import connection from '../dbChat'

export default async function deleteMsg(req, res) {
    const id = req.query.id
    await connection.connect((err) => {
        if (err) throw err;

        connection.query(`DELETE FROM lh_abstract_subject_chat WHERE chat_id = ? and subject_id = ?`, [id, req.body.subject_id], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                //  
                res.json(result)
            }
        })
    });

}


// connection.query("DELETE FROM msgs WHERE id === (?)", id)