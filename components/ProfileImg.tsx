import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';


const ProfileImg = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/profileImg.jpg')}
        style={styles.profileImg}
        resizeMode="contain"
      />
    </View>
  )
}

export default ProfileImg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  profileImg: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 15
  }

  });