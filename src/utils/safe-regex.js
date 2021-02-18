function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = function safeRegex(text) {
  const rgx = new RegExp(escapeRegex(text), 'gi');
  return rgx;
};
