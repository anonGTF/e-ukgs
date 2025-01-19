<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Kegiatan</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <Text :typography="Typography.Body1">Nama Kegiatan</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ activity?.title }}</Text>
            <Spacer class="h-4"/>
            <Text :typography="Typography.Body1">Waktu Pelaksanaan</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ activity ? getActivityTimeFormatted(activity) : "" }}</Text>
            <Spacer class="h-4"/>
            <Text :typography="Typography.Body1">Penanggung Jawab</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ pic?.name }}</Text>
            <template v-if="updateList.length > 0">
                <Spacer height="h-4"/>
                <Toggle
                    v-model="showUpdate"
                    label="Tampilkan Update Kegiatan"
                />
                <template v-if="showUpdate">
                    <Spacer height="h-4"/>
                    <ActivityUpdateItem
                        v-for="(update, index) in updateList"
                        :order-no="index + 1"
                        :update-data="wrapWithUpdateItem(update)"
                        :show-decoration="index != updateList.length - 1"
                    />
                </template>
            </template>
        </div>
        <template v-if="activity && activity.type != ActivityType.OTHER && activity.status == ActivityStatus.DONE">
            <Spacer class="h-6"/>
            
            <div v-if="activity.type == ActivityType.STUDENT_FORM" class="bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H2">Outcome Kegiatan Penilaian Perilaku Kesehatan Gigi Siswa</Text>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H3" class="font-semibold">Pengetahuan Kesehatan Gigi</Text>
                <Spacer height="h-3"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="educationActionLabels"
                        :background-colors="educationActionColor"
                        :data="educationChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Skor Pengetahuan"
                    />
                    <div class="flex-1 border border-border-primary rounded-xl p-4">
                        <Text>Berdasarkan hasil pengisian kuisioner perilaku kesehatan gigi siswa pada tanggal:
                            <br><br><span class="font-semibold">{{ getActivityTimeFormatted(activity) }}</span><br><br>
                            dari <span class="font-semibold">{{ totalStudentSubmitted }}</span> siswa yang mengisi kuisioner, didapatkan kesimpulan bahwa. Pada <span class="font-semibold">pengetahuan kesehatan gigi</span> berikut 5 pertanyaan dengan jumlah jawaban salah terbanyak: 
                        </Text>
                        <Spacer height="h-4"/>
                        <div v-for="(totalWrong, question) in top5EducationQuestionWrong" class="flex flex-row gap-2 mb-4 items-center">
                            <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                                <Text color="text-white" class="font-semibold">{{ totalWrong }}</Text>
                            </div>
                            <Text :typography="Typography.Label">{{ question }}</Text>
                        </div>
                    </div>
                </div>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H3" class="font-semibold">Sikap Kesehatan Gigi</Text>
                <Spacer height="h-3"/>
                <div class="flex flex-row gap-4">
                    <BarCard 
                        :labels="attitudeLabels"
                        :background-colors="attitudeColor"
                        :data="attitudeChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Skor Sikap"
                    />
                    <div class="flex-1 border border-border-primary rounded-xl p-4">
                        <Text>Berdasarkan hasil pengisian kuisioner perilaku kesehatan gigi siswa pada tanggal:
                            <br><br><span class="font-semibold">{{ getActivityTimeFormatted(activity) }}</span><br><br>
                            dari <span class="font-semibold">{{ totalStudentSubmitted }}</span> siswa yang mengisi kuisioner, didapatkan kesimpulan bahwa. Pada <span class="font-semibold">sikap kesehatan gigi</span> berikut 5 pertanyaan dengan jumlah pengisian jawaban dengan nilai terendah: 
                        </Text>
                        <Spacer height="h-4"/>
                        <div v-for="(totalWrong, question) in top5AttitudeQuestionLow" class="flex flex-row gap-2 mb-4 items-center">
                            <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                                <Text color="text-white" class="font-semibold">{{ totalWrong }}</Text>
                            </div>
                            <Text :typography="Typography.Label">{{ question }}</Text>
                        </div>
                    </div>
                </div>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H3" class="font-semibold">Tindakan Kesehatan Gigi</Text>
                <Spacer height="h-3"/>
                <div class="flex flex-row gap-4">
                    <BarCard 
                        :labels="educationActionLabels"
                        :background-colors="educationActionColor"
                        :data="actionChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Skor Tindakan"
                    />
                    <div class="flex-1 border border-border-primary rounded-xl p-4">
                        <Text>Berdasarkan hasil pengisian kuisioner perilaku kesehatan gigi siswa pada tanggal:
                            <br><br><span class="font-semibold">{{ getActivityTimeFormatted(activity) }}</span><br><br>
                            dari <span class="font-semibold">{{ totalStudentSubmitted }}</span> siswa yang mengisi kuisioner, didapatkan kesimpulan bahwa. Pada <span class="font-semibold">tindakan kesehatan gigi</span> berikut 5 pertanyaan dengan jumlah pengisian jawaban "Tidak" terbanyak: 
                        </Text>
                        <Spacer height="h-4"/>
                        <div v-for="(totalWrong, question) in top5ActionQuestionFalse" class="flex flex-row gap-2 mb-4 items-center">
                            <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                                <Text color="text-white" class="font-semibold">{{ totalWrong }}</Text>
                            </div>
                            <Text :typography="Typography.Label">{{ question }}</Text>
                        </div>
                    </div>
                </div>
                <Spacer height="h-4"/>
            </div>

            <div v-if="activity.type == ActivityType.TOOTH_HEALTH" class="bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H2">Outcome Kegiatan Pemeriksaan Kesehatan Gigi Siswa</Text>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H3" class="font-semibold">OHIS</Text>
                <Spacer height="h-3"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="ohisLabels"
                        :background-colors="ohisColor"
                        :data="ohisChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Skor OHIS"
                    />
                    <div class="bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Catatan: Kriteria Skor OHIS</Text>
                        <Spacer height="h-2"/>
                        <div class="space-y-3">
                            <div class="flex items-start">
                                <span class="font-bold">0,0 - 1,2</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Baik</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">1,3 - 3,0</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Cukup</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">3,1 - 6,0</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Buruk</span>
                            </div>
                        </div>
                    </div>
                </div>
                <template v-if="ohisChartData[2] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">OHIS Kategori Baik</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ ohisChartData[2] }} siswa dengan OHIS kategori baik. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan Kategori OHIS baik:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(ohisActivity, index) in ohisBaikActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ ohisActivity }}</Text>
                    </div>
                </template>
                <template v-if="ohisChartData[1] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">OHIS Kategori Cukup</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ ohisChartData[1] }} siswa dengan OHIS kategori cukup. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan Kategori OHIS cukup:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(ohisActivity, index) in ohisCukupActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ ohisActivity }}</Text>
                    </div>
                </template>
                <template v-if="ohisChartData[0] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">OHIS Kategori Buruk</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ ohisChartData[0] }} siswa dengan OHIS kategori buruk. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan Kategori OHIS buruk:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(ohisActivity, index) in ohisBurukActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ ohisActivity }}</Text>
                    </div>
                </template>

                <Spacer height="h-8"/>
                <Text :typography="Typography.H3" class="font-semibold">DMFT</Text>
                <Spacer height="h-3"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="dmftLabels"
                        :background-colors="dmftColor"
                        :data="dmftChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Skor DMFT"
                    />
                    <div class="bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Catatan: Kriteria Skor DMFT</Text>
                        <Spacer height="h-2"/>
                        <div class="space-y-3">
                            <div class="flex items-start">
                                <span class="font-bold">0,0 - 1,1</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Sangat Rendah</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">1,2 - 2,6</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Rendah</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">2,7 - 4,4</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Sedang</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">4,5 - 6,6</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Tinggi</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">>6,6</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Sangat Tinggi</span>
                            </div>
                        </div>
                    </div>
                </div>

                <template v-if="dmftChartData[4] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">DMFT Kategori Sangat Rendah</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ dmftChartData[4] }} siswa dengan DMFT kategori sangat rendah. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan Kategori DMFT sangat rendah:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(dmftActivity, index) in dmftSangatRendahActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ dmftActivity }}</Text>
                    </div>
                </template>

                <template v-if="dmftChartData[3] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">DMFT Kategori Rendah</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ dmftChartData[3] }} siswa dengan DMFT kategori rendah. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan Kategori DMFT rendah:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(dmftActivity, index) in dmftRendahActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ dmftActivity }}</Text>
                    </div>
                </template>

                <template v-if="dmftChartData[2] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">DMFT Kategori Sedang</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ dmftChartData[2] }} siswa dengan DMFT kategori sedang. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan Kategori DMFT sedang:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(dmftActivity, index) in dmftSedangActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ dmftActivity }}</Text>
                    </div>
                </template>

                <template v-if="dmftChartData[1] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">DMFT Kategori Tinggi</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ dmftChartData[1] }} siswa dengan DMFT kategori tinggi. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan Kategori DMFT tinggi:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(dmftActivity, index) in dmftTinggiActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ dmftActivity }}</Text>
                    </div>
                </template>

                <template v-if="dmftChartData[0] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">DMFT Kategori Sangat Tinggi</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ dmftChartData[0] }} siswa dengan DMFT kategori sangat tinggi. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan Kategori DMFT sangat tinggi:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(dmftActivity, index) in dmftSangatTinggiActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ dmftActivity }}</Text>
                    </div>
                </template>
                
                <Spacer height="h-8"/>
                <Text :typography="Typography.H3" class="font-semibold">Kondisi Gusi</Text>
                <Spacer height="h-3"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="gumLabels"
                        :background-colors="gumColor"
                        :data="gumsChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Kondisi Gusi"
                    />
                    <div class="bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Catatan: Kriteria Kondisi Gusi</Text>
                        <Spacer height="h-2"/>
                        <div class="space-y-3">
                            <div class="flex items-start">
                                <span class="font-bold">0,0</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Sehat</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">0,1 - 1,0</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Peradangan Ringan</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">1,1 - 2,0</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Peradangan Sedang</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">2,1 - 3,0</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Perandangan Berat</span>
                            </div>
                        </div>
                    </div>
                </div>
                <template v-if="gumsChartData[3] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">Kondisi Gusi Kategori Sehat</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ gumsChartData[3] }} siswa dengan kondisi gusi sehat. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan kondisi gusi sehat:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(gumActivity, index) in gusiSehatActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ gumActivity }}</Text>
                    </div>
                </template>
                <template v-if="gumsChartData[2] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">Kondisi Gusi Kategori Peradangan Ringan</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ gumsChartData[2] }} siswa dengan kondisi gusi peradangan ringan. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan kondisi gusi peradangan ringan:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(gumActivity, index) in gusiRinganActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ gumActivity }}</Text>
                    </div>
                </template>
                <template v-if="gumsChartData[1] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">Kondisi Gusi Kategori Peradangan Sedang</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ gumsChartData[1] }} siswa dengan kondisi gusi peradangan sedang. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan kondisi gusi peradangan sedang:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(gumActivity, index) in gusiSedangActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ gumActivity }}</Text>
                    </div>
                </template>
                <template v-if="gumsChartData[0] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">Kondisi Gusi Kategori Peradangan Berat</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ gumsChartData[0] }} siswa dengan kondisi gusi peradangan berat. Diperlukan perencanaan kegiatan sebagai berikut untuk siswa dengan kondisi gusi peradangan berat:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(gumActivity, index) in gusiBeratActivtiy" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ gumActivity }}</Text>
                    </div>
                </template>
            </div>

            <div v-if="activity.type == ActivityType.PARENT_FORM" class="bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H2">Outcome Kegiatan Penilaian Peran Orang Tua</Text>
                <Spacer height="h-8"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="parentLabels"
                        :background-colors="parentColor"
                        :data="parentChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Skor Peran Orang Tua"
                    />
                    <div class="flex-1 border border-border-primary rounded-xl p-4">
                        <Text>Berdasarkan hasil pengisian kuisioner peran orang tua pada tanggal:
                            <br><br><span class="font-semibold">{{ getActivityTimeFormatted(activity) }}</span><br><br>
                            dari <span class="font-semibold">{{ totalStudentSubmitted }}</span> orang tua siswa yang mengisi kuisioner, didapatkan kesimpulan bahwa. Pada <span class="font-semibold">peran orang tua</span> berikut 5 pertanyaan dengan jumlah jawaban "Tidak" terbanyak: 
                        </Text>
                        <Spacer height="h-4"/>
                        <div v-for="(totalWrong, question) in top5ParentQuestionFalse" class="flex flex-row gap-2 mb-4 items-center">
                            <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                                <Text color="text-white" class="font-semibold">{{ totalWrong }}</Text>
                            </div>
                            <Text :typography="Typography.Label">{{ question }}</Text>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="activity.type == ActivityType.EVALUATION" class="bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H2">Outcome Kegiatan Evaluasi</Text>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H3" class="font-semibold">Peran Guru</Text>
                <Spacer height="h-3"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="teacherLabels"
                        :background-colors="teacherColor"
                        :data="teacherChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Skor Peran Guru"
                    />
                    <div class="bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Catatan: Kriteria Skor Peran Guru</Text>
                        <Spacer height="h-2"/>
                        <div class="space-y-3">
                            <div class="flex items-start">
                                <span class="font-bold">80 - 100</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Baik</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">60 - 79</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Cukup</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">0 - 59</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Kurang</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer height="h-8"/>
                <Text>
                    Berdasarkan hasil pengisian kuisioner peran guru pada tanggal:<span class="font-semibold">{{ getActivityTimeFormatted(activity) }}</span><br><br>
                    dari <span class="font-semibold">{{ totalTeacherSubmitted }}</span> guru yang mengisi kuisioner, didapatkan kesimpulan bahwa. Pada <span class="font-semibold">peran guru</span> berikut 5 pertanyaan dengan jumlah jawaban "Tidak" terbanyak: 
                </Text>
                <Spacer height="h-4"/>
                <div v-for="(totalWrong, question) in top5TeacherQuestionFalse" class="flex flex-row gap-2 mb-4 items-center">
                    <div class="w-8 h-8 bg-primary p-4 rounded-full flex justify-center items-center">
                        <Text color="text-white" class="font-semibold">{{ totalWrong }}</Text>
                    </div>
                    <Text :typography="Typography.Label">{{ question }}</Text>
                </div>

                <Spacer height="h-8"/>
                <Text :typography="Typography.H3" class="font-semibold">Evaluasi E-UKGS</Text>
                <Spacer height="h-3"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="evalLabels"
                        :background-colors="evalColor"
                        :data="evalChartData"
                        class="flex-1"
                        max-height="h-96"
                        title="Skor Evaluasi E-UKGS"
                    />
                    <div class="bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Catatan: Kriteria Skor Evaluasi</Text>
                        <Spacer height="h-2"/>
                        <div class="space-y-3">
                            <div class="flex items-start">
                                <span class="font-bold">80 - 100</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Baik</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">60 - 79</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Cukup</span>
                            </div>
                            <div class="flex items-start">
                                <span class="font-bold">0 - 59</span>
                                <span class="w-4 text-center">:</span>
                                <span class="flex-1">Kurang</span>
                            </div>
                        </div>
                    </div>
                </div>
                <template v-if="evalChartData[2] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">Mutu Manajemen Kategori Baik</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ evalChartData[2] }} guru/perawat yang menilai mutu manajemen termasuk kategori baik. Berikut adalah hal yang dapat dilakukan untuk mempertahankan kategori baik sehingga UKGS dapat berjalan dengan optimal:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(evalActivity, index) in evalBaikActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-success p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ evalActivity }}</Text>
                    </div>
                </template>
                <template v-if="evalChartData[1] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">Mutu Manajemen Kategori Cukup</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ evalChartData[1] }} guru/perawat yang menilai mutu manajemen termasuk kategori cukup. Berikut adalah hal yang dapat dilakukan untuk meningkatkan mutu manajemen UKGS menjadi kategori baik sehingga UKGS dapat berjalan dengan optimal:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(evalActivity, index) in evalCukupActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-warning p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ evalActivity }}</Text>
                    </div>
                </template>
                <template v-if="evalChartData[0] > 0">
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">Mutu Manajemen Kategori Kurang</Text>
                    <Spacer height="h-2"/>
                    <Text>Terdapat {{ evalChartData[0] }} guru/perawat yang menilai mutu manajemen termasuk kategori kurang. Berikut adalah hal yang dapat dilakukan untuk meningkatkan mutu manajemen UKGS menjadi kategori baik sehingga UKGS dapat berjalan dengan optimal:</Text>
                    <Spacer height="h-4"/>
                    <div v-for="(evalActivity, index) in evalKurangActivity" class="flex flex-row gap-2 mb-4 items-center">
                        <div class="w-8 h-8 bg-error p-4 rounded-full flex justify-center items-center">
                            <Text color="text-white" class="font-semibold">{{ index + 1 }}</Text>
                        </div>
                        <Text :typography="Typography.Label">{{ evalActivity }}</Text>
                    </div>
                </template>
            </div>
        </template>

        <Spacer class="h-6"/>

        <div v-if="activity && activity.type != ActivityType.OTHER" class="bg-white border border-border-primary rounded-2xl p-6">
            <template v-if="activity.type == ActivityType.STUDENT_FORM">
                <TextField
                    v-model="searchQuery"
                    placeholder="Cari siswa dgn nama"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Spacer class="h-6"/>
                <DataTable
                    :headers="studentFormTableHeader"
                    :is-empty="filteredStudentResultData.length == 0"
                >
                    <tr v-for="(data, index) in filteredStudentResultData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.student.name }}</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.sections[0].score != undefined"
                                :rules="educationActionScoreRule"
                                :value="data.result?.sections[0].score ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.sections[1].score != undefined"
                                :rules="attitudeScoreRule"
                                :value="data.result?.sections[1].score ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.sections[2].score != undefined"
                                :rules="educationActionScoreRule"
                                :value="data.result?.sections[2].score ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td class="flex justify-end">
                            <Button 
                                v-if="data.result"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/student-assignment?id=${data.result.id}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="px-4 py-2">
                                <Text>Siswa Belum Mengisi!</Text>
                            </div>
                        </td>
                    </tr>
                </DataTable>
            </template>
            <template v-if="activity.type == ActivityType.PARENT_FORM">
                <TextField
                    v-model="searchQuery"
                    placeholder="Cari siswa dgn nama"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Spacer class="h-6"/>
                <DataTable
                    :headers="parentTableHeader"
                    :is-empty="filteredStudentResultData.length == 0"
                >
                    <tr v-for="(data, index) in filteredStudentResultData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.student.name }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.result ? data.result.parentData?.name : "-" }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.result ? data.result.parentData?.relation : "-" }}</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.sections[0].score != undefined"
                                :rules="parentScoreRule"
                                :value="data.result?.sections[0].score ?? 0"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td class="flex justify-end">
                            <Button 
                                v-if="data.result"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/parent-questionnarie?id=${data.result.id}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="px-4 py-2">
                                <Text>Orang Tua Belum Mengisi</Text>
                            </div>
                        </td>
                    </tr>
                </DataTable>
            </template>
            <template v-if="activity.type == ActivityType.TOOTH_HEALTH">
                <TextField
                    v-model="searchQuery"
                    placeholder="Cari siswa dgn nama"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Spacer class="h-6"/>
                <DataTable
                    :headers="healthTableHeader"
                    :is-empty="filteredStudentHealthData.length == 0"
                >
                    <tr v-for="(data, index) in filteredStudentHealthData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.student.name }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.student.gender }}</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.ohis != undefined"
                                :rules="ohisScoreRule"
                                :value="data.result?.ohis.totalScore ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.dmft != undefined"
                                :rules="dmftScoreRule"
                                :value="data.result?.dmft.totalScore ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.gums != undefined"
                                :rules="gumScoreRule"
                                :value="data.result?.gums.score.averageScore ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td class="flex justify-end">
                            <Button 
                                v-if="data.result"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/student-health?id=${data.result.studentId}`"
                            >
                                Lihat Detail
                            </Button>
                        </td>
                    </tr>
                </DataTable>
            </template>
            <template v-if="activity.type == ActivityType.EVALUATION">
                <DataTable
                    :headers="evalTableHeaders"
                >
                    <tr v-for="(data, index) in evalEntryData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}.</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.user.name }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.user.role == 'teacher' ? 'Guru' : 'Perawat' }}</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.peranGuru?.sections[0].score != undefined"
                                :rules="teachertScoreRule"
                                :value="data.peranGuru?.sections[0].score ?? 0"
                            />
                            <Text v-else-if="data.user.role == 'teacher'" :typography="Typography.Body2">-</Text>
                            <Text v-else>Tidak tersedia</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.evalTotalScore != undefined"
                                :rules="evalScoreRule"
                                :value="data.evalTotalScore"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td class="flex justify-end">
                            <Button
                                v-if="data.peranGuru != null || data.evaluation != null"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/evaluation?id=${data.user.id}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="p-2">
                                <Text>Belum Mengisi</Text>
                            </div>
                        </td>
                    </tr>
                </DataTable>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'admin'
    })

    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const uiStore = useUiStore()

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Data Kegiatan UKGS",
            route: "/admin/ukgs"
        },
        {
            label: "Sekolah",
            route: `/admin/ukgs/${route.params.schoolId}`
        },
        {
            label: "Detail Kegiatan",
            route: `/admin/ukgs/${route.params.schoolId}/${route.params.activityId}`
        }
    ])

    const activity = ref<Activity | null>(null)
    const pic = ref<User | null>(null)
    const updates = useGetAllUpdates(route.params.schoolId as string, route.params.activityId as string)
    const updateList = computed(() => [
        updates.budgetPlan.value,
        updates.startData.value,
        updates.completionData.value
    ].filter((data) => data != undefined))
    const showUpdate = ref(false)
    const students = useGetAllStudents(route.params.schoolId as string)
    const entries = useGetAllEntries(route.params.schoolId as string, route.params.activityId as string)
    const toothHealthData = useGetAllToothHealth(route.params.schoolId as string, route.params.activityId as string)
    const searchQuery = ref("")

    const studentResultData = computed(() => students.value.map((student) => ({
        student,
        result: entries.value.find((entry) => entry.id == student.id)
    })))

    const studentHealthData = computed(() => students.value.map((student) => ({
        student,
        result: toothHealthData.value.find((entry) => entry.studentId == student.id)
    })))

    const filteredStudentResultData = computed(() => 
        studentResultData.value.filter((data) => 
            data.student.name.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase())
        )
    )

    const filteredStudentHealthData = computed(() => 
        studentHealthData.value.filter((data) => 
            data.student.name.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase())
        )
    )

    const studentFormTableHeader = ref([
        "",
        "Nama Siswa",
        "Hasil Pengetahuan",
        "Hasil Sikap",
        "Hasil Perilaku",
        ""
    ])

    const parentTableHeader = ref([
        "",
        "Nama Siswa",
        "Nama Orang Tua",
        "Relasi",
        "Hasil",
        ""
    ])

    const healthTableHeader = ref([
        "",
        "Nama Siswa",
        "Jenis Kelamin",
        "Hasil OHIS",
        "Hasil DMFT",
        "Hasil Gusi",
        ""
    ])

    const evalTableHeaders = ref([
        "",
        "Nama",
        "Tugas",
        "Peran Guru",
        "Evaluasi",
        ""
    ])

    const allUsers = useGetAllUsers()
    const filteredUsers = computed(() => allUsers.value
        .filter((user) => user.role == "admin" || user.schoolId == route.params.schoolId as string)
        .sort((a, b) => {
            if (a.role === b.role) return 0
            if (a.role === "teacher") return -1
            if (b.role === "teacher") return 1
            if (a.role === "admin") return -1
            if (b.role === "admin") return 1
            return 0
        })
    )
    const evalEntries = computed(() => useGetAllEntries(route.params.schoolId as string, route.params.activityId as string))
    const evalEntryData = computed(() => filteredUsers.value.map((user) => {
        const evaluation = evalEntries.value.value.find((entry) => entry.id == `${user.id}-eval` && entry.type == QuestionType.EvaluasiEUkgs)
        return {
            user,
            evaluation,
            evalTotalScore: getEvalTotalScore(evaluation),
            peranGuru: evalEntries.value.value.find((entry) => entry.id == `${user.id}-teacher` && entry.type == QuestionType.PeranGuru)
        }
    }))

    const teacherChartData = computed(() => {
        const scoreList = evalEntryData.value.map((data) => findRule(teachertScoreRule, data.peranGuru?.sections[0].score ?? -1)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, teacherLabels)
    })

    const evalChartData = computed(() => {
        const scoreList = evalEntryData.value.map((data) => findRule(evalScoreRule, data.evalTotalScore ?? -1)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, evalLabels)
    })

    const totalTeacherSubmitted = computed(() => evalEntryData.value.reduce((acc, data) => acc + (data.peranGuru ? 1 : 0), 0))

    const top5TeacherQuestionFalse = computed(() => {
        if (activity.value == null || activity.value.type != ActivityType.EVALUATION) return []

        const falseQuestions = evalEntryData.value
            .map((data) => data.peranGuru?.sections[0].questions.filter((question) => question.selectedAnswer?.point == 0))
            .flat()
            .filter((data) => data != undefined)
        const falseQuestionMap = falseQuestions.reduce((acc, question) => {
            acc[question.question] = (acc[question.question] || 0) + 1
            return acc
        }, {} as Record<string, number>)
        const top5FalseQuestions = Object.entries(falseQuestionMap)
            .sort(([, currValue], [, nextValue]) => nextValue - currValue)
            .slice(0, 5)
        return Object.fromEntries(top5FalseQuestions)
    })

    const educationChartData = computed(() => {
        const scoreList = entries.value.map((data) => findRule(educationActionScoreRule, data.sections[0].score ?? 0)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, educationActionLabels)
    })

    const attitudeChartData = computed(() => {
        const scoreList = entries.value.map((data) => findRule(attitudeScoreRule, data.sections[1].score ?? 0)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, attitudeLabels)
    })

    const actionChartData = computed(() => {
        const scoreList = entries.value.map((data) => findRule(educationActionScoreRule, data.sections[2].score ?? 0)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, educationActionLabels)
    })

    const totalStudentSubmitted = computed(() => studentResultData.value.reduce((acc, data) => acc + ((data.result != undefined) ? 1 : 0), 0))

    const top5EducationQuestionWrong = computed(() => {
        if (activity.value == null || activity.value.type != ActivityType.STUDENT_FORM) return []

        const wrongQuestions = entries.value.map((entry) => entry.sections[0].questions.filter((question) => question.selectedAnswer?.point != 1)).flat()
        const wrongQuestionMap = wrongQuestions.reduce((acc, question) => {
            acc[question.question] = (acc[question.question] || 0) + 1
            return acc
        }, {} as Record<string, number>)
        const top5WrongQuestions = Object.entries(wrongQuestionMap)
            .sort(([, currValue], [, nextValue]) => nextValue - currValue)
            .slice(0, 5)
        return Object.fromEntries(top5WrongQuestions)
    })

    const top5AttitudeQuestionLow = computed(() => {
        if (activity.value == null || activity.value.type != ActivityType.STUDENT_FORM) return []

        const attitudeQuestions = entries.value.map((entry) => entry.sections[1].questions).flat()
        const attitudeQuestionMap = attitudeQuestions.reduce((acc, question) => {
            acc[question.question] = (acc[question.question] || 0) + (question.selectedAnswer?.point ?? 0)
            return acc
        }, {} as Record<string, number>)
        const top5LowQuestions = Object.entries(attitudeQuestionMap)
            .sort(([, currValue], [, nextValue]) => currValue - nextValue)
            .slice(0, 5)
        return Object.fromEntries(top5LowQuestions)
    })

    const top5ActionQuestionFalse = computed(() => {
        if (activity.value == null || activity.value.type != ActivityType.STUDENT_FORM) return []

        const falseQuestions = entries.value.map((entry) => entry.sections[2].questions.filter((question) => question.selectedAnswer?.point == 0)).flat()
        const falseQuestionMap = falseQuestions.reduce((acc, question) => {
            acc[question.question] = (acc[question.question] || 0) + 1
            return acc
        }, {} as Record<string, number>)
        const top5FalseQuestions = Object.entries(falseQuestionMap)
            .sort(([, currValue], [, nextValue]) => nextValue - currValue)
            .slice(0, 5)
        return Object.fromEntries(top5FalseQuestions)
    })

    const ohisChartData = computed(() => {
        const scoreList = toothHealthData.value.map((data) => findRule(ohisScoreRule, data.ohis.totalScore)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, ohisLabels)
    })

    const dmftChartData = computed(() => {
        const scoreList = toothHealthData.value.map((data) => findRule(dmftScoreRule, data.dmft.totalScore)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, dmftLabels)
    })

    const gumsChartData = computed(() => {
        const scoreList = toothHealthData.value.map((data) => findRule(gumScoreRule, data.gums.score.averageScore)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, gumLabels)
    })

    const parentChartData = computed(() => {
        const scoreList = entries.value.map((data) => findRule(parentScoreRule, data.sections[0].score ?? 0)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, parentLabels)
    })

    const top5ParentQuestionFalse = computed(() => {
        if (activity.value == null || activity.value.type != ActivityType.PARENT_FORM) return []

        const falseQuestions = entries.value.map((entry) => entry.sections[0].questions.filter((question) => question.selectedAnswer?.point == 0)).flat()
        const falseQuestionMap = falseQuestions.reduce((acc, question) => {
            acc[question.question] = (acc[question.question] || 0) + 1
            return acc
        }, {} as Record<string, number>)
        const top5FalseQuestions = Object.entries(falseQuestionMap)
            .sort(([, currValue], [, nextValue]) => nextValue - currValue)
            .slice(0, 5)
        return Object.fromEntries(top5FalseQuestions)
    })

    const wrapWithUpdateItem = (data: BudgetPlan | StartData | CompletionData): UpdateItem => {
        if ('total' in data) {
            const budgetPlan = data as BudgetPlan
            return {
                updateTime: budgetPlan.createdAt ?? new Date(),
                budgetPlan
            }
        } else if ('actualStartTime' in data) {
            const startData = data as StartData
            return {
                updateTime: startData.actualStartTime,
                startData
            }
        } else {
            const completionData = data as CompletionData
            return {
                updateTime: completionData.createdAt ?? new Date(),
                completionData
            }
        }
    }

    onMounted(async () => {
        const result = await useGetActivityById(route.params.schoolId as string, route.params.activityId as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
            return
        }
        activity.value = unwrapEither(result)
        
        const picResult = await useGetUserById(activity.value.picId)
        if (isLeft(picResult)) {
            uiStore.showToast(unwrapEither(picResult), ToastType.ERROR)
            router.back()
            return
        }
        pic.value = unwrapEither(picResult)
    })
</script>