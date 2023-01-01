//@ts-expect-error we don't have types for flowbite
import flowbite from 'flowbite'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(flowbite)
})
