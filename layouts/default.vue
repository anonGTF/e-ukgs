<template>
    <div class="w-full h-full bg-background-blue-light">
        <main class="my-0 mx-auto min-h-screen max-w-3xl flex flex-col">
            <div class="mx-4 max-w-300 overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <slot />
            </div>  
        </main>
    </div>
</template>