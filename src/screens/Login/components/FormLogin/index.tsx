import { useContext, useState } from "react";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import AuthContext from "../../../../context/auth";
import { Container, Inputs, Spacer } from "./styles";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  function handleSubmit() {
    setIsLoading(true);
    login({ email, password });

    setIsLoading(false);
    setEmail("");
    setPassword("");
  }

  return (
    <Container>
      <Inputs>
        <Input
          keyboardType="email-address"
          label="E-mail"
          placeholder="Seu e-mail de acesso"
          value={email}
          onChangeText={setEmail}
        />

        <Spacer />

        <Input
          secureTextEntry
          label="Senha"
          placeholder="Informe sua senha"
          type="password"
          value={password}
          onChangeText={setPassword}
        />
      </Inputs>

      <Button
        fullWidth
        loading={isLoading}
        disabled={!email || !password}
        onPress={handleSubmit}
      >
        Fazer Login
      </Button>
    </Container>
  );
}
