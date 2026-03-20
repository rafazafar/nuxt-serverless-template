export const DEFAULT_AI_MODEL = "@cf/openai/gpt-oss-120b";

export const AI_SDK_DOCS_URL =
  "https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/";

export type AiSdkRequest = {
  prompt: string;
  model?: string;
  system?: string;
};

export type AiSdkResponse = {
  model: string;
  text: string;
};
