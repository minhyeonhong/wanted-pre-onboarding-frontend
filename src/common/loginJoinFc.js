const validation = (type, value) => {
    let result = false;

    switch (type) {
        case "checkEmail":
            result = /([\w-.]+)@([\w-.]+)$/.test(value);
            break;
        case "checkPasswordLength":
            result = value.length > 7;
            break;
    }
    return result;
}

export { validation }