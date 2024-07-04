const router = require("express").Router();
const registrationRoutes = require("./patientRegistration");

router.use("/registration", registrationRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
