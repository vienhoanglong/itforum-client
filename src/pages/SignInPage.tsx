import { useNavigate } from "react-router-dom";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import { Button } from "components/button";
import { FormGroup } from "components/common";
import { IconEyeToggle } from "components/icons";
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import useToggleValue from "hooks/useToggleValue";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login, loginGoogle } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import decodeToken from "@/utils/decodeToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface SignInFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("email").required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 characters"),
});
export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const { isLoading } = useLoadingStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  const handleSignIn = async (values: SignInFormData) => {
    try {
      setLoading(true);
      const responseSignIn = await login(values.email, values.password);
      setToken(responseSignIn?.data?.accessToken);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  return (
    <LayoutAuthentication heading="Welcome Back!">
      <div className="flex items-center justify-center w-full py-4 mb-5 text-xs font-semibold gap-x-3 rounded-xl text-text2 dark:text-white">
        <GoogleOAuthProvider clientId="106166759784-gto4fegdleq238nfle0mv5cu222pestp.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const decoded =
                credentialResponse.credential &&
                decodeToken(credentialResponse?.credential);
              console.log(
                "🚀 ~ file: SignInPage.tsx:70 ~ onSuccess={ ~ decoded:",
                decoded
              );
              if (decoded?.hd !== "student.tdtu.edu.vn") {
                return toast(
                  "Chỉ cho phép đăng nhập với mail @student.tdtu.edu.vn"
                );
              }
              const { sub, email, name, picture } = decoded;
              const responseSignInGoogle = await loginGoogle(
                sub,
                email,
                name,
                picture
              );
              setToken(responseSignInGoogle?.data?.accessToken);
              navigate("/");
            }}
            onError={() => {
              toast("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Enter Password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <FormGroup>
          <div className="text-right">
            <span className="inline-block text-sm font-medium text-mainColor">
              Forgot password
            </span>
          </div>
        </FormGroup>
        <Button
          className="w-full"
          kind="primary"
          type="submit"
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
