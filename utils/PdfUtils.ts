import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable"

export const generatePdf = async (
    student: Student, 
    school: School, 
    toothHealth: ToothHealth, 
    activity: Activity
): Promise<Blob> => {
    const doc = new jsPDF()

    if (toothHealth.referral == null) return doc.output("blob")
    doc.setFontSize(16)
    doc.setFont("times", "bold")
    doc.text("SURAT RUJUKAN", 105, 20, { align: "center" })

    doc.setFont("times", "normal")
    doc.setFontSize(12)
    doc.setLineHeightFactor(1.5)
    doc.autoTableSetDefaults({
        styles: {
            font: "times",
            fontSize: 12,
            lineHeight: 1.5,
        },
    });
    const recipientText = `Kepada Yth:\n\t1. Guru UKS/Guru Kelas\n\t2. Orang tua/wali murid\nDi Tempat`

    doc.text(recipientText, 20, 30)

    const salutationText = `Dengan Hormat, \nSetelah dilakukan pemeriksaan kesehatan gigi terhadap:`
    doc.text(salutationText, 20, 60)

    const details = [
        ["Nama", `: ${student.name}`],
        ["Umur", `: ${student.age} tahun`],
        ["Kelas", `: ${student.grade}`],
        ["Sekolah", `: ${school.name}`],
    ];

    autoTable(doc, {
        startY: 70,
        head: [],
        body: details,
        theme: "plain",
        styles: { 
            halign: "left",
            lineWidth: 0
        },
        tableLineWidth: 0,
        tableLineColor: [255, 255, 255],
        columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 100 },
        },
        margin: { horizontal: 20 }
    });

    let yPosition = doc.lastAutoTable.finalY + 5;

    doc.text(`berdasarkan hasil pemeriksaan kesehatan gigi dan mulut yang telah dilaksanakan pada tanggal \n${getActivityTimeFormatted(activity)} \ndi ${activity.place} \ndidapatkan hasil bahwa:`, 20, yPosition)

    yPosition += 23
    const results = [
        ["a. Skor kebersihan mulut (OHIS)", ` = ${roundScore(toothHealth.ohis.totalScore)} kategori ${getScore(toothHealth.ohis.totalScore, ohisScoreRule)}`],
        ["b. Skor gigi berlubang (DMFT)", ` = ${roundScore(toothHealth.dmft.totalScore)} kategori ${getScore(toothHealth.dmft.totalScore, dmftScoreRule)}`],
        ["c. Kondisi gusi (Gingival indeks)", ` = ${roundScore(toothHealth.gums.score.averageScore)} kategori ${getScore(toothHealth.gums.score.averageScore, gumScoreRule)}`]
    ]

    autoTable(doc, {
        startY: yPosition,
        head: [],
        body: results,
        theme: "plain",
        styles: { 
            halign: "left",
            lineWidth: 0
        },
        tableLineWidth: 0,
        tableLineColor: [255, 255, 255],
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 100 },
        },
        margin: { horizontal: 20 }
    });
    
    if (toothHealth.referral.evidences.length > 0) {
        yPosition = doc.lastAutoTable.finalY + 10
        doc.text("Adapun berikut kondisi gigi yang memerlukan rujukan untuk dilakukan perawatan", 20, yPosition)
        yPosition += 5
    
        const loadImageAsBase64 = async (url: string) => {
            const response = await fetch(url)
            const blob = await response.blob()
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(blob)
            })
        }
    
        const tableData = []
        for (let i = 0; i < toothHealth.referral.evidences.length; i++) {
            const base64Image = await loadImageAsBase64(toothHealth.referral.evidences[i])
            tableData.push([
                {
                    content: "",
                    styles: { cellWidth: 80, minCellHeight: 55 },
                    img: base64Image,
                },
                { content: toothHealth.referral.treatment[i], styles: { valign: "middle" } },
            ])
        }
    
        autoTable(doc, {
            startY: yPosition,
            head: [["Kondisi", "Kebutuhan Perawatan"]],
            body: tableData,
            didDrawCell: (data) => {
                if (data.cell.raw.img) {
                    doc.addImage(data.cell.raw.img, "JPEG", data.cell.x + 2, data.cell.y + 2, 80, 50)
                }
            },
            theme: "grid",
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            bodyStyles : {
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            styles: { cellPadding: 4 },
            margin: { horizontal: 20 },
            rowPageBreak: "avoid"
        })
    }

    yPosition = doc.lastAutoTable.finalY + 10
    const referralText = `Perlu dirujuk ke Puskesmas atau fasilitas kesehatan gigi lainnya yang dikendaki wali murid. Bagi siswa yang mempunyai BPJS/KIS silahkan menggunakan kartu tersebut apabila berobat ke Puskesmas secara gratis. Diharapkan untuk membawa kartu tersebut apabila berobat.`
    doc.text(referralText, 20, yPosition, { maxWidth: 170 })

    return doc.output("blob")
}

export const downloadPdf = async (pdfLink: string): Promise<Either<string, null>> => {
    try {
        const pdf = new jsPDF()
        pdf.loadFile(pdfLink)
        pdf.save()
        return makeRight(null)
    } catch (error) {
        return makeLeft(error as string)
    }
}