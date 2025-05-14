import { HandleAuht } from "../components/HadleAuth";

export const SignUp = () => {
  return (
    <div>
      <HandleAuht title="SignUp" submiting="Signing up..." buttontext="SignUp" isregister={true} />
    </div>
  );
};
