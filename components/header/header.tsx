import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, StyleSheet, Pressable, TouchableOpacity, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useCarrito } from '@/components/context/carrito/carritocontext';

/* Icons */
const icon = require("@/assets/images/logos/logo.png");
import { FontAwesome } from '@expo/vector-icons';


const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { carrito, total } = useCarrito();
  
  const router = useRouter();
  
  /*
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();
  }, []);

  const handleAccountPress = () => {
    if (isLoggedIn) {
      setShowMenu(prev => !prev);
    } else {
      router.push('/login');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowMenu(false);
    router.push('/login');
  };
  */

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.push('/')}>
        <Image source={icon} style={styles.logo} />
      </Pressable>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        placeholderTextColor="#888"
      />

      <View style={styles.headerRight}>
        <View style={styles.iconsMenu}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <FontAwesome name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconsMenu}>
          <TouchableOpacity onPress={() => router.push('/iniciarsesion')}>
            <FontAwesome name="user-circle" size={24} color="black" />
          </TouchableOpacity>
          </View>
      </View>

      {/* 🔽 Sidebar Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.sidebar}>
            <Text style={styles.sidebarTitle}>Carrito</Text>

            <FlatList
              data={carrito}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={{ uri: item.imagen_url }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.nombre}</Text>
                    <Text style={styles.cardPrice}>${item.precio}</Text>
                  </View>
                </View>
              )}
            />

            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>

            <TouchableOpacity style={styles.checkoutButton} onPress={() => {/* lógica para pagar */}}>
              <Text style={styles.checkoutText}>Proceder a la compra</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* va en la linea 72 onPress={handleAccountPress} */}

      
      {/* {showMenu && (
        <View style={styles.dropdownMenu}>
          <Pressable onPress={() => {
            setShowMenu(false);
            router.push('/perfil');
          }}>
            <Text style={styles.menuItem}>Perfil</Text>
          </Pressable>
          <Pressable onPress={() => {
            setShowMenu(false);
            router.push('/misordenes');
          }}>
            <Text style={styles.menuItem}>Mis órdenes</Text>
          </Pressable>
          <Pressable onPress={() => {
            setShowMenu(false);
            router.push('/nosotros');
          }}>
            <Text style={styles.menuItem}>Nosotros</Text>
          </Pressable>

          <Pressable onPress={logout}>
            <Text style={styles.menuItem}>Cerrar sesión</Text>
          </Pressable>
        </View>
      )} */}

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    position: 'relative',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
    marginHorizontal: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconsMenu: {
    marginHorizontal: 10,
  },

  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    zIndex: 99,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 5,
    elevation: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeText: {
    marginTop: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontWeight: 'bold',
    height: 40,
    backgroundColor: 'red',
    width: '100%',
    borderRadius: 8,
  },
  card: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    alignSelf: 'center',
  },
  
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  
  cardContent: {
    flex: 1,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  cardPrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
}
);

export default Header;