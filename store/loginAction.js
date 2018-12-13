import axios from '../config/axios'


export default function(email, password) {
    return (dispatch) => {

        dispatch({type : 'LOGIN_CALL'})

        axios.post('/login', {
            email,password
        })
            .then((result) => {
                dispatch({type : 'LOGIN_SUCCESS', payload : result.data.user})
                console.log('goin',result.data)
                

            })
            .catch((error) => {
                dispatch({type : 'LOGIN_ERROR' , payload : error.response.data.message})
                console.log(error.response);
            });

    }

}