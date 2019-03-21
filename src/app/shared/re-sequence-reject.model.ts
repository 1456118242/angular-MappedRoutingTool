export class ReSequenceRejectObj {
    constructor(message?: string, rejectFunctionName?: string, isRequestAgain?: boolean) {
        this.message = message;
        this.rejectFunctionName = rejectFunctionName;
        this.isRequestAgain = isRequestAgain;


    }

    isRequestAgain: boolean;
    message: string;
    rejectFunctionName: string;
}