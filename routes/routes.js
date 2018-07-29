const DeployController = require('../controllers/deploy_controller');

module.exports = (app) => {
  //app.get('path', controller.something);

  // If GET applied to this api route, return the test() function of TestController

  // ##########################################################################
  //Test functions
  // ##########################################################################

  //app.get('/api/test/', TestController.test);

  app.post('/deploy-api/compile/', DeployController.compile);
  app.post('/deploy-api/deploy/', DeployController.deploy);

}
