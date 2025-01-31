<template>
    <div class="flex flex-row items-center gap-2 sm:gap-4 mt-4">
        <img 
            src="/android-chrome-512x512.png"
            class="w-12 h-12 object-cover"
        />
        <Text 
            :typography="Typography.Label" 
            class="font-bold flex-1" 
            color="text-black"
        >
            E-UKGS
        </Text>
        <Button
            dense
            to="/login"
        >
            <Icon name="mdi:login-variant"/> Login Petugas
        </Button>
    </div>
    <Spacer height="h-6"/>
    <div class="bg-primary rounded-2xl p-6">
        <Text :typography="Typography.H1" color="text-white">Selamat datang di website E-UKGS! 🌟</Text>
        <Spacer height="h-4"/>
        <Text :typography="Typography.Label" color="text-white">Jelajahi berbagai informasi menarik yang telah kami siapkan untuk Anda. Tingkatkan pengetahuan tentang cara menjaga kesehatan gigi melalui:</Text>
        <Spacer height="h-6"/>
        <div class="flex flex-col md:flex-row gap-2">
            <Button
                class="flex-1 bg-white/25"
            >
                <Icon name="mdi:book-open-variant" size="1.5rem"/>
                {{ ebooks.length }} Ebook Edukasi
            </Button>
            <Button class="flex-1 bg-white/25">
                <Icon name="mdi:movie" size="1.5rem"/>
                {{ videos.length }} Video Edukasi
            </Button>
            <Button class="flex-1 bg-white/25">
                <Icon name="mdi:script-text" size="1.5rem"/>
                {{ articles.length }} Artikel Edukasi
            </Button>
        </div>
    </div>
    <Spacer height="h-6"/>
    <div class="p-4 overflow-hidden">
        <Text :typography="Typography.H2"><span class="text-2xl">📚</span> Ebook Edukasi</Text>
        <Spacer height="h-2"/>
        <Text>Ebook penuh warna dengan panduan dan tips lengkap yang bisa diunduh dan dibaca kapan saja.</Text>
        <Spacer height="h-4"/>
        <div class="flex flex-row gap-4 overflow-y-hidden overflow-x-scroll -mb-14 pb-14">
            <div 
                v-for="ebook in ebooks" 
                class="cursor-pointer" 
                @click="navigateTo(
                    ebook.source, 
                    {
                        external: true,
                        open: { target: '_blank' }
                    }
                )"
            >
                <img 
                    :src="ebook.thumbnail"
                    class="w-auto min-w-64 h-80 object-cover rounded-lg"
                />
                <Spacer height="h-2"/>
                <Text :typography="Typography.Label" class=" font-semibold">{{ ebook.title }}</Text>
            </div>
        </div>
    </div>
    <Spacer height="h-6"/>
    <div class="bg-primary rounded-2xl p-4 overflow-hidden">
        <Text :typography="Typography.H2" color="text-white"><span class="text-2xl">🎦</span> Video Edukasi</Text>
        <Spacer height="h-2"/>
        <Text color="text-white">Tonton langkah-langkah praktis dan tips sederhana untuk menjaga kesehatan gigi dengan cara yang menyenangkan.</Text>
        <Spacer height="h-4"/>
        <div class="flex flex-row gap-4 overflow-y-hidden overflow-x-scroll -mb-14 pb-14">
            <div v-for="video in videos" class="cursor-pointer" @click="selectedVideo = video">
                <img 
                    :src="video.thumbnail"
                    class="w-auto min-w-64 h-32 object-cover rounded-lg"
                />
                <Spacer height="h-2"/>
                <Text 
                    :typography="Typography.Label" 
                    class="font-semibold" 
                    color="text-white"
                >
                    {{ video.title }}
                </Text>
            </div>
        </div>
    </div>
    <Spacer height="h-6"/>
    <div class="p-4 overflow-hidden">
        <Text :typography="Typography.H2"><span class="text-2xl">📒</span> Artikel Edukasi</Text>
        <Spacer height="h-2"/>
        <Text>Pelajari lebih banyak tentang kebiasaan sehat, mitos seputar kesehatan gigi, dan wawasan dari para ahli dari artikel-artikel di bawah.</Text>
        <Spacer height="h-4"/>
        <div class="flex flex-row gap-4 overflow-y-hidden overflow-x-scroll -mb-14 pb-14">
            <div v-for="article in articles" class="cursor-pointer" @click="navigateTo(`/article?id=${article.id}`)">
                <img 
                    :src="article.thumbnail"
                    class="w-auto min-w-64 h-32 object-cover rounded-lg"
                />
                <Spacer height="h-2"/>
                <Text :typography="Typography.Label" class=" font-semibold">{{ article.title }}</Text>
            </div>
        </div>
    </div>
    <Spacer height="h-6"/>
    <div class="bg-primary rounded-2xl p-6 mb-6">
        <Text :typography="Typography.H1" class="text-center" color="text-white">Saatnya Pemeriksaan Kesehatan Gigi 🚀</Text>
        <Spacer height="h-4"/>
        <Text :typography="Typography.Label" class="text-center" color="text-white">
            Jawab dengan jujur yaa~ <span class="text-xl">💖</span>, 
            hanya butuh beberapa menit, kok. Bersama-sama kita wujudkan senyuman sehat untuk semua. <span class="text-xl">😁</span></Text>
        <Spacer height="h-6"/>
        <div class="flex flex-col md:flex-row gap-2">
            <Button
                class="flex-1 bg-white/25"
                to="/student-questionnarie"
            >
            <span class="text-2xl">🎓</span> Kuesioner untuk Siswa
            </Button>
            <Button 
                class="flex-1 bg-white/25"
                to="/parent-questionnarie"
            >
                <span class="text-2xl">👨🏻🧕🏻</span> Kuesioner untuk Orang Tua/Wali
            </Button>
        </div>
        <Spacer height="h-6"/>
        <div class="flex flex-row justify-center cursor-pointer items-center gap-2">
            <Icon name="mdi:help-circle" class="text-white"/>
            <Text class="underline font-bold" color="text-white">
                Lihat panduan penggunaan website
            </Text>
        </div>
    </div>
    <dialog
        v-if="selectedVideo != null"
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': selectedVideo }"
    >
        <div class="rounded-2xl bg-white p-4 w-full lg:w-[50%] min-h-[50%] lg:min-h-[60%] flex flex-col">
            <div class="flex flex-row justify-between items-center mb-2">
                <Text :typography="Typography.Label" class="font-semibold">{{ selectedVideo.title }}</Text>
                <btn 
                    class="btn btn-square flex justify-center bg-transparent text-content-non-essential"
                    @click="closeModal"
                >
                    <Icon name="mdi:close"/>
                </btn>
            </div>
            <iframe 
                class="flex-1"
                :src="youtubeSourceToEmbed(selectedVideo.source)" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen
            ></iframe>
        </div>
    </dialog>
</template>

<script setup lang="ts">

    const articles = useGetAllArticles()
    const ebooks = useGetAllEbooks()
    const videos = useGetAllVideos()

    const selectedVideo = ref<Media | null>(null)
    const closeModal = () => {
        selectedVideo.value = null
    }

    useEventListener("keyup", (event: Event) => {
        if ((event as KeyboardEvent).code == "Escape") {
            closeModal()
        }
    })
</script>