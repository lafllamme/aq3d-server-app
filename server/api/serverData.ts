//we want to fetch asnyc
enum ServerApi {
  url = "https://game.aq3d.com/api/game/ServerList",
}

export default defineEventHandler(async () => {
  //fetch from uri using $fetch from nuxt
  return await $fetch(ServerApi.url)
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error))
});
