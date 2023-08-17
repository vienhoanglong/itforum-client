import { Button } from "@/components/button";
import { Label } from "@/components/label";
import IUser from "@/interface/user";
import { getOTP, verifyNewPassword, verifyOTP } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router";

interface AccountSectionProps {
  isEdit: boolean;
  userData: IUser | null;
}

const AccountSection: React.FC<AccountSectionProps> = ({
  isEdit,
  userData,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [inputEmpty, setInputEmpty] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleGetOTP = async () => {
    try {
      const reponse = await getOTP(userData?.email ?? "");
      console.log(reponse);
      toast.success("Send OTP successfullly, 5 minutes left! ", {
        position: "bottom-right",
        autoClose: 300000,
      });
    } catch (err) {
      console.log("Failed to get otp");
    }
  };
  const handleLogout = async () => {
    logout();
    toast.success("Change password successfully! Please sign in again!");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    navigate("/sign-in");
  };
  const handleChangePassword = async () => {
    try {
      if (!newPassword || !confirmPassword || !otpCode) {
        setInputEmpty(true);
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordsMatch(false);
        return;
      }
      const responseVerify = await verifyOTP(userData?.email ?? "", otpCode);
      if (responseVerify.error) {
        setError(responseVerify.error.message);
        setWarning(true);
      } else {
        await verifyNewPassword(
          userData?.email ?? "",
          newPassword,
          confirmPassword
        );
        handleLogout();
      }
    } catch (err) {
      console.log("Error message:");
    }
  };
  return (
    <div
      className={`mb-4 dark:bg-dark2 bg-light3 shadow-sm w-auto rounded-lg p-4 relative overflow-hidden`}
    >
      <div className=" flex justify-between">
        <h2 className="text-base font-bold mb-4">
          Account{" "}
          <span className="text-xs">
            {isEdit ? "" : "(Only show in edit mode)"}
          </span>
        </h2>
      </div>
      {isEdit && (
        <div
          className={`transition-all duration-500 transform origin-top ${
            isEdit ? "max-h-full" : "max-h-0"
          }`}
        >
          <div className="flex flex-wrap max-[920px]:flex-col space-y-4">
            <div className="w-1/2 max-[920px]:w-full flex flex-col justify-start  mt-4 space-y-4 min-w-[120px] mb-4 ">
              <Label
                htmlFor="accountInfo"
                className="text-xs font-semibold mr-2"
              >
                Account infomation:
              </Label>
              <div className="mb-4 flex flex-col  justify-start">
                <label htmlFor="username" className="text-xs">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  readOnly
                  value={userData?.username}
                  className="border w-[170px] border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
                />
              </div>
              <div className="mb-4 flex flex-col justify-start">
                <label htmlFor="password" className="text-xs ">
                  Password:
                </label>
                <input
                  type="text"
                  id="password"
                  readOnly
                  value={"***************"}
                  className="border w-[170px] border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
                />
              </div>
            </div>

            <div className="w-1/2 max-[920px]:w-full flex flex-col space-y-4 min-w-[120px] min-[920px]:pl-5 min-[920px]:pr-10 mb-4 min-[920px]:border-l-2 dark:border-dark1 md:pr-10 max-[920px]:border-t-2 max-[920px]:pt-4">
              <div className=" flex justify-start">
                <Label
                  htmlFor="changePass"
                  className="block text-xs font-semibold mr-2"
                >
                  Change password:
                </Label>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <label htmlFor="major" className="block text-xs  mr-2 ">
                  New password:
                </label>
                <input
                  type="password"
                  id="major"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border w-40 dark:text-white  border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
                />
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="major" className="block text-xs  mr-2 ">
                    Confirm password:
                  </label>
                  <input
                    type="password"
                    id="major"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border dark:text-white  w-40 border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
                  />
                </div>
                {!passwordsMatch && (
                  <div className=" text-xs text-right mt-2 text-red-500">
                    Passwords do not match
                  </div>
                )}
              </div>
              <div className="mb-4 flex justify-between items-center">
                <label htmlFor="major" className="block text-xs  mr-2 ">
                  CODE:
                </label>
                <div className="flex justify-end items-center space-x-2 ml-8">
                  <input
                    type="text"
                    id="major"
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="block border w-28 border-gray-300 dark:bg-dark0 rounded-md px-2 py-1 text-xs"
                  />
                  <button
                    type="submit"
                    className="text-xs ml-2 bg-teal0 rounded-lg p-2"
                    onClick={handleGetOTP}
                  >
                    Get
                  </button>
                </div>
              </div>
              {warning && (
                <div className="text-xs text-right mt-2 text-red-500">
                  {error}
                </div>
              )}
              {inputEmpty && (
                <div className="text-xs text-right mt-2 text-red-500">
                  Please fill out all fields
                </div>
              )}
              <div className="flex justify-end">
                <Button
                  kind="primary"
                  type="submit"
                  size="small"
                  className="text-xs ml-2 bg-mainColor rounded-lg p-2"
                  handle={handleChangePassword}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSection;
