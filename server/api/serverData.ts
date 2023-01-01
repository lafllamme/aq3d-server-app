//we want to fetch asnyc
export default defineEventHandler(async () => {
  //fetch from uri using $fetch from nuxt
  const data = await $fetch('https://game.aq3d.com/api/game/ServerList')
  //return data
  return data
})
