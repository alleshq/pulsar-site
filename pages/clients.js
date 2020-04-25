import Page from "../components/Page";
import withAuth from "../reactants/withAuth";
import config from "../config";
import theme from "../reactants/theme";
import axios from "axios";
import moment from "moment";
import {Edit2, X} from "react-feather";
import {useState, useEffect} from "react";

const ConnectPage = props => {
	const iconStyle = {
		color: theme.grey8,
		margin: "0 5px",
		cursor: "pointer"
	};

	const [dates, setDates] = useState([]);
	useEffect(
		() => setDates(props.clients.map(c => moment(c.createdAt).format("LLL"))),
		[]
	);

	return (
		<Page user={props.user}>
			<section>
				<h1>Your Clients</h1>
				<div className="clients">
					{props.clients.map((c, i) => (
						<article key={c.id}>
							<div title={`Created at ${dates[i]}`}>
								<h2>{c.name}</h2>
							</div>
							<div>
								<Edit2 style={iconStyle} />
								<X
									style={iconStyle}
									onClick={() => {
										axios
											.post(
												`${config.apiUrl}/delete/${c.id}`,
												{},
												{
													headers: {
														authorization: props.user.sessionToken
													}
												}
											)
											.then(() => location.reload())
											.catch(() => {});
									}}
								/>
							</div>
						</article>
					))}
				</div>
			</section>

			<style jsx>{`
				section {
					background: white;
					border: solid 1px ${theme.borderGrey};
					border-radius: 10px;
					padding: 20px;
				}

				h1 {
					margin: 0;
					margin-bottom: 30px;
				}

				article {
					display: flex;
					border-bottom: solid 1px ${theme.borderGrey};
					padding: 10px;
				}

				article:nth-child(1) {
					border-top: solid 1px ${theme.borderGrey};
				}

				article div:nth-child(1) {
					flex-grow: 1;
				}

				article div:nth-child(2) {
					flex-shrink: 0;
				}

				article h2 {
					margin: 0;
					font-weight: 400;
					font-size: 20px;
				}
			`}</style>
		</Page>
	);
};

ConnectPage.getInitialProps = async ctx => {
	return (
		await axios.get(`${config.apiUrl}/clients`, {
			headers: {
				authorization: ctx.user.sessionToken
			}
		})
	).data;
};

export default withAuth(ConnectPage, `${config.apiUrl}/me`);
