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