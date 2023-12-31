import "./Modal.css";
import { useState } from "react";
import CpfInput from "../input/CPFInput";
import PhoneInput from "../input/PhoneInput";

const Modal = ({ handleClose, show }) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const postData = () => {
    const todayData = JSON.parse(localStorage.getItem("users"));
    var id;
    todayData.length != 0
      ? todayData.findLast((item) => (id = item.id))
      : (id = 0);

    var user = {
      id: id + 1,
      name: name,
      cpf: cpf,
      phone: phone,
      email: email,
    };

    todayData.push(user);
    console.log("phone", phone);
    console.log("user", user);
    localStorage.setItem("users", JSON.stringify(todayData));
  };

  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <div className="grid h-screen place-items-center">
        <div className="rounded-md w-1/3 h-4/5 bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
              Novo Usuário
            </h2>

            <form
              className="mx-auto max-w-lg rounded-lg border group"
              noValidate
            >
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Nome
                  </label>
                  <input
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cpf"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    CPF
                  </label>
                  <CpfInput value={cpf} onChange={setCpf} />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Phone
                  </label>
                  <PhoneInput value={phone} onChange={setPhone} />
                  {/* <input
                    id="phone"
                    type="number"
                    name="phone"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  /> */}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                  />
                  <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    Please enter a valid email address
                  </span>
                </div>

                <button
                  onClick={postData}
                  className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base group-invalid:pointer-events-none group-invalid:opacity-30"
                >
                  Confirm
                </button>
              </div>

              <div className="flex items-center justify-center bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-500">
                  <a
                    href="#"
                    onClick={handleClose}
                    className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    Fechar
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
