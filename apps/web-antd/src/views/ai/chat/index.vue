<script setup lang="ts">
import type { BubbleListProps, ConversationsProps } from '@antdv-next/x';

import type { AiAgent, AiConversation, AiMessage } from '#/api/ai/chat/model';

import { computed, h, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { cn } from '@vben/utils';

import {
  DeleteOutlined,
  MessageOutlined,
  PlusOutlined,
  RobotOutlined,
  UserOutlined,
} from '@antdv-next/icons';
import { BubbleList, Conversations, Sender, Welcome } from '@antdv-next/x';
import { XMarkdown } from '@antdv-next/x-markdown';
import { App, Avatar, Button, Empty, Skeleton, Spin, Tag } from 'antdv-next';

import CodeBlock from './code-block.vue';

import {
  aiChatRegister,
  chatAiStream,
  chatAiSync,
  createAiConversation,
  deleteAiConversation,
  getAiChatMode,
  getAiMessages,
  listAiAgents,
  listAiConversations,
} from '#/api/ai/chat';

const { message, modal } = App.useApp();

interface ChatBubble {
  content: string;
  createDt?: string;
  id: string;
  loading?: boolean;
  role: 'assistant' | 'system' | 'user';
  streaming?: boolean;
  thinking?: string;
}

const agents = ref<AiAgent[]>([]);
const conversations = ref<AiConversation[]>([]);
const currentAgentId = ref<number>();
const activeConversationId = ref<string>();
const bubbles = ref<ChatBubble[]>([]);
const senderValue = ref('');
const chatMode = ref<'stream' | 'sync'>('stream');
const initializing = ref(false);
const loadingConversations = ref(false);
const loadingMessages = ref(false);
const sending = ref(false);
const abortController = ref<AbortController>();

const currentAgent = computed(() =>
  agents.value.find((agent) => agent.id === currentAgentId.value),
);

const conversationItems = computed<ConversationsProps['items']>(() =>
  conversations.value.map((item) => ({
    icon: h(MessageOutlined),
    key: item.conversationId,
    label: item.title || '新的对话',
  })),
);

const bubbleRole = computed<BubbleListProps['role']>(() => ({
  assistant: {
    placement: 'start',
  },
  system: {
    placement: 'start',
    variant: 'borderless',
  },
  user: {
    placement: 'end',
  },
}));

const bubbleItems = computed<BubbleListProps['items']>(() =>
  bubbles.value.map((item) => ({
    avatar:
      item.role === 'user'
        ? h(UserOutlined)
        : currentAgent.value?.avatar
          ? currentAgent.value.avatar
          : h(RobotOutlined),
    content: item.content,
    footer:
      item.thinking && item.role === 'assistant'
        ? () => h(Tag, { color: 'processing' }, () => item.thinking)
        : undefined,
    header: item.role === 'user' ? '我' : currentAgent.value?.name || 'AI',
    key: item.id,
    loading: item.loading,
    role: item.role,
    status: item.loading || item.streaming ? 'loading' : undefined,
    streaming: item.streaming,
  })),
);

function mapMessage(item: AiMessage, index: number): ChatBubble {
  const role =
    item.role === 'user' || item.role === 'system' ? item.role : 'assistant';

  return {
    content: item.content || '',
    createDt: item.createDt,
    id: `${item.createDt || 'history'}-${index}`,
    role,
  };
}

function getConversationTitle(content: string) {
  const title = content.trim().replaceAll('\n', ' ').slice(0, 24);

  if (title) {
    return title;
  }

  return '新的对话';
}

function parseDoneConversationId(data: string) {
  if (!data) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(data) as { conversationId?: string };

    if (parsed.conversationId) {
      return parsed.conversationId;
    }
  } catch {
    if (/^[\w-]+$/.test(data)) {
      return data;
    }
  }

  return undefined;
}

async function refreshConversations(agentId = currentAgentId.value) {
  if (!agentId) {
    conversations.value = [];
    return;
  }

  loadingConversations.value = true;
  try {
    const result = await listAiConversations(agentId, {
      page: 1,
      size: 50,
    });
    conversations.value = result.rows || [];
  } finally {
    loadingConversations.value = false;
  }
}

async function loadMessages(conversationId?: string) {
  const agentId = currentAgentId.value;

  if (!agentId || !conversationId) {
    bubbles.value = [];
    return;
  }

  loadingMessages.value = true;
  try {
    const result = await getAiMessages(agentId, conversationId);
    bubbles.value = result.map(mapMessage);
  } finally {
    loadingMessages.value = false;
  }
}

async function handleSelectAgent(agentId: number) {
  currentAgentId.value = agentId;
  activeConversationId.value = undefined;
  bubbles.value = [];
  await refreshConversations(agentId);
  const first = conversations.value[0];

  if (first?.conversationId) {
    activeConversationId.value = first.conversationId;
    await loadMessages(first.conversationId);
  }
}

async function handleSelectConversation(key: number | string) {
  activeConversationId.value = String(key);
  await loadMessages(String(key));
}

async function handleCreateConversation() {
  const agentId = currentAgentId.value;

  if (!agentId) {
    message.warning('请先选择智能体');
    return;
  }

  const conversation = await createAiConversation(agentId, {
    title: '新的对话',
  });
  conversations.value = [conversation, ...conversations.value];
  activeConversationId.value = conversation.conversationId;
  bubbles.value = [];
}

function handleDeleteConversation(conversationId: string) {
  const agentId = currentAgentId.value;

  if (!agentId) {
    return;
  }

  modal.confirm({
    content: '删除后无法恢复该会话记录',
    okButtonProps: {
      danger: true,
    },
    onOk: async () => {
      await deleteAiConversation(agentId, conversationId);
      conversations.value = conversations.value.filter(
        (item) => item.conversationId !== conversationId,
      );

      if (activeConversationId.value === conversationId) {
        const next = conversations.value[0];
        activeConversationId.value = next?.conversationId;
        await loadMessages(next?.conversationId);
      }
    },
    title: '删除会话',
  });
}

const conversationMenu = computed<ConversationsProps['menu']>(
  () => (conversation) => ({
    items: [
      {
        danger: true,
        icon: h(DeleteOutlined),
        key: 'delete',
        label: '删除',
      },
    ],
    onClick(info) {
      info.domEvent.stopPropagation();
      handleDeleteConversation(String(conversation.key));
    },
  }),
);

async function ensureConversation(content: string) {
  const agentId = currentAgentId.value;

  if (!agentId) {
    throw new Error('请先选择智能体');
  }

  if (activeConversationId.value) {
    return activeConversationId.value;
  }

  const conversation = await createAiConversation(agentId, {
    title: getConversationTitle(content),
  });
  conversations.value = [conversation, ...conversations.value];
  activeConversationId.value = conversation.conversationId;
  return conversation.conversationId;
}

async function handleSubmit(value: string) {
  const content = value.trim();
  const agentId = currentAgentId.value;

  if (!content) {
    return;
  }

  if (!agentId) {
    message.warning('请先选择智能体');
    return;
  }

  if (sending.value) {
    return;
  }

  const conversationId = await ensureConversation(content);
  const assistantId = `assistant-${Date.now()}`;
  bubbles.value = [
    ...bubbles.value,
    {
      content,
      id: `user-${Date.now()}`,
      role: 'user',
    },
    {
      content: '',
      id: assistantId,
      loading: true,
      role: 'assistant',
      streaming: chatMode.value === 'stream',
    },
  ];
  senderValue.value = '';
  sending.value = true;
  abortController.value = new AbortController();
  await nextTick();

  try {
    if (chatMode.value === 'sync') {
      const result = await chatAiSync(agentId, {
        content,
        conversationId,
      });
      updateAssistantBubble(assistantId, {
        content: result.content || '',
        loading: false,
        streaming: false,
      });

      if (result.conversationId) {
        activeConversationId.value = result.conversationId;
      }
    } else {
      await chatAiStream(
        agentId,
        {
          content,
          conversationId,
        },
        {
          onDone(data) {
            const nextConversationId = parseDoneConversationId(data);

            if (nextConversationId) {
              activeConversationId.value = nextConversationId;
            }

            updateAssistantBubble(assistantId, {
              loading: false,
              streaming: false,
              thinking: undefined,
            });
          },
          onError(error) {
            updateAssistantBubble(assistantId, {
              content: error || 'AI 回复失败',
              loading: false,
              streaming: false,
            });
          },
          onText(text) {
            appendAssistantContent(assistantId, text);
          },
          onThinking(thinking) {
            updateAssistantBubble(assistantId, {
              loading: false,
              thinking: thinking || '思考中',
            });
          },
        },
        abortController.value.signal,
      );
    }

    await refreshConversations(agentId);
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      updateAssistantBubble(assistantId, {
        content: '已取消本次回复',
        loading: false,
        streaming: false,
      });
    } else {
      updateAssistantBubble(assistantId, {
        content: (error as Error).message || 'AI 回复失败',
        loading: false,
        streaming: false,
      });
      message.error((error as Error).message || 'AI 回复失败');
    }
  } finally {
    sending.value = false;
    abortController.value = undefined;
  }
}

function updateAssistantBubble(id: string, patch: Partial<ChatBubble>) {
  bubbles.value = bubbles.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...patch,
      };
    }

    return item;
  });
}

function appendAssistantContent(id: string, content: string) {
  bubbles.value = bubbles.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        content: `${item.content}${content}`,
        loading: false,
      };
    }

    return item;
  });
}

function handleCancel() {
  abortController.value?.abort();
}

async function init() {
  initializing.value = true;
  try {
    await aiChatRegister();
    const [modeResult, agentResult] = await Promise.all([
      getAiChatMode(),
      listAiAgents(),
    ]);
    chatMode.value = modeResult.mode;
    agents.value = agentResult;
    const firstAgent = agentResult[0];

    if (firstAgent) {
      await handleSelectAgent(firstAgent.id);
    }
  } finally {
    initializing.value = false;
  }
}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  abortController.value?.abort();
});
</script>

<template>
  <Page :auto-content-height="true">
    <div
      :class="
        cn(
          'grid h-full min-h-[560px] overflow-hidden rounded-lg',
          'grid-cols-[280px_minmax(0,1fr)]',
          'border border-[var(--ant-color-border-secondary)]',
          'bg-[var(--ant-color-bg-container)]',
          'max-[900px]:grid-cols-1',
        )
      "
    >
      <aside
        :class="
          cn(
            'flex flex-col min-w-0 p-3 overflow-hidden',
            'border-e border-[var(--ant-color-border-secondary)]',
            'max-[900px]:max-h-[300px] max-[900px]:border-e-0',
            'max-[900px]:border-b',
          )
        "
      >
        <div class="pb-1.5 text-xs text-[var(--ant-color-text-tertiary)]">
          我的智能体
        </div>
        <div
          :class="
            cn(
              'mb-2 max-h-[200px] overflow-y-auto',
              'max-[900px]:max-h-[100px]',
            )
          "
        >
          <Spin :spinning="initializing">
            <div
              v-for="agent in agents"
              :key="agent.id"
              :class="
                cn(
                  'flex items-center gap-2 p-2 cursor-pointer',
                  'rounded-md transition-colors',
                  'hover:bg-[var(--ant-color-fill-content)]',
                  currentAgentId === agent.id &&
                    'bg-[var(--ant-color-primary-bg)]',
                )
              "
              @click="handleSelectAgent(agent.id)"
            >
              <div class="shrink-0">
                <Avatar
                  v-if="agent.avatar"
                  :size="32"
                  shape="circle"
                  :src="agent.avatar"
                />
                <Avatar
                  v-else
                  :size="32"
                  shape="circle"
                  :style="{
                    background: 'var(--ant-color-primary)',
                    color: '#fff',
                  }"
                >
                  {{ agent.name?.charAt(0) }}
                </Avatar>
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-[13px] font-medium leading-5">
                  {{ agent.name }}
                </div>
                <div
                  v-if="agent.description"
                  :class="
                    cn(
                      'truncate text-xs leading-[18px]',
                      'text-[var(--ant-color-text-secondary)]',
                    )
                  "
                >
                  {{ agent.description }}
                </div>
              </div>
            </div>
          </Spin>
        </div>

        <div
          :class="
            cn(
              'flex items-center justify-between',
              'pt-1 pb-2',
              'border-t border-[var(--ant-color-border-secondary)]',
            )
          "
        >
          <span class="text-xs text-[var(--ant-color-text-tertiary)]">
            对话列表
          </span>
          <Button
            size="small"
            type="primary"
            :disabled="!currentAgentId"
            @click="handleCreateConversation"
          >
            <template #icon>
              <PlusOutlined />
            </template>
            新对话
          </Button>
        </div>

        <Spin :spinning="loadingConversations">
          <Empty
            v-if="conversations.length === 0 && !loadingConversations"
            class="w-full min-h-0 flex-1 overflow-auto"
            :image="Empty.PRESENTED_IMAGE_SIMPLE"
            description="暂无对话"
          />
          <Conversations
            v-else
            v-model:active-key="activeConversationId"
            class="w-full min-h-0 flex-1 overflow-auto"
            :items="conversationItems"
            :menu="conversationMenu"
            @active-change="handleSelectConversation"
          />
        </Spin>
      </aside>

      <section class="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)_auto]">
        <header
          :class="
            cn(
              'flex items-center justify-between gap-4',
              'px-[18px] py-3.5',
              'border-b border-[var(--ant-color-border-secondary)]',
            )
          "
        >
          <div>
            <div class="text-base font-semibold leading-6">
              {{ currentAgent?.name || 'AI 对话' }}
            </div>
            <div
              :class="
                cn(
                  'max-w-[720px] truncate leading-[22px]',
                  'text-[var(--ant-color-text-secondary)]',
                  'max-[900px]:whitespace-normal',
                )
              "
            >
              {{ currentAgent?.description || '选择智能体后即可开始对话' }}
            </div>
          </div>
          <Tag :color="chatMode === 'stream' ? 'processing' : 'default'">
            {{ chatMode === 'stream' ? '流式' : '同步' }}
          </Tag>
        </header>

        <main class="min-h-0 overflow-auto p-[18px]">
          <Skeleton v-if="loadingMessages" active />
          <Welcome
            v-else-if="bubbles.length === 0"
            variant="borderless"
            :title="currentAgent?.greeting || '有什么可以帮你？'"
            :description="currentAgent?.description || '输入问题开始新的会话'"
          >
            <template #icon>
              <Avatar :size="46" :src="currentAgent?.avatar">
                <template #icon>
                  <RobotOutlined />
                </template>
              </Avatar>
            </template>
          </Welcome>
          <BubbleList
            v-else
            class="h-full"
            :items="bubbleItems"
            :role="bubbleRole"
          >
            <template #contentRender="{ content, item }">
              <XMarkdown
                v-if="item.role === 'assistant' && typeof content === 'string'"
                :content="content"
                :components="{ code: CodeBlock }"
                :streaming="{
                  hasNextChunk: item.status === 'loading',
                  enableAnimation: true,
                }"
                paragraph-tag="div"
              />
              <div v-else>{{ content }}</div>
            </template>
          </BubbleList>
        </main>

        <footer
          :class="
            cn(
              'px-[18px] pt-3.5 pb-[18px]',
              'border-t border-[var(--ant-color-border-secondary)]',
            )
          "
        >
          <Sender
            :auto-size="{ minRows: 2, maxRows: 6 }"
            :loading="sending"
            placeholder="输入内容，按 Enter 发送"
            :value="senderValue"
            :on-cancel="handleCancel"
            :on-change="(value: string) => (senderValue = value)"
            :on-submit="handleSubmit"
          />
        </footer>
      </section>
    </div>
  </Page>
</template>
