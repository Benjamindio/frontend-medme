import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import {addPhotoOrdonnance} from '../reducers/user';


export default function SnapScreen({navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [photoData, setPhotoData] = useState ([]);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();
    console.log(photoData)
    setPhotoData([...photoData,photo.uri])
    dispatch(addPhotoOrdonnance(photo.uri))

 }
  if (!hasPermission || !isFocused) {
    return <View />;
  };

  return (
    <Camera type={type} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
          style={styles.button}
        >
          <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <FontAwesome name='times' size={25} color='#ffffff'/>
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome name='circle-thin' size={95} color='#ffffff' />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
});



//   formData.append('photoFromFront', {
//     uri: photo.uri,
//     name: 'photo.jpg',
//     type: 'image/jpeg',
//   });

//   fetch('http://192.168.1.103:3000/upload', {
//     method: 'POST',
//     body: formData,
//   }).then((response) => response.json())
//     .then((data) => {
//       console.log('data photo',data)
//       data.result && console.log(data.uri);
//       dispatch(addPhoto(data.url));
//   });
