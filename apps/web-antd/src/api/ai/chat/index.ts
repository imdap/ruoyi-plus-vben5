import type {
  AiAgent,
  AiChatModeResp,
  AiChatRegisterResp,
  AiChatReq,
  AiChatStreamHandlers,
  AiChatSyncResp,
  AiConversation,
  AiCreateConversationReq,
  AiMessage,
} from './model';

import type { PageResult } from '#/api/common';

import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import { useAccessStore } from '@vben/stores';

import { alovaInstance } from '#/utils/http';

const { apiURL, clientId } = useAppConfig(
  import.meta.env,
  import.meta.env.PROD,
);

export function getAiChatMode() {
  return alovaInstance.get<AiChatModeResp>('/snail-ai/chat/mode');
}

export function aiChatRegister() {
  return alovaInstance.post<AiChatRegisterResp>('/snail-ai/user/register');
}

export function getAiChatUser() {
  return alovaInstance.get<AiChatRegisterResp>('/snail-ai/user');
}

export function listAiAgents() {
  return alovaInstance.get<AiAgent[]>('/snail-ai/agents');
}

export function getAiAgent(agentId: number) {
  return alovaInstance.get<AiAgent>(`/snail-ai/agent/${agentId}`);
}

export function createAiConversation(
  agentId: number,
  data: AiCreateConversationReq = {},
) {
  return alovaInstance.post<AiConversation>(
    `/snail-ai/agent/${agentId}/conversation`,
    data,
  );
}

export function listAiConversations(
  agentId: number,
  params: { page?: number; size?: number } = {},
) {
  return alovaInstance.get<PageResult<AiConversation>>(
    `/snail-ai/agent/${agentId}/conversations`,
    {
      params,
    },
  );
}

export function getAiMessages(agentId: number, conversationId: string) {
  return alovaInstance.get<AiMessage[]>(
    `/snail-ai/agent/${agentId}/conversation/${conversationId}/messages`,
  );
}

export function deleteAiConversation(agentId: number, conversationId: string) {
  return alovaInstance.delete<void>(
    `/snail-ai/agent/${agentId}/conversation/${conversationId}`,
  );
}

export function chatAiSync(agentId: number, data: AiChatReq) {
  return alovaInstance.post<AiChatSyncResp>(
    `/snail-ai/agent/${agentId}/chat/sync`,
    data,
    {
      timeout: 300_000,
    },
  );
}

function buildApiUrl(path: string) {
  if (/^https?:\/\//.test(apiURL)) {
    return `${apiURL}${path}`;
  }

  return `${window.location.origin}${apiURL}${path}`;
}

function buildFetchHeaders() {
  const accessStore = useAccessStore();
  const token = accessStore.accessToken;
  const language = preferences.app.locale.replace('-', '_');
  const headers: Record<string, string> = {
    'Accept-Language': language,
    ClientID: clientId,
    'Content-Language': language,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function parseSseChunk(chunk: string) {
  let event = 'message';
  const data: string[] = [];

  for (const line of chunk.split(/\r?\n/)) {
    if (line.startsWith('event:')) {
      event = line.slice(6).trim();
      continue;
    }

    if (line.startsWith('data:')) {
      data.push(line.slice(5).trimStart());
    }
  }

  return {
    data: data.join('\n'),
    event,
  };
}

function extractSseContent(payload: string): string {
  try {
    const parsed = JSON.parse(payload) as { content?: string };
    return parsed.content ?? payload;
  } catch {
    return payload;
  }
}

export async function chatAiStream(
  agentId: number,
  data: AiChatReq,
  handlers: AiChatStreamHandlers,
  signal?: AbortSignal,
) {
  const response = await fetch(
    buildApiUrl(`/snail-ai/agent/${agentId}/chat/stream`),
    {
      body: JSON.stringify(data),
      headers: buildFetchHeaders(),
      method: 'POST',
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText || 'AI 流式请求失败');
  }

  if (!response.body) {
    throw new Error('当前浏览器不支持流式响应');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const chunks = buffer.split(/\r?\n\r?\n/);
    buffer = chunks.pop() ?? '';

    for (const chunk of chunks) {
      if (!chunk.trim()) {
        continue;
      }

      const { data: payload, event } = parseSseChunk(chunk);

      if (event === 'text') {
        handlers.onText?.(extractSseContent(payload));
        continue;
      }

      if (event === 'thinking') {
        handlers.onThinking?.(extractSseContent(payload));
        continue;
      }

      if (event === 'error') {
        handlers.onError?.(extractSseContent(payload));
        continue;
      }

      if (event === 'done') {
        handlers.onDone?.(payload);
      }
    }

    if (done) {
      if (buffer.trim()) {
        const { data: payload, event } = parseSseChunk(buffer);

        if (event === 'text') {
          handlers.onText?.(extractSseContent(payload));
        }

        if (event === 'thinking') {
          handlers.onThinking?.(extractSseContent(payload));
        }

        if (event === 'error') {
          handlers.onError?.(extractSseContent(payload));
        }

        if (event === 'done') {
          handlers.onDone?.(payload);
        }
      }

      break;
    }
  }
}
