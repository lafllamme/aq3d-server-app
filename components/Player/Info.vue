<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface PlayerProps {
  serverName: string
  playerAmount: number
  maxPlayer: number
  connections: number
}

const props = defineProps<PlayerProps>()
</script>
<template>
  <div class="mt-12 mb-8">
    <div class="overflow-x-auto relative">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Server</th>
            <th scope="col" class="py-3 px-6">Online</th>
            <th scope="col" class="py-3 px-6">Player Amount</th>
            <th scope="col" class="py-3 px-6">Max. Player</th>
            <th scope="col" class="py-3 px-6">Current Connections</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-blue-500 bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ serverName }}
            </th>
            <td class="py-4 px-6">
              <div v-if="connections > 0">
                <svg
                  class="w-5 h-5 text-green-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div v-else>
                <svg
                  class="w-5 h-5 text-red-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </td>
            <td class="py-4 px-6">{{ playerAmount }}</td>

            <td class="py-4 px-6">{{ maxPlayer }}</td>
            <td class="py-4 px-6">{{ connections }}</td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td class="py-4 px-6">White</td>
            <td class="py-4 px-6">Laptop PC</td>
            <td class="py-4 px-6">$1999</td>
          </tr>
          <tr class="bg-white dark:bg-gray-800">
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td class="py-4 px-6">Black</td>
            <td class="py-4 px-6">Accessories</td>
            <td class="py-4 px-6">$99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
