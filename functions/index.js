const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");
const admin = require("firebase-admin")

admin.initializeApp()

const auth = admin.auth()
const db = admin.firestore()

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
      (!(typeof name === "string") || name.length === 0) ||
      (!(typeof gender === "string") || gender.length === 0) ||
      (!(typeof userId === "string") || userId.length === 0) ||
      (!(typeof password === "string") || password.length === 0)
    ) {
      throw new HttpsError("invalid-argument", "The function must contains name, gender, userId, and password.");
    }

    // validate requester is admin
    return db.doc(`/users/${request.auth.uid}`).get()
    .then((response) => {
      const requesterRole = response.data()["role"]

      if (!(typeof requesterRole === "string") && requesterRole != "admin") {
        throw new HttpsError("failed-precondition", "Function only able to call by admin") 
      }

      // create authentication user
      auth.createUser({
        email,
        password
      }).then((userCred) => {
        const userCredId = userCred.uid

        // add teacher to database
        db.runTransaction((trx) => {
          const userRef = db.collection("users").doc(userCredId)
          const teacherRef = db.collection("teachers").doc(userCredId)

          trx.set(
            userRef, 
            {
              role: "teacher"
            }
          )

          trx.set(
            teacherRef, 
            {
              name,
              gender,
              userId
            }
          )

          return Promise.resolve()
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

exports.addStudent = onCall(
  {
    cors: true,
    region: REGION
  },
  (request) => {
    const name = request.data.name
    const gender = request.data.gender
    const userId = request.data.userId
    const groupId = request.data.groupId
    const password = request.data.password
    const email = `${userId}@e-ukgs.web.app`

    if (!request.auth) {
      throw new HttpsError("failed-precondition", "The function must be called while authenticated.");
    }
    if (
      (!(typeof name === "string") || name.length === 0) ||
      (!(typeof gender === "string") || gender.length === 0) ||
      (!(typeof userId === "string") || userId.length === 0) ||
      (!(typeof groupId === "string") || groupId.length === 0) ||
      (!(typeof password === "string") || password.length === 0)
    ) {
      throw new HttpsError("invalid-argument", "The function must contains name, gender, groupId, userId, and password.");
    }

    // validate requester is admin
    return db.doc(`/users/${request.auth.uid}`).get()
    .then((response) => {
      const requesterRole = response.data()["role"]

      if (!(typeof requesterRole === "string") && requesterRole != "admin") {
        throw new HttpsError("failed-precondition", "Function only able to call by admin") 
      }

      // validate group exist
      db.doc(`/groups/${groupId}`).get()
      .then((groupResponse) => {
        if (!groupResponse.exists || groupResponse.data() == undefined) {
          throw new HttpsError("failed-precondition", "Group cannot be found") 
        }
        
        // create authentication user
        auth.createUser({
          email,
          password
        }).then((userCred) => {
          const userCredId = userCred.uid
  
          // add student to database and increment group total student
          db.runTransaction((trx) => {
            const userRef = db.collection("users").doc(userCredId)
            const groupRef = db.collection("groups").doc(groupId)
            const studentRef = groupRef.collection("students").doc(userCredId)
  
            trx.set(
              userRef, 
              {
                role: "student",
                groupId
              }
            )
  
            trx.set(
              studentRef, 
              {
                name,
                gender,
                userId
              }
            )
  
            trx.set(
              groupRef,
              {
                totalStudent: groupResponse.data()["totalStudent"] + 1
              },
              {
                merge: true
              }
            )
  
            return Promise.resolve()
          }).then(() => {
            logger.info("Siswa berhasil ditambahkan")
            return {
              message: "Siswa berhasil ditambahkan"
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
    }).catch((error) => {
      throw new HttpsError("unknown", error.message, error);
    })
  }
)