import Page from "../components/Page";
import withAuth from "../reactants/withAuth";
import config from "../config";
import theme from "../reactants/theme";
import axios from "axios";

const ConnectPage = props => (
	<Page user={props.user}>
		<section>
			<div className="title">
				<h1>Enter this code into Pulsar</h1>
			</div>
			<div className="seperator">
				<div>
					<div />
				</div>
			</div>
			<div className="body">
				<p>{props.code}</p>
			</div>
		</section>

		<style jsx>{`
			section {
				background: white;
				border: solid 1px ${theme.borderGrey};
				border-radius: 10px;
			}

			.title,
			.body {
				padding: 20px;
			}

			h1,
			p {
				margin: 0;
			}

			.body p {
				word-break: break-all;
			}

			.seperator {
				height: 20px;
				animation: sep1 8s infinite;
			}

			.seperator > div {
				animation: sep2 2s infinite;
				height: 100%;
			}

			.seperator > div > div {
				width: 100%;
				height: 100%;
				animation: sep3 8s infinite;
			}

			@keyframes sep1 {
				0% {
					background: #399953;
				}
				24% {
					background: #399953;
				}
				25% {
					background: #fbb300;
				}
				49% {
					background: #fbb300;
				}
				50% {
					background: #d53e33;
				}
				74% {
					background: #d53e33;
				}
				75% {
					background: #377af5;
				}
				99% {
					background: #377af5;
				}
				100% {
					background: #399953;
				}
			}

			@keyframes sep2 {
				0% {
					width: 0%;
				}
				95% {
					width: 100%;
				}
				100% {
					width: 100%;
				}
			}

			@keyframes sep3 {
				0% {
					background: #fbb300;
				}
				25% {
					background: #fbb300;
				}
				26% {
					background: #d53e33;
				}
				50% {
					background: #d53e33;
				}
				51% {
					background: #377af5;
				}
				75% {
					background: #377af5;
				}
				76% {
					background: #399953;
				}
				100% {
					background: #399953;
				}
			}
		`}</style>
	</Page>
);

ConnectPage.getInitialProps = async ctx => {
	return (
		await axios.get(`${config.apiUrl}/code`, {
			headers: {
				authorization: ctx.user.sessionToken
			}
		})
	).data;
};

export default withAuth(ConnectPage, `${config.apiUrl}/me`);
