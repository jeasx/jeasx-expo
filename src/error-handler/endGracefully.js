/**
 * Passes a stream through chunk by chunk, but ends it cleanly if it fails midway:
 * appends what the fallback returns for the error and closes the stream. Otherwise
 * the connection would be cut, which some browsers (e.g. Safari on iOS) answer with
 * a blank "network error" page.
 *
 * @param {ReadableStream} stream
 * @param {(error: unknown) => string | Promise<string>} fallback
 */
export default function endGracefully(stream, fallback) {
  const reader = stream.getReader();
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        try {
          controller.enqueue(await fallback(error));
        } finally {
          controller.close();
        }
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
}
