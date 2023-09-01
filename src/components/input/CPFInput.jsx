import { useState } from "react";
import InputMask from "react-input-mask";
import { validate } from "cpf-checker";

var storageData = [] || JSON.parse(localStorage.getItem("users")).map(
  (user) => user.cpf
);

console.log(storageData)
const CpfInput = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    onChange(newValue);

    if (newValue.length === 11 && !storageData.includes(newValue)) {
      setIsValid(true); // Valida o CPF quando o input tem 11 dígitos
    } else {
      setIsValid(false); // Reseta a validação se o input não tiver 11 dígitos
    }
  };

  return (
    <div>
      <InputMask
        id="cpf"
        name="cpf"
        required
        className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
        mask="999.999.999-99"
        value={value}
        onChange={handleInputChange}
      />
      {!isValid && (
        <p className="text-red-500 text-sm mt-1">
          Número de CPF inválido. Verifique os dígitos digitados.
        </p>
      )}
      {/* {!isValid && <p className="text-red-500 mt-1">CPF inválido</p>} */}
    </div>
  );
};

export default CpfInput;
