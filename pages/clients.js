import Page from "../components/Page";
import withAuth from "../reactants/withAuth";
import config from "../config";
import theme from "../reactants/theme";
import axios from "axios";
import moment from "moment";
import {Edit2, X} from "react-feather";
import {useState, useEffect} from "react";
import Input from "../reactants/Input";

const ConnectPage = props => {
	const [clients, setClients] = useState(props.clients);

	return (
		<Page user={props.user}>
			<section>
				<h1>Your Clients</h1>
				{clients.length > 0 ? (
					<div className="clients">
						{clients.map(c => (
							<Client
								key={c.id}
								id={c.id}
								name={c.name}
								date={c.date}
								s={props.user.sessionToken}
								update={name => {
									const i = clients.map(c => c.id).indexOf(c.id);
									const clients2 = [...clients];
									if (typeof name === "string") {
										//Update Name
										clients2[i].name = name;
										setClients(clients2);
									} else {
										//Delete
										clients2.splice(i, 1);
									}
									setClients(clients2);
								}}
							/>
						))}
					</div>
				) : (
					<p>You have no connected clients.</p>
				)}
			</section>

			<style jsx>{`
				section {
					background: white;
					border: solid 1px ${theme.borderGrey};
					border-radius: 10px;
					padding: 20px;
					overflow: hidden;
				}

				h1 {
					margin: 0;
				}

				.clients {
					margin-top: 30px;
				}
			`}</style>
		</Page>
	);
};

const Client = props => {
	const [input, setInput] = useState(null);
	const [date, setDate] = useState();
	useEffect(() => setDate(moment(props.date).format("LLL")), []);

	const iconStyle = {
		color: theme.grey8,
		margin: "0 5px",
		cursor: "pointer"
	};

	const finishEditing = () => {
		if (
			input !== props.name &&
			input.length >= config.inputBounds.name.min &&
			input.length <= config.inputBounds.name.max
		) {
			axios
				.post(
					`${config.apiUrl}/edit/${props.id}`,
					{
						name: input
					},
					{
						headers: {
							authorization: props.s
						}
					}
				)
				.catch(() => {});
			props.update(input);
		}
		setInput(null);
	};

	return (
		<article>
			<div title={`Created at ${date}`}>
				{input !== null ? (
					<form
						onSubmit={e => {
							e.preventDefault();
							finishEditing();
						}}
					>
						<Input
							defaultValue={props.name}
							onChange={e => setInput(e.target.value.trim())}
							onBlur={finishEditing}
							style={{
								margin: 0,
								padding: 3,
								width: "100%"
							}}
							autoFocus
						/>
					</form>
				) : (
					<h2>{props.name}</h2>
				)}
			</div>
			<div>
				<Edit2 style={iconStyle} onClick={() => setInput(props.name)} />
				<X
					style={iconStyle}
					onClick={() => {
						axios
							.post(
								`${config.apiUrl}/delete/${props.id}`,
								{},
								{
									headers: {
										authorization: props.s
									}
								}
							)
							.catch(() => {});
						props.update();
					}}
				/>
			</div>

			<style jsx>{`
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
		</article>
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
