import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Text, View } from "../../components/Themed";
import InputWithLabel from "../../components/Input";
import CustomButton from "../../components/Button";
import { useProductContext } from "../../context/useProduct";
export default function TabOneScreen() {
  const { addProduct } = useProductContext();
  const [text, setText] = useState("");
  const [quantiy, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const handleAddProduct = async () => {
    if (text === "") {
      alert("Digite o nome do produto!");
      return;
    }
    if (quantiy === "") {
      alert("Digite a quantidade do produto!");
      return;
    }
    if (description === "") {
      alert("Digite a descrição do produto!");
      return;
    }
    const newProduct = {
      id: Date.now(),
      name: text,
      quantity: parseFloat(quantiy),
      description: description,
    };

    await addProduct(newProduct);
    alert("Produto adicionado com sucesso!");
    setText("");
    setQuantity("");
    setDescription("");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar novo produto</Text>
      <View style={styles.line} />
      <View style={styles.inputView}>
        <InputWithLabel
          inputType="default"
          label="Nome do item:"
          placeholder="Digite o nome do produto:"
          value={text}
          onChangeText={setText}
        />
        <InputWithLabel
          label="Quantidade:"
          placeholder="Digite a quantidade do produto:"
          value={quantiy}
          inputType="numeric"
          onChangeText={setQuantity}
        />
        <InputWithLabel
          label="Descricao:"
          inputType="default"
          placeholder="Digite a descricao do produto:"
          value={description}
          onChangeText={setDescription}
        />
        <CustomButton
          title="Salvar"
          onPress={() => {
            handleAddProduct();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputView: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    marginTop: 10,
    borderRadius: 8,
    height: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
