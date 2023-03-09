const rmvDoubleQuotes = (string) => {
    return string.replace(/["]+/g, '');
};

module.exports = {
    rmvDoubleQuotes,
};