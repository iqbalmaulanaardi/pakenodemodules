import axios from '../config/axios'

export function fetchMeetings(payload) {
    return (dispatch) => {

        dispatch({type : 'FETCH_MEETINGS_CALL'})

        axios.get('/meetings')
            .then(({ data }) => {
                // console.log(data);
                dispatch({type : 'FETCH_MEETINGS_COMPLETE', payload : data})
            }).catch((err) => {
                // console.log(err);
                dispatch({type : 'FETCH_MEETINGS_ERROR', payload : err})                
            });

    }  
  
}

