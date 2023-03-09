import connection from '../db'

export default async function getData(req, res) {
  const id = req.query.id 
  await connection.connect((err) => {
      if (err) throw err;
      // console.log('Connected to MySQL database!');
      connection.query(`select * from msgs where id_usuario_criacao = ?`, [id], (err, result) =>{
        if(err){
          console.log(err)
        }else{
          // console.log(result)
          res.json(result)
        }
      })
    });

}
