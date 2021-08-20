module.exports = (app) => {
  // INCLUDE ROUTES HERE
  require('./auth.routes')(app)
  require('./user.routes')(app)
  require('./organization.routes')(app)
  require('./file.routes')(app)
}
