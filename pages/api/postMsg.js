import connection from './db'

export default async function postMsg(req, res) {
   await connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL database!');
      connection.query(`insert into msgs (msg, titulo, id_usuario_criacao) values (?,?,?)`, [req.body.msg, req.body.titulo, req.body.userId],  (err, result) =>{
        if(err){
          console.log(err)
        }else{
        //   console.log(result)
          res.json(result)
        }
      })
    });

}
