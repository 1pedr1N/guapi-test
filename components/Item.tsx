import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from './Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useProductContext } from '../context/useProduct';

const Item = ({
  id,
  title,
  description,
  quantity,
  onEditPress,
  onDeletePress,
  onEditSave,
  productId,
}: {
  id: number,
  title: string,
  description: string,
  quantity: string,
  productId: number,
  onEditPress: () => void,
  onDeletePress: () => void,
  onEditSave: (id: number, editedTitle: string, editedDescription: string, editedQuantity: string) => void,
}) => {
  const { products, editProduct } = useProductContext();
  const productToEdit = products.find((product) => product.id === productId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: productId,
    name: productToEdit?.name || '',
    description: productToEdit?.description || '',
    quantity: productToEdit?.quantity || 0,
  });

  const handleSaveChanges = () => {
    editProduct(productId, editedProduct);
    setIsEditing(false);
  };

  return (
    <View style={isEditing ? styles.editingItem : styles.item}>
      <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
        {isEditing ? (
          <View style={styles.editingContainer}>
            <Text style={styles.label}>Descrição do Produto:</Text>
            <TextInput
              style={styles.input}
              value={editedProduct.description}
              onChangeText={(text) =>
                setEditedProduct({ ...editedProduct, description: text })
              }
            />

            <Text style={styles.label}>Quantidade do Produto:</Text>
            <TextInput
              style={styles.input}
              value={editedProduct.quantity.toString()}
              onChangeText={(text) =>
                setEditedProduct({
                  ...editedProduct,
                  quantity: parseInt(text, 10) || 0,
                })
              }
              keyboardType="numeric"
            />

            <CustomButton title="Salvar Alterações" onPress={handleSaveChanges} />
          </View>
        ) : (
          <>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.quantity}>Quantidade: {quantity}</Text>
          </>
        )}
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        {isEditing ? null : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Icon name="edit" size={24} color="blue" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onDeletePress}>
          <Icon name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
    borderColor: '#ccc',
    borderWidth: 1,
    boxShadow: '0px 0px 5px #ccc',
  },
  editingItem: {
    boxShadow: '0px 0px 5px #ccc',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderColor: '#006C3E',
    borderWidth: 2,
  },
  quantity: {
    fontSize: 16,
    marginTop: 8,
    color: 'green',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 16,
    
    borderRadius: 8,
    focusBorderColor: '#006C3E',

  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 16,
  },
  editingContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Item;
