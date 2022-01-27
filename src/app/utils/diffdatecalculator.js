export default function calculatedatediff(dateadd) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const difference = (new Date() - dateadd) / 1000;
    const date1 = new Date(dateadd);
    const domEnder = (dt) => {
        let a = dt;
        if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
        a = parseInt((a + "").charAt(1));
        return a === 1 ? "st" : a === 2 ? "nd" : a === 3 ? "rd" : "th";
    };

    if (parseInt(difference / 60) < 1) {
        return "1 минуту назад";
    } else if (parseInt(difference / 60) < 5) {
        return "5 минут назад";
    } else if (parseInt(difference / 60) < 10) {
        return "10 минут назад";
    } else if (parseInt(difference / 60) < 30) {
        return "30 минут назад";
    } else if (parseInt(difference / (3600 * 24)) < 1) {
        return (date1.getHours() > 12
            ? date1.getHours() - 12
            : date1.getHours() < 10
            ? "0" + date1.getHours()
            : date1.getHours() + " hours " + (date1.getMinutes() < 10)
            ? "0" + date1.getMinutes()
            : date1.getMinutes() & " minutes");
    } else if (parseInt(difference / (3600 * 24 * 365)) < 1) {
        return (date1.getDate() < 10
            ? "0" + date1.getDate() + domEnder(date1)
            : date1.getDate() +
                  domEnder(date1) +
                  " " +
                  months[date1.getMonth()]);
    }
    return (date1.getDate() < 10
        ? "0" + date1.getDate()
        : date1.getDate() + "." + date1.getMonth() + "." + date1.getFullYear());
}
