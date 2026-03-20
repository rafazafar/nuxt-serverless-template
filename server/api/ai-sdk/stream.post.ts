export default eventHandler(async (event) => {
  const body = await readBody<AiSdkRequest>(event);

  return streamAiText(event, body);
});
