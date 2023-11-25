// multiple db instances work too: 
// const db = localforage.createInstance({name: 'foo'})
//
// persistent storage isn't localstorage vs indexeddb (not sure how I got that idea), but navigator.storage.persist():
// https://web.dev/articles/persistent-storage
//
// there's no built-in sync solution, but periodic pushes are good enough for most single-player games
async function main() {
    await render()
}
async function render() {
    const c = await localforage.getItem('count') ?? 0
    document.getElementById('count').innerText = c
}
async function incr() {
    let c = await localforage.getItem('count')
    c = (c ?? 0) + 1
    await localforage.setItem('count', c)
    await render()
}
async function decr() {
    let c = await localforage.getItem('count')
    c = (c ?? 0) - 1
    await localforage.setItem('count', c)
    await render()
}
async function reset() {
    await localforage.removeItem('count')
    await localforage.clear()
    await render()
}

main().catch((e) => {
    console.error('main: uncaught error', e)
})