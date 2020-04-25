import Page from "../components/Page";
import withAuth from "../reactants/withAuth";
import config from "../config";
import Link from "next/link";
import theme from "../reactants/theme";

const Homepage = props => (
	<Page user={props.user}>
		<Link href="/install">
			<a className="pulsar">
				<div>
					<img src="/app.png" />
				</div>
			</a>
		</Link>

		<section className="tips">
			<h1>Things to try</h1>
			<div>
				<h2>Define Pulsar</h2>
				<p>
					Pulsar can give you the definition of any word! Like how when we were
					beta testing Pulsar with teamviewer, I shut down my friend's computer
					and he called me a "troglodyte", so I used Pulsar to find out what it
					meant.
				</p>
			</div>
			<div>
				<h2>@archie</h2>
				<p>
					With Pulsar, you can quickly find an Alles user by just entering their
					username.
				</p>
			</div>
			<div>
				<h2>floor(5! * pi * sqrt(1) * e)</h2>
				<p>Pulsar can do cool maths things that I don't really understand.</p>
			</div>
			<h3>
				+ search suggestions, whoami, terminal commands and a bunch of other
				cool stuff...
			</h3>
		</section>

		<Link href="/install">
			<a className="install">
				<p>Install</p>
			</a>
		</Link>
		<p className="clients">
			or{" "}
			<Link href="/clients">
				<a>see your clients</a>
			</Link>
		</p>

		<style jsx>{`
			.pulsar {
				display: block;
				width: 100%;
				height: 75px;
				position: relative;
				border-radius: 10px;
				overflow: hidden;
				z-index: 0;
			}

			.pulsar::before {
				content: "";
				position: absolute;
				z-index: -2;
				left: -400px;
				top: -400px;
				width: 1600px;
				height: 1600px;
				background-color: #399953;
				background-repeat: no-repeat;
				background-size: 50% 50%, 50% 50%;
				background-position: 0 0, 100% 0, 100% 100%, 0 100%;
				background-image: linear-gradient(#399953, #399953),
					linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
					linear-gradient(#377af5, #377af5);
				animation: rotate 4s linear infinite;
			}

			.pulsar::after {
				content: "";
				position: absolute;
				z-index: -1;
				left: 6px;
				top: 6px;
				width: calc(100% - 12px);
				height: calc(100% - 12px);
				background: white;
				border-radius: 5px;
			}

			.pulsar div {
				background: #232323;
				width: calc(100% - 10px);
				height: calc(100% - 10px);
				margin: 5px;
				overflow: hidden;
				border-radius: 5px;
			}

			.pulsar img {
				height: 100%;
			}

			@keyframes rotate {
				100% {
					transform: rotate(1turn);
				}
			}

			.tips {
				background: white;
				border: solid 1px ${theme.borderGrey};
				border-radius: 10px;
				box-sizing: border-box;
				padding: 20px;
				margin: 20px 0;
			}

			.tips h1 {
				margin: 0;
			}

			.tips div {
				box-sizing: border-box;
				border-left: solid 5px ${theme.accent};
				margin: 20px 0;
				padding: 10px;
				border-radius: 5px 0 0 5px;
			}

			.tips h2 {
				font-size: 20px;
				font-weight: 500;
				margin: 0;
				margin-bottom: 5px;
			}

			.tips p {
				margin: 0;
			}

			.tips h3 {
				font-weight: 300;
				font-size: 12px;
				margin: 0;
			}

			.install {
				display: flex;
				flex-flow: column;
				justify-content: center;
				width: 100%;
				height: 75px;
				position: relative;
				border-radius: 10px;
				z-index: 0;
				background: #e3005b;
				color: white;
				text-align: center;
				font-size: 30px;
			}

			.install:hover {
				background: #ff0070;
			}

			.install p {
				margin: 0;
			}

			.clients {
				text-align: center;
				color: ${theme.grey4};
			}

			.clients a {
				text-decoration: underline;
			}
		`}</style>
	</Page>
);

export default withAuth(Homepage, `${config.apiUrl}/me`);
