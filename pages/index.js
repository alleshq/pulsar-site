import Page from "../components/Page";
import withAuth from "../reactants/withAuth";
import config from "../config";
import Link from "next/link";

const Homepage = props => (
	<Page user={props.user}>
		<Link href="/install">
			<a className="pulsar">
				<div>
					<img src="/pulsar.png" />
				</div>
			</a>
		</Link>

		<style jsx>{`
			.pulsar {
				display: block;
				margin: 0 auto;
				width: 800px;
				max-width: 100%;
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
		`}</style>
	</Page>
);

export default withAuth(Homepage, `${config.apiUrl}/me`);
