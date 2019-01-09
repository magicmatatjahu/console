export const CONTENT = "content";

export function isContentModuleDisabled(errors) {
    return checkErrors(errors, errorMessage => isModuleDisabledErrorMessage(errorMessage, CONTENT));
}

function checkErrors(errors, fun) {
    let result = false;

    if (!errors || !errors.length) {
        return result
    }

    for (let err of errors) {
        if (fun(err.message)) {
            result = true;
            break;
        }
    }
    return result;
}

function isModuleDisabledErrorMessage(errorMessage, moduleType) {
    return errorMessage === `The ${moduleType} module is disabled.`;
}
