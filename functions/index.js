const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");
const admin = require("firebase-admin")

admin.initializeApp()

const auth = admin.auth()
const db = admin.firestore()

const REGION = "asia-southeast2"

exports.addUser = onCall(
  {
    cors: true,
    region: REGION
  },
  async (request) => {
    const role = request.data.role
    const name = request.data.name
    const gender = request.data.gender
    const schoolId = request.data.schoolId
    const userId = request.data.userId
    const password = request.data.password
    const email = `${userId}@e-ukgs.web.app`

    if (!request.auth) {
      throw new HttpsError("failed-precondition", "The function must be called while authenticated.");
    }

    if (
      (!(typeof role === "string") || role.length === 0) ||
      (!(typeof name === "string") || name.length === 0) ||
      (!(typeof gender === "string") || gender.length === 0) ||
      (!(typeof userId === "string") || userId.length === 0) ||
      (!(typeof password === "string") || password.length === 0)
    ) {
      throw new HttpsError("invalid-argument", "The function must contains name, gender, groupId, userId, and password.");
    }

    if (role == "admin" && (!(typeof schoolId === "string") || schoolId.length === 0)) {
      throw new HttpsError("invalid-argument", "The function must contains schoolId if user role requested is teacher");
    }

    try {
      // validate requester is admin
      const requester = await db.doc(`/users/${request.auth.uid}`).get()
      const requesterRole = requester.data()["role"]

      if (!(typeof requesterRole === "string") && requesterRole != "admin") {
        throw new HttpsError("failed-precondition", "Function only able to call by admin") 
      }

      // validate school exist
      const schoolResponse = await db.doc(`/schools/${schoolId}`).get()
      if (!schoolResponse.exists || schoolResponse.data() == undefined) {
        throw new HttpsError("failed-precondition", "School cannot be found") 
      }

      // create authentication user
      const userCred = await auth.createUser({ email, password })
      const userCredId = userCred.uid

      // add student to database and increment group total student
      await db.doc(`users/${userCredId}`).set({
        role,
        name,
        gender,
        userId,
        schoolId
      })

      logger.info("Akun berhasil ditambahkan")
      return Promise.resolve()
    } catch (error) {
      throw new HttpsError("unknown", error.message, error);
    }
  }
)