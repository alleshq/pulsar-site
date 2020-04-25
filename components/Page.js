import theme from "../reactants/theme";
import Head from "../reactants/Head";
import Header from "../reactants/Header";
import GlobalStyles from "../reactants/GlobalStyles";
import consoleWarning from "../reactants/consoleWarning";
import {useEffect} from "react";

export default props => {
	useEffect(consoleWarning, []);

	return (
		<div className="page">
			<Head title={props.title ? `Pulsar • ${props.title}` : `Pulsar`} />

			<Header
				title="Pulsar"
				user={props.user ? {id: props.user.id} : null}
				breadcrumbs={props.breadcrumbs}
			/>
			<main>
				<div className="innerMain">{props.children}</div>
			</main>

			<style jsx>{`
				.page {
					display: flex;
					flex-flow: column;
				}

				main {
					padding: 20px;
					flex-grow: 1;
					background: ${theme.greyF};
				}

				.innerMain {
					max-width: 800px;
					margin: 20px auto;
				}
			`}</style>

			<GlobalStyles />
		</div>
	);
};
