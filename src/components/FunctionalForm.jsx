import React, { Component } from "react";

import "../styles/Form.css";

function FunctionalForm()
{
	const [state, setState] = React.useState({ name: "", email: "", phone: "", errors: {} });

	const validateField = (fieldName, value) =>
	{
		switch (fieldName)
		{
			case "name":
			{
				if (!value) { return "Name is required"; }
				if (value.length < 2) { return "Minimum length of name is 2 characters"; }
				if (value.length > 20) { return "Maximum length of name is 20 characters"; }

				return "";
			}
			case "email":
			{
				if (!value) { return "Email is required"; }
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { return "Invalid email format"; }

				return "";
			}
			case "phone":
			{
				if (!value) { return "Phone is required"; }
				if (!/^\d+$/.test(value)) { return "Phone must contain only digits"; }
				if (value.length < 10) { return "Minimum length of phone number is 10 digits"; }

				return "";
			}
			default: { return ""; }
		}
	};

	const handleChange = (event) =>
	{
		const { name, value } = event.target;

		if (name === "phone" && value !== "" && !/^\d*$/.test(value)) { return; }

		setState
		(
			(previous) =>
			{
				const next = { ...previous, [name]: value };

				const error = validateField(name, value);
				next.errors = { ...previous.errors, [name]: error };

				return next;
			}
		);
	};

	const handleSubmit = (event) =>
	{
		event.preventDefault();

		const { name, email, phone } = state;
		const fields = { name, email, phone };
		const errors = {};

		Object.keys(fields).forEach
		(
			key =>
			{
				const error = validateField(key, fields[key]);
				if (error) { errors[key] = error; }
			}
		);

		if (Object.keys(errors).length > 0 && Object.values(errors).some(Boolean))
		{
			setState(prev => ({ ...prev, errors }));
			return;
		}

		alert("Form submitted successfully!");
		setState({ name: "", email: "", phone: "", errors: {} });
	};

	const handleReset = () => { setState({ name: "", email: "", phone: "", errors: {} }); };

	const { name, email, phone, errors } = state;

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<div className="field">
				<label>
					Name:
					<input name="name" value={name} onChange={handleChange} className={`base-input ${errors.name ? "error" : ""}`}/>
				</label>
				{errors.name ? <div className="error-container">{errors.name}</div> : null}
			</div>

			<div className="field">
				<label>
					Email:
					<input name="email" value={email} onChange={handleChange} className={`base-input ${errors.email ? "error" : ""}`}/>
				</label>
				{errors.email ? <div className="error-container">{errors.email}</div> : null}
			</div>

			<div className="field">
				<label>
					Phone:
					<input name="phone" value={phone} onChange={handleChange} className={`base-input ${errors.phone ? "error" : ""}`}/>
				</label>
				{errors.phone ? <div className="error-container">{errors.phone}</div> : null}
			</div>

			<div className="buttons-div">
				<button type="submit" className="submit-button">Submit</button>
				<button type="button" onClick={handleReset} className="reset-button">Reset</button>
			</div>
		</form>
	);
};

export default FunctionalForm;