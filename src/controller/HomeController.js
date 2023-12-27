import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.render("home");
};
const handleUserPage = async (req, res) => {
  let userList = await userService.getListUser();
  return res.render("user", { userList });
};

const handleCreateUser = (req, res) => {
  let email = req.body.emailUser;
  let password = req.body.password;
  let username = req.body.userName;

  userService.createNewUser(email, password, username);

  return res.redirect("back");
};
const handleDeleleUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("back");
};

const getDataUser = async (req,res) => {
  let id = req.params.id
  let user = await userService.getUserById(id);
  let userData = {};
  if(user && user.length > 0) {
    userData = user[0];
  }
  return res.render("update-user.ejs", {userData});
};
const handleUpdateUser = async(req, res) => {
  let id = req.body.id
  let email = req.body.email
  let username = req.body.username

  await userService.updateUser(email, username, id)
  return res.redirect("/user")
}
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateUser,
  handleDeleleUser,
  getDataUser,
  handleUpdateUser
};
