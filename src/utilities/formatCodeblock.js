function formatCodeblock(language, code) {
  const formattedMessageWithCodeblock = `\`\`\`${language}\n${code}\`\`\``;
  return formattedMessageWithCodeblock;
}

module.exports = formatCodeblock;
