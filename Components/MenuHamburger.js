import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MenuHamburger = ({ onMenuItemPress, isVisible, onClose }) => {
  const threeQuarterScreenWidth = Dimensions.get('window').width * 3 / 4;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { width: threeQuarterScreenWidth }]}>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={40} color='#154C79' />
          </TouchableOpacity>

          
          <View style={styles.profileItemContainer}>
            <Icon name="user-alt" size={60} color='#154C79' />
            <Text style={styles.menuItemTextProfile}>UserName</Text>
          </View>

          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onMenuItemPress("Home")}
          >
            <Icon name="home" size={20} color="#154C79" />
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onMenuItemPress("Je commande")}
          >
            <Icon name="shopping-cart" size={20} color="#154C79" />
            <Text style={styles.menuItemText}>Je commande</Text>
          </TouchableOpacity>

         
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onMenuItemPress("Mes Commandes")}
          >
            <Icon name="book-medical" size={20} color="#154C79" />
            <Text style={styles.menuItemText}>Mes commandes</Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onMenuItemPress("Ma fiche Santé")}
          >
            <Icon name="file-medical-alt" size={20} color="#154C79" />
            <Text style={styles.menuItemText}>Ma fiche Santé</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onMenuItemPress("Profil")}
          >
            <Icon name="user-alt" size={20} color="#154C79" />
            <Text style={styles.menuItemText}>Profil</Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onMenuItemPress("Se deconnecter")}
          >
            <Icon name="sign-out-alt" size={20} color="#bc0000" />
            <Text style={styles.menuItemTextLogout}>Se deconnecter</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#D9D9D9',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 30,
  },
  profileItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,  
    marginBottom: 70, 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15, 
    color: '#154C79'
  },
   menuItemTextLogout: {
    fontSize: 18,
    marginLeft: 15, 
    color: '#bc0000'
  },
  menuItemTextProfile: {
    fontSize: 25,
    marginLeft: 30, 
    color: '#154C79',
  },
});

export default MenuHamburger;
