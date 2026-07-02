export const getPrevButtonTransform = (container: HTMLDivElement) => {
    const containerRect = container.getBoundingClientRect()
    const buttons = Array.from(container.querySelectorAll("button"))
    const prev = [...buttons]
        .reverse()
        .find((button) => button.getBoundingClientRect().left < containerRect.left - 1)
    if (!prev) return null
    const prevRect = prev.getBoundingClientRect()
    return containerRect.left - prevRect.left
}

export const onScrollLeft = (container: HTMLDivElement) => {
    const tranform = getPrevButtonTransform(container)
    if (!tranform) return

    container.scrollTo({
        left: container.scrollLeft - tranform,
    })
}

export const getNextButtonTransform = (container: HTMLDivElement) => {
    const containerRect = container.getBoundingClientRect()
    const buttons = Array.from(container.querySelectorAll("button"))
    const next = buttons.find(
        (button) => button.getBoundingClientRect().right > containerRect.right + 1
    )
    if (!next) return null
    const nextRect = next.getBoundingClientRect()
    return nextRect.right - containerRect.right
}

export const onScrollRight = (container: HTMLDivElement) => {
    const tranform = getNextButtonTransform(container)
    if (!tranform) return

    container.scrollTo({
        left: container.scrollLeft + tranform,
    })
}
