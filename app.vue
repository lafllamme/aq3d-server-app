<script setup lang="ts">
import type { Ref } from "vue";
import { reactive } from "vue";
import { useIntervalFn } from "@vueuse/core";

enum ServerCapacity {
  maxUsers = 900
}

interface ServerInterface {
  ID: number
  sortIndex: number,
  name: string,
  hostName: string,
  port: number,
  userCount: number,
  maxUsers: number,
  state: true,
  chat: true,
  language: string,
  ip: string,
  localIp: string,
  lastUpdated: string,
  Connections: number,
  alertLevel: number,
  InputQueueLength?: number,
  GEMQueueLength?: number,
  status: number,
  region: string
}

const { data: servers, refresh, pending } = await useFetch("/api/serverData");
const getCurrentDate = () => {
  const addZ = (n: string) => {
    return parseInt(n) < 10 ? "0" + n : "" + n;
  };
  const now = new Date();

  let M = now.getMonth().toString();
  let D = now.getDate().toString();
  let Y = now.getFullYear();
  let h = now.getHours().toString();
  let m = now.getMinutes().toString();
  let s = now.getSeconds().toString();

  // add zero in front of numbers < 10
  D = addZ(D);
  m = addZ(m);
  h = addZ(h);
  s = addZ(s);
  return `${M + 1}/${D}/${Y} ${h}:${m}:${s}`;
};

const serversData: ServerInterface[] = reactive([]);

const statistics = reactive({
  totalOnline: 0,
  onlineStatus: true,
  workload: 0,
  style: "",
  lastUpdate: getCurrentDate(),
  inputQueueLength: 0,
  gemQueueLength: 0
});

const totalOnlineRef: Ref<Number> = toRef(statistics, "totalOnline");
const workloadRef: Ref<Number> = toRef(statistics, "workload");
const styleRef: Ref<String> = toRef(statistics, "style");
const lastUpdateRef: Ref<String> = toRef(statistics, "lastUpdate");
const onlineStatusRef: Ref<Boolean> = toRef(statistics, "onlineStatus");
const inputQueueLengthRef: Ref<Number> = toRef(statistics, "inputQueueLength");
const gemQueueLengthRef: Ref<Number> = toRef(statistics, "gemQueueLength");


const updateServerData = () => {
  serversData.length = 0;
  for (const server of servers.value as ServerInterface[]) {
    serversData.push(server);
  }
};

const updateDate = () => {
  lastUpdateRef.value = getCurrentDate();
};

//for each available connection, add it to the totalOnline
const calculateTotalOnline = () => {
  totalOnlineRef.value = serversData.reduce((acc, server: ServerInterface) => {
    if (server.Connections) {
      return acc + server.Connections;
    } else {
      return acc;
    }
  }, 0);
};
//calculate workload by diving totalOnline by maxUsers times 4 servers
//math round with four decimal places
const calculateWorkload = () => {
  workloadRef.value = (Math.round(
    (totalOnlineRef.value as number / (ServerCapacity.maxUsers * 4)) * 10000
  ) / 10000) * 100;
};

const calculateStyle = () => {
  styleRef.value = `width: ${workloadRef.value.toFixed(2)}%`;
};

const calculateOnlineStatus = () => {
  //check every server in serverData except for id 4 (test server) and id 10 (test server 2)
  //if any of the servers have less than 6 connections, set onlineStatus to false
  //if all servers have more than 6 connections, set onlineStatus to true
  onlineStatusRef.value = serversData.filter(
    (server: ServerInterface) => server.ID !== 4 && server.ID !== 10
  ).every((server: ServerInterface) => server.Connections > 6);
};

const calculateQueue = () => {
  inputQueueLengthRef.value = serversData.reduce((acc, server: ServerInterface) => {
    if (server.InputQueueLength) {
      return acc + server.InputQueueLength;
    } else {
      return acc;
    }
  }, 0);

  gemQueueLengthRef.value = serversData.reduce((acc, server: ServerInterface) => {
    if (server.GEMQueueLength) {
      return acc + server.GEMQueueLength;
    } else {
      return acc;
    }
  }, 0);
};
const checkDarkMode = () => {
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const initialize = () => {
  updateServerData();
  updateDate();
  calculateTotalOnline();
  calculateWorkload();
  calculateStyle();
  calculateOnlineStatus();
  calculateQueue();
};

//get random amount between 10 and 15 seconds
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
onMounted(() => {
  initialize();
  checkDarkMode()
});

useIntervalFn(() => {
  refresh();
  initialize();
}, getRandomInt(10000, 15000));


</script>
<template>
  <LayoutMenu
    :last-update="lastUpdateRef"
    :total-online="totalOnlineRef"
    :workload="workloadRef"
    :style="styleRef">
    <div
      class="py-14 mt-12 md:py-8 md:mt-6 mx-auto text-center bg-slate-200 dark:text-white dark:bg-gray-900"
    >
      <div class="py-8 mt-6 md:mt-6 md:py-12">
        <MessageInfo />
        <HeadingWelcome />
        <ServerStatus :server-status="onlineStatusRef" />
      </div>
      <div class="py-5 px-10 mb-5">
        <ServerStatistics
          :input-queue-length="inputQueueLengthRef"
          :gem-queue-length="gemQueueLengthRef"
        />
        <ServerFAQ />
      </div>
      <PlayerTable :server-data="serversData" />
      <LayoutFooter />
    </div>
  </LayoutMenu>
</template>
<style>
.page-enter-active, .page-leave-active {
  transition: all 0.4s;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>