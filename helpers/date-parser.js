var getDate = function() {
    return new Date();
};

// Converts a date with format '2018-01-28 16:00:00' to '20180128160000'.
var dateToInt = function(date) {
    var dateTime = '';

    dateTime += date.getFullYear();
    dateTime += ('0' + (date.getMonth() + 1)).slice(-2);
    dateTime += ('0' + date.getDate()).slice(-2);
    dateTime += ('0' + date.getHours()).slice(-2);
    dateTime += ('0' + date.getMinutes()).slice(-2);
    dateTime += ('0' + date.getSeconds()).slice(-2);

    return parseInt(dateTime);
}

module.exports = {
    get: getDate,
    toInt: dateToInt
}