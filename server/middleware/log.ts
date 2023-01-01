export default defineEventHandler((event) => {
  const now = new Date()

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    second: 'numeric',
  }

  const current = now.toLocaleDateString('de-DE', options)

  console.log('New request: ' + event.node.req.url + ' at ' + current)
})
