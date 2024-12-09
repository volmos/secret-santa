import {FrontendNotifier} from "@/context/domain/FrontendNotifier";
import Ably from "ably";

export class AblyFrontendNotifier implements FrontendNotifier {

    public async notify<T>(channel: string, name: string, event: T): Promise<void> {
        const ablyApiKey = process.env.ABLY_API_KEY;
        if (!ablyApiKey) {
            throw new Error('Ably API key not found');
        }
        const client = new Ably.Rest(ablyApiKey);
        const ablyChannel = client.channels.get(channel);
        await ablyChannel.publish(name, event);
    }

}