const shortAddress = (address: any) => {
    return address?.slice(0, 6) + "..." + address?.slice(-4);
}

const shortDate = (date: any) => {
    return date?.slice(0, 10);
}

module.exports = {
    shortAddress: shortAddress,
    shortDate: shortDate
};