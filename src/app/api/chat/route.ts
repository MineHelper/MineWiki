import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  tool,
  toUIMessageStream,
} from 'ai';
import { z } from 'zod';
import { source } from '@/lib/source';
import { Document, type DocumentData } from 'flexsearch';
import { ChatUIMessage, SearchTool } from '../../../components/ai/search';

interface CustomDocument extends DocumentData {
  url: string;
  title: string;
  description: string;
  content: string;
}
const searchServer = createSearchServer();

async function createSearchServer() {
  const search = new Document<CustomDocument>({
    document: {
      id: 'url',
      index: ['title', 'description', 'content'],
      store: true,
    },
  });

  const docs = await chunkedAll(
    source.getPages().map(async (page) => {
      if (!('getText' in page.data)) return null;

      return {
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        content: await page.data.getText('processed'),
      } as CustomDocument;
    }),
  );

  for (const doc of docs) {
    if (doc) search.add(doc);
  }

  return search;
}

async function chunkedAll<O>(promises: Promise<O>[]): Promise<O[]> {
  const SIZE = 50;
  const out: O[] = [];
  for (let i = 0; i < promises.length; i += SIZE) {
    out.push(...(await Promise.all(promises.slice(i, i + SIZE))));
  }
  return out;
}

const openrouter = createOpenRouter({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

const systemPrompt = [
  '你是一位经验丰富的 Minecraft 服务器管理助手，专门帮助新手服主（腐竹）解决开服和运营问题。',
  '请始终使用友好、耐心、通俗易懂的语言，避免过于专业的术语。',
  '你的核心任务是：',
  '1. 解答关于 Minecraft 服务器搭建、配置、插件使用、权限设置、性能优化等方面的问题。',
  '2. 当被问及具体操作步骤时，请提供清晰、分步骤的指导。',
  '3. 在回答中，优先引用本知识库（文档站）中的官方指南和最佳实践。',
  '4. 如果知识库中没有相关信息，请诚实告知用户，并建议他们去 MCBBS、MineBBS 等社区论坛寻求更多帮助，或者提供一些通用的排查思路。',
  '5. 始终以鼓励和支持的语气结尾，例如 "祝你的服务器越来越受欢迎！" 或 "开服过程中遇到问题随时再来问我！"',
  '使用 `search` 工具在知识库中检索相关信息来回答用户的问题。',
  '`search` 工具会返回文档中的原始 JSON 结果，请基于这些结果来回答，并尽可能引用文档中的具体内容（如插件名称、指令格式等）。',
].join('\n');

export async function POST(req: Request) {
  const reqJson = await req.json();

  const result = streamText({
    model: openrouter.chat(process.env.OPENROUTER_MODEL ?? 'gpt-4o-mini'),
    instructions: systemPrompt,
    stopWhen: stepCountIs(5),
    tools: {
      search: searchTool,
    },
    messages: await convertToModelMessages<ChatUIMessage>(reqJson.messages ?? [], {
      convertDataPart(part) {
        if (part.type === 'data-client')
          return {
            type: 'text',
            text: `[Client Context: ${JSON.stringify(part.data)}]`,
          };
      },
    }),
    toolChoice: 'auto',
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}

const searchTool = tool({
  description: '在 Minecraft 服务器管理知识库中搜索相关文档、教程、插件介绍和常见问题解答。当用户询问关于开服、配置、插件使用、权限设置等具体操作或概念时，请使用此工具获取准确信息。',
  inputSchema: z.object({
    query: z.string().describe('搜索关键词，应尽量具体，例如 "如何安装 EssentialsX 插件" 或 "server.properties 文件配置说明"。'),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({ query, limit }) {
    const search = await searchServer;
    return await search.searchAsync(query, { limit, merge: true, enrich: true });
  },
}) satisfies SearchTool;