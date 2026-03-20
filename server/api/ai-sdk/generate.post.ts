export default eventHandler(async (event) => {
  const body = await readBody<AiSdkRequest>(event);

  return generateAiText(event, body);
});
