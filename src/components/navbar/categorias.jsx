import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartWidget } from "../CartWidget";
import { ArticulosContext } from "../context/providerArticulos";
import "react-toastify/dist/ReactToastify.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const Categorias = () => {
  const navigate = useNavigate();
  const { setItems, items, datos, setDatos } = useContext(ArticulosContext);

  const [cuerpo] = useState(["trajedebaño", "lenceria"]);
  const [productosData, setProductosData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const productosCollection = collection(db, "item");
        const productosSnapshot = await getDocs(productosCollection);
        const data = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductosData(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
       
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const filtered = productosData.filter((producto) =>
      producto.alt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, productosData]);
  
  // Establecer productos filtrados en el contexto al cambiar el término de búsqueda
  useEffect(() => {
    setDatos(filteredProducts);
  }, [filteredProducts, setDatos]);
  
  const handleCategoriaClick = async (categoria) => {
    setDatos(productosData.filter((producto) => producto.categoria === categoria));
    navigate(`/${categoria}`);
  };
  
  return (
    <div className="d-flex">
      <div  className="fitroHeader pt-4 mt-1">
        <input
       className="px-2"
          type="text"
          placeholder="Buscar "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
             <CartWidget articulos={items} setArticulos={setItems} />
      </div>
 
      <div className="categorias d-flex pt-4">
        <button className="btn categoria" onClick={() => handleCategoriaClick(cuerpo[0])}>
          Trajes de baño
        </button>
        <button className="btn categoria" onClick={() => handleCategoriaClick(cuerpo[1])}>
          Ropa interior
        </button>
      </div>
    </div>
  );
}