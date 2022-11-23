import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import PageContainer from '../components/PageContainer'
import { FontAwesome } from '@expo/vector-icons'
import colors from '../consts/colors'
import { searchUsers } from '../utils/actions/userActions'
import DataItem from '../components/DataItem'
import { useDispatch, useSelector } from 'react-redux'
import { setStoredUsers } from '../store/userSlice'

const NewChatScreen = (props) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState()
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Voltar" onPress={() => props.navigation.goBack()} />
          </HeaderButtons>
        )
      },
      headerTitle: 'Nova conversa',
    })
  }, [])

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!searchTerm || searchTerm === '') {
        setUsers()
        setNoResultsFound(false)
        return
      }

      setIsLoading(true)

      const usersResult = await searchUsers(searchTerm)
      delete usersResult[userData.userID]
      setUsers(usersResult)

      if (Object.keys(usersResult).length === 0) {
        setNoResultsFound(true)
      } else {
        setNoResultsFound(false)

        dispatch(setStoredUsers({ newUsers: usersResult }))
      }

      setIsLoading(false)
    }, 500)

    return () => clearTimeout(delaySearch)
  }, [searchTerm])

  const userPressed = (userID) => {
    props.navigation.navigate('ChatList', {
      selectedUserId: userID,
    })
  }

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={15} color={colors.midBlue} />

        <TextInput
          placeholder="Buscar usuário"
          style={styles.searchBox}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={'large'} color={colors.midBlue} />
        </View>
      )}

      {!isLoading && !noResultsFound && users && (
        <FlatList
          data={Object.keys(users)}
          renderItem={(itemData) => {
            const userID = itemData.item
            const userData = users[userID]

            return (
              <DataItem
                title={`${userData.nome} ${userData.sobrenome}`}
                subTitle={userData.sobre}
                image={userData.profilePicture}
                onPress={() => userPressed(userID)}
              />
            )
          }}
        />
      )}

      {!isLoading && noResultsFound && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome
            name="question"
            size={55}
            color={colors.midBlue}
            style={styles.noResultsIcon}
          />
          <Text style={styles.noResultsText}>Usuários não encontrados!</Text>
        </View>
      )}

      {!isLoading && !users && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome
            name="users"
            size={55}
            color={colors.midBlue}
            style={styles.noResultsIcon}
          />
          <Text style={styles.noResultsText}>
            Digite um nome para buscar por usuário
          </Text>
        </View>
      )}
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteSmoke,
    height: 30,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: '100%',
  },
  noResultsIcon: {
    marginBottom: 20,
  },
  noResultsText: {
    color: colors.midBlue,
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
})

export default NewChatScreen
