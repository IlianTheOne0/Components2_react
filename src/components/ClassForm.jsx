import React, { Component } from "react";

import "../styles/Form.css";

class ClassForm extends Component
{
	constructor(props) { super(props); this.state = { name: "", email: "", phone: "", errors: {} }; }

	validateField = (fieldName, value) =>
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
			case "phone": {
				if (!value) { return "Phone is required"; }
				if (!/^\d+$/.test(value)) { return "Phone must contain only digits"; }
				if (value.length < 10) { return "Minimum length of phone number is 10 digits"; }

				return "";
			}
			default: { return ""; }
		}
	}

	handleChange = (event) =>
	{
		const { name, value } = event.target;

		if (name === "phone" && value !== "" && !/^\d*$/.test(value)) { return; }

		this.setState
		(
			(previous) =>
			{
				const next = { ...previous, [name]: value };

				const error = this.validateField(name, value);
				next.errors = { ...previous.errors, [name]: error };

				return next;
			}
		);
	}

	handleSubmit = (event) =>
	{
		event.preventDefault();

		const { name, email, phone } = this.state;
		const fields = { name, email, phone };
		const errors = {};

		Object.keys(fields).forEach
		(
			key =>
			{
				const error = this.validateField(key, fields[key]);
				if (error) { errors[key] = error; }
			}
		);

		if (Object.keys(errors).length > 0 && Object.values(errors).some(Boolean)) { this.setState({ errors }); return; }

		alert("Form submitted successfully!");
		this.setState({ name: "", email: "", phone: "", errors: {} });
	}

	handleReset = () => { this.setState({ name: "", email: "", phone: "", errors: {} }); }

	render()
	{
		const { name, email, phone, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit} className="form-container">
				<div className="field">
					<label>
						Name:
						<input name="name" value={name} onChange={this.handleChange} className={`base-input ${errors.name ? "error" : ""}`}/>
					</label>
					{errors.name ? <div className="error-container">{errors.name}</div> : null}
				</div>

				<div className="field">
					<label>
						Email:
						<input name="email" value={email} onChange={this.handleChange} className={`base-input ${errors.email ? "error" : ""}`}/>
					</label>
					{errors.email ? <div className="error-container">{errors.email}</div> : null}
				</div>

				<div className="field">
					<label>
						Phone:
						<input name="phone" value={phone} onChange={this.handleChange} className={`base-input ${errors.phone ? "error" : ""}`}/>
					</label>
					{errors.phone ? <div className="error-container">{errors.phone}</div> : null}
				</div>

				<div className="buttons-div">
					<button type="submit" className="submit-button">Submit</button>
					<button type="button" onClick={this.handleReset} className="reset-button">Reset</button>
				</div>
			</form>
		);
	}
}

export default ClassForm;