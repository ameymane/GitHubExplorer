import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {FavoritesContext} from '../contextApi/FavoritesContext';

const repositories = [
  {
    id: '1',
    name: 'awesome-project',
    stars: 128,
    forks: 42,
    description: 'A revolutionary project that changes how we code',
    language: 'TypeScript',
  },
];

const ProfileScreen = () => {
  const {isDarkMode, toggleDarkMode} = useContext(FavoritesContext);

  const toggleMode = () => {
    toggleDarkMode(prevMode => !prevMode);
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      {/* Header */}
      <View
        style={[
          styles.headerContainer,
          isDarkMode ? styles.darkHeader : styles.lightHeader,
        ]}>
        <Image
          source={
            isDarkMode
              ? require('../components/assets/images/github-white.png')
              : require('../components/assets/images/github.png')
          }
          style={styles.headIcon}
        />
        <Text
          style={[
            styles.headTxt,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          Explorer
        </Text>
      </View>
      <View
        style={[
          styles.profileHeader,
          isDarkMode ? styles.darkProfileHeader : styles.lightProfileHeader,
        ]}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../components/assets/images/icons/avatar.png')}
          />
        </View>
        <Text
          style={[
            styles.username,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          johndoe
        </Text>
        <Text
          style={[
            styles.fullName,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          John Doe
        </Text>
        <Text
          style={[styles.bio, isDarkMode ? styles.darkBio : styles.lightBio]}>
          Senior Software Engineer at Tech Corp. Building amazing things with
          code!
        </Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              42
            </Text>
            <Text
              style={[
                styles.statLabel,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              Repositories
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              1.2k
            </Text>
            <Text
              style={[
                styles.statLabel,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              Followers
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              890
            </Text>
            <Text
              style={[
                styles.statLabel,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              Following
            </Text>
          </View>
        </View>
      </View>

      {/* Repositories Section */}
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          Repositories
        </Text>
        <FlatList
          data={repositories}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.repoCard,
                isDarkMode ? styles.darkRepoCard : styles.lightRepoCard,
              ]}>
              <View style={styles.repoTopRow}>
                <Text
                  style={[
                    styles.repoName,
                    isDarkMode ? styles.darkText : styles.lightText,
                  ]}>
                  {item.name}
                </Text>
                <View style={styles.repoStats}>
                  <Text
                    style={[
                      styles.repoStat,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}>
                    ⭐ {item.stars}
                  </Text>
                  <Text
                    style={[
                      styles.repoStat,
                      isDarkMode ? styles.darkText : styles.lightText,
                    ]}>
                    🍴 {item.forks}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.repoDescription,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}>
                {item.description}
              </Text>
              {item.language ? (
                <Text style={styles.repoLanguage}>{item.language}</Text>
              ) : null}
            </View>
          )}
        />
      </View>
      {/* Mode Toggle Button */}
      <TouchableOpacity style={styles.modeBtn} onPress={toggleMode}>
        <Text style={styles.modeBtnText}>{isDarkMode ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  // Header styles
  headerContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  darkHeader: {
    backgroundColor: '#222',
  },
  lightHeader: {
    backgroundColor: '#fff',
  },
  headIcon: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  headTxt: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 15,
  },
  // Text color variants
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  // Profile Header styles
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  darkProfileHeader: {
    backgroundColor: '#333',
  },
  lightProfileHeader: {
    backgroundColor: '#fafafa',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 16,
    color: '#555',
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  darkBio: {
    color: '#ccc',
  },
  lightBio: {
    color: '#777',
  },
  editButton: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007aff',
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    width: '80%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },
  // Section styles
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  repoCard: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  darkRepoCard: {
    backgroundColor: '#333',
    borderColor: '#444',
  },
  lightRepoCard: {
    backgroundColor: '#f9f9f9',
  },
  repoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  repoStats: {
    flexDirection: 'row',
  },
  repoStat: {
    marginLeft: 12,
    fontSize: 14,
  },
  repoDescription: {
    fontSize: 14,
    marginVertical: 4,
  },
  repoLanguage: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#666',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  modeBtn: {
    position: 'absolute',
    bottom: '10%',
    right: 20,
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeBtnText: {
    fontSize: 24,
    color: '#fff',
  },
});
