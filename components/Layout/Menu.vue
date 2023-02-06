<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
//import popover component
import Popover from "~/components/Message/Popover.vue";

interface MenuProps {
  lastUpdate: string;
  totalOnline: number;
  workload: number;
  style: string | Object;
}

const props = defineProps<MenuProps>();

//check for dark and light mode settings
onMounted(() => {
  var themeToggleDarkIcon: any = document.getElementById(
    "theme-toggle-dark-icon"
  );
  var themeToggleLightIcon: any = document.getElementById(
    "theme-toggle-light-icon"
  );

  // Change the icons inside the button based on previous settings
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    // document.body.style.backgroundColor = 'red'

    themeToggleLightIcon.classList.remove("hidden");
  } else {
    // document.body.style.backgroundColor = 'green'

    themeToggleDarkIcon.classList.remove("hidden");
  }

  var themeToggleBtn: any = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", function() {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        // document.body.style.backgroundColor = 'red'

        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        // document.body.style.backgroundColor = 'green'
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  });
});
</script>
<template>
  <nav
    class="bg-slate-100 px-2 sm:px-4 py-3.5 dark:bg-slate-800 fixed w-full z-20 top-0 left-0 border-b border-zinc-200 dark:border-gray-600"
  >
    <div class="container flex flex-wrap items-center justify-around mx-auto">
      <a href="https://aq3d.com/" class="flex items-stretch px-1 md:px-12">
        <img
          src="~/assets/images/aq3d.png"
          class="object-cover max-w-full transition-all duration-200 cursor-pointer hover:grayscale h-12 mr-3 md:h-16 sm:h-6"
          alt="A3QD"
        />

        <!-- span logo title-->
        <!-- <span class="text-md font-semibold whitespace-nowrap dark:text-white">
          Server App</span
        >-->
      </a>
      <div class="flex md:order-2">
        <a
          href="#"
          data-tooltip-target="tooltip-discord-2"
          class="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
          data-popover-target="popover-discord"
        >
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="discord"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M524.5 69.84a1.5 1.5 0 0 0 -.764-.7A485.1 485.1 0 0 0 404.1 32.03a1.816 1.816 0 0 0 -1.923 .91 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.14-30.6 1.89 1.89 0 0 0 -1.924-.91A483.7 483.7 0 0 0 116.1 69.14a1.712 1.712 0 0 0 -.788 .676C39.07 183.7 18.19 294.7 28.43 404.4a2.016 2.016 0 0 0 .765 1.375A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.063-.676A348.2 348.2 0 0 0 208.1 430.4a1.86 1.86 0 0 0 -1.019-2.588 321.2 321.2 0 0 1 -45.87-21.85 1.885 1.885 0 0 1 -.185-3.126c3.082-2.309 6.166-4.711 9.109-7.137a1.819 1.819 0 0 1 1.9-.256c96.23 43.92 200.4 43.92 295.5 0a1.812 1.812 0 0 1 1.924 .233c2.944 2.426 6.027 4.851 9.132 7.16a1.884 1.884 0 0 1 -.162 3.126 301.4 301.4 0 0 1 -45.89 21.83 1.875 1.875 0 0 0 -1 2.611 391.1 391.1 0 0 0 30.01 48.81 1.864 1.864 0 0 0 2.063 .7A486 486 0 0 0 610.7 405.7a1.882 1.882 0 0 0 .765-1.352C623.7 277.6 590.9 167.5 524.5 69.84zM222.5 337.6c-28.97 0-52.84-26.59-52.84-59.24S193.1 219.1 222.5 219.1c29.67 0 53.31 26.82 52.84 59.24C275.3 310.1 251.9 337.6 222.5 337.6zm195.4 0c-28.97 0-52.84-26.59-52.84-59.24S388.4 219.1 417.9 219.1c29.67 0 53.31 26.82 52.84 59.24C470.7 310.1 447.5 337.6 417.9 337.6z"
            ></path>
          </svg>
          <span class="sr-only">Join Discord community</span>
        </a>
        <a
          href="#"
          data-tooltip-target="tooltip-youtube"
          class="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
          data-popover-target="popover-youtube"
        >
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
            ></path>
          </svg>
          <span class="sr-only">Flowbite YouTube</span>
        </a>
        <button
          id="theme-toggle"
          type="button"
          class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
          data-popover-target="popover-darkmode"
        >
          <Popover
            id="popover-darkmode"
            title="Dark / Light Mode"
            description="Click the button, to switch the theme. It's very engaging.
                Right?"
          />

          <Popover
            id="popover-discord"
            title="Discord Server"
            description="Soon.."
          />

          <Popover
            id="popover-youtube"
            title="YouTube Channel"
            description="Soon.."
          />

          <svg
            id="theme-toggle-dark-icon"
            class="md:m-0 w-5 h-5 hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            class="md:m-0 w-5 h-5 hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center mr-5 ml-3 md:ml-0 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div class="md:order-3 w-2/5 ml-1 mx-auto md:w-1/5 md:m-0">
        <div class="mb-2">
          <div
            id="alert-5"
            class="flex py-1 md:py-2 bg-slate-200 rounded-lg dark:bg-gray-700"
            role="alert"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-5 h-5 ml-1 text-gray-700 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Info</span>
            <div
              class="ml-2 md:mt-0.5 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              Currently
              <a
                href="#"
                class="font-semibold underline hover:text-gray-800 dark:hover:text-white"
              >{{ totalOnline }}</a
              >
              Players are online
            </div>
          </div>
        </div>
        <div>
          <div class="w-full bg-slate-200 rounded-full dark:bg-gray-700">
            <div
              id="percentage
            "
              class="text-xs font-medium text-center p-1 leading-none rounded-full text-blue-600 bg-blue-200 dark:text-blue-300 dark:bg-blue-900"
              :style="style"
              data-popover-target="popover-server"
            >
              {{ workload.toFixed(2) }}%
            </div>
            <Popover
              id="popover-server"
              title="Server Workload"
              description="The workload refers to the capacity of the server
            regarding the number of players online. The higher the workload, the
            more players are on the server."
            />
          </div>
        </div>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-2"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-2 mt-4 border border-gray-100 rounded-lg bg-slate-200 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-700 dark:tex dark:border-gray-700"
        >
          <span class="text-black text-xs dark:text-white"> Last Update: </span>
          <span
            class="text-gray-800 text-xs font-medium inline-flex items-center rounded dark:text-gray-300"
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
            {{ lastUpdate }}
          </span>
        </ul>
      </div>
    </div>
  </nav>
  <slot />
</template>

<style scoped></style>
