// freshdesk client
export interface FreshdeskClient {
  events?: FreshdeskEvents;
  data?: FreshdeskData;
  interface?: FreshdeskInterface;
  db?: FreshdeskData;
  request?: FreshdeskRequest;
  instance?: FreshdeskInstance;
  [key: string]: any;
}

export interface FreshdeskInstanceResizeOptions {
  resize: string | number;
}

export interface FreshdeskInstance {
  resize(options: FreshdeskInstanceResizeOptions): void;
  close(): void;
  context(): Promise<any>;
  get(): Promise<any>;
  send(options: any): Promise<any>;
  receive(cb: Function): void;
}

export interface FreshdeskRequest {
  get(name: string, options: any): Promise<any>;
  post(name: string, options: any): Promise<any>;
}

export interface FreshdeskData {
  set(name: string, options: any): Promise<any>;
  get(name: string, options: any): Promise<any>;
  update(
    name: string,
    action: "increment" | "append" | "set" | "remove",
    options: any
  ): Promise<any>;
  delete(name: string): Promise<any>;
}

export interface FreshdeskInterfaceTriggerOptions {
  title?: string;
  template?: string;
  type?: string;
  message?: string;
  data?: any;
  id?: string;
  value?: number;
  attachments?: string[];
  text?: string;
  replace?: boolean;
  position?: string;
}

export interface FreshdeskInterface {
  trigger(
    name: string,
    options: FreshdeskInterfaceTriggerOptions
  ): Promise<any>;
  context(): Promise<any>;
}

export type FreshdeskEventTypes =
  | "app.deactivated"
  | "app.activated"
  | "ticket.replyClick"
  | "ticket.sendReply"
  | "ticket.forwardClick"
  | "ticket.conversationForward"
  | "ticket.forward"
  | "ticket.notesClick"
  | "ticket.addNote"
  | "ticket.closeTicketClick"
  | "ticket.deleteTicketClick"
  | "ticket.previousTicketClick"
  | "ticket.nextTicketClick"
  | "ticket.startTimer"
  | "ticket.stopTimer"
  | "ticket.updateTimer"
  | "ticket.deleteTimer"
  | "ticket.priorityChanged"
  | "ticket.statusChanged"
  | "ticket.groupChanged"
  | "ticket.agentChanged"
  | "ticket.typeChanged"
  | "ticket.closeTicketClick"
  | "ticket.deleteTicketClick"
  | "ticket.propertiesUpdated"
  | "ticket.sendReply";

export interface FreshdeskEvents {
  on(name: FreshdeskEventTypes, callback: Function): void;
  [key: string]: any;
}

export type FreshdeskDataGetNames =
  | "loggedInUser"
  | "domainName"
  | "ticket"
  | "contact"
  | "email_config"
  | "requester"
  | "company"
  | "group"
  | "time_entry"
  | "email_config"
  | "status_options";

export interface FreshdeskData {
  get(name: FreshdeskDataGetNames): Promise<any>;
  [key: string]: any;
}

// freshdesk app
export interface FreshdeskApp {
  initialized(): Promise<FreshdeskClient>;
  activated(): Promise<void>;
  deactivated(): Promise<void>;
}
