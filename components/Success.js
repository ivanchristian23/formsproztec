import React, { useState, useRef } from 'react';
import {View, StyleSheet, Button, Modal, Image, Text, TouchableOpacity, Animated} from 'react-native';
import {AntDesign} from 'react-native-vector-icons';

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const Success = ({ visible, onClose }) => {
    React.useEffect(() => {
      let timeout;
      if (visible) {
        timeout = setTimeout(() => {
          onClose();
        }, 1500);
      }
      return () => clearTimeout(timeout);
    }, [visible, onClose]);
  
    return (
      <ModalPoup visible={visible}>
          <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name='close' size={35} />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/success.png')}
              style={{height: 150, width: 150, marginVertical: 10}}
            />
          </View>
          <View>
          <Text style={{marginVertical: 30, fontSize: 18, textAlign: 'center'}}>
            Your Form was Submitted!
          </Text>
          </View>
          </View>
        </ModalPoup>
    );
  };

export default Success;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});