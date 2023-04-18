import knex from './db'

export default async function getData(req, res) {

  try {
    const result = await knex.raw(`select * from tickets`);
    res.json(result[0]);
    // console.log(result[0])
  } catch (error) {
    res.send(error);
  }
}
