import {Image, StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
        navigation.navigate('BottomNavigation');
    }, 3000);
    return () => clearTimeout();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../components/assets/images/github.png')}
        style={styles.logoImg}
      />
      <Text style={styles.logoTxt}>Explorer</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5ee',
  },
  logoImg: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
  },
  logoTxt: {
    fontSize: 22,
    color: '#000',
    fontWeight: '500',
    marginTop: 15,
  },
});
