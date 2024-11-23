function getReaderLevelAndLabel(pageCount) {
    let result = { levelClass: "", label: "" };

    if (pageCount > 500) {
        result.levelClass = "serious-reader";
        result.label = "Serious Reader";
    } else if (pageCount > 200) {
        result.levelClass = "decent-reader";
        result.label = "Decent Reader";
    } else if (pageCount > 100) {
        result.levelClass = "light-reader";
        result.label = "Light Reader";
    }

    return result
}

export function ReaderLevel({ pageCount }) {
    // if less than 100 dont show the reader level
    if (pageCount <= 100) return <React.Fragment></React.Fragment>

    let level = getReaderLevelAndLabel(pageCount)

    return (
        <div className={`reader-level ${level.levelClass}`}>
            <span>For {level.label}s</span>
        </div>
    )
}