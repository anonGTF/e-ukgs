import { DocumentSnapshot } from "firebase/firestore";

function toUser(this: DocumentSnapshot): User {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    const role = data[USER_CONSTANTS.roleAttr]
    return {
        id: this.id,
        role,
        name: data[USER_CONSTANTS.nameAttr] ?? "",
        gender: data[USER_CONSTANTS.genderAttr] ?? "",
        userId: data[USER_CONSTANTS.userIdAttr] ?? "",
        schoolId: role == "teacher" ? data[USER_CONSTANTS.schoolIdAttr] : null,
        instansi: data[USER_CONSTANTS.instansiAttr] ?? ""
    } satisfies User
}

function toStudent(this: DocumentSnapshot): Student {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        name: data[STUDENT_CONSTANTS.nameAttr],
        age: data[STUDENT_CONSTANTS.ageAttr],
        gender: data[STUDENT_CONSTANTS.genderAttr],
        grade: data[STUDENT_CONSTANTS.gradeAttr],
        parentPhoneNumber: data[STUDENT_CONSTANTS.parentPhoneNumberAttr]
    } satisfies Student
}

function toSchool(this: DocumentSnapshot): School {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        name: data[SCHOOL_CONSTANTS.nameAttr],
        address: data[SCHOOL_CONSTANTS.addressAttr],
        totalStudent: data[SCHOOL_CONSTANTS.totalStudentAttr]
    } satisfies School
}

function toMedia(this: DocumentSnapshot, type: MediaType): Media {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        title: data[MEDIA_CONSTANTS.titleAttr],
        source: data[MEDIA_CONSTANTS.sourceAttr],
        thumbnail: data[MEDIA_CONSTANTS.thumbnailAttr],
        type
    } satisfies Media
}

function toQuestionnarie(this: DocumentSnapshot): Questionnarie {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        title: data[QUESTIONNARIE_CONSTANTS.titleAttr],
        type: data[QUESTIONNARIE_CONSTANTS.typeAttr],
        sections: data[QUESTIONNARIE_CONSTANTS.sectionsAttr],
        parentData: data[QUESTIONNARIE_CONSTANTS.parentDataAttr]
    } satisfies Questionnarie
}

function toToothHealth(this: DocumentSnapshot): ToothHealth {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        studentId: data[TOOTH_HEALTH_CONSTANTS.studentIdAttr],
        gums: data[TOOTH_HEALTH_CONSTANTS.gumsAttr],
        ohis: data[TOOTH_HEALTH_CONSTANTS.ohisAttr],
        dmft: data[TOOTH_HEALTH_CONSTANTS.dmftAttr],
        referral: data[TOOTH_HEALTH_CONSTANTS.referralAttr],
        createdAt: parseToDate(data[TOOTH_HEALTH_CONSTANTS.createdAtAttr])
    } satisfies ToothHealth
}

function toActivity(this: DocumentSnapshot): Activity {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        title: data[ACTIVITY_CONSTANTS.titleAttr],
        startTime: parseToDate(data[ACTIVITY_CONSTANTS.startTimeAttr]),
        endTime: parseToDate(data[ACTIVITY_CONSTANTS.endTimeAttr]),
        status: data[ACTIVITY_CONSTANTS.statusAttr],
        type: data[ACTIVITY_CONSTANTS.typeAttr],
        place: data[ACTIVITY_CONSTANTS.placeAttr],
        picId: data[ACTIVITY_CONSTANTS.picIdAttr]
    } satisfies Activity
}

function toBudgetPlan(this: DocumentSnapshot): BudgetPlan {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        items: data[UPDATE_CONSTANTS.itemsAttr],
        total: data[UPDATE_CONSTANTS.totalAttr],
        createdAt: parseToDate(data[UPDATE_CONSTANTS.createdAtAttr])
    } satisfies BudgetPlan
}

function toStartData(this: DocumentSnapshot): StartData {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        plannedStartTime: parseToDate(data[UPDATE_CONSTANTS.plannedStartTimeAttr]),
        actualStartTime: parseToDate(data[UPDATE_CONSTANTS.actualStartTimeAttr])
    } satisfies StartData
}

function toCompletionData(this: DocumentSnapshot): CompletionData {
    const data = this.data()
    if (data == undefined) throw Error("Document not found")
    return {
        id: this.id,
        isDone: data[UPDATE_CONSTANTS.isDoneAttr],
        blocker: data[UPDATE_CONSTANTS.blockerAttr],
        description: data[UPDATE_CONSTANTS.descriptionAttr],
        documentations: data[UPDATE_CONSTANTS.documentationsAttr],
        createdAt: parseToDate(data[UPDATE_CONSTANTS.createdAtAttr])
    } satisfies CompletionData
}

declare module "firebase/firestore" {
    interface DocumentSnapshot {
        toUser(): User
        toStudent(): Student
        toSchool(): School
        toMedia(type: MediaType): Media
        toQuestionnarie(): Questionnarie
        toToothHealth(): ToothHealth
        toActivity(): Activity
        toBudgetPlan(): BudgetPlan
        toStartData(): StartData
        toCompletionData(): CompletionData
    }
}

export const setupDocumentSnapshotUtil = () => {
    DocumentSnapshot.prototype.toUser = toUser
    DocumentSnapshot.prototype.toStudent = toStudent
    DocumentSnapshot.prototype.toSchool = toSchool
    DocumentSnapshot.prototype.toMedia = toMedia
    DocumentSnapshot.prototype.toQuestionnarie = toQuestionnarie
    DocumentSnapshot.prototype.toToothHealth = toToothHealth
    DocumentSnapshot.prototype.toActivity = toActivity
    DocumentSnapshot.prototype.toBudgetPlan = toBudgetPlan
    DocumentSnapshot.prototype.toStartData = toStartData
    DocumentSnapshot.prototype.toCompletionData = toCompletionData
}