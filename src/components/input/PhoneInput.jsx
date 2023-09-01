import { useState } from "react";
import InputMask from "react-input-mask";
import PhoneNumber from "libphonenumber-js";

const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handlePhoneChange = (event) => {
    const newPhoneNumber = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    setPhoneNumber(newPhoneNumber);

    const parsedPhoneNumber = PhoneNumber(newPhoneNumber, "BR"); // Replace 'BR' with appropriate region code
    setIsValid(parsedPhoneNumber.isValid());
  };

  return (
    <div>
      <InputMask
        mask="+55 (99) 99999-9999" // Replace with the appropriate mask format for your region
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
      />
      {!isValid && (
        <p className="text-red-500 text-sm mt-1">
          Número de telefone inválido. Verifique os dígitos digitados.
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
