const logoutController = async (req, res, next) => {
    try{
      res.clearCookie("token")
      .status(200)
      .json("User logged out successfully!")
    }
    catch(error){
      next(error);
    }
  }
  