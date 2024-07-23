import { EError } from "../../service/errors/enum.js";

const handleErrors = () => (error, req, res, next) => {
    switch(error.code){
        case EError.INVALID_TYPES_ERROR:
            return res.send({status: 'error', error: error.name})
        case EError.DATABASE_ERROR:
            return res.send({status: 'error', error: error.name})
        default:
            return res.send({status: 'error', error: 'error no identificado'})
    }
}

export default handleErrors