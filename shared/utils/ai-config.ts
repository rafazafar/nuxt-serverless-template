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

export const MODEL_OPTIONS = [
  {
    label: "GPT OSS 120B",
    value: "@cf/openai/gpt-oss-120b",
    vendor: "OpenAI",
    note: "High-capability open-weight reasoning model",
  },
  {
    label: "GPT OSS 20B",
    value: "@cf/openai/gpt-oss-20b",
    vendor: "OpenAI",
    note: "Lower-latency open-weight reasoning model",
  },
  {
    label: "Llama 4 Scout 17B",
    value: "@cf/meta/llama-4-scout-17b-16e-instruct",
    vendor: "Meta",
    note: "Strong current multimodal-capable text model",
  },
  {
    label: "Nemotron 3 120B A12B",
    value: "@cf/nvidia/nemotron-3-120b-a12b",
    vendor: "NVIDIA",
    note: "Agent-focused MoE model with strong reasoning",
  },
  {
    label: "Llama 3.3 70B Fast",
    value: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    vendor: "Meta",
    note: "Fast 70B option with function-calling support",
  },
  {
    label: "Llama 3.1 8B Instruct Fast",
    value: "@cf/meta/llama-3.1-8b-instruct-fast",
    vendor: "Meta",
    note: "Lower latency text generation",
  },
  {
    label: "Llama 3.1 8B Instruct FP8",
    value: "@cf/meta/llama-3.1-8b-instruct-fp8",
    vendor: "Meta",
    note: "Quantized 8B option",
  },
  {
    label: "Llama 3.1 8B Instruct",
    value: "@cf/meta/llama-3.1-8b-instruct",
    vendor: "Meta",
    note: "Balanced classic default for general prompts",
  },
  {
    label: "Llama 3.2 1B Instruct",
    value: "@cf/meta/llama-3.2-1b-instruct",
    vendor: "Meta",
    note: "Smallest current Llama text option",
  },
  {
    label: "Llama 3.2 3B Instruct",
    value: "@cf/meta/llama-3.2-3b-instruct",
    vendor: "Meta",
    note: "Small model for lightweight prompts",
  },
  {
    label: "Qwen3 30B A3B FP8",
    value: "@cf/qwen/qwen3-30b-a3b-fp8",
    vendor: "Qwen",
    note: "Current Qwen3 MoE text generation model",
  },
  {
    label: "QwQ 32B",
    value: "@cf/qwen/qwq-32b",
    vendor: "Qwen",
    note: "Reasoning-heavy model",
  },
  {
    label: "Qwen2.5 Coder 32B",
    value: "@cf/qwen/qwen2.5-coder-32b-instruct",
    vendor: "Qwen",
    note: "Code-oriented text generation",
  },
  {
    label: "DeepSeek R1 Distill Qwen 32B",
    value: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
    vendor: "DeepSeek",
    note: "Reasoning-focused distilled model",
  },
  {
    label: "Gemma 3 12B IT",
    value: "@cf/google/gemma-3-12b-it",
    vendor: "Google",
    note: "Gemma 3 instruction-tuned model",
  },
  {
    label: "Llama 3.2 11B Vision Instruct",
    value: "@cf/meta/llama-3.2-11b-vision-instruct",
    vendor: "Meta",
    note: "Vision-capable text generation model",
  },
  {
    label: "Llama Guard 3 8B",
    value: "@cf/meta/llama-guard-3-8b",
    vendor: "Meta",
    note: "Safety classification model exposed as text generation",
  },
  {
    label: "Granite 4.0 H Micro",
    value: "@cf/ibm-granite/granite-4.0-h-micro",
    vendor: "IBM",
    note: "Efficient agentic model with tool calling",
  },
  {
    label: "SEA-LION v4 27B",
    value: "@cf/aisingapore/gemma-sea-lion-v4-27b-it",
    vendor: "AI Singapore",
    note: "SEA-focused multilingual instruction model",
  },
];