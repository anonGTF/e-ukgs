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

export const gumScoreRule = [
    {
        min: 0,
        max: 0.1,
        label: "Sehat",
        backgroundColor: "bg-success"
    },
    {
        min: 0.2,
        max: 1.0,
        label: "Peradangan Ringan",
        backgroundColor: "bg-emerald-400"
    },
    {
        min: 1.1,
        max: 2.0,
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

export const debrisLabel = [
    "Tidak ada debris atau stain",
    "Kurang dari 1/3 permukaan gigi tertutupi Debris atau terdapat stain menutupi permukaan gigi",
    "1/3 sampai 2/3 permukaan gigi tertutupi Debris",
    "lebih dari 2/3 permukaan gigi tertutupi Debris"
]

export const kalkulusLabel = [
    "Tidak ada kalkulus",
    "Kurang dari 1/3 permukaan gigi tertutupi Supragingival kalkulus pada mahkota gigi",
    "1/3 sampai 2/3 tertutupi Supragingival kalkulus atau ada bintik kalkulus subgingiva",
    "Lebih dari 2/3 tertutupi Supragingival kalkulus atau ada kalkulus yang melingkari subgingiva"
]

export const gumsLabel = [
    "Normal",
    "Ada sedikit perubahan warna, bengkak, namun tidak ada pendarahan",
    "Warna kemerahan, bengkak, pendarahan saat diperiksa",
    "Warna merah terang atau merah menyala, luka, pendarahan spontan"
]

export const roundScore = (score: number) => parseFloat(score.toFixed(2)) === score ? score : parseFloat(score.toFixed(2))