const db = new PouchDB('persist-test')

async function main() {
    await render()
}
async function get() {
    try {
        return await db.get('count')
    }
    catch (e) {
        return { _id: 'count', value: 0 }
    }
}
async function render() {
    const c = await get()
    document.getElementById('count').innerText = c.value
}
async function incr() {
    let c = await get()
    c = { ...c, value: c.value + 1 }
    await db.put(c)
    await render()
}
async function decr() {
    let c = await get()
    c = { ...c, value: c.value - 1 }
    await db.put(c)
    await render()
}
async function reset() {
    await db.remove(await get())
    // await db.clear()
    await render()
}

main().catch((e) => {
    console.error('main: uncaught error', e)
})