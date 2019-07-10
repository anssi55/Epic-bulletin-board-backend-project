import { ValidationError } from "class-validator";


class ErrorHandler {

    public handleValidationErrors(e: ValidationError[]) {
        var list = [];
        for (var i in e) {
        if ( e.hasOwnProperty(i)) {
            list.push(e[i].constraints)
        }
        }

        return  {
            "type": "Validation error",
            "title": "Your request parameters didn't validate.",
            "invalid-params": [ list
                              ]
            }

    }

}
export default ErrorHandler;