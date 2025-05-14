import { HandleAuht } from "../components/HadleAuth";

export const Login = () => {
  return (
    <div>
      <HandleAuht
        title="Login"
        buttontext="Login"
        submiting="logining..."
        isregister={false}
      />
    </div>
  );
};
