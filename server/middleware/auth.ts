export default defineEventHandler((event) => {
  console.log('Req: ' + event.req.url)
  event.context.auth = { uid: 123 }
});
