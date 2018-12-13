import React, {Component} from 'react';
import { View, ActivityIndicator, FlatList, Text } from 'react-native';
import { connect } from 'react-redux'
import { fetchMeetings } from "../store/meetingsAction";
import axios from '../config/axios'
import MeetingCard from '../components/MeetingCard'

class Meetings extends Component {
    componentDidMount = async () => {
      this.props.fetchMeetings()
    }

    showDetail = async (title, meeting) => {
      const { data } = await axios.get(`/meetings/users/${meeting._id}`,{})
      this.props.navigation.navigate('Map', { data, title, meeting })
    }
    
    render(){
      if(this.props.loading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
      return(
        <View style={{flex: 1}}>
          {/* <Text> {JSON.stringify(this.props.user)} </Text> */}
          <FlatList
            data={this.props.meetings}
            renderItem={({item}) => {
              return (<MeetingCard
                key={item._id}
                meeting={item}
                showDetail={ this.showDetail }
              ></MeetingCard>)}
            }
            keyExtractor={({_id}, index) => _id}
          />
        </View>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    loading : state.meetings.loading,
    meetings : state.meetings.meetings,
    error : state.meetings.error,
    user: state.login.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchMeetings: () => {dispatch(fetchMeetings())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Meetings)
