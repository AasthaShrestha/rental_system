import natural from "natural";

const calculateCosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b ** 2, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

const tokenizeText = (text) => {
  const tokenizer = new natural.WordTokenizer();
  return tokenizer.tokenize(text.toLowerCase()); // Lowercase for normalization
};

const createVector = (tokens, vocabulary) => {
  const vector = Array(vocabulary.length).fill(0);
  tokens.forEach((token) => {
    const index = vocabulary.indexOf(token);
    if (index !== -1) {
      vector[index] += 1; // Increment frequency
    }
  });
  return vector;
};

const getCombinedVector = (title, subtitle, description) => {
  const titleTokens = tokenizeText(title);
  const subtitleTokens = tokenizeText(subtitle);
  const descriptionTokens = tokenizeText(description);

  const allTokens = [...titleTokens, ...subtitleTokens, ...descriptionTokens];
  const vocabulary = Array.from(new Set(allTokens));

  const titleVector = createVector(titleTokens, vocabulary);
  const subtitleVector = createVector(subtitleTokens, vocabulary);
  const descriptionVector = createVector(descriptionTokens, vocabulary);

  function combineVectors(...vectors) {
    return vectors.reduce(
      (acc, vector) => acc.map((val, idx) => val + vector[idx]),
      Array(vectors[0].length).fill(0)
    );
  }

  const precomputedVector = combineVectors(
    titleVector,
    subtitleVector,
    descriptionVector
  );
  return precomputedVector;
};

function normalizeValue(value, min, max) {
  return (value - min) / (max - min);
}

const textToVector = (text1, text2) => {
  const tokenizer = new natural.WordTokenizer();
  const tokens1 = tokenizer.tokenize(text1.toLowerCase());
  const tokens2 = tokenizer.tokenize(text2.toLowerCase());
  const combinedTokens = Array.from(new Set([...tokens1, ...tokens2]));

  const vector1 = combinedTokens.map((token) =>
    tokens1.includes(token) ? 1 : 0
  );
  const vector2 = combinedTokens.map((token) =>
    tokens2.includes(token) ? 1 : 0
  );

  return [vector1, vector2];
};

export {
  normalizeValue,
  getCombinedVector,
  calculateCosineSimilarity,
  textToVector,
};
