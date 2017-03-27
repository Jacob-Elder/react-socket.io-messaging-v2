import React from 'react'
import './Header.css'

class Header extends React.Component{
	render () {
		var headerClass = 'header ' + this.props.headerClass
		console.log(this.props.headerClass)
		return (
			<div className={headerClass}>
				<h1>React Messaging</h1>
			</div>
		)
	}
}

Header.propTypes = {
	headerClass: React.PropTypes.string
}

export default Header