export type Activity = {
    id: string,
    title: string,
    startTime: Date,
    endTime: Date,
    status: ActivityStatus,
    place: string,
    picId: string
}

export enum ActivityStatus { TODO, READY, ONPROGRESS, DONE, DROPPED }

export type ActivityWithPic = {
    activity: Activity,
    pic?: User
}

export const ACTIVITY_TYPE = {
    studentForm: "Pengisian Kuesioner Perilaku Siswa",
    parentForm: "Pengisian Kuesioner Peran Orang Tua",
    toothHealthCheck: "Kegiatan Pemeriksaan Gigi",
    other: "Lainnya (isi judul kegiatan sendiri)"
}

export const ACTIVITY_UPDATE = {
    budgeting: "budgeting",
    starting: "starting",
    execution: "execution",
    dropping: "dropping"
}