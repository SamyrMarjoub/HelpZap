import connection from '../db'

export default async function deleteMsg(req, res) {
    const id = req.query.id
   
    await connection.connect((err) => {
       if (err) throw err;
      // ;
       connection.query(`DELETE FROM msgs WHERE id = ?`, [id],  (err, result) =>{
         if(err){
           console.log(err)
         }else{
         //  
           res.json(result)
         }
       })
     });
 
 }
 

