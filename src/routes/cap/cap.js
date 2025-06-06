import Cap from "@cap.js/server";

if (!globalThis.cap) {
  globalThis.cap = new Cap({
    noFSState: false,
    state: {
      challengesList: {},
      tokensList: {},
    },
  });
}

export default globalThis.cap;
