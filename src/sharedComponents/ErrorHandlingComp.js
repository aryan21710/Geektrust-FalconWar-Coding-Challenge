import React from 'react';
import { Wrapper, Heading, Button, ButtonText, BadgeWrapper } from './styles';
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
					<BadgeWrapper flex="0" flexDirection="column"  width="100vw" style={{ whiteSpace: 'pre-wrap' }}>
						<Heading fontFamily="Arial" fontSize="1.2rem" >
							{this.state.error && this.state.error.toString()}
						</Heading>
						<br />
						<Heading fontFamily="Arial" fontSize="1.2rem">
							{this.state.errorInfo.componentStack}
						</Heading>
					</BadgeWrapper>
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
