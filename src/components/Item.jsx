import "../styles/Item.css";

function Item({id, name, price, description, discount, discountCausedBy})
{
	return (
		<div key={id} className="item">
			<h2>{name}</h2>
			<p>{description}</p>
			<p>Price: ${discount !== null ? (price * discount) / 100 : price} {discount !== null && <span>(Original ${price})</span>}</p>
			{ discount !== null && (<p className="discount">Discount: {discount}% (Caused by: {discountCausedBy})</p>) }
		</div>
	);
}

export default Item;