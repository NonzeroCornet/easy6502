function highlightSyntax(code) {
  const instructionColors = {
    LD: "lime",
    ST: "teal",
    T: "purple",
    PH: "lightgrey",
    PL: "lightgrey",
    AND: "blue",
    EOR: "blue",
    ORA: "blue",
    BIT: "blue",
    ADC: "orange",
    SBC: "orange",
    CMP: "orange",
    CP: "orange",
    INC: "yellow",
    DEC: "yellow",
    IN: "yellow",
    DE: "yellow",
    ASL: "pink",
    LSR: "pink",
    ROL: "pink",
    ROR: "pink",
    JMP: "green",
    JSR: "green",
    RTS: "green",
    B: "green",
    CL: "brown",
    SE: "brown",
    BRK: "darkgrey",
    NOP: "darkgrey",
    RTI: "darkgrey",
  };

  function colorize(token) {
    const upperToken = token.toUpperCase();

    if (upperToken.endsWith(":")) {
      return `<span style="color: grey; font-style: italic;">${token}</span>`;
    }

    if (upperToken.startsWith("#$")) {
      return `<span style="color: pink; font-style: italic;">${token}</span>`;
    }

    if (upperToken.startsWith("$")) {
      const parts = upperToken.split(",");
      const address = `<span style="color: teal; font-style: italic;">${parts[0]}</span>`;
      const register = parts[1]
        ? `<span style="color: red;">,${parts[1]}</span>`
        : "";
      return address + register;
    }

    for (const [prefix, color] of Object.entries(instructionColors)) {
      if (upperToken.startsWith(prefix)) {
        if (
          prefix.length === upperToken.length ||
          (prefix.length === 1 && upperToken.length <= 3)
        ) {
          return `<span style="color: ${color};">${token}</span>`;
        } else if (prefix.length === 1 || prefix.length === 2) {
          return `<span style="color: ${color};">${token.slice(0, prefix.length)}</span><span style="color: red;">${token.slice(prefix.length)}</span>`;
        }
      }
    }

    return `<span style="color: grey; font-style: italic;">${token}</span>`;
  }

  return code
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s+$/.test(token)) {
        return token.replace(/\n/g, "<br>");
      }
      return colorize(token);
    })
    .join("");
}
document.addEventListener("DOMContentLoaded", () => {
  const codeTextarea = document.querySelector(".code");
  const highlightedCode = document.querySelector(".highlightedCode code");

  function updateHighlighting() {
    const code = codeTextarea.value;
    highlightedCode.innerHTML = highlightSyntax(code);
  }

  codeTextarea.addEventListener("input", updateHighlighting);
  updateHighlighting(); // Initial highlighting on page load
});
