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
        // style={[
        //   styles.buttonContainer,
        //   {
        //     borderWidth: 1,
        //     borderColor: "#fff",
        //     borderRadius: 18,
        //     backgroundColor: '#007bffd9',
        //     width: '50%',
        //     height: 50,
        //     marginHorizontal: 2, // Reducir el margen horizontal para compensar el aumento del ancho del botón
        //   },
        // ]}
      >
        <Pressable
          style={styles.signInButton}
          onPress={onPress}
        >
          <Text style={styles.textWrapper}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }


  return (
    <View style={styles.buttonContainer}>
      {/* <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}> */}
      <Pressable style={styles.signInButton} onPress={onPress} >
        <Text style={styles.textWrapper}>{label}</Text>
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
  signInButton: {
    alignItems: 'center',
    backgroundColor: '#007bffd9',
    border: ' 0.5px solid',
    borderColor: '#dbdbdb',
    borderRadius: '7px',
    display: 'inline-flex',
    width: 100,
    overflow: 'hidden',
    padding: '3px 23px',
    position: 'relative',
  },
  
  textWrapper: {
    color: '#ffffff',
    fontFamily: 'Roboto-Regular',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '-1px',
    position: 'relative',
  }
  
});
