export function LongTxt({ txt, length = 100, className = "", style = {} }) {
    return <p className={className} style={style}>{txt.length > length ? txt.substring(0, length) + '...' : txt}</p>
}