import { createContext } from "react";

// Contexto separado para evitar el warning de Fast Refresh
const AuthContext = createContext(null);

export default AuthContext;