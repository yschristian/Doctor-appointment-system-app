const VerifyAccess = (requireRole) => {
  return async (req, res, next) => {
    console.log("+++++", req.user);
    try {
      const { role } = req.user;
      if (requireRole != role) {
        return res.status(403).json("Role Not macth");
      }
      return next();
    } catch (err) {
      console.log(err);
    }
  };
};
export default VerifyAccess;
