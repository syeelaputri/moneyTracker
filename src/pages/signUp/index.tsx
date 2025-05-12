// halaman sign up

import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {NullPhoto} from '../../assets';
import {Button, Gap} from '../../components/atoms';
import {Header, TextInput} from '../../components/molecules';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';

const SignUp = ({navigation}) => {
  const [photo, setPhoto] = useState(NullPhoto);
  const [photoBased64, setPhotoBased64] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const auth = getAuth();
    const db = getDatabase();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid), {
          fullName: fullName,
          email: email,
          photo: photoBased64,
        });
        showMessage({
          message: 'Registration success',
          type: 'success',
        });
        navigation.navigate('signIn');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };

  const getImage = async () => {
    const result = await launchImageLibrary({
      maxHeight: 100,
      maxWidth: 100,
      quality: 0.5,
      includeBase64: true,
      mediaType: 'photo',
    });

    if (result.didCancel) {
      showMessage({
        message: 'Pilih foto dibatalkan',
        type: 'danger',
      });
    } else {
      const assets = result.assets[0];
      const base64 = `data:${assets.type};base64, ${assets.base64}`;
      const source = {uri: base64};
      setPhotoBased64(base64);
      setPhoto(source);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Header title="Sign Up" />
      <Gap height={24} />
      <View style={styles.contentWrapper}>
        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <View style={styles.addPhoto}>
              <TouchableOpacity activeOpacity={0.5} onPress={getImage}>
                <Image source={photo} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Gap height={26} />
        <TextInput
          label="Full Name"
          placeholder="Type your full name"
          onChangeText={e => setFullName(e)}
        />
        <Gap height={16} />
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          onChangeText={e => setEmail(e)}
        />
        <Gap height={16} />
        <TextInput
          label="Password"
          placeholder="Type your password"
          onChangeText={e => setPassword(e)}
          secureTextEntry={true}
        />
        <Gap height={24} />
        <Button label="Continue" onPress={onSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 24,
  },
  profileContainer: {
    marginTop: 26,
    alignItems: 'center',
  },
  profile: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    borderWidth: 1,
    borderColor: '#8D92A3',
    borderStyle: 'dashed',
  },
  addPhoto: {
    backgroundColor: '#F0F0F0',
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoLabel: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    width: 40,
    textAlign: 'center',
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
  },
});

export default SignUp;
