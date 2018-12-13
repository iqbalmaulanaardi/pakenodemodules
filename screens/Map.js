import React, { Component } from 'react';
import { Platform,Text,View } from 'react-native';
import { MapView } from "expo";
import { Constants, Location, Permissions } from 'expo';
class Map extends Component {
  state = {
    region: null,
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    this.getLocationAsync();
    // if (Platform.OS === 'android' && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //   });
    //   alert(this.state.errorMessage)
    // } else {
    //   this.getLocationAsync();
      
    // }
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    const obj = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
    this.setState({ region: obj });
  }
  render() {
    const Marker = MapView.Marker
    console.log('liat ini: ',this.props.navigation.state.params.data);
    if (!this.state.region) {
      return (
        <Text>Loading</Text>
      )
    }else{
      return (
        // <View>
        //   {this.props.navigation.state.params.data.map(elem => 
        //     <Text>{Number(elem.participant.lat)}</Text>
        //   )}
        // </View>  
        <MapView
            style={{ flex: 1 }}
            provider="google"
            initialRegion={{
              latitude: Number(this.props.navigation.state.params.meeting.lat),
              longitude: Number(this.props.navigation.state.params.meeting.lng),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
          

          {this.props.navigation.state.params.data.map(elem => 
            <Marker key={elem.participant._id} title={elem.participant.name} coordinate={{latitude: Number(elem.participant.lat),longitude: Number(elem.participant.lng)}} image={require('../assets/location.png')}/>
          )}
          <Marker key={'0'} title={'Meet me here'} coordinate={{latitude: Number(this.props.navigation.state.params.meeting.lat), longitude: Number(this.props.navigation.state.params.meeting.lng)}} />
           
          </MapView>
      );
    }
    
  }
}

export default Map;