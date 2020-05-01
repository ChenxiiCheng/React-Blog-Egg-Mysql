module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/articles', controller.default.home.getArticleList);
  router.get('/default/article/:id', controller.default.home.getArticleById);
};
