import { CartProvider } from "./contexts/useCart";
import { AuthProvider } from "./contexts/useUser";

export function Providers({ children }) {
  return <AuthProvider><CartProvider>{children}</CartProvider></AuthProvider>;
}
