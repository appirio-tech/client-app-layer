import { CALL_API } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const STEP_GET_REQUEST = 'STEP_GET_REQUEST'
export const STEP_GET_SUCCESS = 'STEP_GET_SUCCESS'
export const STEP_GET_FAILURE = 'STEP_GET_FAILURE'

const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'