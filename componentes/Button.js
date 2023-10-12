import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View
        style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#fff", borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#FF9900" }]}
          onPress={onPress}
        >
          {/* <FontAwesome
            name="picture-o"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          /> */}
          <Text style={[styles.buttonLabel, { color: "#fff", fontSize: 20, fontWeight: "bold" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "secondary") {
    return (
      <View style={styles.buttonWrapper}>
        <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={onPress} >
          <Text style={[styles.buttonLabel, { color: "#000", fontSize: 16 }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }


  if (theme === "loginButton") {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 1,
            borderColor: "#fff",
            borderRadius: 18,
            backgroundColor: 'rgba(255, 153, 0, 0.85)',
            width: '50%',
            height: 50,
            marginHorizontal: 2, // Reducir el margen horizontal para compensar el aumento del ancho del botón
          },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "rgba(255, 153, 0, 0.85)" }]}
          onPress={onPress}
        >
          <Text style={[styles.buttonLabel, { color: "#fff", fontSize: 20, fontWeight: "bold" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }


  return (
    <View style={styles.buttonContainer}>
      {/* <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}> */}
      <Pressable style={styles.button} onPress={onPress} >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonWrapper: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10, // Ajusta según sea necesario
  },
});
