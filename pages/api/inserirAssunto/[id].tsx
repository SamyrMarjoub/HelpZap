import connection from '../dbChat'

export default async function postMsg(req, res) {
  try {
    const chat_id = req.query.id
    // const subject_id
    await connection.connect((err) => {
      if (err) throw err;
      //;
      connection.query(`insert into lh_abstract_subject_chat (subject_id, chat_id) values (?,?)`, [req.body.subject_id, chat_id], (err, result) => {
        if (err) {
          console.log(err)
        } else {
          //  
          res.json(result)
        }
      })
    });
  } catch (error) {
    res.status("500").send("Internal server error")
  }


}
