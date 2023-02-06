import { createContext, ReactElement, useState } from "react";
import { PayloadToken } from "../pages/Services";
import jwt_decode from "jwt-decode";

interface AuthContextProps {
  children: ReactElement;
}

export interface AuthContextInterface {
  savedToken: string | null;
  onAuthChange: (token: string | null) => void;
  validTimeToken: string | null;
  tokenFunction: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  savedToken: null,
  validTimeToken: null,
  onAuthChange: (token: string | null) => {},
  tokenFunction: (token: string | null) => {},
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  /**
   * Mise en place de la logique interne de notre context
   * Cela permet de mettre à dispo une fonction pour mettre
   * à jour l'état de connection de notre utilisateur
   * et d'accéder au token via notre context
   */
  let recupToken: string | null;
  recupToken = localStorage.getItem("accesstoken");
  const [token, SetToken] = useState<string | null>(
    recupToken ? recupToken : null
  );
  const [tokenExpired, setTokenExpired] = useState<string | null>(null);

  const handleAuthChange = (token: string | null) => {
    SetToken(token);
  };

  // Fonction contextuelle permettant de vérifier l'expiration d'un token
  const tokenFunction = (token:string | null) => {

    if (token) {
        const decoded: PayloadToken = jwt_decode(token);
        if(Date.now() <= decoded.exp * 1000) {
            setTokenExpired("token valide")
            return true;
        }else{
            setTokenExpired("token expiré")
            return false;
        }
    }
  }
  // Récupération d'une variable utilisable de token expiré
  console.log("état d'expiration du token",tokenExpired)

  const contextValue = {

    savedToken: token,
    validTimeToken: tokenExpired,
    onAuthChange: handleAuthChange,
    tokenFunction: tokenFunction
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
};
