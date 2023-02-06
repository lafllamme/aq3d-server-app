//we want to fetch asnyc
enum ServerApi {
  apiUrl = "https://game.aq3d.com/api/game/ServerList",
}

const responseFeedback = (status: boolean, err?: Error) => {
  let currDate = new Date();
  let checkTime = currDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  if (status) {
    console.log(`✅ Successful Request 🕓${checkTime}`);
  } else {
    console.error(`❌ Error: ${err} 🕓${checkTime}`);
  }
};

export default defineEventHandler(async () => {
  //fetch from ServerApi
  return await $fetch(ServerApi.apiUrl)
    .then((serverItem) => {
      //successful request
      responseFeedback(true);
      return serverItem;
    })
    .catch((err) => {
      responseFeedback(false, err);
    });
});


