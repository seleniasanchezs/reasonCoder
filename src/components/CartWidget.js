import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { ArticulosContext } from './context/providerArticulos';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const CartWidget = () => {

  
  const navigate = useNavigate();
  const { items, setItems } = useContext(ArticulosContext);
  const [open, setOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [totalPrecio, setTotalPrecio] = useState(0); 

  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);


  useEffect(() => {
    const initialTotal = items.reduce((total, item) => total + item.precio, 0).toFixed(2);
    setTotalPrecio(parseFloat(initialTotal)); // Convertir a número nuevamente
  }, [items]);

  const notify = (item) =>
    toast.success('Se realizo la compra correctamente ' + item, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const finalizarCompra = () => {
    handleClose();
    notify();
    navigate('/carritoFinal');
  };

  const handleAdd = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, count: (item.count || 0) + 1 } : item
      )
    );
  };






  const handleAddItem = (item) => {
    const cantidadAgregada = items.filter((i) => i.alt === item.alt).length;
    if (cantidadAgregada < item.stock) {
      notify(item.alt, "agregó");
      const nuevosArticulos = [...items];
      nuevosArticulos.push(item);
      setItems(nuevosArticulos);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item.id]: (prevQuantities[item.id] || 0) + 1
      }));
      // Actualizar el total de precios al agregar un nuevo artículo
      const nuevoTotal = totalPrecio + item.precio;
      setTotalPrecio(nuevoTotal);
    } else {
      // Notificar al usuario que no se pueden agregar más artículos
      toast.error(`No se pueden agregar más "${item.alt}", se ha alcanzado el límite de stock`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  
  const handleRemoveItem = (item) => {
    const itemIndex = items.findIndex((i) => i.id === item.id);
    if (itemIndex !== -1) {
      notify(item.alt, "eliminó");
      const nuevosArticulos = [...items];
      nuevosArticulos.splice(itemIndex, 1);
      setItems(nuevosArticulos);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [item.id]: (prevQuantities[item.id] || 0) - 1
      }));
    }
  };


  return (
    <>
      <div>
        <button className='btn mt-4' onClick={() => setOpen(!open)}>
          <i className="fa-solid fa-cart-shopping"></i> {items.length}
        </button>
      </div>

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Carrito de compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
            {Object.values(
              items.reduce((acc, ele) => {
                if (!acc[ele.id]) {
                  acc[ele.id] = { ...ele, count: 1 };
                } else {
                  acc[ele.id].count++;
                }
                return acc;
              }, {})
            ).map((ele) => (
              <div key={ele.id} className='cajitaCar d-flex justify-content-around mt-2'>
              <img className='fotocarrito' src={ele.img} alt={ele.alt} />
                <p className='cajitaCarNombre mt-2'>{ele.alt}</p>
                <p>{(ele.precio * ele.count).toFixed(2)}</p>

                <p className='btn mascarrito' onClick={() => handleRemoveItem(ele)}>-</p>

                <p className='mt-2'> {ele.count} </p>
                <p className='btn mascarrito' onClick={() => handleAddItem(ele)}>+</p>
              </div>
            ))}
          </div>

          <p className='ms-2 mt-3'>Total: {totalPrecio}</p>

        </Modal.Body>



        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={finalizarCompra}>
            Comprar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}  