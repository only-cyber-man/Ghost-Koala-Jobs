import { RecordModel } from "pocketbase";

export interface EmailSentData {
	id: string;
	activateUrl: string;
	resultsUrl: string;
	receiverEmail: string;
	dateReceived: string;
	completelyDone: boolean;
	ghostkoalaStatus: string;
	resultBase64: string;
	created: string;
	updated: string;
}

export class EmailSent {
	public readonly id: string;
	public readonly created: Date;
	public readonly updated: Date;
	public activateUrl: string;
	public resultsUrl: string;
	public receiverEmail: string;
	public dateReceived: Date;
	public completelyDone: boolean;
	public ghostkoalaStatus: string;
	public resultBase64: string;

	constructor(data: EmailSentData | RecordModel) {
		this.id = data.activateUrl;
		this.created = new Date(data.dateReceived);
		this.updated = new Date(data.dateReceived);
		this.activateUrl = data.activateUrl;
		this.resultsUrl = data.resultsUrl;
		this.receiverEmail = data.receiverEmail;
		this.dateReceived = new Date(data.dateReceived);
		this.completelyDone = data.completelyDone;
		this.ghostkoalaStatus = data.ghostkoalaStatus;
		this.resultBase64 = data.resultBase64;
	}

	public get sessionId(): string {
		return this.receiverEmail.split("@")[0].split("koala_")[1];
	}

	public serialize(): EmailSentData {
		return {
			id: this.id,
			activateUrl: this.activateUrl,
			resultsUrl: this.resultsUrl,
			receiverEmail: this.receiverEmail,
			dateReceived: this.dateReceived.toISOString(),
			completelyDone: this.completelyDone,
			ghostkoalaStatus: this.ghostkoalaStatus,
			resultBase64: this.resultBase64,
			created: this.created.toISOString(),
			updated: this.updated.toISOString(),
		};
	}
}
