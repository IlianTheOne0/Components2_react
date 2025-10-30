import React, { useState } from 'react';

import Item from './Item.jsx';

import "../styles/Store.css";

import store from '../data/store.json';

function Store()
{
	const [filters, setFilters] = React.useState({discountOnly: false, rangeMin: 0, rangeMax: 10000});
	const [sortBy, setSortBy] = React.useState(null);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [itemsPerPage, setItemsPerPage] = React.useState(2);

	const filteredItems = store.items
		.filter(item => !filters.discountOnly || item.discount !== null)
		.filter
		(
			item =>
			{
				const finalPrice = item.discount !== null ? item.price * (1 - item.discount / 100) : item.price;
				return finalPrice >= filters.rangeMin && finalPrice <= filters.rangeMax;
			}
		)
		.sort
		(
			(a, b) =>
			{
				const aFinal = a.discount !== null ? a.price * (1 - a.discount / 100) : a.price;
				const bFinal = b.discount !== null ? b.price * (1 - b.discount / 100) : b.price;

				switch (sortBy)
				{
					case 'ascending': { return aFinal - bFinal; }
					case 'descending': { return bFinal - aFinal; }
					default: { return 0; }
				}
			}
		);

	const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

	React.useEffect(() => { setCurrentPage(prev => Math.min(prev, totalPages)); }, [totalPages]);

	const itemsToDisplay = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<div>
			<div className='filters-container'>
				<label>
					<input type="checkbox" checked={filters.discountOnly} onChange={event => { setFilters({...filters, discountOnly: event.target.checked}); setCurrentPage(1); }}/>
					Discount Only
				</label>

				<label>
					Price Range:
					<input type="number" value={filters.rangeMin} onChange={event => { setFilters({...filters, rangeMin: Number(event.target.value)}); setCurrentPage(1); }}/>
					-
					<input type="number" value={filters.rangeMax} onChange={event => { setFilters({...filters, rangeMax: Number(event.target.value)}); setCurrentPage(1); }}/>
				</label>		

				<button onClick={() => { setSortBy('ascending'); setCurrentPage(1); }}>Sort by Price: Low to High</button>
				<button onClick={() => { setSortBy('descending'); setCurrentPage(1); }}>Sort by Price: High to Low</button>
				<button onClick={() => { setSortBy(null); setCurrentPage(1); }}>Clear Sorting</button>
			</div>

			<div className='items-container'>
				{itemsToDisplay.map(item => <Item key={item.id} {...item} />)}
			</div>

			<div className='action-buttons'>
				<button onClick={() => setCurrentPage(previous => Math.max(previous - 1, 1))}>Previous</button>
				<p>Page {currentPage} of {totalPages}</p>
				<button onClick={() => setCurrentPage(previous => Math.min(previous + 1, totalPages)) }>Next</button>
			</div>

			<div className='items_per_page-div'>
				<label>
					Items per page:
					<select value={itemsPerPage} onChange={event => { setItemsPerPage(Number(event.target.value)); setCurrentPage(1); }}>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={5}>5</option>
					</select>
				</label>
			</div>
		</div>
	);
}

	export default Store;