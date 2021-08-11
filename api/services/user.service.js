const db = require('../models')
const ErrorResponse = require('../utils/errorResponse');
const { Op } = db.Sequelize

async function getAllUsersService(body) {
  const { email, password } = body;
  const { count, rows } = await db.user.findAndCountAll({
    where: {
      email: {
        [Op.like]: 'Live%'
      }
    },
    offset: 10,
    limit: 2
  });
  console.log(count);
  console.log(rows);
}





module.exports = {
  getAllUsersService
}
