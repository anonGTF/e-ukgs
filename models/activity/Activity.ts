export type Activity = {
    id: string,
    title: string,
    type: ActivityType,
    startTime: Date,
    endTime: Date,
    status: ActivityStatus,
    place: string,
    picId: string
}

export enum ActivityType { STUDENT_FORM, PARENT_FORM, TOOTH_HEALTH, EVALUATION, OTHER }

export type ActivityWithPic = {
    activity: Activity,
    pic?: User
}

export const ACTIVITY_TYPE_LABEL = {
    studentForm: "Pengisian Kuesioner Perilaku Siswa",
    parentForm: "Pengisian Kuesioner Peran Orang Tua",
    toothHealthCheck: "Kegiatan Pemeriksaan Gigi",
    evaluation: "Evaluasi Kegiatan UKGS",
    other: "Lainnya (isi judul kegiatan sendiri)"
}

export const ACTIVITY_UPDATE = {
    budgeting: "budgeting",
    starting: "starting",
    execution: "execution",
    dropping: "dropping"
}

export enum ActivityStatus { TODO, READY, ONPROGRESS, DONE, DROPPED }