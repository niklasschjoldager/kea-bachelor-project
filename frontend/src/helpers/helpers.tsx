export function addLeadingZero(value: number | string) {

    const formattedValue = typeof(value) === 'number' ? value : parseInt(value)

    if( formattedValue < 10){
        return (("0" + value).slice(-2)).toString()
    }
    return value.toString()
}