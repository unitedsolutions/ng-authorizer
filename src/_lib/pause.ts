export default (ms?) => new Promise(resolve => setTimeout(resolve, ms || 0));
