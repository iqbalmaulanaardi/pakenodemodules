const defaultState = {
    isLogin : false,
    loading : false,
    user : '',
    error : null,
    errorMessage : ''
}

function login (state = defaultState, { type, payload }) {

    switch (type) {
        case 'LOGIN_CALL': {
            return {
                ...state, 
                loading : true
            }
        }

        case 'LOGIN_ERROR' : {
            return {
                ...state,
                loading : false,
                error : true,
                errorMessage : payload
            }
        }
            
        case 'LOGIN_SUCCESS' : {
            console.log('masuk sini');
            return {
                ...state,
                loading : false, 
                isLogin : true, 
                user : payload
            }
        }

        case 'LOGOUT' : {
            localStorage.clear()
            return {
                ...state,
                isLogin : false,
                user : ''
            }
        }

        default: return state
            
    }
}

export default login