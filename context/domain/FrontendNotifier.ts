export interface FrontendNotifier {

    notify<T>(channel: string, name: string, event: T): Promise<void>;

}