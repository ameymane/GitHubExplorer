import React, {useState, useContext} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {FavoritesContext} from '../contextApi/FavoritesContext';

const initialData = [];

const Home = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('All Repositories');
  const [searchQuery, setSearchQuery] = useState('');
  const [repositories, setRepositories] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {favorites, toggleFavorite, isDarkMode, toggleDarkMode} =
    useContext(FavoritesContext);

  const fetchRepositories = async query => {
    setLoading(true);
    setError('');

    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        setError('No internet connection. Please check your network.');
        setRepositories([]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`,
      );
      if (!response.ok) {
        throw new Error(
          `GitHub API Error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        setRepositories([]);
      } else {
        setRepositories(data.items);
      }
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  const onSearchChange = text => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      fetchRepositories(text.trim());
    } else {
      setRepositories([]);
      setError('');
    }
  };

  const toggleMode = () => {
    toggleDarkMode(prevMode => !prevMode);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setRepositories([]);
    setError('');
  };

  const openRepoDetails = repository => {
    console.log('Repo card pressed:', repository.name);
    navigation.navigate('RepoDetails', {repository});
  };

  const renderRepoCard = ({item}) => (
    <View
      style={[
        styles.repoCard,
        isDarkMode ? styles.darkCard : styles.lightCard,
      ]}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => openRepoDetails(item)}
        activeOpacity={0.8}>
        <View style={styles.topRow}>
          <Image
            source={{uri: item.owner.avatar_url}}
            style={styles.repoAvatar}
          />
          <View style={styles.repoTextContainer}>
            <Text
              style={[
                styles.repoName,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              {item.name}
            </Text>
            <Text style={styles.repoOwner}>{item.owner.login}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.repoDescription,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          {item.description || 'No description'}
        </Text>
        <View style={styles.repoStats}>
          <Text
            style={[styles.statText, {color: isDarkMode ? '#fff' : '#000'}]}>
            ⭐ {item.stargazers_count}
          </Text>
          <Text
            style={[styles.statText, {color: isDarkMode ? '#fff' : '#000'}]}>
            🍴 {item.forks_count}
          </Text>
          <Text style={styles.language}>{item.language || 'N/A'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}>
        <Image
          source={
            favorites.some(fav => fav.id === item.id)
              ? require('../components/assets/images/icons/heart-filled.png')
              : require('../components/assets/images/icons/heart-outline.png')
          }
          style={[
            styles.favoriteIcon,
            {tintColor: isDarkMode ? '#fff' : '#000'},
          ]}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
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

      {/* Search */}
      <View
        style={[
          styles.searchContainer,
          isDarkMode ? styles.darkSearch : styles.lightSearch,
        ]}>
        <Image
          source={require('../components/assets/images/icons/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search GitHub Repositories"
          placeholderTextColor={isDarkMode ? '#AAA' : '#827C7C'}
          style={[
            styles.textInput,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Text style={{color: isDarkMode ? '#fff' : '#000', marginLeft: 10}}>
              Clear
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.tabsContainer}>
        {['All Repositories', 'Favorites'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && {
                  color: isDarkMode ? '#fff' : '#000',
                  fontWeight: 'bold',
                },
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error ? (
        <Text
          style={[
            styles.errorText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          {error}
        </Text>
      ) : null}
      {loading && (
        <Text
          style={[
            styles.loadingText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}>
          Loading repositories...
        </Text>
      )}

      {selectedTab === 'Favorites' ? (
        favorites.length === 0 ? (
          <Text
            style={[
              styles.emptyText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}>
            No favourite repositories
          </Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={item => item.id.toString()}
            renderItem={renderRepoCard}
          />
        )
      ) : repositories.length === 0 ? (
        searchQuery.trim() === '' ? (
          <Text
            style={[
              styles.emptyText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}>
            Start typing to search for repositories.
          </Text>
        ) : (
          <Text
            style={[
              styles.emptyText,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}>
            No repositories found
          </Text>
        )
      ) : (
        <FlatList
          data={repositories}
          keyExtractor={item => item.id.toString()}
          renderItem={renderRepoCard}
        />
      )}

      {/* Mode Button */}
      <TouchableOpacity
        style={[
          styles.modeBtn,
          {backgroundColor: isDarkMode ? '#fff' : '#000'},
        ]}
        onPress={toggleMode}>
        <Text
          style={[styles.modeBtnText, {color: isDarkMode ? '#000' : '#fff'}]}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkBackground: {backgroundColor: '#121212'},
  lightBackground: {backgroundColor: '#f5f5f5'},
  headerContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  darkHeader: {backgroundColor: '#222'},
  lightHeader: {backgroundColor: '#fff'},
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
  darkText: {color: '#fff'},
  lightText: {color: '#000'},
  searchContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  darkSearch: {backgroundColor: '#333'},
  lightSearch: {backgroundColor: '#fff'},
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#827C7C',
  },
  loadingText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
    color: 'red',
  },
  repoCard: {
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  darkCard: {backgroundColor: '#222'},
  lightCard: {backgroundColor: '#fff'},
  cardContent: {
    pointerEvents: 'box-only',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repoAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  repoTextContainer: {
    flexDirection: 'column',
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  repoOwner: {
    fontSize: 12,
    color: '#555',
  },
  repoDescription: {
    fontSize: 14,
    marginVertical: 8,
  },
  repoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    marginRight: 10,
  },
  language: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#888',
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 16,
    color: '#555',
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
