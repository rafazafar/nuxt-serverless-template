import { generateText, streamText } from "ai";
import type { H3Event } from "h3";
import { createWorkersAI } from "workers-ai-provider";


type CloudflareAiEnv = {
  AI?: Ai;
};

type CloudflareEventContext = {
  cloudflare?: {
    env?: CloudflareAiEnv;
  };
};

type NormalizedAiSdkRequest = {
  prompt: string;
  model: string;
  system?: string;
};

function createAiConfigurationError(message: string) {
  return createError({
    statusCode: 503,
    statusMessage: "Workers AI unavailable",
    message,
  });
}

function createAiValidationError(message: string) {
  return createError({
    statusCode: 400,
    statusMessage: "Invalid AI request",
    message,
  });
}

export function getWorkersAI(event: H3Event) {
  const binding = (event.context as CloudflareEventContext).cloudflare?.env?.AI;

  if (!binding) {
    throw createAiConfigurationError(
      'Missing the `AI` binding. Add `"ai": { "binding": "AI", "remote": true }` to `wrangler.jsonc`, then make sure Wrangler is authenticated before testing locally.',
    );
  }

  return createWorkersAI({ binding });
}

export function normalizeAiSdkRequest(input: AiSdkRequest | null | undefined): NormalizedAiSdkRequest {
  const prompt = input?.prompt?.trim();
  const model = input?.model?.trim() || DEFAULT_AI_MODEL;
  const system = input?.system?.trim() || undefined;

  if (!prompt) {
    throw createAiValidationError("Prompt is required.");
  }

  return {
    prompt,
    model,
    system,
  };
}

export async function generateAiText(event: H3Event, input: AiSdkRequest): Promise<AiSdkResponse> {
  const request = normalizeAiSdkRequest(input);
  const workersai = getWorkersAI(event);

  const result = await generateText({
    model: workersai(request.model),
    prompt: request.prompt,
    ...(request.system ? { system: request.system } : {}),
  });

  return {
    model: request.model,
    text: result.text,
  };
}

export function streamAiText(event: H3Event, input: AiSdkRequest) {
  const request = normalizeAiSdkRequest(input);
  const workersai = getWorkersAI(event);

  const result = streamText({
    model: workersai(request.model),
    prompt: request.prompt,
    ...(request.system ? { system: request.system } : {}),
  });

  return result.toTextStreamResponse({
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "content-encoding": "identity",
    },
  });
}
