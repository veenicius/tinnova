import { Component } from "react";
import Modal from "../Modal/Modal";
import axios from "axios";

var storageData = {};

function refreshPage() {
  window.location.reload(false);
}

async function Penis() {
  axios
    .get("https://private-9d65b3-tinnova.apiary-mock.com/users")
    .then((response) => {
      console.log("axios", response.data);
      storageData = response.data;
      localStorage.setItem("users", JSON.stringify(response.data));
      refreshPage();
    });
}

async function checkData() {
  if (localStorage.getItem("users") === null) {
    await Penis();
  } else {
    console.log("data2:", storageData);
    storageData = JSON.parse(localStorage.getItem("users"));
  }
}

function deleteRow(cpf) {
  const newData = storageData.filter((user) => user.cpf != cpf);
  localStorage.setItem("users", JSON.stringify(newData));
  refreshPage();
}

const GetUserData = () => {
  checkData();
  return (
    <>
      {storageData &&
        storageData.map((user) => (
          <tr key={user.cpf}>
            <td key="1" className="border-t-2 border-gray-200 px-4 py-3">
              {user.name}
            </td>
            <td
              key="2"
              id="cpf"
              className="border-t-2 border-gray-200 px-4 py-3"
            >
              {user.cpf}
            </td>
            <td key="3" className="border-t-2 border-gray-200 px-4 py-3">
              {user.phone}
            </td>
            <td key="4" className="border-t-2 border-gray-200 px-4 py-3">
              {user.email}
            </td>
            <td key="5" className="border-t-2 border-gray-200 px-4 py-3">
              <button
                onClick={() => deleteRow(user.cpf)}
                className="inline-flex text-red-500 bg-white-500 border border-red-500 py-1 px-4 focus:outline-none hover:bg-red-500 hover:text-white rounded"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
    </>
  );
};

class Table extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <section className="text-gray-600 body-font">
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
        </Modal>
        <div className="container px-5 py-24 mx-auto">
          <div className="md flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <button
              onClick={this.showModal}
              className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Adicionar Usuário
            </button>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Nome
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    CPF
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Phone
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Email
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                <GetUserData />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default Table;
