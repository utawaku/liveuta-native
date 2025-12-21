export type Channel = {
    readonly channelId: string;
    readonly nameKor: string;
    readonly names: readonly string[];
    readonly channelAddr: string;
    readonly handleName: string;
    readonly waiting: boolean;
    readonly alive: boolean;
    readonly profilePictureUrl: string | undefined;
}