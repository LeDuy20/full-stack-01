import express from "express";
import homeController from "../controller/HomeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/user/create-user", homeController.handleCreateUser);
  router.post("/delete-user/:id", homeController.handleDeleleUser);
  router.get("/update-user/:id", homeController.getDataUser);
  router.post("/user/update-user", homeController.handleUpdateUser);

  return app.use("/", router);
};

export default initWebRoutes;
