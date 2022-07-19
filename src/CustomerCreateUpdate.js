import React, { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";

import CustomersService from './CustomersService';

const customersService = new CustomersService();

const CustomInput = (props) => {
  const changeHandler = (e) => {
    props.updateValue(props.field, e.target.value)
  }
  return (<input className="form-control mb-2" type="text" defaultValue={props.value} onInput={changeHandler} />)
}

const CustomTextArea = (props) => {
  const changeHandler = (e) => {
    props.updateValue(props.field, e.target.value)
  }
  return (<textarea className="form-control mb-2" type="text" defaultValue={props.value} onInput={changeHandler}></textarea>)
}

const CustomerCreateUpdate = (props) => {
  const params = useParams();

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  const setCustomerField = (field, value) => {
    setCustomer({ ...customer, [field]: value });
  }

  useEffect(() => {
    if (params && params.pk) {
      customersService.getCustomer(params.pk).then((c) => {
        setCustomer({
          ...customer,
          firstName: c.first_name,
          lastName: c.last_name,
          email: c.email,
          phone: c.phone,
          address: c.address,
          description: c.description,
        });
      })
    }
  }, []);

  const handleCreate = () => {
    customersService.createCustomer(
      {
        "first_name": customer.firstName,
        "last_name": customer.lastName,
        "email": customer.email,
        "phone": customer.phone,
        "address": customer.address,
        "description": customer.description
      }
    ).then((result) => {
      alert("Customer created!");
    }).catch(() => {
      alert('There was an error! Please re-check your form.');
    });
  }

  const handleUpdate = (pk) => {
    customersService.updateCustomer(
      {
        "pk": pk,
        "first_name": customer.firstName,
        "last_name": customer.lastName,
        "email": customer.email,
        "phone": customer.phone,
        "address": customer.address,
        "description": customer.description
      }
    ).then((result) => {
      console.log(result);
      alert("Customer updated!");
    }).catch(() => {
      alert('There was an error! Please re-check your form.');
    });
  }

  const handleSubmit = (event) => {
    if (params && params.pk) {
      handleUpdate(params.pk);
    }
    else {
      handleCreate();
    }

    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <CustomInput field="firstName" value={customer.firstName} updateValue={setCustomerField}></CustomInput>

        <label>Last Name:</label>
        <CustomInput field="lastName" value={customer.lastName} updateValue={setCustomerField}></CustomInput>

        <label>Phone:</label>
        <CustomInput field="phone" value={customer.phone} updateValue={setCustomerField}></CustomInput>

        <label>Email:</label>
        <CustomInput field="email" value={customer.email} updateValue={setCustomerField}></CustomInput>

        <label>Address:</label>
        <CustomInput field="address" value={customer.address} updateValue={setCustomerField}></CustomInput>

        <label>Description:</label>
        <CustomTextArea field="description" value={customer.description} updateValue={setCustomerField}></CustomTextArea>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default CustomerCreateUpdate;