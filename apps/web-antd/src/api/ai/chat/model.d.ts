export interface AiChatRegisterResp {
  created: boolean;
  externalId: string;
  nickname: string;
  openId: string;
}

export interface AiChatModeResp {
  mode: 'stream' | 'sync';
}

export interface AiAgent {
  avatar?: string;
  description?: string;
  greeting?: string;
  id: number;
  name: string;
  status?: number;
}

export interface AiConversation {
  agentId: number;
  conversationId: string;
  createDt?: string;
  title?: string;
  updateDt?: string;
}

export interface AiCreateConversationReq {
  title?: string;
}

export interface AiMessage {
  content: string;
  createDt?: string;
  role: 'assistant' | 'system' | 'user' | string;
  status?: number;
}

export interface AiChatReq {
  content: string;
  conversationId?: string;
  disabledMcpServerIds?: number[];
  disabledSkillIds?: number[];
}

export interface AiChatSyncResp {
  content: string;
  conversationId: string;
  durationMs?: number;
  traceId?: string;
}

export interface AiChatStreamHandlers {
  onDone?: (data: string) => void;
  onError?: (message: string) => void;
  onText?: (text: string) => void;
  onThinking?: (thinking: string) => void;
}
