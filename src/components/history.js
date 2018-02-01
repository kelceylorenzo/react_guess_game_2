import React from 'react';

export default (props) => {
	const historyList = props.data.map((item, index) => {
		const color =
			item.indexOf('High') > -1
				? 'pink lighten-5'
				: item.indexOf('Low') > -1 ? 'cyan lighten-5' : 'light-green lighten-5';

		return (
			<li key={index} className={`collection-item center-align ${color}`}>
				{item}
			</li>
		);
	});
	return <ul className="collection">{historyList}</ul>;
};
