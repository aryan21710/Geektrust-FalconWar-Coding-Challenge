import React from 'react';
import { Wrapper, Heading, Button, ButtonText } from './styles';
import { CustomButton } from './CustomButton';
import { withRouter } from 'react-router-dom';

class ErrorHandlerComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<Wrapper justifyContent="space-around" flexDirection="column">
					<Heading>OOPS Something went wrong.</Heading>
					<br />
					<br />
					<Heading fontFamily="Arial" fontSize="1.2rem" width="100vw" style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo.componentStack}
					</Heading>
					<Button
						onClick={() => {
							this.props.history.push('/');
							window.location.reload();
						}}
					>
						<ButtonText>BACK TO HOME</ButtonText>
					</Button>
				</Wrapper>
			);
		}
		return this.props.children;
	}
}

export default withRouter(ErrorHandlerComp);
