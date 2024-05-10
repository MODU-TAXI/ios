/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@stomp/stompjs' {
  export interface StompClientConfig {
    brokerURL: string;
    connectHeaders?: { [key: string]: any };
    debug?: (message: string) => void;
    reconnectDelay?: number;
    heartbeatIncoming?: number;
    heartbeatOutgoing?: number;
  }

  export class Client {
    constructor(config: StompClientConfig);
    connect(headers?: any): Promise<void>;
    disconnect(disconnectCallback?: () => void, headers?: any): void;

    // subscribe type
    subscribe(
      destination: string,
      callback: (message: MessageType) => void,
      headers?: { [key: string]: any },
    ): any;
    unsubscribe(subscription: any): void;

    // publish
    publish({ destination: string, body: any, headers: any });

    debug(...args: any[]): void;

    onConnect?: (frame: Frame) => void;

    onStompError?: (frame: Frame) => void;
    activate(): void;
  }

  export type Message = MessageType;
}
