import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import { OPTIONS } from "@/constants/global";
import IReportCreate from "@/interface/API/IReportCreate";
import { CreateReport } from "@/services/reportService";
import { toast } from "react-toastify";

interface IReportData {
  selectedOptions: string[];
  otherText?: string;
}

interface ModalReportProps {
  closeModal: () => void;
  reportFor: string;
  userId: string;
  idRefer: string;
}

const ModalReport: React.FC<ModalReportProps> = ({
  closeModal,
  reportFor,
  userId,
  idRefer,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [warning, setWarning] = useState<boolean>(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== optionValue)
      );
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
    if (optionValue === "Other" && !selectedOptions.includes("Other")) {
      reset({ otherText: "" });
    }
    setWarning(false);
  };

  const onSubmit = async (data: Record<string, any>) => {
    try {
      if (selectedOptions.length === 0) {
        console.log("Please select at least one option");
        setWarning(true);
        return;
      }

      const requestData: IReportData = {
        selectedOptions,
        ...data,
      };
      const reportData: IReportCreate = {
        createdBy: userId,
        reportBelong: reportFor,
        idReference: idRefer,
        typeReport: requestData.selectedOptions,
        link: `https://itforum-client.vercel.app/${
          reportFor === "Posts"
            ? reportFor.slice(0, 4).toLowerCase()
            : reportFor.toLowerCase()
        }/${idRefer}`,
        ...(requestData.otherText !== null
          ? { otherText: requestData.otherText }
          : {}),
      };
      const response = await CreateReport(reportData);
      if (response.response.data.statusCode === 400) {
        toast.warning(response.response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.success(" Report successfully! ", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
      closeModal();
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-20 text-dark0 dark:text-light0  flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white dark:bg-dark1   dark:text-light0 w-80 h-auto mx-4 p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-bold text-darker">Report</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Select options:
            </label>

            <div className="flex flex-col justify-center">
              {OPTIONS.map((option) => (
                <label
                  htmlFor={option}
                  className="mr-2 mb-2 text-sm flex items-center"
                  key={option}
                >
                  <input
                    type="checkbox"
                    id={option}
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={handleOptionChange}
                    className="mr-2"
                    style={{ width: "1.25em", height: "1.25em" }}
                  />
                  {option}
                </label>
              ))}
            </div>
            {warning && (
              <span className="text-red-500">
                Please select at least one option
              </span>
            )}
          </div>
          {selectedOptions.includes("Other") && (
            <div className="mb-4">
              <label className="block mb-2" htmlFor="otherText">
                Other:
              </label>
              <input
                type="text"
                id="otherText"
                className="w-full break-words py-2 px-3 border border-gray-300 dark:bg-dark1 rounded-lg"
                {...register("otherText", { required: true })}
              />
              {errors.otherText && (
                <span className="text-red-500">Please enter a value</span>
              )}
            </div>
          )}
          <div className="flex justify-start space-x-2 ">
            <Button
              type="submit"
              size="small"
              className="  text-xs bg-teal2 hover:bg-teal0 text-white "
            >
              Send
            </Button>
            <Button
              type="submit"
              size="small"
              className="  text-xs bg-red2 hover:bg-red0 text-white "
              handle={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalReport;
