export function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким Email не найден";
        case "INVALID_PASSWORD":
            return "Пароль указан неверно";
        case "USER_DISABLED":
            return "Пользователь заблокирован в БД";
        default:
            return "Слишком много попыток входа, попробуйте позже.";
    }
}
