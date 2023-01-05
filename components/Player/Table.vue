<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
type serverType = {
  Name: string
  [key: string]: any // 👈️ variable keys
}
interface PlayerProps {
  serverData: serverType[]
}

//calculate the difference between now and last update
const calculateTime = (time: number) => {
  const now = new Date().getTime()
  time = new Date(time).getTime()
  const difference = now - time
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return `${minutes}m ${seconds}s`
}

const props = defineProps<PlayerProps>()
</script>
<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <div class="flex justify-between items-center pb-4">
      <div>
        <button
          id="dropdownRadioButton"
          data-dropdown-toggle="dropdownRadio"
          class="inline-flex items-center ml-4 text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 h-10 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          <svg
            class="mr-2 w-4 h-4 text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Last 30 days
          <svg
            class="ml-2 w-3 h-3"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div
          id="dropdownRadio"
          class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="top"
          style="
            position: absolute;
            inset: auto auto 0px 0px;
            margin: 0px;
            transform: translate3d(522.5px, 3847.5px, 0px);
          "
        >
          <ul
            class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownRadioButton"
          >
            <li>
              <div
                class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  id="filter-radio-example-1"
                  type="radio"
                  value=""
                  name="filter-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="filter-radio-example-1"
                  class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >Last day</label
                >
              </div>
            </li>
            <li>
              <div
                class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  checked=""
                  id="filter-radio-example-2"
                  type="radio"
                  value=""
                  name="filter-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="filter-radio-example-2"
                  class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >Last 7 days</label
                >
              </div>
            </li>
            <li>
              <div
                class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  id="filter-radio-example-3"
                  type="radio"
                  value=""
                  name="filter-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="filter-radio-example-3"
                  class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >Last 30 days</label
                >
              </div>
            </li>
            <li>
              <div
                class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  id="filter-radio-example-4"
                  type="radio"
                  value=""
                  name="filter-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="filter-radio-example-4"
                  class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >Last month</label
                >
              </div>
            </li>
            <li>
              <div
                class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  id="filter-radio-example-5"
                  type="radio"
                  value=""
                  name="filter-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="filter-radio-example-5"
                  class="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >Last year</label
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          class="block p-2 pl-10 w-40 md:w-80 text-sm mr-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>
    </div>
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-spacing-2"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6">
            <div class="flex items-center">
              Server Name

              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="py-3 px-6">
            <div class="flex items-center">
              Online Status
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="py-3 px-6">
            <div class="flex items-center">
              Current Connections
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <th scope="col" class="py-3 px-6">
            <div class="flex items-center">
              Player Amount
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="py-3 px-6">
            <div class="flex items-center">
              Last Update
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="py-3 px-6">
            <div class="flex items-center">
              Region
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <th scope="col" class="py-3 px-6">Max. Player</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="server in serverData"
          :key="server.Name"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ server.Name === 'Localhost' ? 'Test Server' : server.Name }}
          </th>
          <td class="py-4 px-6">
            <div v-if="server.Connections > 3">
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
                aria-hidden="true"
                class="w-5 h-5 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </td>

          <td class="py-4 px-6">
            {{ server.Connections ? server.Connections : 0 }}
          </td>
          <td class="py-4 px-6">
            {{ server.UserCount ? server.UserCount : 0 }}
          </td>
          <td class="py-4 px-6">
            <span
              class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
            >
              <svg
                aria-hidden="true"
                class="mr-1 w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ calculateTime(server.LastUpdated) }}
            </span>
          </td>
          <td class="py-4 px-6">
            {{ server.Region }}
          </td>
          <td class="py-4 px-6">{{ server.MaxUsers }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
