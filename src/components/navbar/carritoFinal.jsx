import React, { useContext, useEffect, useState } from 'react';
import { ArticulosContext } from '../context/providerArticulos';
import lenceriaimg from '../../imagenes/lenceria/lenceria1.jpg'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const CarritoFinal = () => {
    const { items, setItems } = useContext(ArticulosContext);
   const [camposLlenos, setCamposLlenos] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [totalPrecio, setTotalPrecio] = useState(0);
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        tarjeta: '',
        fechaVencimiento: '',
        codigoSeguridad: '',
        direccionEnvio: '',

    });


 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };





    const handleSubmit = (e) => {
        e.preventDefault();

        const empty = Object.entries(formData)
            .filter(([key, value]) => !value.trim())
            .map(([key, value]) => key);


        const emailRegex = /\S+@\S+\.\S+/;
        const invalidFields = [];
        if (!emailRegex.test(formData.email)) {
            invalidFields.push('email');
        }


        if (formData.direccionEnvio.length < 7) {
            invalidFields.push('direccionEnvio');
        }


        setEmptyFields(empty);


        if (empty.length === 0 && invalidFields.length === 0) {
            console.log(formData);
            handleShow();
        }
    };

    const { nombre, apellido, direccion, email, datosTarjeta, fechaVencimiento, codigoSeguridad, direccionEnvio } = formData;


    const countItemOccurrences = items.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
    }, {});

    useEffect(() => {
        const initialTotal = items.reduce((total, item) => total + item.precio, 0).toFixed(2);
        setTotalPrecio(parseFloat(initialTotal));
    }, [items]);

    useEffect(() => {
        const camposLlenos = Object.values(formData).every(value => value.trim() !== '');
        setCamposLlenos(camposLlenos);
    }, [formData]);

    return (
        <div className='px-5 py5'>
            <div className='cajaCarritoFIanl d-flex'>
                <div className='izquierdoDetalle px-5 py-4'>
                    <h1>Detalle de la compra</h1>
                    {items.length === 0 ? 'No hay artículos' : (
                        <>
                            {items.reduce((uniqueItems, currentItem) => {
                                if (!uniqueItems.some(item => item.id === currentItem.id)) {
                                    uniqueItems.push(currentItem);
                                }
                                return uniqueItems;
                            }, []).map((ele) => (
                                <div key={ele.id} className='d-flex my-4'>
                                    <img src={ele.img} alt={ele.alt} />
                                    <p className='mt-4 ms-3'> {countItemOccurrences[ele.id] || 1} </p>
                                    <p className='mt-4 ms-3'>{ele.alt}</p>
                                    <p className='mt-4 ms-3'>{ele.precio} $</p>
                                </div>
                            ))}


                        </>
                    )}
                    {items.length > 0 ? <div className='d-flex cajabotonVaciar'>

                        <h2>Total: {totalPrecio}$</h2>
                        <button className='d-flex justify-content-end btn botonVaciar ms-5' onClick={() => setItems([])}>
                            vaciar carrito
                        </button>
                    </div> : ' '}


                </div>

                <div className='derechoCarritoFinal'>
                    <h2>Detalles de Pago</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={nombre} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" name="apellido" value={apellido} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="direccion" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="direccion" name="direccion" value={direccion} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tajeta " className="form-label">Número de Tarjeta</label>
                            <input type="number" className="form-control" id="tarjeta" name="tarjeta" value={formData.tarjeta} onChange={handleInputChange} required />

                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="fechaVencimiento" className="form-label">Fecha de Vencimiento</label>
                                <input type="date" className="form-control" id="fechaVencimiento" name="fechaVencimiento" value={fechaVencimiento} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="codigoSeguridad" className="form-label">Código de Seguridad</label>
                                <input type="number" className="form-control" id="codigoSeguridad" name="codigoSeguridad" value={codigoSeguridad} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="direccionEnvio" className="form-label">Dirección de Envío</label>
                            <input type="text" className="form-control" id="direccionEnvio" name="direccionEnvio" value={direccionEnvio} onChange={handleInputChange} required />
                        </div>
                        <button onClick={handleShow} type="submit" className="btn btn-primary" disabled={!camposLlenos}>Finalizar compra</button>


                    </form>
                    {emptyFields.length > 0 && (
                        <div className="mt-3 alert alert-danger" role="alert">
                            Por favor, complete los siguientes campos: {emptyFields.join(', ')}
                        </div>
                    )}
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>COMPRA EXITOSA</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};