import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Modal = () => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          Bem-vindo ao App de Cadastro de Produtos 

        </Text>
        <Text style={styles.greenText}>Guapi</Text>
        <Text style={styles.modalDescription}>
          Nosso aplicativo permite que você gerencie seus produtos de forma
          eficiente. Você pode adicionar, editar e excluir produtos facilmente.
        </Text>
        <Text style={styles.modalNote}>
          Comece a usar agora mesmo e tenha controle total sobre seus produtos.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greenText: {
    color: "#006C3E",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalNote: {
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default Modal;
