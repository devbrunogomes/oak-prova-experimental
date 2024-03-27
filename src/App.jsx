import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //Estado para armazenar o nome do produto
  const [productName, setProductName] = useState("");

  //Estado para armazenar a descrição do produto
  const [productDescription, setProductDescription] = useState("");

  //Estado para armazenar o preço do produto
  const [productPrice, setProductPrice] = useState(0);

  //Estado para armazenar se produto está a venda
  const [productDisponibility, setProductDisponibility] = useState(false);

  //Estado que vai armazenar um array de todos os produtos Registrados
  const [products, setProducts] = useState([]);

  //Estado que vai armazenar um toggle que vai definir qual das sections deve ser exibida
  const [shouldRender, setShouldRender] = useState(false)

  //UseEffect que vai pegar os valores que estiverem no armazenamento local
  useEffect(() => {
    const productsOnLocalStorage = localStorage.getItem("products");

    if (productsOnLocalStorage) {
      setProducts(JSON.parse(productsOnLocalStorage))
    }
  }, [])
  

  //Para lidar com o submit do form
  function handleFormSubmit(event) {
    //Para evitar o reload da página
    event.preventDefault();

    //Para atualizar o array de produtos com os valores dos inputs
    const newProducts = [
      ...products,
      {
        id: new Date().getTime(),
        name: productName,
        description: productDescription,
        price: productPrice,
        disponibility: productDisponibility,
      },
    ];

    //Variavel que vai ter os valores dos produtos organizado do menor para o maior
    let productsOrdened = newProducts.sort((a, b) => a.price - b.price);

    setProducts(productsOrdened);

    //Para guardar no armazenamento Local
    localStorage.setItem("products", JSON.stringify(productsOrdened));


    // Para limpar os valores dos campos
    setProductName("");
    setProductDescription("");
    setProductPrice(0);
    setProductDisponibility(false);

    //Para exibir a lista de produtos
    setShouldRender(true)
  }

  //------------------------------------------------------------
  function handleAddNewProductButton(event) {
    event.preventDefault()

  }

  return (
    <main>
      <section className={`${shouldRender ? 'displayNone' : 'formContainer'}`}>
        <h1>CADASTRO DE PRODUTO</h1>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {/* Nome do Produto */}
          <label htmlFor="productName">Nome do Produto</label>
          <input
            type="text"
            value={productName}
            id="productName"
            required
            onChange={(event) => {
              //Para mudar o estado do nome do produto
              setProductName(event.target.value);
              console.log(productName);
            }}
          />

          {/* Descrição do Produto */}
          <label htmlFor="productDescription">Descrição</label>
          <input
            type="text"
            value={productDescription}
            id="productDescription"
            required
            onChange={(event) => {
              //Para mudar o estado da descrição do produto
              setProductDescription(event.target.value);
            }}
          />

          {/* Valor do Produto */}
          <label htmlFor="productPrice">Valor do Produto</label>
          <input
            type="number"
            value={productPrice}
            id="productPrice"
            required
            onChange={(event) => {
              //Para mudar o estado do preço do produto
              setProductPrice(event.target.value);
            }}
          />

          {/* Disponibilidade do Produto */}
          <label htmlFor="productDisponibility">Disponivel pra venda?</label>
          <select
            name=""
            id="productDisponibility"
            required
            onChange={(event) => {
              setProductDisponibility(event.target.value);
            }}
          >
            <option value="">-</option>
            <option value={true}>Sim</option>
            <option value={false}>Não</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </section>

      <section className={`${shouldRender ? 'listContainer' : 'displayNone'}`}>
        <h1>NOME</h1>

        <h1>VALOR</h1>

        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <div><strong>{product.name}</strong></div>
                <div><span>R${product.price}</span></div>
              </li>
            );
          })}
        </ul>

        <button onClick={(event) => {
          event.preventDefault()
          setShouldRender(false)
        }}>Cadastrar Novo Produto</button>
      </section>
    </main>
  );
}

export default App;
