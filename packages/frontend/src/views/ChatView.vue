<template>
  <div class="chat-container">
    <n-card class="chat-card">
      <n-h1>AI Chat Assistant</n-h1>
      
      <div class="messages-container" ref="messagesContainer">
        <n-list>
          <n-list-item v-for="message in messages" :key="message.id">
            <n-card :bordered="false">
              <template #header>
                <n-space align="center">
                  <n-avatar :type="message.role === 'user' ? 'default' : 'success'">
                    {{ message.role === 'user' ? 'U' : 'AI' }}
                  </n-avatar>
                  <n-text strong>{{ message.role === 'user' ? 'You' : 'Assistant' }}</n-text>
                </n-space>
              </template>
              <n-text>{{ message.content }}</n-text>
            </n-card>
          </n-list-item>
        </n-list>
      </div>

      <div class="input-container">
        <n-input
          v-model:value="input"
          type="textarea"
          placeholder="Type your message..."
          :rows="3"
          @keydown.enter.prevent="handleSend"
        />
        <n-button
          type="primary"
          v-if="status !== 'streaming'"
          :disabled="status !== 'ready'"
          @click="handleSend"
          class="send-button"
        >
          Send
        </n-button>
        <n-button
          v-if="status === 'streaming'"
          type="primary"
          @click="handleStop"
          class="send-button"
        >
          Stop
        </n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useMessage } from 'naive-ui'
import { useChat } from '@ai-sdk/vue'
import { nanoid } from 'nanoid'
const message = useMessage()
const messagesContainer = ref<HTMLElement | null>(null)

const { messages, input, handleSubmit, status, error, data, stop } = useChat({
  api: '/api/chat',
  streamProtocol: 'data',
  initialMessages: [
    {
      id: nanoid(),
      role: 'assistant',
      content: 'Hello, how can I help you today?'
    }
  ],
  body: {
    extraProps: null // extra data to send with the request
  },
  onResponse: async (response) => {
    console.log('Response:', response)
    if (!response.ok) {
      throw new Error('Failed to send message')
    }
  },
  onFinish: () => {
    console.log('Finished')
    scrollToBottom()
  },
  onError: (error) => {
    console.error('Chat error:', error)
    message.error('An error occurred during the chat')
  }
})

const handleSend = (e: Event) => {
  if (!input.value.trim()) return
  
  try {
    handleSubmit(e)
  } catch (error) {
    console.error('Error submitting message:', error)
    message.error('Failed to send message')
  }
}

const handleStop = () => {
  stop()
}

const handleError = (error: Error) => {
  console.error('Chat error:', error)
  message.error('An error occurred during the chat')
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.chat-card {
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  margin: 20px 0;
  padding: 10px;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.send-button {
  align-self: flex-end;
}
</style> 