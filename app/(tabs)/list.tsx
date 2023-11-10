import { StyleSheet, FlatList, TouchableOpacity, Button } from "react-native";
import { useProductContext } from "../../context/useProduct";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View } from "../../components/Themed";
import { useNavigation, Link } from "@react-navigation/native";
import { useState } from "react";
import Item from "../../components/Item";

export default function TabTwoScreen({ navigation }: { navigation: any }) {
  const [open, setOpen] = useState(false);
  const { products, deleteProduct } = useProductContext();
  const handleDeleteProduct = async (id: number, qntd: number) => {
    if (id === undefined) {
      return;
    }
    if (qntd > 0) {
      alert("Não é possivel deletar um produto com quantidade maior que 0");
      return;
    }
    alert("Produto deletado com sucesso!");
    await deleteProduct(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item
            productId={item.id}
            title={item.name}
            description={item.description}
            quantity={item.quantity.toString()}
            onEditPress={() => {}}
            onDeletePress={() => {
              handleDeleteProduct(item.id, item.quantity);
            }}
            id={0}
            onEditSave={() => {}}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
  },
  modal: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  item: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
  },
  quantity: {
    fontSize: 16,
    marginTop: 8,
    color: "green",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
});
