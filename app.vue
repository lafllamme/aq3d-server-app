<script setup lang="ts">
type serverType = {
  [key: string]: any // 👈️ variable keys
}
const servers: serverType = ref<serverType>([])
const { data }: { data: serverType } = await useFetch('/api/serverData')

const getCurrentDate = () => {
  const addZ = (n: string) => {
    return parseInt(n) < 10 ? '0' + n : '' + n
  }
  const now = new Date()

  let M = now.getMonth().toString()
  let D = now.getDate().toString()
  let Y = now.getFullYear()
  let h = now.getHours().toString()
  let m = now.getMinutes().toString()
  let s = now.getSeconds().toString()

  // add zero in front of numbers < 10
  D = addZ(D)
  m = addZ(m)
  h = addZ(h)
  s = addZ(s)
  return `${M + 1}/${D}/${Y} ${h}:${m}:${s}`
}

let lastUpdate = ref<string>(getCurrentDate())
let onlineStatus = ref<boolean>(true)
let totalOnline = ref<number>(0)
let workload = ref<number>(0)
let style = ref<string>('')

//assign apiData to apiRef
servers.value = data

//create apiHandler as function that calls and returns the apiData
const apiHandler = async () => {
  const { data }: { data: any } = await useFetch('/api/serverData')

  console.log('I got called')

  //calculate statistics
  const serverStatistics = await totalWorkload(servers).then((result) => result)
  const online = await checkOnline(servers)

  if (online !== servers.value.value.length) {
    onlineStatus.value = false
  } else {
    onlineStatus.value = true
  }

  //assign statistics to totalOnline and workload
  totalOnline.value = serverStatistics.sum
  workload.value = serverStatistics.workload
  style.value = `width: ${workload.value.toFixed(2)}%`
  lastUpdate.value = getCurrentDate()
  console.log(servers.value, 'servers.value')
  console.log('debug', servers.value.value.length, online)
  console.log('onlineStatus', onlineStatus.value)

  return data
}

//setInterval to call apiHandler every 10-50s asynchroniously
setInterval(async () => {
  servers.value = await apiHandler()
}, Math.floor(Math.random() * (50000 - 10000 + 1) + 10000))

//if every server.Connections is over 3, set onlineStatus to true
const checkOnline = async (server: any) => {
  console.log('Checking online status')
  server = servers.value.value

  //we have two servers that are always online, so we start with 2
  const online = server.reduce((total: number, server: any) => {
    if (server.Connections > 3) {
      return total + 1
    } else {
      return total
    }
  }, 2)
  return online
}
//calculate total server workload
const totalWorkload = async (servers: any) => {
  //calculate total workload
  console.log('calculating workload')
  const server = servers.value.value

  //for each server.Connections, add to total
  const sum = server.reduce(
    (total: number, server: any) =>
      total + (server.Connections ? server.Connections : 0),
    0
  )
  //divide amount of server connection by total space of 3600
  const workload = (sum / 3600) * 100
  const statistics = {
    sum,
    workload,
  }
  return statistics
}
const serverStatistics = await totalWorkload(servers).then((result) => result)

//assign statistics to totalOnline and workload
totalOnline.value = serverStatistics.sum
workload.value = serverStatistics.workload ? serverStatistics.workload : 0
style.value = workload.value
  ? `width: ${workload.value.toFixed(2)}%`
  : 'width: 33%'

console.log('style', style.value)

//check for dark mode in localstorage
onMounted(() => {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
<template>
  <LayoutMenu
    :last-update="lastUpdate"
    :total-online="totalOnline"
    :workload="workload"
    :style="style"
  >
    <div
      class="py-14 mt-12 md:py-8 md:mt-6 mx-auto text-center bg-slate-200 dark:text-white dark:bg-gray-900"
    >
      <div class="py-8 mt-6 md:mt-6 md:py-12">
        <MessageInfo />
        <HeadingWelcome />
        <ServerStatus :server-status="onlineStatus" />
      </div>

      <div class="py-5 px-10 mb-5">
        <div id="accordion-open" data-accordion="open">
          <h2 id="accordion-open-heading-1">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-open-body-1"
              aria-expanded="true"
              aria-controls="accordion-open-body-1"
            >
              <span class="flex items-center"
                ><svg
                  class="w-5 h-5 mr-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                What is AQ3D Server Status?</span
              >
              <svg
                data-accordion-icon
                class="w-6 h-6 rotate-180 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-1"
            class="hidden"
            aria-labelledby="accordion-open-heading-1"
          >
            <div
              class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                AQ3D Server Status is an open-source service of interactive
                requests built on top of the offical AQ3D Server API including
                statistics and more.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-3">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-open-body-3"
              aria-expanded="false"
              aria-controls="accordion-open-body-3"
            >
              <span class="flex items-center"
                ><svg
                  class="w-5 h-5 mr-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Are there any updates in planning regarding the pages
                content?</span
              >
              <svg
                data-accordion-icon
                class="w-6 h-6 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-3"
            class="hidden"
            aria-labelledby="accordion-open-heading-3"
          >
            <div
              class="p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                We are currently working on different statistics and more
                features. If you have any suggestions, please contact us.
                Otherwise, please make sure to check this site from time to
                time.
              </p>
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                However, we actually recommend using both Flowbite, Flowbite
                Pro, and even Tailwind UI as there is no technical reason
                stopping you from using the best of two worlds.
              </p>
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                Learn more about these technologies:
              </p>
              <ul class="pl-5 text-gray-500 list-disc dark:text-gray-400">
                <li>
                  <a
                    href="https://flowbite.com/pro/"
                    class="text-blue-600 dark:text-blue-500 hover:underline"
                    >Flowbite Pro</a
                  >
                </li>
                <li>
                  <a
                    href="https://tailwindui.com/"
                    rel="nofollow"
                    class="text-blue-600 dark:text-blue-500 hover:underline"
                    >Tailwind UI</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PlayerTable :server-data="servers.value" />

      <LayoutFooter />
    </div>
  </LayoutMenu>
</template>
