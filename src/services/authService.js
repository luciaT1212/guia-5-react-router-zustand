import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

const handleAuthError = (errorCode) => {
  const errors = {
    "auth/email-already-in-use": "Este correo ya esta registrado",
    "auth/invalid-email": "Correo electronico invalido",
    "auth/weak-password": "La contrasena debe tener al menos 6 caracteres",
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "Contrasena incorrecta",
    "auth/too-many-requests": "Demasiados intentos. Intenta mas tarde",
    "auth/network-request-failed": "Error de conexion. Verifica tu internet",
    "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
      "La API key de Firebase no es valida",
  };

  return errors[errorCode] || "Error de autenticacion";
};

const normalizeRegisterArgs = (emailOrPayload, passwordArg, displayNameArg) => {
  if (typeof emailOrPayload === "object" && emailOrPayload !== null) {
    return {
      email: emailOrPayload.email?.trim() ?? "",
      password: emailOrPayload.password ?? "",
      displayName: emailOrPayload.name?.trim() ?? emailOrPayload.displayName?.trim() ?? "",
    };
  }

  return {
    email: emailOrPayload?.trim?.() ?? "",
    password: passwordArg ?? "",
    displayName: displayNameArg?.trim?.() ?? "",
  };
};

const normalizeLoginArgs = (emailOrPayload, passwordArg) => {
  if (typeof emailOrPayload === "object" && emailOrPayload !== null) {
    return {
      email: emailOrPayload.email?.trim() ?? "",
      password: emailOrPayload.password ?? "",
    };
  }

  return {
    email: emailOrPayload?.trim?.() ?? "",
    password: passwordArg ?? "",
  };
};

const mapUser = (firebaseUser, fallbackDisplayName = "") => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName || fallbackDisplayName || "",
});

export const registerUser = async (emailOrPayload, passwordArg, displayNameArg) => {
  const { email, password, displayName } = normalizeRegisterArgs(
    emailOrPayload,
    passwordArg,
    displayNameArg
  );

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName,
      });
    }

    return {
      success: true,
      user: mapUser(userCredential.user, displayName),
      firebaseUser: userCredential.user,
    };
  } catch (error) {
    return {
      success: false,
      error: handleAuthError(error.code),
      code: error.code,
    };
  }
};

export const loginUser = async (emailOrPayload, passwordArg) => {
  const { email, password } = normalizeLoginArgs(emailOrPayload, passwordArg);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return {
      success: true,
      user: mapUser(userCredential.user),
      firebaseUser: userCredential.user,
    };
  } catch (error) {
    return {
      success: false,
      error: handleAuthError(error.code),
      code: error.code,
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Error al cerrar sesion",
      code: error.code,
    };
  }
};

export { handleAuthError };
