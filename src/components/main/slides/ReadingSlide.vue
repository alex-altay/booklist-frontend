<template>
  <div
    id="reading"
    class="relative shrink-0 h-screen flex flex-row justify-between items-center uppercase bg-main-additional"
  >
    <img
      class="relative top-[5vh] h-[85vh] left-[5vw] animate-float"
      src="@/assets/main-page/illustrations/reading.png"
    />
    <div
      class="h-screen min-w-[50vw] shrink-0 portrait:flex portrait:flex-col portrait:items-start bg-[url(@/assets/main-page/forms/slide-one.svg)] bg-no-repeat bg-cover"
    >
      <div
        class="w-[min(100%,95vw)] ml-[45vw] md:ml-[25vw] xl:ml-[20vw] 2xl:ml-[15vw] py-[10vh] text-main-additional text-right md:text-left uppercase"
      >
        <div class="mb-4 text-[5rem] leading-24 font-black">Read a book? <br />Add it to the list</div>
        <div class="pl-25 sm:pl-0 text-wrap">
          If you like, write down your impressions, give it a rating, or note how much time it took
        </div>
      </div>
    </div>
  </div>
</template>
