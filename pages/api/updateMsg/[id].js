import connection from '../db'

export default async function updateMsg(req, res) {
    const id = req.query.id
    await connection.connect((err) => {
       if (err) throw err;
      // ;
       connection.query(`UPDATE msgs SET msg = ?, titulo = ? WHERE id = ?;`, [req.body.msg, req.body.titulo, id],  (err, result) =>{
         if(err){
           console.log(err)
         }else{
         //  
           res.json(result)
         }
       })
     });
 
 }
