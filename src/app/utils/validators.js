export default function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        switch (validateMethod) {
        case "isRequired":
            if (data.trim() === "") return config.message;
            break;
        case "isEmail": {
            const emailReg = /^\S+@\S+\.\S+$/g;
            if (!emailReg.test(data)) return config.message;
            break;
        }
        case "isPass": {
            const passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{4,}$/g;
            if (!passReg.test(data)) return config.message;
            break;
        }
        case "isMin":
            if (data.length < config.value) return config.message;
            break;
        default:
            break;
        }
    };
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) errors[fieldName] = error;
            console.log(errors[fieldName], error);
        }
    }
    return errors;
}
