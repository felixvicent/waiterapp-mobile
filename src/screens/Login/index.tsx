import { FormLogin } from "./components/FormLogin";
import { HeaderLogin } from "./components/LoginHeader";
import { Container } from "./styles";

export function Login() {
  return (
    <Container>
      <HeaderLogin />
      <FormLogin />
    </Container>
  );
}
