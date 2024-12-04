<template>
    <div class="flex flex-row items-center gap-2 sm:gap-4 mt-4">
        <div class="w-12 h-12 rounded-lg bg-gray-300"></div>
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
                6 Ebook Edukasi
            </Button>
            <Button class="flex-1 bg-white/25">
                <Icon name="mdi:movie" size="1.5rem"/>
                18 Video Edukasi
            </Button>
            <Button class="flex-1 bg-white/25">
                <Icon name="mdi:script-text" size="1.5rem"/>
                10 Artikel Edukasi
            </Button>
        </div>
    </div>
    <Spacer height="h-6"/>
    <div class="p-4">
        <Text :typography="Typography.H2"><span class="text-2xl">📚</span> Ebook Edukasi</Text>
        <Spacer height="h-2"/>
        <Text>Ebook penuh warna dengan panduan dan tips lengkap yang bisa diunduh dan dibaca kapan saja.</Text>
        <Spacer height="h-4"/>
        <div class="flex flex-row gap-4 overflow-scroll">
            <div v-for="i in 5">
                <div class="bg-gray-300 rounded-lg w-56 h-80"></div>
                <Spacer height="h-2"/>
                <Text :typography="Typography.Label" class=" font-semibold">Judul Ebook di sini</Text>
            </div>
        </div>
    </div>
    <Spacer height="h-6"/>
    <div class="bg-primary rounded-2xl p-4">
        <Text :typography="Typography.H2" color="text-white"><span class="text-2xl">🎦</span> Video Edukasi</Text>
        <Spacer height="h-2"/>
        <Text color="text-white">Tonton langkah-langkah praktis dan tips sederhana untuk menjaga kesehatan gigi dengan cara yang menyenangkan.</Text>
        <Spacer height="h-4"/>
        <div class="flex flex-row gap-4 overflow-scroll">
            <div v-for="i in 5">
                <div class="bg-gray-300 rounded-lg w-56 h-32"></div>
                <Spacer height="h-2"/>
                <Text 
                    :typography="Typography.Label" 
                    class="font-semibold" 
                    color="text-white"
                >Judul Video di sini</Text>
            </div>
        </div>
    </div>
    <Spacer height="h-6"/>
    <div class="p-4">
        <Text :typography="Typography.H2"><span class="text-2xl">📒</span> Artikel Edukasi</Text>
        <Spacer height="h-2"/>
        <Text>Pelajari lebih banyak tentang kebiasaan sehat, mitos seputar kesehatan gigi, dan wawasan dari para ahli dari artikel-artikel di bawah.</Text>
        <Spacer height="h-4"/>
        <div class="flex flex-row gap-4 overflow-scroll">
            <div v-for="i in 5">
                <div class="bg-gray-300 rounded-lg w-56 h-32"></div>
                <Spacer height="h-2"/>
                <Text :typography="Typography.Label" class=" font-semibold">Judul Artikel di sini</Text>
            </div>
        </div>
    </div>
    <Spacer height="h-6"/>
    <div class="bg-primary rounded-2xl p-6 mb-6">
        <Text :typography="Typography.H1" class="text-center" color="text-white">Saatnya isi Kuesioner 🚀</Text>
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
    </div>
</template>

<script setup lang="ts">
</script>