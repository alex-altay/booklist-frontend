<template>
  <div
    id="presenting"
    class="relative h-screen landscape:max-w-screen min-w-screen flex shrink-0 justify-between items-center bg-main-additional"
  >
    <div
      class="h-screen min-w-[720px] w-[max(720px,60vw)] bg-[url(@/assets/main-page/forms/slide-three.svg)] bg-no-repeat bg-cover"
    >
      <div
        class="relative max-w-[min(85%,100vw)] 2xl:px-35 pl-10 pt-10 2xl:pt-25 text-main-additional text-left uppercase"
      >
        <div class="mb-4 text-[5rem] leading-24 font-black">Now you can look at the stats</div>
        <div class="max-w-[70%]">
          You can see if you’ve started reading more, how much of it you enjoyed, and how it compares to the last year
        </div>
      </div>
    </div>

    <div class="relative w-[min(100vw,1060px)] flex justify-center items-center">
      <img
        class="relative top-[7vh] lg:right-[5vw] max-w-[min(90vw,1000px)] h-[72vh] animate-float object-contain"
        src="@/assets/main-page/illustrations/presenting.png"
      />
    </div>
  </div>
</template>
