export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: "1px solid #545770",
    borderRadius: "12px",
    margin: "0 1px 0 1px",
    backgroundColor: state.isSelected ? state.data.color : "transparent",
    color: state.isSelected ? "#ffffff" : "#000000",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    display: "block",
    maxWidth: "100%",
    backgroundColor: state.isSelected ? state.data.color : "transparent",
    color: state.isSelected ? "#ffffff" : "#000000",
  }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.data.color,
    color: "#ffffff",
  }),
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.data.color,
    color: "#ffffff",
    ":hover": {
      backgroundColor: state.data.color,
      color: "#FFFFFF",
    },
  }),
};
