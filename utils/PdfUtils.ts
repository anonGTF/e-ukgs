import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable"

export const generatePdf = async (student: Student, school: School, referralData: Referral): Promise<Blob> => {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("SURAT RUJUKAN", 105, 20, { align: "center" })

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    const recipientText = `Kepada Yth:
    1. Guru UKS/Guru Kelas
    2. Orang tua/wali murid
Di Tempat`

    doc.text(recipientText, 20, 30)

    const salutationText = `Dengan Hormat,
Setelah dilakukan pemeriksaan kesehatan gigi terhadap:`
    doc.text(salutationText, 20, 60)

    const details = [
        ["Nama", `: ${student.name}`],
        ["Umur", `: ${student.age} tahun`],
        ["Kelas", `: ${student.grade}`],
        ["Sekolah", `: ${school.name}`],
    ];

    autoTable(doc, {
        startY: 80,
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

    let yPosition = doc.lastAutoTable.finalY + 10;

    yPosition += 10
    doc.text("Berikut adalah tabel kebutuhan perawatan pasien", 20, yPosition)
    yPosition += 10

    const list = [
        { image: "https://fastly.picsum.photos/id/304/400/400.jpg?hmac=ACSICmxfD-d8JI4duHmUWfcm_b0mrkbq7m_KvfTCNgg", treatment: "lorem ipsum" },
        { image: "https://fastly.picsum.photos/id/304/400/400.jpg?hmac=ACSICmxfD-d8JI4duHmUWfcm_b0mrkbq7m_KvfTCNgg", treatment: "lorem ipsum" },
        { image: "https://fastly.picsum.photos/id/304/400/400.jpg?hmac=ACSICmxfD-d8JI4duHmUWfcm_b0mrkbq7m_KvfTCNgg", treatment: "lorem ipsum" },
    ]

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
    for (let i = 0; i < referralData.evidences.length; i++) {
        const base64Image = await loadImageAsBase64(referralData.evidences[i])
        tableData.push([
            {
                content: "",
                styles: { cellWidth: 80, minCellHeight: 55 },
                img: base64Image,
            },
            { content: referralData.treatment[i], styles: { valign: "middle" } },
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