const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");
const admin = require("firebase-admin")

admin.initializeApp()

const REGION = "asia-southeast2"

exports.addTeacher = onCall(
  {
    cors: true,
    region: REGION
  },
  (request) => {
    const name = request.data.name
    const gender = request.data.gender
    const userId = request.data.userId
    const password = request.data.password
    const email = `${userId}@e-ukgs.web.app`

    if (!request.auth) {
      throw new HttpsError("failed-precondition", "The function must be called while authenticated.");
    }
    if (
      (!(typeof name === "string") || name.length === 0) &&
      (!(typeof gender === "string") || gender.length === 0) &&
      (!(typeof userId === "string") || userId.length === 0) &&
      (!(typeof password === "string") || password.length === 0)
    ) {
      throw new HttpsError("invalid-argument", "The function must contains name, gender, userId, and password.");
    }

    // validate requester is admin
    return admin.firestore().doc(`/users/${request.auth.uid}`).get()
    .then((response) => {
      const requesterRole = response.data()["role"]

      if (!(typeof requesterRole === "string") && requesterRole != "admin") {
        throw new HttpsError("failed-precondition", "Function only able to call by admin") 
      }

      // create authentication user
      admin.auth().createUser({
        email,
        password
      }).then((userCred) => {
        const userCredId = userCred.uid

        // add teacher to database
        admin.firestore().doc(`/teachers/${userCredId}`).create({
          name,
          gender,
          userId
        }).then(() => {
          logger.info("Guru berhasil ditambahkan")
          return {
            message: "Guru berhasil ditambahkan"
          }
        }).catch((error) => {
          throw new HttpsError("unknown", error.message, error);
        })
      }).catch((error) => {
        throw new HttpsError("unknown", error.message, error);
      })
    }).catch((error) => {
      throw new HttpsError("unknown", error.message, error);
    })
  }
)