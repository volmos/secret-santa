
interface SuccessResult<T> {
    success: true;
    data: T;
}

interface ErrorResult {
    success: false;
    errorCode: string;
    errorMessage: string;
}

export type Result<T> = SuccessResult<T> | ErrorResult;

export function successResult<T>(data?: T): SuccessResult<T> {
    return {success: true, data: data!};
}

export function errorResult(errorCode: string, errorMessage: string): ErrorResult {
    return {success: false, errorCode, errorMessage};
}

export function unknownErrorResult(): ErrorResult {
    return errorResult('UNKNOWN_ERROR', 'Ha ocurrido un error desconocido');
}

export function isSuccess<T>(result: Result<T>): result is SuccessResult<T> {
    return result.success;
}

export function isError<T>(result: Result<T>): result is ErrorResult {
    return !result.success;
}