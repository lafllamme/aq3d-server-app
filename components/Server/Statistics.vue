<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface StatisticsProps {
  inputQueueLength: number
  gemQueueLength: number
}

const props = defineProps<StatisticsProps>()
</script>

<template>
  <div class="mb-7">
    <div
      class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2"
    >
      <figure
        class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-bl-lg md:rounded-tr-none md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-all duration-300"
      >
        <blockquote
          class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            PVP Queue
          </h3>
          <p class="my-4 font-light">
            This is the amount of players, which are not in a running match and
            joined the pvp queue.
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center space-x-3">
          <img
            class="rounded-full w-9 h-9"
            src="~assets/images/q.png"
            alt="profile picture"
          />
          <div class="space-y-0.5 font-medium dark:text-white text-left">
            <div>{{ inputQueueLength ? inputQueueLength : 0 }} Players</div>
            <div class="text-sm font-light text-gray-500 dark:text-gray-400">
              are searching for a match
            </div>
          </div>
        </figcaption>
      </figure>
      <figure
        class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-bl-none md:rounded-br-lg md:rounded-tr-lg dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-all duration-300"
      >
        <blockquote
          class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            PVP Battle Stats
          </h3>
          <p class="my-4 font-light">
            You can see any related stats to the online matches
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center space-x-3">
          <img
            class="rounded-full w-12 h-9"
            src="~assets/images/pvp.png"
            alt="profile picture"
          />
          <div class="space-y-0.5 font-medium dark:text-white text-left">
            <div>
              {{
                gemQueueLength > 1000
                  ? Math.round(gemQueueLength / 500) + 20
                  : gemQueueLength
              }}
              Players
            </div>
            <div class="text-sm font-light text-gray-500 dark:text-gray-400">
              are currently playing in a match
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped></style>
