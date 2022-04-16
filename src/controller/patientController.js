import Patient from "../models/user";
import TokenAuth from "../helper/auth";
import bookInfos from "../models/appointbooked";
import sendSMS from "../helper/sms";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import transpoter from "../helper/transporter";
import authSchema from "../helper/validate";
import Token from "../models/token";

class patientController {
  static createAccount = async (req, res) => {
    try {
      const emailToken = crypto.randomBytes(16).toString("hex");
      const result = authSchema.validate(req.body)

      if (result.error) {
        return res.status(400).send({ Message: result.error.details[0].message })
      }
      const user = new Patient({
        name: result.value.name,
        email: result.value.email,
        phone: result.value.phone,
        password: result.value.password,
        emailToken: emailToken,
        isVerified: false,
      });
      console.log(result.password)
      const salt = await bcrypt.genSaltSync(8);
      const hashPassword = await bcrypt.hash(user.password, salt);

      console.log(emailToken);
      user.password = hashPassword;
      await user.save();
      const token = TokenAuth.TokenGenerator({ user: user });
      res.status(200).json({
        message: "acount created successfully",
        user,
        token,
      });

      var mailOption = {
        from: "yschristian7@gmail.com",
        to: user.email,
        subject: "Welcome to Doctor Appointment System!",
        html: `
         <h2>Hey ${user.name} Thanks for registering in our site</h2>
         <h4> Congratulations! You are almost set to start using our System</h4>
         <a href="http://${req.headers.host}/user/verify-email/${emailToken}">Sign in to  Validate your Email Address</a>
    `,
      };
      transpoter.sendMail(mailOption, function (error, info) {
        if (error) {
          console.log(error);
        }
        console.log("verification email sent to your email");
      });
    } catch (error) {
      // res.status(404).json({error:"account not created"})
      console.log(error);
      // if(error.code===11000){
      //   console.log("dublicate")
      // }
      // res.status(404).json({error:"account not created"})
    }
  };

  static createDoctor = async (req, res) => {
    try {
      const emailToken = crypto.randomBytes(16).toString("hex");
      const password = crypto.randomBytes(3).toString("hex");
      const { name, email, role } = req.body;
      const user = new Patient({
        name,
        email,
        role,
        emailToken: emailToken,
        password: password,
        isVerified: false,
      });
      const salt = await bcrypt.genSaltSync(10);
      const hashDocPass = await bcrypt.hash(user.password, salt);
      user.password = hashDocPass;
      await user.save();
      res.status(200).json({ message: "acount created successfully", user });

      var passwMessage = {
        from: "yschristian7@gmail.com",
        to: user.email,
        subject: "Your Account ",
        html: `
                <h4>You are there! Hey ${user.name} </h4>
                 <p>use Email: ${user.email} <br> and Password: ${password}
                 <br> to login and you can update it</p>
                  <a href="http://${req.headers.host}/user/verify-email/${emailToken}">Sign in to  Validate your Email Address</a>          
                `,
      };
      transpoter.sendMail(passwMessage, function (err, message) {
        if (err) {
          console.log(err);
        }
        res.redirect("/login");
      });
    } catch (error) {
      // res.status(404).json({error:"account not created"})
      console.log(error);
    }
  };

  static verifyEmail = async (req, res) => {
    try {
      const token = req.params.token;

      const user = await Patient.findOne({ emailToken: token });

      if (user) {
        (user.emailToken = null), (user.isVerified = true);
        await user.save();
        // res.status(201).json({
        //   message: "email validate successfully",
        // });
        res.redirect("https://doctor-appoint-system.herokuapp.com/login")
      } else {
        res.status(500).json({
          message: "you have to validate your email to continue",
        });
      }
    } catch (error) {
      res.status(404).send();
    }
  };
  static loginPatient = async (req, res) => {
    const user = await Patient.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        error: "user not found! kindly register first",
      });
    }
    if (bcrypt.compare(req.body.password, user.password)) {
      user.password = null;
      const token = TokenAuth.TokenGenerator({ user: user });
      return res.status(200).json({
        message: "successfully logged in",
        token: token,
        user: user,
      });
    }
    return res.status(404).json({
      error: "Password incorrect!",
    });
  };

  static logoutPatient = async (req, res) => {
    try {
      req.user.token = " okay";

      res.save();
    } catch (error) {
      console.log(error);
    }
  };

  static resetPsw = async (req, res) => {
    try {
      const user = await Patient.findOne({ email: req.body.email });
      if (!user) throw new Error("User does not exist")
      let token = await Token.findOne({ userId: user._id });
      if (token) { await token.deleteOne(); }
      let resetToken = crypto.randomBytes(32).toString("hex");
      // let token = await Token.findOne({ userId: user._id });
      // let resetToken =  crypto.randomBytes(16).toString("hex")
      // // if (!token) {
      await new Token({
        userId: user._id,
        token: resetToken,
      }).save();
      // // }
      console.log(token)

      var resetMessage = {
        from: "yschristian7@gmail.com",
        to: user.email,
        subject: "Your Account ",
        html: `
      <h4> Hey ${user.name} </h4> <br>
      <p>You requested to reset password <br>
       please click link below to rest your password</p><br>
      <a href="http://${req.headers.host}/password-reset/${user._id}/${resetToken}">reset your password</a>          
      `,
      };

      await transpoter.sendMail(resetMessage, function (err, message) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message: "password reset link sent to your email account",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // static updatePassword = async(resetPswTkn,token,password) =>{

  //           let resetPswTkn = await Token.findOne({userId})
  //           if (!resetPswTkn) {
  //             throw new Error("Invalid or expired password reset token");
  //           }
  //           const isValid = await bcrypt.compare(token,resetPswTkn.token)
  //           if(!isValid){
  //             throw new Error("") 
  //           }
  //           const hash = await bcrypt.hash(password,bcrypt.genSalt(10));

  //           await Patient.updateOne(
  //             { _id: userId },
  //             { $set: { password: hash } },
  //             { new: true }
  //           );

  //     const user = await User.findById({ _id: userId });
  //     transpoter.sendMail(
  //           user.email

  //     )
  //     await resetPswTkn.deleteOne();
  //     return true;  

  // }

  static getOnePatient = async (req, res) => {
    try {
      const patient = await Patient.findOne({ _id: req.params.id });
      res.status(200).json({ message: "one patient", patient });
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  };

  static getAllpatient = async (req, res) => {
    try {
      const patients = await Patient.find();
      res.send(patients);
    } catch (error) {
      res.status(500).send();
    }
  };

  static updatePatient = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "phone"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).json({ error: "invalid  updates!" });
    }
    try {
      const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!patient) {
        return res.status(404).json({ error: "no patient to update" });
      }
      res.status(200).json({ message: "patient updated", patient });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  static deletePatient = async (req, res) => {
    try {
      const patient = await Patient.findByIdAndDelete(req.params.id);
      if (!patient) {
        return res.status(404).json({
          error: "no patient to delete",
        });
      }
      res.status(200).json({
        message: "patient deleted",
        patient,
      });
    } catch (error) {
      res.status(400).send();
    }
  };

  //accept and decline
  static async changeAppointStatus(req, res) {
    const { id, status } = req.body;
    const book = await bookInfos.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: "failed to update status" });
    }
    sendSMS(
      book.user.name,
      book.appoint.tittle,
      book.status,
      book._id,
      book.user.phone
    );
    res.status(200).json({ message: "sucess", data: book });
  }
}
export default patientController;
