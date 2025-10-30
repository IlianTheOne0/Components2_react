import React, { Component } from "react";

const INITIAL_STATE = {
	name: "",
	email: "",
	phone: "",
	errors: {},
};

export default class FunctionalForm extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	validateField = (fieldName, value) => {
		switch (fieldName) {
			case "name": {
				if (!value) return "Ім'я обов'язкове";
				if (value.length < 2) return "Мінімальна довжина імені — 2 символи";
				if (value.length > 20) return "Максимальна довжина імені — 20 символів";
				return "";
			}
			case "email": {
				if (!value) return "Email обов'язковий";
				// простий regex для прикладу
				const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!re.test(value)) return "Невірний формат email";
				return "";
			}
			case "phone": {
				if (!value) return "Телефон обов'язковий";
				if (!/^\d+$/.test(value)) return "Телефон повинен містити лише цифри";
				if (value.length < 10) return "Мінімум 10 цифр у телефоні";
				return "";
			}
			default:
				return "";
		}
	};

	handleChange = (e) => {
		const { name, value } = e.target;

		// для телефону — дозволяємо лише цифри (порожній рядок також дозволений)
		if (name === "phone" && value !== "" && !/^\d*$/.test(value)) {
			// ігноруємо невірні символи
			return;
		}

		this.setState(
			(prev) => {
				const next = { ...prev, [name]: value };
				// оновлюємо одну помилку для цього поля
				const error = this.validateField(name, value);
				next.errors = { ...prev.errors, [name]: error };
				return next;
			}
		);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, phone } = this.state;
		const fields = { name, email, phone };
		const errors = {};

		Object.keys(fields).forEach((k) => {
			const err = this.validateField(k, fields[k]);
			if (err) errors[k] = err;
		});

		if (Object.keys(errors).length > 0 && Object.values(errors).some(Boolean)) {
			this.setState({ errors });
			return;
		}

		// тут можна відправляти дані або виконати іншу логіку
		console.log("Submitted:", fields);
		alert("Форма успішно відправлена!");
		this.setState({ ...INITIAL_STATE });
	};

	handleReset = () => {
		this.setState({ ...INITIAL_STATE });
	};

	render() {
		const { name, email, phone, errors } = this.state;

		const inputBaseStyle = {
			padding: "8px",
			fontSize: "14px",
			borderRadius: "4px",
			border: "1px solid #ccc",
			width: "100%",
			boxSizing: "border-box",
		};

		const errorTextStyle = {
			color: "#b00020",
			fontSize: "12px",
			marginTop: "4px",
		};

		const fieldStyle = {
			marginBottom: "12px",
		};

		const errorBorder = { border: "1px solid #b00020" };

		return (
			<form
				onSubmit={this.handleSubmit}
				style={{ maxWidth: 420, margin: "20px auto", fontFamily: "sans-serif" }}
				noValidate
			>
				<div style={fieldStyle}>
					<label>
						Ім'я:
						<input
							name="name"
							value={name}
							onChange={this.handleChange}
							style={{
								...inputBaseStyle,
								...(errors.name ? errorBorder : {}),
							}}
							placeholder="Введіть ім'я"
						/>
					</label>
					{errors.name ? <div style={errorTextStyle}>{errors.name}</div> : null}
				</div>

				<div style={fieldStyle}>
					<label>
						Email:
						<input
							name="email"
							value={email}
							onChange={this.handleChange}
							style={{
								...inputBaseStyle,
								...(errors.email ? errorBorder : {}),
							}}
							placeholder="example@domain.com"
						/>
					</label>
					{errors.email ? <div style={errorTextStyle}>{errors.email}</div> : null}
				</div>

				<div style={fieldStyle}>
					<label>
						Телефон:
						<input
							name="phone"
							value={phone}
							onChange={this.handleChange}
							style={{
								...inputBaseStyle,
								...(errors.phone ? errorBorder : {}),
							}}
							placeholder="Тільки цифри, мінімум 10"
						/>
					</label>
					{errors.phone ? <div style={errorTextStyle}>{errors.phone}</div> : null}
				</div>

				<div style={{ display: "flex", gap: 8 }}>
					<button type="submit" style={{ padding: "8px 12px" }}>
						Відправити
					</button>
					<button type="button" onClick={this.handleReset} style={{ padding: "8px 12px" }}>
						Скинути
					</button>
				</div>
			</form>
		);
	}
}