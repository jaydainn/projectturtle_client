import React, { useState, useEffect } from "react"
import {Text, View, Dimensions , StyleSheet} from "react-native"
import {Header, Left, Right ,Body, Footer, Spinner} from "native-base"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import moment from "moment"
import "moment/locale/fr"
const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height ,
        zIndex: 0
      },
      bottomBar : {
          width : Dimensions.get('window').width ,
          height : Dimensions.get('window').height/100 * 20 ,
          backgroundColor : "rgba(0,0,0,.7)" , 
          bottom :0 ,
          borderTopLeftRadius : 23,
          borderTopRightRadius : 23,
          zIndex:2,
          position: "absolute",
          padding:"5%"
      }

      
})

const Home = () => {
    const [time , setTime] = useState<any>()
    const [latitude , setLatitude] = useState<any>()
    const [longitude , setLongitude] = useState<any>()

    useEffect(() => {
        moment().locale('fr')
        fetch("https://apiturtleproject.herokuapp.com/api")
            .then((response) => {return response.json()})
            .then((obj) => {setTime(moment().format('LTS')) ; setLatitude(Number(obj[obj.length-1].latitude)*1) ; setLongitude(Number(obj[obj.length-1].longitude)*1)})
        const interval = setInterval(() => {
            fetch("https://apiturtleproject.herokuapp.com/api")
            .then((response) => {return response.json()})
            .then((obj) => {setTime(moment().format('LTS')) ; setLatitude(Number(obj[obj.length-1].latitude) * 1) ; setLongitude(Number(obj[obj.length-1].longitude)*1)})
        },60000)   
    } , [])

    
    

   

    
    return (
        
        <View  >
            <MapView  style={styles.mapStyle} >
                {longitude? 
                <Marker title="🐢" description={time} coordinate={{latitude : latitude , longitude : longitude}} />
                :
                <></>
                
            
            }

                
            
            </MapView>
            <View  style={styles.bottomBar}>
                {time?
                <View>
                    <Text  style={{color: "white" , fontWeight : "800" ,fontSize:34}}>{time}</Text>
                    <Text style={{color: "white" ,fontWeight : "500", fontSize:24}}>Derniere position: </Text>
                    <View style={{paddingBottom :10 , paddingTop : 10}}>
                    <Text style={{color: "white"}}>{latitude}</Text>
                    <Text style={{color: "white"}}>{longitude}</Text>
                    </View>
                </View>
                 :
                <Spinner color="white"></Spinner>
                
            }

                
                
            </View>
            
          
        </View>
      
    )
}





export default Home