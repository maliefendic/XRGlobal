const db = require('../models')
const _ = require("lodash");
const ErrorResponse = require('../utils/errorResponse');
const { Op } = db.Sequelize

async function getAllUsersService(params) {

  const { pageSize, page, orderBy, orderType, search, select } = params;
  const { limit, offset } = getPagination(page, pageSize)
  const userFilters = searchInModels(db.user, ["firstName", "lastName", "email"], search, "user");
  //const organizationFilters = searchInModels(db.organization, ["businessName"], search, "organization")
  const organizationFilters = multipleSelectInModels(db.organization, select, "organization")
  console.log(userFilters)
  const data = await db.user.findAndCountAll({
    where: {
      [Op.or]: { ...userFilters },
      [Op.and]: { ...organizationFilters }
    },
    include: [{
      model: db.organization
    }],
    offset,
    limit,
    order: [[orderBy, orderType]],
  });

  return getPagingData(data, page, limit)

}
async function getAllUserService(params) {

  const { id } = params;
  const data = await db.user.findOne({
    where: {
      id
    },
    include: [{ model: db.organization }]
  })

  return data

}

async function deleteUserService(params) {

  const { id } = params;
  const data = await db.user.findByPk(id)
  await data.destroy();
  return "Deleted"

}

async function createUserService(params) {
  const { lastName, firstName, email, password, roleId, organizationId } = body;
  const data = await db.user.create({ firstName, lastName, email, password, roleId, organizationId })
  return data
}



function searchInModels(model, searchAttributes, searchBy = "", alias) {
  const value = { [Op.iLike]: "%" + searchBy + "%" };
  const fields = Object.keys(
    _.pick(model.rawAttributes, searchAttributes)
  );
  const filters = {};
  fields.forEach((item) => (filters["$" + alias + "." + item + "$"] = value));
  return filters;
}
function multipleSearchInModels(model, searchAttributes, alias) {
  const keySearchAttributes = Object.keys(searchAttributes)
  //const value = { [Op.iLike]: "%" + search + "%" };
  const fields = Object.keys(
    _.pick(model.rawAttributes, keySearchAttributes)
  );
  const filters = {};
  fields.forEach((item) => (filters["$" + alias + "." + item + "$"] = { [Op.iLike]: "%" + searchAttributes[item] + "%" }));
  return filters;
}
function multipleSelectInModels(model, select, alias) {
  if (!select) return {}
  const selectAttributes = JSON.parse(select)
  const keySearchAttributes = Object.keys(selectAttributes)
  const fields = Object.keys(
    _.pick(model.rawAttributes, keySearchAttributes)
  );
  const filters = {};
  fields.forEach((item) => (filters["$" + alias + "." + item + "$"] = { [Op.eq]: selectAttributes[item] }));
  return filters;
}

const getPagination = (page, size) => {
  const limit = size ? +size : 5
  const offset = page ? limit * (page - 1) : 0
  return { limit, offset }
}

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: files } = data
  const currentPage = page ? +page : 1
  const totalPages = Math.ceil(totalItems / limit)
  return {
    totalItems, files, totalPages, currentPage
  }
}

module.exports = {
  getAllUsersService, getAllUserService, deleteUserService, createUserService
}