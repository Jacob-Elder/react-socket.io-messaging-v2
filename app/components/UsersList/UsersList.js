import React from 'react'
import './UsersList.css'

class UsersList extends React.Component {

	render () {
		return (
			<div className='users'>
				<h3>Online Users</h3>
				<ul>
					{
						this.props.users.map(function (user, i) {
							return (
								<li key={i}>
									{user}
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

UsersList.propTypes = {
	users: React.PropTypes.array
}

export default UsersList