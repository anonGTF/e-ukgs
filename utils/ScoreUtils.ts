export const ohisScoreRule = [
    {
        min: 0,
        max: 1.2,
        label: "Baik",
        backgroundColor: "bg-success"
    },
    {
        min: 1.3,
        max: 3,
        label: "Cukup",
        backgroundColor: "bg-warning"
    },
    {
        min: 3.1,
        max: 6,
        label: "Buruk",
        backgroundColor: "bg-error"
    }
]

export const ohisColor = ['#EE3D30', '#FFBE00', '#2DC653']
export const ohisLabels = ['Buruk', 'Cukup', 'Baik']

export const dmftScoreRule = [
    {
        min: 0,
        max: 1.1,
        label: "Sangat Rendah",
        backgroundColor: "bg-success"
    },
    {
        min: 1.2,
        max: 2.6,
        label: "Rendah",
        backgroundColor: "bg-emerald-400"
    },
    {
        min: 2.7,
        max: 4.4,
        label: "Sedang",
        backgroundColor: "bg-warning"
    },
    {
        min: 4.5,
        max: 6.6,
        label: "Tinggi",
        backgroundColor: "bg-orange-600"
    },
    {
        min: 6.7,
        max: 999,
        label: "Sangat Tinggi",
        backgroundColor: "bg-error"
    }
]

export const dmftColor = ['#EE3D30', '#E9580E', '#FFBE00', '#34D399', '#2DC653']
export const dmftLabels = ['Sangat Tinggi', 'Tinggi', 'Sedang', 'Rendah', 'Sangat Rendah']

export const gumScoreRule = [
    {
        min: 0,
        max: 0.1999,
        label: "Sehat",
        backgroundColor: "bg-success"
    },
    {
        min: 0.2,
        max: 1.0999,
        label: "Peradangan Ringan",
        backgroundColor: "bg-emerald-400"
    },
    {
        min: 1.1,
        max: 2.09999,
        label: "Peradangan Sedang",
        backgroundColor: "bg-warning"
    },
    {
        min: 2.1,
        max: 3.0,
        label: "Peradangan Berat",
        backgroundColor: "bg-error"
    }
]

export const gumColor = ['#EE3D30', '#FFBE00', '#34D399', '#2DC653']
export const gumLabels = ['Radang Berat', 'Radang sedang', 'Radang ringan', 'Sehat']

export const debrisLabel = {
    0: "Tidak ada debris atau stain",
    1: "Kurang dari 1/3 permukaan gigi tertutupi Debris atau terdapat stain menutupi permukaan gigi",
    2: "1/3 sampai 2/3 permukaan gigi tertutupi Debris",
    3: "lebih dari 2/3 permukaan gigi tertutupi Debris",
    '-2': "Gigi tidak tersedia"
}

export const kalkulusLabel = {
    0: "Tidak ada kalkulus",
    1: "Kurang dari 1/3 permukaan gigi tertutupi Supragingival kalkulus pada mahkota gigi",
    2: "1/3 sampai 2/3 tertutupi Supragingival kalkulus atau ada bintik kalkulus subgingiva",
    3: "Lebih dari 2/3 tertutupi Supragingival kalkulus atau ada kalkulus yang melingkari subgingiva",
    '-2': "Gigi tidak tersedia"
}

export const gumsLabel = {
    0: "Normal",
    1: "Ada sedikit perubahan warna, bengkak, namun tidak ada pendarahan",
    2: "Warna kemerahan, bengkak, pendarahan saat diperiksa",
    3: "Warna merah terang atau merah menyala, luka, pendarahan spontan",
    999: "Gigi tidak tersedia"
}

export const roundScore = (score: number) => parseFloat(score.toFixed(2)) === score ? score : parseFloat(score.toFixed(2))

export const getDebrisScore = (data: ToothHealth | undefined) => {
    if (data?.ohis.debris == null) return 0

    const scoreList = Object.values(data?.ohis.debris)
    return scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
}

export const getKalkulusScore = (data: ToothHealth | undefined) => {
    if (data?.ohis.kalkulus == null) return 0

    const scoreList = Object.values(data?.ohis.kalkulus)
    return scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
}

export const getSelectedRule = (rules: ScoreStatusRule[], value: number) => rules.find((rule) => value >= rule.min && value <= rule.max)?.label

export const educationActionScoreRule = [
    {
        min: 76,
        max: 100,
        label: "Baik",
        backgroundColor: "bg-success"
    },
    {
        min: 56,
        max: 75,
        label: "Cukup",
        backgroundColor: "bg-warning"
    },
    {
        min: 0,
        max: 55,
        label: "Kurang",
        backgroundColor: "bg-error"
    }
]

export const educationActionColor = ['#EE3D30', '#FFBE00', '#2DC653']
export const educationActionLabels = ['Kurang', 'Cukup', 'Baik']

export const attitudeScoreRule = [
    {
        min: 30,
        max: 40,
        label: "Baik",
        backgroundColor: "bg-success"
    },
    {
        min: 19,
        max: 29,
        label: "Cukup",
        backgroundColor: "bg-warning"
    },
    {
        min: 0,
        max: 18,
        label: "Kurang",
        backgroundColor: "bg-error"
    }
]

export const attitudeColor = ['#EE3D30', '#FFBE00', '#2DC653']
export const attitudeLabels = ['Kurang', 'Cukup', 'Baik']

export const parentScoreRule = [
    {
        min: 0,
        max: 59,
        label: "Kurang",
        backgroundColor: "bg-error"
    },
    {
        min: 60,
        max: 79,
        label: "Cukup",
        backgroundColor: "bg-warning"
    },
    {
        min: 80,
        max: 100,
        label: "Baik",
        backgroundColor: "bg-success"
    }
]

export const parentColor = ['#EE3D30', '#FFBE00', '#2DC653']
export const parentLabels = ["Kurang", "Cukup", "Baik"]

export const teachertScoreRule = [
    {
        min: 0,
        max: 59,
        label: "Kurang",
        backgroundColor: "bg-error"
    },
    {
        min: 60,
        max: 79,
        label: "Cukup",
        backgroundColor: "bg-warning"
    },
    {
        min: 80,
        max: 100,
        label: "Baik",
        backgroundColor: "bg-success"
    }
]

export const teacherColor = ['#EE3D30', '#FFBE00', '#2DC653']
export const teacherLabels = ["Kurang", "Cukup", "Baik"]

export const evalScoreRule = [
    {
        min: 0,
        max: 59,
        label: "Kurang",
        backgroundColor: "bg-error"
    },
    {
        min: 60,
        max: 79,
        label: "Cukup",
        backgroundColor: "bg-warning"
    },
    {
        min: 80,
        max: 100,
        label: "Baik",
        backgroundColor: "bg-success"
    }
]

export const evalColor = ['#EE3D30', '#FFBE00', '#2DC653']
export const evalLabels = ["Kurang", "Cukup", "Baik"]

export const getEvalTotalScore = (evaluation: Questionnarie | undefined): number | undefined => {
    if (evaluation == undefined) return undefined
    return evaluation.sections.reduce((acc, data) => acc + (data.score ?? 0), 0) / evaluation.sections.length
}

export const findRule = (rules: ScoreStatusRule[], value: number) => rules.find((rule) => value >= rule.min && value <= rule.max)
export const countByLabel = (scoreRules: ScoreStatusRule[]): Record<string, number> => scoreRules.reduce((acc, rule) => {
    acc[rule.label] = (acc[rule.label] || 0) + 1
    return acc
}, {} as Record<string, number>)
export const getCountsInOrder = (counts: Record<string, number>, orderedLabels: string[]): number[] => orderedLabels.map((label) => counts[label] || 0)

export const getScore = (score: number, rules: ScoreStatusRule[]): string => rules.find((rule) => score >= rule.min && score <= rule.max)?.label ?? "-"

export const ohisBaikActivity = [
    "Memberikan informasi tentang cara mempertahankan kebersihan mulut yang baik.",
    "Menginformasikan orang tua tentang pentingnya perawatan gigi dan kebersihan mulut.",
    "Mengembangkan program lanjutan untuk siswa yang sudah memiliki kebersihan mulut yang baik, seperti pelatihan lanjutan tentang kesehatan gigi.",
    "Mengajak siswa untuk menjadi duta kesehatan gigi di sekolah, sehingga mereka dapat berbagi pengetahuan dengan teman-teman mereka.",
    "Melakukan pemeriksaan berkala untuk memastikan bahwa kebersihan mulut tetap terjaga."
]

export const ohisCukupActivity = [
    "Melanjutkan edukasi tentang kebersihan mulut, tetapi dengan fokus pada teknik yang lebih mendalam.",
    "Mengadakan workshop atau seminar tentang diet sehat dan dampaknya terhadap kesehatan gigi.",
    "Melakukan pemeriksaan gigi secara berkala untuk memantau perkembangan kebersihan mulut.",
    "Mengadakan kompetisi kebersihan gigi antar kelas untuk meningkatkan motivasi.",
    "Mengajak orang tua untuk terlibat dalam program kesehatan gigi dan memberikan informasi tentang cara mendukung anak di rumah."
]

export const ohisBurukActivity = [
    "Melanjutkan edukasi tentang kebersihan mulut, tetapi dengan fokus pada teknik yang lebih mendalam terutama mengenai teknik menggosok gigi dan makanan yang baik untuk gigi",
    "Menyediakan materi edukasi yang menarik dan mudah dipahami oleh siswa",
    "Mengadakan program fluoride varnish untuk mencegah kerusakan gigi",
    "Melakukan pemeriksaan gigi secara berkala untuk memantau perkembangan kebersihan mulut",
    "Mengedukasi siswa tentang pentingnya kunjungan rutin ke dokter gigi",
    "Mengajak orang tua untuk berpartisipasi dalam program kesehatan gigi di sekolah",
    "Menginformasikan orang tua tentang pentingnya perawatan gigi dan kebersihan mulut",
    "Mengembangkan program berkelanjutan yang mencakup kegiatan rutin untuk meningkatkan kesadaran akan kesehatan gigi"
]

export const dmftSangatRendahActivity = [
    "Memberikan edukasi tentang pentingnya menjaga kesehatan gigi dan mulut, mencegah gigi berlubang",
    "Mengajarkan teknik menggosok gigi yang benar dan penggunaan benang gigi",
    "Mengatur pemeriksaan gigi secara berkala untuk memastikan kesehatan gigi tetap terjaga",
    "Menginformasikan orang tua tentang cara mendukung anak dalam menjaga kebersihan mulut di rumah",
    "Memberikan penghargaan bagi siswa yang menjaga kesehatan gigi dengan baik"
]

export const dmftRendahActivity = [
    "Melanjutkan edukasi tentang kebersihan mulut dengan fokus pada konsumsi makanan sehat dan dampaknya terhadap kesehatan gigi",
    "Mengajarkan teknik menggosok gigi yang benar dan penggunaan benang gigi",
    "Mengatur pemeriksaan gigi secara berkala untuk memastikan kesehatan gigi tetap terjaga",
    "Menginformasikan orang tua tentang cara mendukung anak dalam menjaga kebersihan mulut di rumah",
    "Memberikan penghargaan bagi siswa yang menjaga kesehatan gigi dengan baik"
]

export const dmftSedangActivity = [
    "Mengadakan program perawatan gigi, seperti aplikasi fluoride atau sealant untuk mencegah kerusakan lebih lanjut",
    "Mengadakan edukasi tentang kebersihan mulut dan konsumsi makanan sehat",
    "Melakukan evaluasi berkala untuk memantau perkembangan dan memberikan umpan balik",
    "Mengajak orang tua untuk berpartisipasi dalam program kesehatan gigi dan memberikan informasi tentang cara mendukung anak di rumah"
]

export const dmftTinggiActivity = [
    "Mengarahkan siswa untuk mendapatkan perawatan gigi yang diperlukan, seperti tambalan atau pencabutan gigi",
    "Mengadakan program edukasi yang lebih mendalam tentang kebersihan mulut dan dampak kerusakan gigi",
    "Melakukan pemeriksaan gigi secara berkala untuk memantau kondisi gigi dan memberikan umpan balik",
    "Mengadakan pertemuan dengan orang tua untuk membahas pentingnya perawatan gigi dan cara mendukung anak"
]

export const dmftSangatTinggiActivity = [
    "Mengarahkan siswa untuk mendapatkan perawatan gigi segera, termasuk perawatan restoratif dan pencabutan gigi jika diperlukan",
    "Mengadakan program edukasi yang intensif dan berkelanjutan tentang kebersihan mulut dan konsumsi makanan sehat",
    "Melibatkan dokter gigi, tenaga kesehatan, dan psikolog jika diperlukan untuk menangani masalah kesehatan gigi secara menyeluruh",
    "Melakukan evaluasi berkala dan memberikan umpan balik yang jelas kepada siswa dan orang tua tentang kemajuan dan langkah-langkah yang perlu diambil",
    "Mengajak orang tua untuk terlibat aktif dalam perawatan gigi anak dan memberikan dukungan di rumah"
]

export const gusiSehatActivity = [
    "Memberikan edukasi tentang pentingnya menjaga kesehatan gusi dan cara perawatan gigi yang baik",
    "Mengajarkan teknik menyikat gigi yang benar dan penggunaan benang gigi",
    "Mengatur pemeriksaan gigi secara berkala untuk memastikan kesehatan gusi tetap terjaga",
    "Mendorong siswa untuk menjaga pola makan sehat dan menghindari makanan manis yang dapat mempengaruhi kesehatan gusi"
]

export const gusiRinganActivity = [
    "Mengadakan sesi edukasi tentang penyebab peradangan gusi dan cara mencegahnya",
    "Mendorong siswa untuk meningkatkan kebersihan mulut dengan menyikat gigi dua kali sehari dan menggunakan benang gigi",
    "Melakukan pemeriksaan gigi secara berkala untuk memantau kondisi gusi dan memberikan umpan balik",
    "Menginformasikan orang tua tentang pentingnya perawatan gusi dan cara mendukung anak di rumah"
]

export const gusiSedangActivity = [
    "Mengarahkan siswa untuk mendapatkan perawatan gigi yang diperlukan, seperti pembersihan gigi profesional (scaling) untuk menghilangkan plak dan karang gigi",
    "Mengajarkan siswa mengenai teknik menggosok gigi yang tepat dalam kondisi gusi meradang",
    "Mengadakan edukasi kesehatan gigi tentang kebersihan mulut dan dampak peradangan gusi terhadap kesehatan secara keseluruhan",
    "Melakukan evaluasi berkala untuk memantau perkembangan dan memberikan umpan balik",
    "Mengajak orang tua untuk berpartisipasi dalam program kesehatan gigi dan memberikan informasi tentang cara mendukung anak di rumah"
]

export const gusiBeratActivtiy = [
    "Mengarahkan siswa untuk mendapatkan perawatan gigi segera, termasuk pembersihan gigi profesional dan perawatan lanjutan jika diperlukan termasuk mendapat resep obat untuk mengatasi peradangan berat pada gusi",
    "Mengarahkan siswa untuk mendapatkan perawatan gigi yang diperlukan, seperti pembersihan gigi profesional (scaling) untuk menghilangkan plak dan karang gigi",
    "Mengadakan program edukasi yang lebih mendalam tentang peradangan gusi, penyebabnya, dan dampaknya terhadap kesehatan gigi dan mulut",
    "Melibatkan dokter gigi, tenaga kesehatan, dan jika perlu, spesialis untuk menangani masalah kesehatan gusi secara menyeluruh",
    "Melakukan evaluasi berkala dan memberikan umpan balik yang jelas kepada siswa dan orang tua tentang kemajuan dan langkah-langkah yang perlu diambil",
    "Mengajak orang tua untuk terlibat aktif dalam perawatan gusi anak dan memberikan dukungan di rumah"
]

export const evalBaikActivity = [
    "Mempertahankan kinerja, teruskan praktik baik yang telah diterapkan dalam manajemen UKGS",
    "Mendorong inovasi dalam program kesehatan, seperti pengenalan teknologi baru atau metode pembelajaran yang lebih interaktif",
    "Meningkatkan keterlibatan siswa, orang tua, dan masyarakat dalam program UKGS untuk menciptakan lingkungan yang lebih mendukung",
    "Melakukan evaluasi berkala untuk memastikan bahwa standar tinggi tetap dipertahankan",
    "Memberikan pelatihan lanjutan bagi tenaga kesehatan dan pengelola UKGS untuk meningkatkan keterampilan dan pengetahuan mereka"
]

export const evalCukupActivity = [
    "Melakukan analisis mendalam untuk mengidentifikasi area yang perlu diperbaiki dalam manajemen UKGS",
    "Mengembangkan program-program baru yang dapat meningkatkan efektivitas UKGS, seperti program edukasi kesehatan yang lebih menarik",
    "Tingkatkan keterlibatan orang tua dan masyarakat dalam program UKGS untuk mendapatkan dukungan yang lebih besar",
    "Membuat rencana aksi yang jelas untuk mengatasi kelemahan yang teridentifikasi, termasuk langkah-langkah spesifik dan tenggat waktu",
    "Melakukan monitoring dan evaluasi secara berkala untuk menilai kemajuan dan efektivitas perbaikan yang dilakukan"
]

export const evalKurangActivity = [
    "Melakukan analisis menyeluruh untuk memahami penyebab utama dari kinerja yang kurang baik dalam manajemen UKGS",
    "Merancang dan implementasikan perbaikan sistemik yang mencakup semua aspek manajemen UKGS, termasuk kebijakan, prosedur, dan pelatihan",
    "Memberikan pendidikan dan pelatihan yang lebih intensif dari tenaga kesehatan ke pengelola UKGS untuk meningkatkan kompetensi mereka",
    "Mengadakan rapat koordinasi dengan semua pihak terkait untuk membahas masalah yang ada dan mencari solusi bersama",
    "Mempertimbangkan untuk meminta dukungan tambahan dari pemerintah atau organisasi non-pemerintah untuk meningkatkan sumber daya dan fasilitas yang tersedia untuk UKGS",
    "Membuat program perbaikan jangka pendek untuk mengatasi masalah segera dan program jangka panjang untuk memastikan keberlanjutan dan peningkatan kualitas manajemen UKGS"
]