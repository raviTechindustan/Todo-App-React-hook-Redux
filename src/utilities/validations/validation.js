import is from 'is_js'
import {isEmpty} from 'lodash'


 export function validator(data) {
    let errors = {}
    console.log("inside validator")
    if(is.empty(data.email)) {
        errors.email= "email is required"
    }

    if((data && data.email ) && is.not.email(data.email)) {
        data.email = " Invalid email"
    }
    if(is.empty(data.password)) {
        errors.password = "password is required"
    }

    if(is.empty(data.confirmPassword)) {
        errors.confirmPassword = "confirm password is required"
    }

    if(data.password !== data.confirmPassword) {
        errors.confirmPassword = "password does not match"
    }

    return {
        isValid : isEmpty(errors),
        errors
    }

}