import connection from '../db'

export default async function deleteMsg(req, res) {
    const id = req.query.id
    console.log(id)
    await connection.connect((err) => {
       if (err) throw err;
      //  console.log('Connected to MySQL database!');
       connection.query(`DELETE FROM msgs WHERE id = ?`, [id],  (err, result) =>{
         if(err){
           console.log(err)
         }else{
         //   console.log(result)
           res.json(result)
         }
       })
     });
 
 }
 

// connection.query("DELETE FROM msgs WHERE id === (?)", id)