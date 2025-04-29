import { baseUrl, eventsQuantity } from "../variables.js"

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`)
    const event = await response.json()
    return event.filter(events => events.type === "CreateEvent" || events.type === "PushEvent").slice(0, eventsQuantity)
}

export { getEvents }