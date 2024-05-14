export interface MessageButton {
  title: string;
  payload: string;
}

export interface Message {
  MessageNumber: number;
  text: string;
  role: string;
  buttons?: MessageButton[];
}
