import connection from './db'

export default async function getData(req, res) {
  const id = req.query.id 
  await connection.connect((err) => {
      if (err) throw err;
      //;
      connection.query(`select * from msgs where id_usuario_criacao = ?`, [id], (err, result) =>{
        if(err){
          console.log(err)
        }else{
          //
          res.json(result)
        }
      })
    });

}
