import React, {useState} from 'react';
import {View, StyleSheet, Button, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
// import CustomButton from '../utils/CustomButton';
import RNFS from 'react-native-fs';

export default function Camera() {
  const [status, setstatus] = useState(true);
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const captureHandle = async () => {
    function generateRandomInteger(max) {
      return String(Math.floor(Math.random() * max) + 1);
    }

    let num = generateRandomInteger(10000000);

    try {
      const data = await takePicture();
      console.log('SAlam');
      console.log(data.uri);
      const filePath = data.uri;
      const newFilePath = RNFS.ExternalDirectoryPath + 'salam' + num + '.jpg';
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={
          status ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }
        style={styles.preview}
        flashMode={RNCamera.Constants.FlashMode.on}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 40,
            backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => captureHandle()}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 40,
            backgroundColor: 'cyan',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => (status ? setstatus(false) : setstatus(true))}>
          <Text>Change camera</Text>
        </TouchableOpacity>
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
