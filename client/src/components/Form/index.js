import React, { useState } from "react";
import "./form.css";
import { submitResponse } from "../../utils/api";

function Form() {
  const [formState, setFormState] = useState({
    SrNo:"",
    to: "",
    from: "",
    date: "",
    status: "",
    products: [
      {
        srNo: "",
        item: "",
        make: "",
        quantity: "",
        uom: "",
        price: "",
        discount: "",
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formState);

    submitResponse(formState)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split("-");
    const newProducts = [...formState.products];
    newProducts[index][field] = value;
    setFormState((prevState) => ({
      ...prevState,
      products: newProducts,
    }));
  };

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addProduct = () => {
    setFormState((prevState) => ({
      ...prevState,
      products: [
        ...prevState.products,
        {
          srNo: "",
          item: "",
          make: "",
          quantity: "",
          uom: "",
          price: "",
          discount: "",
        },
      ],
    }));
  };

  return (
    <div className="form-main-wrapper">
      <div className="form-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-form-title">
            <h2 className="">Quotation Form</h2>
            <p>Fill out the form below!</p>
          </div>

          <div className="form-mb-3">
            <label htmlFor="to" className="form-form-label">To</label>
            <input
              type="text"
              name="to"
              id="to"
              className="form-form-input"
              required
              value={formState.to}
              onChange={handleMainChange}
            />
          </div>

          <div className="form-mb-3">
            <label htmlFor="from" className="form-form-label">From</label>
            <input
              type="text"
              name="from"
              id="from"
              className="form-form-input"
              required
              value={formState.from}
              onChange={handleMainChange}
            />
          </div>

          <div className="form-mb-3">
            <label htmlFor="date" className="form-form-label">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-form-input"
              required
              value={formState.date}
              onChange={handleMainChange}
            />
          </div>

          <div className="form-mb-3">
            <label htmlFor="status" className="form-form-label">Status</label>
            <input
              type="text"
              name="status"
              id="status"
              className="form-form-input"
              required
              value={formState.status}
              onChange={handleMainChange}
            />
          </div>

          {formState.products.map((product, index) => (
            <div key={index} className="form-product-wrapper">
              <div className="form-mb-3">
                <label htmlFor={`srNo-${index}`} className="form-form-label">SR NO</label>
                <input
                  type="text"
                  name={`srNo-${index}`}
                  id={`srNo-${index}`}
                  className="form-form-input"
                  required
                  value={product.srNo}
                  onChange={handleChange}
                />
              </div>

              <div className="form-mb-3">
                <label htmlFor={`item-${index}`} className="form-form-label">Item</label>
                <input
                  type="text"
                  name={`item-${index}`}
                  id={`item-${index}`}
                  className="form-form-input"
                  required
                  value={product.item}
                  onChange={handleChange}
                />
              </div>

              <div className="form-mb-3">
                <label htmlFor={`make-${index}`} className="form-form-label">Make</label>
                <input
                  type="text"
                  name={`make-${index}`}
                  id={`make-${index}`}
                  className="form-form-input"
                  required
                  value={product.make}
                  onChange={handleChange}
                />
              </div>

              <div className="form-mb-3">
                <label htmlFor={`quantity-${index}`} className="form-form-label">Quantity</label>
                <input
                  type="text"
                  name={`quantity-${index}`}
                  id={`quantity-${index}`}
                  className="form-form-input"
                  required
                  value={product.quantity}
                  onChange={handleChange}
                />
              </div>

              <div className="form-mb-3">
                <label htmlFor={`uom-${index}`} className="form-form-label">UOM</label>
                <input
                  type="text"
                  name={`uom-${index}`}
                  id={`uom-${index}`}
                  className="form-form-input"
                  required
                  value={product.uom}
                  onChange={handleChange}
                />
              </div>

              <div className="form-mb-3">
                <label htmlFor={`price-${index}`} className="form-form-label">Price</label>
                <input
                  type="text"
                  name={`price-${index}`}
                  id={`price-${index}`}
                  className="form-form-input"
                  required
                  value={product.price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-mb-3">
                <label htmlFor={`discount-${index}`} className="form-form-label">Discount</label>
                <input
                  type="text"
                  name={`discount-${index}`}
                  id={`discount-${index}`}
                  className="form-form-input"
                  required
                  value={product.discount}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}

          <button type="button" className="form-btn" onClick={addProduct}>Add Product</button>

          <button className="form-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
