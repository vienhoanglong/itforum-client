import { Link, useNavigate } from "react-router-dom";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import { Button, ButtonGoogle } from "components/button";
import { FormGroup } from "components/common";
import { IconEyeToggle } from "components/icons";
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import useToggleValue from "hooks/useToggleValue";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
interface SignInFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("").required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 characters"),
});
export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const {isLoading} = useLoadingStore()
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
      <p className="mb-6 text-xs font-normal text-center text-text3 lg:mb-8">
        Don't have an account?{" "}
        <Link to="/sign-up" className="font-medium underline text-primary">
          Sign up
        </Link>
      </p>
      <ButtonGoogle text="Sign in with google"></ButtonGoogle>
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
        <Button className="w-full" kind="primary" type="submit" isLoading={isLoading}>
          Sign in
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
