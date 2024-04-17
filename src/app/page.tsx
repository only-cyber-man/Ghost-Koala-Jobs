import { initPocketBase } from "@/lib/ssr";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";
import { EmailSent } from "@/lib";
import Link from "next/link";

export default async function Main({
	searchParams: { err },
}: {
	searchParams: { err?: string };
}) {
	if (err) {
		return (
			<main>
				<h1 className="title">🚨 Error occurred 🚨</h1>
				<p>{err}</p>
			</main>
		);
	}
	const pb = await initPocketBase();
	const emailSents = (
		await pb.collection("gk_emails_sent").getFullList({
			sort: "-updated",
		})
	).map((record) => new EmailSent(record));

	return (
		<section className="section">
			<Title />
			<Subtitle />
			<div
				style={{
					width: "100%",
					overflow: "auto",
				}}
				className="content"
			>
				<table>
					<thead>
						<tr>
							<th>Session ID</th>
							<th>Results URL</th>
							<th>Confirmation URL</th>
							<th>Date received</th>
							<th>Is Completely Done</th>
							<th>Ghost koala status</th>
							<th>Result</th>
						</tr>
					</thead>
					<tbody>
						{emailSents.map((emailSent) => (
							<tr key={emailSent.id}>
								<td>{emailSent.sessionId}</td>
								<td>
									{emailSent.resultsUrl.length === 0 ? (
										"No result"
									) : (
										<Link href={emailSent.resultsUrl} target="_blank">
											Click here
										</Link>
									)}
								</td>
								<td>
									<Link href={emailSent.activateUrl} target="_blank">
										Click here
									</Link>
								</td>
								<td>{emailSent.dateReceived.toLocaleString()}</td>
								<td>{emailSent.completelyDone.toString()}</td>
								<td>{emailSent.ghostkoalaStatus}</td>
								<td>
									{emailSent.resultBase64.length > 0 ? (
										<a
											href={`data:application/octet-stream;base64,${emailSent.resultBase64}`}
											download={`result_${emailSent.sessionId}.gz`}
										>
											Download
										</a>
									) : (
										"No result"
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
