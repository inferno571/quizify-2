import { Quiz } from "./types";

export const DEFAULT_QUIZZES: Quiz[] = [
  {
    "id": "dlnlp-full-combined-test",
    "title": "DLNLP - Full Combined Grand Test (Assignments 1-12)",
    "subject": "DLNLP",
    "date": "16/10/2026",
    "questions": [
      {
        "question": "1. A bigram model approximates P(w_i | w_1, ..., w_{i-1}) as:",
        "options": [
          "P(w_i)",
          "P(w_i | w_{i-1})",
          "P(w_i | w_{i-1}, w_{i-2})",
          "P(w_{i-1} | w_i)"
        ],
        "correctAnswer": "P(w_i | w_{i-1})",
        "explanation": "The (first-order) Markov assumption underlying a bigram model conditions each word only on the single previous word."
      },
      {
        "question": "2. Using the reference confusion matrix, what is the overall accuracy of the model?\n\n| | Predicted Positive | Predicted Negative |\n|---|---|---|\n| Actual Positive | 40 | 10 |\n| Actual Negative | 20 | 30 |",
        "options": [
          "0.6",
          "0.67",
          "0.70",
          "0.75"
        ],
        "correctAnswer": "0.70",
        "explanation": "Accuracy = (TP + TN) / Total = (40 + 30) / (40 + 10 + 20 + 30) = 70 / 100 = 0.70."
      },
      {
        "question": "3. A test set W = w_1 w_2 (N = 2 words) has model probabilities P(w_1) = 1/2 and P(w_2) = 1/8. What is the perplexity PP(W)? Assume the word choices are conditionally independent.",
        "options": [
          "4",
          "2",
          "8",
          "16"
        ],
        "correctAnswer": "4",
        "explanation": "Perplexity PP(W) = P(w_1 w_2)^(-1/N) = (P(w_1) * P(w_2))^(-1/2) = (1/2 * 1/8)^(-1/2) = (1/16)^(-1/2) = sqrt(16) = 4."
      },
      {
        "question": "4. Word embeddings (e.g., from Word2Vec or the embedding layer of an LLM) are useful primarily because they:",
        "options": [
          "Reduce all words to a single scalar value",
          "Guarantee zero probability for unseen words",
          "Represent words as dense vectors capturing semantic and syntactic similarity",
          "Eliminate the need for training data"
        ],
        "correctAnswer": "Represent words as dense vectors capturing semantic and syntactic similarity",
        "explanation": "Embeddings map words to dense continuous vectors so that semantically and syntactically related words lie close together in vector space, unlike sparse one-hot representations."
      },
      {
        "question": "5. In a corpus, the bigram \"and the\" occurs 2 times, the unigram \"and\" occurs 48 times, and the vocabulary size is V = 500. Under Add-1 smoothing, P(\"the\" | \"and\") is approximately:",
        "options": [
          "0.0055",
          "0.0417",
          "0.0020",
          "0.5000"
        ],
        "correctAnswer": "0.0055",
        "explanation": "P_Add-1(w_2 | w_1) = (C(w_1, w_2) + 1) / (C(w_1) + V) = (2 + 1) / (48 + 500) = 3 / 548 ≈ 0.0055."
      },
      {
        "question": "6. Consider the training corpus (with sentence boundaries):\n<s> the cat runs </s>\n<s> the dog runs </s>\n<s> the cat sleeps </s>\n\nUsing MLE, what is the bigram probability P(cat | the)?",
        "options": [
          "1/3",
          "1/2",
          "2/3",
          "1"
        ],
        "correctAnswer": "2/3",
        "explanation": "\"the\" occurs 3 times. It is followed by \"cat\" twice and \"dog\" once. P(cat | the) = count(the, cat) / count(the) = 2/3."
      },
      {
        "question": "7. What is the effect of Add-1 smoothing on the relative probabilities of a frequent word pair versus an infrequent word pair?",
        "options": [
          "It widens the gap between their probabilities",
          "It narrows (compresses) the gap between their probabilities, moving both toward a more uniform distribution",
          "It leaves all relative probabilities unchanged",
          "It sets both probabilities exactly equal"
        ],
        "correctAnswer": "It narrows (compresses) the gap between their probabilities, moving both toward a more uniform distribution",
        "explanation": "By uniformly adding 1 to every count, Add-1 smoothing takes a large amount of probability mass from high-count pairs and gives it to low/zero-count pairs, compressing the gap between frequent and infrequent pairs (it can over-smooth)."
      },
      {
        "question": "8. In corpus C, the bigram probability P(paper | question) = 0.25 and count(\"question\") = 800. If the vocabulary size is V = 1000, what is P(paper | question) after Add-1 smoothing?",
        "options": [
          "0.112",
          "0.250",
          "0.100",
          "0.212"
        ],
        "correctAnswer": "0.112",
        "explanation": "C(question, paper) = P(paper | question) * C(question) = 0.25 * 800 = 200. P_Add-1(paper | question) = (C(w_1, w_2) + 1) / (C(w_1) + V) = (200 + 1) / (800 + 1000) = 201 / 1800 ≈ 0.112."
      },
      {
        "question": "9. Why do unigram models perform especially poorly in the Shannon \"predict the next word\" game (e.g., \"For breakfast I ate my usual ___\")?",
        "options": [
          "Because unigrams overfit long contexts",
          "Because unigrams require the entire vocabulary to be labeled",
          "Because unigrams ignore all preceding words and predict based only on individual word frequencies",
          "Because unigrams cannot assign probabilities at all"
        ],
        "correctAnswer": "Because unigrams ignore all preceding words and predict based only on individual word frequencies",
        "explanation": "A unigram model assigns probabilities to words independent of context. Since it ignores the preceding words entirely, it cannot use the context that makes the next word predictable, so it is terrible at next-word prediction."
      },
      {
        "question": "10. A unigram language model that treats all words as equally likely achieves a perplexity of 100 on a test set. What is the probability the model assigns to each individual word?",
        "options": [
          "0.01",
          "0.001",
          "0.1",
          "1.0"
        ],
        "correctAnswer": "0.01",
        "explanation": "For equal probabilities, perplexity PP(W) = V = 100. The probability assigned to each individual word is P(w) = 1 / V = 1 / 100 = 0.01."
      },
      {
        "question": "11. A shallow ReLU network has hidden pre-activations z = Wx + b with W = [[1, −1], [2, 1], [−1, 1]] and b = [0, −3, 1]. The hidden activations h = ReLU(z) feed an output y = vᵀh with v = [1, 2, 1] and no output bias. For the input x = [1, 2], what is y?",
        "options": [
          "0",
          "2",
          "4",
          "6"
        ],
        "correctAnswer": "4",
        "explanation": "Pre-activations: z₁ = 1(1) + (−1)(2) + 0 = −1; z₂ = 2(1) + 1(2) − 3 = 1; z₃ = −1(1) + 1(2) + 1 = 2. After ReLU: h = [0, 1, 2] (the first unit is switched off). Output: y = 1(0) + 2(1) + 1(2) = 4."
      },
      {
        "question": "12. A single hidden unit computes h = ReLU(wx + b) with w = −2, b = 1, evaluated at x = 3. What is ∂h/∂w at this input?",
        "options": [
          "3",
          "0",
          "-2",
          "-6"
        ],
        "correctAnswer": "0",
        "explanation": "Pre-activation = wx + b = (−2)(3) + 1 = −5 < 0, so the ReLU is in its flat region and h = 0. The derivative of ReLU is 0 for negative pre-activations, hence ∂h/∂w = 0 × x = 0 (dead ReLU)."
      },
      {
        "question": "13. A softmax output layer receives the logits [2, 1, 0]. If the correct class is the first one, what is the cross-entropy loss (using natural logarithm)?",
        "options": [
          "0.335",
          "0.408",
          "0.665",
          "1.407"
        ],
        "correctAnswer": "0.408",
        "explanation": "exp(2) = 7.389, exp(1) = 2.718, exp(0) = 1.000; sum = 11.107. Softmax probabilities = [0.665, 0.245, 0.090]. Loss = −ln(0.665) = 0.408."
      },
      {
        "question": "14. A network with a single weight w produces the output y = w³, and the loss is L = ½(y − t)² with target t = 5. If the current value is w = 2, what is ∂L/∂w?",
        "options": [
          "12",
          "24",
          "36",
          "108"
        ],
        "correctAnswer": "36",
        "explanation": "y = w³ = 8. ∂L/∂y = y − t = 8 − 5 = 3. ∂y/∂w = 3w² = 3(4) = 12. By the chain rule, ∂L/∂w = (y − t) · 3w² = 3 × 12 = 36."
      },
      {
        "question": "15. Gradient descent is run on L(w) = w² − 4w + 3 starting from w₀ = 4 with learning rate η = 0.1. What is the value of w after TWO updates?",
        "options": [
          "3.28",
          "3.60",
          "3.40",
          "2.21"
        ],
        "correctAnswer": "3.28",
        "explanation": "∂L/∂w = 2w − 4. Step 1: gradient = 2(4) − 4 = 4, so w₁ = 4 − 0.1(4) = 3.6. Step 2: gradient = 2(3.6) − 4 = 3.2, so w₂ = 3.6 − 0.1(3.2) = 3.28."
      },
      {
        "question": "16. A model is trained on 50,000 examples using mini-batch stochastic gradient descent with a batch size of 250, for 12 epochs. How many parameter updates are performed in total?",
        "options": [
          "200",
          "600",
          "2400",
          "600000"
        ],
        "correctAnswer": "2400",
        "explanation": "Updates per epoch = 50,000 / 250 = 200. Total updates = 200 × 12 = 2,400."
      },
      {
        "question": "17. For the function f(w₁, w₂) = w₁² − w₂², the gradient vanishes at the origin. What kind of stationary point is the origin?",
        "options": [
          "A global minimum",
          "A local maximum",
          "A local minimum that is not global",
          "A saddle point"
        ],
        "correctAnswer": "A saddle point",
        "explanation": "Along w₁, f = w₁² has a minimum at 0; along w₂, f = −w₂² has a maximum at 0. The Hessian is diag(2, −2) with eigenvalues of opposite sign, meaning the origin is a saddle point."
      },
      {
        "question": "18. Using the least squares loss L = (1/N) Σᵢ (yᵢ − ŷᵢ)² with ŷ = wx + b, evaluate the loss for x = [1, 2, 3, 4], y = [3, 5, 7, 10], w = 2 and b = 1.",
        "options": [
          "0.00",
          "0.25",
          "0.50",
          "1.00"
        ],
        "correctAnswer": "0.25",
        "explanation": "Predictions = [3, 5, 7, 9]; residuals = [0, 0, 0, 1]. Sum of squared residuals = 1; dividing by N = 4 gives L = 0.25."
      },
      {
        "question": "19. A linear regression model predicts 3 real-valued outputs from 100 input features, with a separate bias for each output. How many parameters must be learned?",
        "options": [
          "303",
          "103",
          "300",
          "309"
        ],
        "correctAnswer": "303",
        "explanation": "The weight matrix has 100 × 3 = 300 entries and there are 3 bias terms. Total = 300 + 3 = 303 parameters."
      },
      {
        "question": "20. Which of the following statements is FALSE?",
        "options": [
          "A shallow network with sufficiently many hidden units can approximate any continuous function on a compact subset of Rᴰ to arbitrary precision.",
          "The universal approximation theorem guarantees that gradient descent will find the parameters achieving that approximation.",
          "Increasing the number of hidden units increases the number of linear regions a ReLU network can represent.",
          "The universal approximation theorem gives no practical bound on how many hidden units are required for a given function."
        ],
        "correctAnswer": "The universal approximation theorem guarantees that gradient descent will find the parameters achieving that approximation.",
        "explanation": "The universal approximation theorem is an existence/representational result; it does not guarantee that gradient descent or any optimization algorithm can actually find those parameters."
      },
      {
        "question": "21. Match each situation to the most appropriate family of cross-lingual embedding model (each family used at most once):\n(a) Large monolingual corpora for both languages plus a dictionary of about 5,000 translated frequent words, but no parallel sentences.\n(b) Only topic-aligned encyclopaedia articles: no dictionary, no sentence alignments, no word alignments.\n(c) A moderate sentence-aligned parallel corpus without word alignments, plus a very large monolingual corpus for the high-resource language only.",
        "options": [
          "(a) monolingual mapping, (b) pseudo-cross-lingual training, (c) joint optimization.",
          "(a) joint optimization, (b) cross-lingual training, (c) monolingual mapping.",
          "(a) pseudo-cross-lingual training, (b) monolingual mapping, (c) cross-lingual training.",
          "(a) cross-lingual training, (b) joint optimization, (c) pseudo-cross-lingual training."
        ],
        "correctAnswer": "(a) monolingual mapping, (b) pseudo-cross-lingual training, (c) joint optimization.",
        "explanation": "(a) Monolingual mapping learns word embeddings on monolingual corpora then learns a linear map via a bilingual dictionary. (b) Pseudo-cross-lingual creates mixed contexts via merge-and-shuffle on document-aligned data. (c) Joint optimization (such as BilBOWA) jointly optimizes monolingual and cross-lingual sentence-mean objectives."
      },
      {
        "question": "22. A Skip-gram model with full softmax has two-dimensional embeddings and vocabulary V = {river, delta, silt, ledger, audit}. The target (centre) vector of river is vriver = (2, 1) and the context vectors are uriver = (0.5, −1), udelta = (1, 0), usilt = (0, 1), uledger = (−1, 1), uaudit = (−0.5, 0), with P(o | c) = exp(u_o^T v_c) / Σ exp(u_w^T v_c). Using e^0 = 1, e^1 = 2.718, e^2 = 7.389, e^{-1} = 0.368, with river as the centre word, what are P(delta | river) and P(silt | river)?",
        "options": [
          "0.240 and 0.510",
          "0.500 and 0.250",
          "0.230 and 0.624",
          "0.624 and 0.230"
        ],
        "correctAnswer": "0.624 and 0.230",
        "explanation": "Scores: river: 0, delta: 2, silt: 1, ledger: -1, audit: -1. Denominator = 1 + 7.389 + 2.718 + 0.368 + 0.368 = 11.843. P(delta|river) = 7.389 / 11.843 = 0.624, P(silt|river) = 2.718 / 11.843 = 0.230."
      },
      {
        "question": "23. A corpus consists of exactly two sentences: “solar panels charge the battery” and “wind turbines spin”. Skip-gram pairs use a window of 2 words on each side of the target, truncated at sentence boundaries. How many (target, context) pairs are produced in total, and how many have charge as the target?",
        "options": [
          "32 pairs; 4 with charge as target.",
          "20 pairs; 4 with charge as target.",
          "20 pairs; 2 with charge as target.",
          "14 pairs; 4 with charge as target."
        ],
        "correctAnswer": "20 pairs; 4 with charge as target.",
        "explanation": "Sentence 1 positions: 2, 3, 4, 3, 2 = 14 pairs. Sentence 2 positions: 2, 2, 2 = 6 pairs. Grand total = 20 pairs. 'charge' has position 3 with full ±2 context, yielding 4 pairs: (solar, panels, the, battery)."
      },
      {
        "question": "24. A linear mapping W projects source-language embeddings into target-language space, minimising Σ ∥Wxi − zi∥². With W = [[0.5, 1], [1, -0.5]], xlibro = (2, 1)^T, and candidates zbook = (1.8, 1.6)^T, zbridge = (2.5, 0.5)^T, zhouse = (1.5, 1.0)^T: Which option correctly gives the mapped vector, squared Euclidean distances, and nearest target vector?",
        "options": [
          "Wx = (2, 1.5); d²_book = 1.25, d²_bridge = 0.05, d²_house = 0.50 ⇒ bridge.",
          "Wx = (2, 1.5); d²_book = 0.05, d²_bridge = 1.25, d²_house = 0.50 ⇒ book.",
          "Wx = (1, −0.5); d²_book = 5.05, d²_bridge = 3.25, d²_house = 2.50 ⇒ house.",
          "Wx = (2, 1.5); d²_book = 0.50, d²_bridge = 1.25, d²_house = 0.05 ⇒ house."
        ],
        "correctAnswer": "Wx = (2, 1.5); d²_book = 0.05, d²_bridge = 1.25, d²_house = 0.50 ⇒ book.",
        "explanation": "Wx = [0.5(2)+1(1), 1(2)-0.5(1)]^T = [2, 1.5]^T. d²_book = (0.2)² + (-0.1)² = 0.05; d²_bridge = (-0.5)² + (1.0)² = 1.25; d²_house = (0.5)² + (0.5)² = 0.50. Closest is book."
      },
      {
        "question": "25. A bilingual model trains on aligned sentence pairs by minimising the squared Euclidean distance between the means of their word vectors. A source sentence has three words with vectors (1, 2), (3, 0), (2, 1); the aligned target sentence has two words with vectors (1, 2) and (3, 1). What are the two means and the loss?",
        "options": [
          "Means (2, 1) and (2, 1.5); loss = 0.5.",
          "Means (2, 1) and (4, 3); loss = 8.0.",
          "Means (2, 1) and (2, 1.5); loss = 0.25.",
          "Means (6, 3) and (4, 3); loss = 4.0."
        ],
        "correctAnswer": "Means (2, 1) and (2, 1.5); loss = 0.25.",
        "explanation": "Source mean = ((1+3+2)/3, (2+0+1)/3) = (2, 1). Target mean = ((1+3)/2, (2+1)/2) = (2, 1.5). Difference = (0, -0.5), so squared Euclidean distance = 0² + (-0.5)² = 0.25."
      },
      {
        "question": "26. In Skip-gram with negative sampling, vharbour = (1, 2), uwharf = (1, 0.5) (positive), urecipe = (−1, 0) and usprint = (0, 0.5) (negatives). With σ(2) = 0.881, σ(1) = 0.731, σ(−1) = 0.269, log 0.881 = −0.127, log 0.731 = −0.313, log 0.269 = −1.313: What are the three loss terms, the total, and the required update?",
        "options": [
          "0.127, 1.313, 0.313; L = 1.753; recipe contributes more, and the update must decrease u_recipe^T v_harbour.",
          "0.127, 0.313, 1.313; L = 1.753; sprint contributes more, and the update must decrease u_sprint^T v_harbour and increase u_wharf^T v_harbour.",
          "0.881, 0.731, 0.269; L = 1.881; wharf contributes most, since it is the positive example.",
          "0.127, 0.313, 1.313; L = 1.753; sprint contributes more, and the update must increase u_sprint^T v_harbour so that the model can tell the two negatives apart."
        ],
        "correctAnswer": "0.127, 0.313, 1.313; L = 1.753; sprint contributes more, and the update must decrease u_sprint^T v_harbour and increase u_wharf^T v_harbour.",
        "explanation": "Dot products: wharf = 2, recipe = -1, sprint = 1. Losses: positive = -log σ(2) = 0.127; recipe = -log σ(1) = 0.313; sprint = -log σ(-1) = 1.313. Total L = 1.753. Sprint dominates and needs to be pushed further away while wharf is pulled closer."
      },
      {
        "question": "27. A team builds sparse word vectors from a 40,000-token corpus of gardening articles. Each word is an 8,000-dimensional PPMI vector. The near-synonyms spade and shovel each occur ~60 times, yet their vectors share only 2 non-zero dimensions and have cosine similarity 0.04. What is the cause, and which remedy addresses it?",
        "options": [
          "The distributional hypothesis fails for synonyms; widen the context window",
          "PPMI over-weights frequent contexts; switch to raw co-occurrence counts",
          "The vectors are too sparse to share dimensions; learn short dense vectors",
          "Cosine is unreliable on sparse vectors; use the unnormalised dot product"
        ],
        "correctAnswer": "The vectors are too sparse to share dimensions; learn short dense vectors",
        "explanation": "Because each word occurs only ~60 times in a small window, their contexts are severely undersampled across 8,000 sparse dimensions. Learning short dense vectors (e.g. Word2Vec/GloVe or SVD) collapses related context dimensions into shared latent factors."
      },
      {
        "question": "28. Which statement comparing greedy decoding and beam search is TRUE?",
        "options": [
          "Greedy decoding is the special case of beam search with beam width k = 1, and both are deterministic.",
          "Beam search is a stochastic decoding strategy, whereas greedy decoding is deterministic.",
          "Beam search with any k > 1 is guaranteed to return the globally optimal sequence.",
          "Greedy decoding maximises the total sequence log-probability by construction."
        ],
        "correctAnswer": "Greedy decoding is the special case of beam search with beam width k = 1, and both are deterministic.",
        "explanation": "Greedy decoding maintains exactly one best hypothesis at each step (beam width k = 1) and both methods are deterministic (unlike temperature sampling)."
      },
      {
        "question": "29. A named-entity recognition system must recognise 7 distinct entity types and uses the BIO tagging scheme. How many distinct tags does the per-token classifier have to choose from?",
        "options": [
          "7",
          "14",
          "15",
          "16"
        ],
        "correctAnswer": "15",
        "explanation": "BIO tagging requires a B-tag and an I-tag for each entity type, plus one shared O (Outside) tag: 2n + 1 = 2(7) + 1 = 15 tags."
      },
      {
        "question": "30. An RNN language model is trained on a 4-token sequence. At the four timesteps it assigns the following probabilities to the correct next token: 0.5, 0.25, 0.125, 0.0625. Using logarithms to base 2, what is the average cross-entropy loss per token?",
        "options": [
          "0.625",
          "1.25",
          "2.5",
          "10"
        ],
        "correctAnswer": "2.5",
        "explanation": "-log2(0.5) = 1; -log2(0.25) = 2; -log2(0.125) = 3; -log2(0.0625) = 4. Sum = 10 bits. Average = 10 / 4 = 2.5 bits per token."
      },
      {
        "question": "31. A sequence-to-sequence model with dot-product attention translates a source sentence of 12 tokens into a target sentence of 9 tokens. How many attention weights α_ij are computed in total over the whole decoding process?",
        "options": [
          "12",
          "21",
          "9",
          "108"
        ],
        "correctAnswer": "108",
        "explanation": "At each of the 9 decoder steps, 12 attention weights (one per source token) are computed: 9 × 12 = 108 attention weights."
      },
      {
        "question": "32. A Bi-LSTM is used for NER. Word embeddings are 100-dimensional; the forward and backward LSTMs each have a hidden state of 64 dimensions. There are 4 entity types and the BIO scheme is used. The output layer is applied to the concatenated hidden state. How many parameters must be trained, excluding biases and excluding the embedding table?",
        "options": [
          "85120",
          "43136",
          "84544",
          "83968"
        ],
        "correctAnswer": "85120",
        "explanation": "Tags = 2(4) + 1 = 9. Per LSTM direction: 4 gates × (64×100 + 64×64) = 4 × 10,496 = 41,984. Both directions: 2 × 41,984 = 83,968. Output projection on concatenated 128 hidden state: 9 × 128 = 1,152. Total = 83,968 + 1,152 = 85,120."
      },
      {
        "question": "33. A sequence-to-sequence RNN with dot-product attention has 3 encoder hidden states (2-dimensional): h_1 = [2, 0], h_2 = [0, 2], h_3 = [1, 1] and the relevant decoder hidden state is h^d_{i-1} = [1, −1]. Which is the resulting context vector c_i (to 2 decimal places)?",
        "options": [
          "[1.85, 0.15]",
          "[1.00, 0.33]",
          "[0.15, 1.85]",
          "[1.50, 0.50]"
        ],
        "correctAnswer": "[1.85, 0.15]",
        "explanation": "Scores: h^d · h_1 = 2, h^d · h_2 = -2, h^d · h_3 = 0. Softmax over [2, -2, 0] gives α ≈ [0.867, 0.016, 0.117]. Context vector c_i = 0.867[2, 0] + 0.016[0, 2] + 0.117[1, 1] ≈ [1.85, 0.15]."
      },
      {
        "question": "34. A machine-translation system uses an RNN encoder–decoder with dot-product attention. Source vocab = 30,000, target vocab = 20,000, embeddings = 200d, encoder & decoder hidden states = 150d. Counting both embedding tables, both recurrent units, and the output projection (ignoring biases), how many parameters are there in total?",
        "options": [
          "9,105,000",
          "13,105,000",
          "13,405,000",
          "10,105,000"
        ],
        "correctAnswer": "13,105,000",
        "explanation": "Source embeddings: 30,000 × 200 = 6M. Encoder W & U: 150×200 + 150×150 = 52,500. Target embeddings: 20,000 × 200 = 4M. Decoder W & U: 150×200 + 150×150 = 52,500. Output projection: 20,000 × 150 = 3M. Total = 6M + 52,500 + 4M + 52,500 + 3M = 13,105,000."
      },
      {
        "question": "35. An encoder–decoder Transformer translates a 6-token source to a 5-token target. Consider the two attention sub-layers of one decoder block while computing representation of target position 3. Which option correctly states source of Q, K, V and visible key positions?",
        "options": [
          "Masked self-attention: Q from the decoder, K, V from the encoder output; 3 visible positions. Cross-attention: Q, K, V all from the encoder; 6 visible positions.",
          "Masked self-attention: Q, K, V all from the decoder; 5 visible positions, since teacher forcing makes the whole target available. Cross-attention: Q from the encoder, K, V from the decoder; 6 visible positions.",
          "Masked self-attention: Q, K, V all from the decoder; 3 visible positions. Cross-attention: Q from the decoder, K, V from the output of the top encoder block; 6 visible positions.",
          "Masked self-attention: Q, K, V all from the decoder; 3 visible positions. Cross-attention: Q from the decoder, K, V from the top encoder block; 3 visible positions, because the same causal mask is applied there as well."
        ],
        "correctAnswer": "Masked self-attention: Q, K, V all from the decoder; 3 visible positions. Cross-attention: Q from the decoder, K, V from the output of the top encoder block; 6 visible positions.",
        "explanation": "Masked self-attention operates within the target sequence with causal mask hiding positions 4 and 5 (so 3 visible keys: 1, 2, 3). Cross-attention uses Q from the decoder and K, V from the full top encoder block (all 6 source positions visible)."
      },
      {
        "question": "36. A single-head encoder self-attention layer has dmodel = 3 and dk = dv = 2. Token embeddings are x1 = [1, 0, 1], x2 = [0, 1, 2]. Projections are WQ = [[1, 0], [0, 1], [1, 0]], WK = [[1, 1], [0, -1], [0, 1]], WV = [[2, 0], [0, 1], [0, 1]]. Scores scaled by √dk. With e^1.414 ≈ 4.113, e^0 = 1, what is the self-attention output a1 for token 1?",
        "options": [
          "[ 1.609, 1.391 ]",
          "[ 1.762, 1.238 ]",
          "[ 0.392, 2.608 ]",
          "[ 1.000, 2.000 ]"
        ],
        "correctAnswer": "[ 1.609, 1.391 ]",
        "explanation": "q1 = [2, 0]; k1 = [1, 2], k2 = [0, 1]; v1 = [2, 1], v2 = [0, 3]. Dot products: q1·k1 = 2, q1·k2 = 0. Scaled by √2: [1.414, 0]. Softmax weights: α = [0.804, 0.196]. Output a1 = 0.804[2, 1] + 0.196[0, 3] = [1.609, 1.391]."
      },
      {
        "question": "37. Two multi-head attention layers have dmodel = 96. Config A: h = 6, dq = dk = dv = 16. Config B: h = 12, dq = dk = dv = 8. Ignoring biases, what is the total number of parameters in WQ, WK, WV and WO for A and B respectively?",
        "options": [
          "27,648 and 27,648",
          "36,864 and 36,864",
          "36,864 and 73,728",
          "13,824 and 11,520"
        ],
        "correctAnswer": "36,864 and 36,864",
        "explanation": "In both configurations h × dk = 96 = dmodel. Projections cost 3 × dmodel × (h × dk) = 3 × 96 × 96 = 27,648. Output projection WO costs 96 × 96 = 9,216. Total for each = 36,864."
      },
      {
        "question": "38. A sparse mixture-of-experts layer contains E = 8 experts and routes each token independently with top-k routing, k = 2. A sequence of 6 tokens passes through the layer. How many token–expert feed-forward computations are performed, how many for Switch layer, and what fraction of all possible pairs is evaluated in the first case?",
        "options": [
          "12; 6; 25%",
          "48; 48; 100%",
          "12; 12; 25%",
          "2; 1; ≈ 4.2%"
        ],
        "correctAnswer": "12; 6; 25%",
        "explanation": "With k = 2: 6 × 2 = 12 computations. Switch layer has k = 1: 6 × 1 = 6 computations. Total possible pairs = 6 × 8 = 48, so 12 / 48 = 25%."
      },
      {
        "question": "39. In one attention head a query has dot products 2, 0 and −2 with the three keys of the sequence, and dk = 4. What is the attention distribution over the three keys?",
        "options": [
          "[ 0.867, 0.117, 0.016 ]",
          "[ 0.506, 0.307, 0.186 ]",
          "[ 0.665, 0.245, 0.090 ]",
          "[ 0.333, 0.333, 0.333 ]"
        ],
        "correctAnswer": "[ 0.665, 0.245, 0.090 ]",
        "explanation": "Scale by √dk = 2: scores become [1, 0, -1]. Softmax denominators = 2.718 + 1 + 0.368 = 4.086. Probabilities = [2.718/4.086, 1/4.086, 0.368/4.086] = [0.665, 0.245, 0.090]."
      },
      {
        "question": "40. A sequence of N = 4096 tokens is processed by a Linformer-style layer, which replaces the N × N attention-score matrix with an N × k matrix, k = 128. How many entries does each matrix contain, by what factor does the number of score entries fall, and is a 20× reduction achieved?",
        "options": [
          "16,777,216 and 524,288; a 16× reduction; the target is not met.",
          "8,388,608 and 524,288; a 16× reduction; the target is not met.",
          "16,777,216 and 16,384; a 1024× reduction; the target is met.",
          "16,777,216 and 524,288; a 32× reduction; the target is met."
        ],
        "correctAnswer": "16,777,216 and 524,288; a 32× reduction; the target is met.",
        "explanation": "N² = 4096² = 16,777,216. N × k = 4096 × 128 = 524,288. Reduction factor = N / k = 4096 / 128 = 32× (≥ 20×, target met)."
      },
      {
        "question": "41. A sparse mixture-of-experts layer has N = 4 experts with router logits (1, 2, 0, −1). Softmax gate values p = [0.237, 0.644, 0.087, 0.032], k = 2. Expert outputs: E1 = [1, 0], E2 = [0, 2], E3 = [2, 2], E4 = [-1, 1]. What are y and the output a Switch layer would produce?",
        "options": [
          "y = [ 0.237, 1.288 ]; Switch: [ 0, 1.288 ]",
          "y = [ 0.269, 1.462 ]; Switch: [ 0, 2.000 ]",
          "y = [ 0.379, 1.494 ]; Switch: [ 0, 1.288 ]",
          "y = [ 1.000, 4.000 ]; Switch: [ 0, 4.000 ]"
        ],
        "correctAnswer": "y = [ 0.237, 1.288 ]; Switch: [ 0, 1.288 ]",
        "explanation": "Top-2 experts are E2 (p2 = 0.644) and E1 (p1 = 0.237). Combined y = 0.644[0, 2] + 0.237[1, 0] = [0.237, 1.288]. Switch layer takes top-1 (E2): 0.644[0, 2] = [0, 1.288]."
      },
      {
        "question": "42. A decoder self-attention layer processes a sequence of 7 tokens; entry (i, j) of the 7 × 7 score matrix is masked whenever j > i. How many entries survive the mask, and what fraction of the corresponding encoder count is that?",
        "options": [
          "28 entries; ≈ 0.667",
          "28 entries; ≈ 0.571",
          "21 entries; ≈ 0.429",
          "49 entries; 1.000"
        ],
        "correctAnswer": "28 entries; ≈ 0.571",
        "explanation": "Sum for i=1 to 7 is 7 × 8 / 2 = 28 entries. Encoder computes 7² = 49 entries. Fraction = 28 / 49 = 4/7 ≈ 0.571."
      },
      {
        "question": "43. A BERT encoder is pretrained with masked language modelling on '[CLS]1 the2 technician3 [MASK]4 the5 faulty6 [MASK]7 quickly8 [SEP]9'. Which context is available when computing output at position 4, and how many loss terms does this instance contribute?",
        "options": [
          "Positions 1–3 only; nine loss terms",
          "All other positions; nine loss terms",
          "Positions 1–3 only; two loss terms",
          "All other positions; two loss terms"
        ],
        "correctAnswer": "All other positions; two loss terms",
        "explanation": "BERT self-attention is bidirectional without causal masking, so position 4 attends to all other positions. Only masked positions (4 and 7) contribute loss terms, so 2 loss terms."
      },
      {
        "question": "44. A span-based model processes an input sequence of T = 12 tokens. A span runs from start i to end j with 1 ≤ i ≤ j ≤ T, with length limit L = 4 (j − i < L). How many legal spans does the model enumerate?",
        "options": [
          "78",
          "33",
          "42",
          "48"
        ],
        "correctAnswer": "42",
        "explanation": "Lengths l in {1, 2, 3, 4}. Number of spans of length l is T - l + 1: l=1: 12, l=2: 11, l=3: 10, l=4: 9. Sum = 12 + 11 + 10 + 9 = 42."
      },
      {
        "question": "45. A BERT-based reading comprehension model uses start vector S = [1, 1] and end vector E = [1, −1]. Final representations: T1=[6, 2], T2=[2, 0], T3=[3, −3], T4=[3, −1], T5=[5, −1], T6=[3, −5]. Span score is S·Ti + E·Tj with j ≥ i and j − i < 3. Which span is predicted and its score?",
        "options": [
          "Tokens 1 to 6, with score 16",
          "Tokens 1 to 1, with score 12",
          "Tokens 1 to 3, with score 14",
          "Tokens 5 to 6, with score 12"
        ],
        "correctAnswer": "Tokens 1 to 3, with score 14",
        "explanation": "Start scores: s1=8, s2=2, s3=0, s4=2, s5=4, s6=-2. End scores: e1=4, e2=2, e3=6, e4=4, e5=6, e6=8. Under j ≥ i and j - i ≤ 2: span (1, 3) gives s1 + e3 = 8 + 6 = 14, which is the maximum legal score."
      },
      {
        "question": "46. A single T5 model is fine-tuned for two tasks: judging grammatical acceptability (2-way decision) and rating sentence pair similarity (1–5 scale). Under the text-to-text framework, how are the two outputs produced?",
        "options": [
          "Both require task-specific output heads",
          "Only generation tasks are supported",
          "Classification as text; score by regression",
          "Both are generated as literal text"
        ],
        "correctAnswer": "Both are generated as literal text",
        "explanation": "In T5's text-to-text framework, both classification decisions (e.g. 'not acceptable') and continuous scores (e.g. '3.8') are emitted directly as literal text tokens by the decoder."
      },
      {
        "question": "47. A decoder-only Transformer is pretrained on w1 w2 w3 w4 w5. Conditional probabilities: p(w2|w1)=0.5, p(w3|w1w2)=0.25, p(w4|w1..w3)=0.5, p(w5|w1..w4)=0.125. Using log2(0.5)=-1, log2(0.25)=-2, log2(0.125)=-3, what is the total negative log-likelihood of the tokens predicted by this pretraining objective?",
        "options": [
          "8",
          "7",
          "1.75",
          "3"
        ],
        "correctAnswer": "7",
        "explanation": "w1 is context-only and not predicted. The 4 predicted tokens have -log2 values: 1 + 2 + 1 + 3 = 7."
      },
      {
        "question": "48. A team continues pretraining RoBERTa on appliance e-manuals. In-domain QA improves substantially, but average GLUE score falls below the original checkpoint. Which diagnosis and remedy apply?",
        "options": [
          "Catastrophic forgetting; replace the model vocabulary",
          "Catastrophic forgetting; mix general pretraining data",
          "Overfitting to GLUE; use early stopping",
          "Curse of multilinguality; use temperature sampling"
        ],
        "correctAnswer": "Catastrophic forgetting; mix general pretraining data",
        "explanation": "Continued training on narrow in-domain data causes catastrophic forgetting of general domain capabilities. The remedy is rehearsal: mixing general pretraining data into continued pretraining."
      },
      {
        "question": "49. A 2-layer biLM produces ELMo representations with weights s0=0.1, s1=0.5, s2=0.4 and scale factor γ=2. xk=[1, 0]; h1=[2, 1, 0, 3]; h2=[1, 4, 2, 0]. What is ELMo_k?",
        "options": [
          "[1.5, 2.1, 0.9, 1.5]",
          "[2.67, 3.33, 2.00, 2.00]",
          "[2.0, 8.0, 4.0, 0.0]",
          "[3.0, 4.2, 1.8, 3.0]"
        ],
        "correctAnswer": "[3.0, 4.2, 1.8, 3.0]",
        "explanation": "h0 = [1, 0, 1, 0]. Weighted sum = 0.1[1, 0, 1, 0] + 0.5[2, 1, 0, 3] + 0.4[1, 4, 2, 0] = [1.5, 2.1, 0.9, 1.5]. Multiplied by γ=2 gives [3.0, 4.2, 1.8, 3.0]."
      },
      {
        "question": "50. A TF-IDF retriever uses tf(t, d) = log10(count(t, d)) + 1 and idf(t) = log10(N / df(t)). A collection has N = 10,000 documents. 'neural' occurs in df = 100 documents and 100 times inside document d. What is the tf-idf weight of 'neural' in d?",
        "options": [
          "3.0",
          "4.0",
          "6.0",
          "2.0"
        ],
        "correctAnswer": "6.0",
        "explanation": "tf = log10(100) + 1 = 3. idf = log10(10000 / 100) = log10(100) = 2. tf-idf = 3 × 2 = 6.0."
      },
      {
        "question": "51. SQuAD exact match and F1 (max over gold answers, stripped of articles/punctuation). Gold: {'the Bengal tiger', 'a Bengal tiger', 'a Bengal tiger in India'}. Prediction: 'the Bengal tiger habitat'. What are the EM and F1 scores?",
        "options": [
          "EM = 0, F1 = 0.57",
          "EM = 0, F1 = 0.80",
          "EM = 1, F1 = 1.00",
          "EM = 0, F1 = 0.67"
        ],
        "correctAnswer": "EM = 0, F1 = 0.80",
        "explanation": "Prediction tokens: {bengal, tiger, habitat} (3). Gold 1 & 2 tokens: {bengal, tiger} (2). Overlap = 2. F1 = 2(2)/(3+2) = 4/5 = 0.80. None match exactly, so EM = 0."
      },
      {
        "question": "52. ColBERT scores a query–document pair by late interaction MaxSim. For a query of N = 32 tokens and passage of m = 180 tokens, how many token-level dot products must be computed, and how many values are summed?",
        "options": [
          "5760 dot products; 32 values summed",
          "5760 dot products; 180 values summed",
          "212 dot products; 32 values summed",
          "32 dot products; 180 values summed"
        ],
        "correctAnswer": "5760 dot products; 32 values summed",
        "explanation": "The full cross-token similarity matrix is 32 × 180 = 5,760 dot products. Taking max along the passage dimension yields 32 MaxSim values (one per query token) to sum."
      },
      {
        "question": "53. BM25 parameters k = 1.2, b = 0.75. Query has N/df = 100, raw tf = 5, document length is 2× average length. What is the BM25 score (to 2 decimals)?",
        "options": [
          "1.41",
          "2.00",
          "1.19",
          "0.70"
        ],
        "correctAnswer": "1.41",
        "explanation": "IDF = log10(100) = 2. Denominator factor = 1.2 × (1 - 0.75 + 0.75×2) = 2.1. Term weight = 5 / (2.1 + 5) = 0.7042. BM25 score = 2 × 0.7042 ≈ 1.41."
      },
      {
        "question": "54. A reference has 3 tokens with idf weights [1.0, 2.0, 3.0] and greedy-matched cosine similarities [0.9, 0.6, 0.4]. What are the idf-weighted and plain uniform BERTScore recall values?",
        "options": [
          "weighted 0.55, uniform 0.63",
          "weighted 0.63, uniform 0.55",
          "weighted 0.55, uniform 0.55",
          "weighted 0.73, uniform 0.63"
        ],
        "correctAnswer": "weighted 0.55, uniform 0.63",
        "explanation": "Weighted: (1.0×0.9 + 2.0×0.6 + 3.0×0.4) / (1+2+3) = 3.3 / 6 = 0.55. Uniform: (0.9 + 0.6 + 0.4) / 3 = 1.9 / 3 = 0.633 ≈ 0.63."
      },
      {
        "question": "55. A DPR bi-encoder is trained with batch B = 8 questions. Each has 1 positive and 1 BM25 hard negative. In-batch negatives are shared across all questions. How many negative passages does each question have, and how many question–passage dot products are computed?",
        "options": [
          "7 negatives, 64 dot products",
          "8 negatives, 64 dot products",
          "15 negatives, 128 dot products",
          "14 negatives, 128 dot products"
        ],
        "correctAnswer": "15 negatives, 128 dot products",
        "explanation": "Batch contains 8 × 2 = 16 passages. For any question, 1 is positive and the remaining 15 serve as negatives. Total dot products = 8 questions × 16 passages = 128."
      },
      {
        "question": "56. In an open-domain QA pipeline, retriever recall@20 is 0.80. The reader gives correct answer 75% when gold passage is retrieved, and 5% when not retrieved. What is expected end-to-end Exact Match?",
        "options": [
          "60.0%",
          "61.0%",
          "75.0%",
          "80.0%"
        ],
        "correctAnswer": "61.0%",
        "explanation": "EM = P(retrieved) × P(correct|retrieved) + P(not) × P(correct|not) = 0.80 × 0.75 + 0.20 × 0.05 = 0.60 + 0.01 = 0.61 = 61.0%."
      },
      {
        "question": "57. TF-IDF cosine similarity: query 'neural network' has tf=log10(2)=0.301. df: neural=100 (count=9 in d), network=10 (count=99 in d). N=1000. What is score(q, d)?",
        "options": [
          "0.976",
          "0.707",
          "1.000",
          "0.812"
        ],
        "correctAnswer": "0.976",
        "explanation": "Doc tf-idf: neural = 1×1 = 1, network = 2×2 = 4. Query weights proportional to (1, 2). Cosine similarity = (1·1 + 2·4) / (√(5) · √(17)) = 9 / √85 ≈ 0.976."
      },
      {
        "question": "58. A 3-token hypothesis has token log-probabilities [−0.5, −1.0, −2.0]. Compute BARTScore under (i) uniform weights and (ii) idf weights [0.5, 1.0, 1.5] normalized to sum to 1.",
        "options": [
          "(i) −1.17, (ii) −1.42",
          "(i) −3.50, (ii) −4.25",
          "(i) −1.42, (ii) −1.17",
          "(i) −1.17, (ii) −4.25"
        ],
        "correctAnswer": "(i) −1.17, (ii) −1.42",
        "explanation": "(i) Uniform = (1/3)(-0.5 - 1.0 - 2.0) = -3.5/3 ≈ -1.17. (ii) Normalized weights = [1/6, 1/3, 1/2]. BARTScore = (1/6)(-0.5) + (1/3)(-1.0) + (1/2)(-2.0) = -1.417 ≈ -1.42."
      },
      {
        "question": "59. In dialogue generation, unnormalized logits for {w1, w2, w3} are [ln(4), ln(2), 0]. Temperature T = 0.5 is applied. What is the probability of selecting w1?",
        "options": [
          "4/7",
          "16/21",
          "2/3",
          "4/5"
        ],
        "correctAnswer": "16/21",
        "explanation": "Scaled logits: [ln(4)/0.5, ln(2)/0.5, 0] = [2 ln(4), 2 ln(2), 0] = [ln(16), ln(4), 0]. Exponentials: [16, 4, 1]. P(w1) = 16 / (16 + 4 + 1) = 16/21."
      },
      {
        "question": "60. A self-instruction task pool initially holds {P1, P2}. Candidates are added if ROUGE-L similarity with all existing pool instructions is < 0.70, and discarded if containing 'image', 'picture', or 'graph'. Candidates in order: C1 (sims: 0.52, 0.61), C2 (sims: 0.44, 0.58, 0.73), C3 (sims: 0.66, 0.35, 0.68), C4 ('Summarize graph...'). How many instructions does the pool contain after processing?",
        "options": [
          "3",
          "4",
          "5",
          "6"
        ],
        "correctAnswer": "4",
        "explanation": "C1 added (< 0.70). C2 rejected (0.73 ≥ 0.70 with C1). C3 added (< 0.70 with P1, P2, C1). C4 discarded due to keyword 'graph'. Final pool = {P1, P2, C1, C3} = 4 instructions."
      },
      {
        "question": "61. A probability ratio of 0.78 is passed through clip(rt, 1 − ε, 1 + ε) with ε = 0.15. What value emerges?",
        "options": [
          "0.78",
          "0.85",
          "1.15",
          "0.93"
        ],
        "correctAnswer": "0.85",
        "explanation": "Permitted clipping interval is [1 - 0.15, 1 + 0.15] = [0.85, 1.15]. Since 0.78 < 0.85, clipping bounds it to 0.85."
      },
      {
        "question": "62. At one decoding step the value head estimates V(s) = 0.84, while the return obtained from that step onward is Q(s, a) = 0.57. What is the advantage of the sampled token?",
        "options": [
          "−0.27",
          "+0.27",
          "−1.41",
          "+1.41"
        ],
        "correctAnswer": "−0.27",
        "explanation": "Advantage A = Q(s, a) - V(s) = 0.57 - 0.84 = -0.27."
      },
      {
        "question": "63. A task entry in an instruction dataset supplies a title, a definition, an avoidance note, and two demonstrations of acceptable behaviour. A reviewer objects that there is no display of a plausible but unacceptable output with repair advice. Which schema element is absent?",
        "options": [
          "Prompt message field",
          "Positive example explanation",
          "Negative example suggestion",
          "Task definition text"
        ],
        "correctAnswer": "Negative example suggestion",
        "explanation": "In the instruction schema, the 'suggestion' field accompanies negative examples explaining how an unacceptable output should be repaired."
      },
      {
        "question": "64. A pipeline creates instances for a classification instruction by sampling input first and then label. Labels collapse towards a single majority class. Which change counters this?",
        "options": [
          "Sorting instructions by token length",
          "Raising the decoding temperature",
          "Removing the task definition field",
          "Generating the output label first"
        ],
        "correctAnswer": "Generating the output label first",
        "explanation": "Conditioning input generation on pre-selected output labels forces balanced coverage across the entire label space."
      },
      {
        "question": "65. Under DPO objective, for chosen response yw and rejected yl, β = 0.5: log πθ(yw|x) = -2.4, log πref(yw|x) = -3.0; log πθ(yl|x) = -4.1, log πref(yl|x) = -3.5. What is Prθ(yw ≻ yl | x)?",
        "options": [
          "0.354",
          "0.574",
          "0.646",
          "0.769"
        ],
        "correctAnswer": "0.646",
        "explanation": "Log ratios: yw = -2.4 - (-3.0) = 0.6; yl = -4.1 - (-3.5) = -0.6. Difference scaled by β = 0.5(0.6 - (-0.6)) = 0.6. Sigmoid σ(0.6) = 1 / (1 + e^-0.6) = 0.646."
      },
      {
        "question": "66. A completion receives raw reward score 3.4. KL divergence from reference policy is D_KL = 1.6, penalty coefficient β = 0.25. What is the regularized reward?",
        "options": [
          "1.80",
          "3.40",
          "3.00",
          "3.15"
        ],
        "correctAnswer": "3.00",
        "explanation": "R' = R - β · D_KL = 3.4 - 0.25 × 1.6 = 3.4 - 0.4 = 3.00."
      },
      {
        "question": "67. An assistant generates 5 candidate outputs. Length policy discards length > 200 tokens. Adjusted score s'_i = r_i - 0.004 × length. Candidates: y1(3.10, 120), y2(3.55, 240), y3(2.95, 60), y4(3.30, 175), y5(3.02, 95). Which candidate is returned?",
        "options": [
          "yˆ2",
          "yˆ3",
          "yˆ4",
          "yˆ5"
        ],
        "correctAnswer": "yˆ3",
        "explanation": "y2 is discarded (240 > 200). Adjusted scores: s1 = 3.10 - 0.48 = 2.62; s3 = 2.95 - 0.24 = 2.71; s4 = 3.30 - 0.70 = 2.60; s5 = 3.02 - 0.38 = 2.64. Max is y3 (2.71)."
      },
      {
        "question": "68. Which statement about the formal definition of an induction head is FALSE?",
        "options": [
          "Prefix matching: the head attends back to previous tokens that were followed by the current and/or recent token.",
          "Copying: the head's output increases the logit corresponding to the attended-to token.",
          "The two properties are required to hold on a repeated sequence of completely random tokens.",
          "A single head in a one-layer attention-only transformer can satisfy both properties, which is why one-layer models also exhibit the in-context learning phase change."
        ],
        "correctAnswer": "A single head in a one-layer attention-only transformer can satisfy both properties, which is why one-layer models also exhibit the in-context learning phase change.",
        "explanation": "Induction heads require at least two attention layers to form (composition of a previous-token head with an induction head); one-layer attention models cannot implement induction heads."
      },
      {
        "question": "69. In-context learning score is loss at 500th token minus loss at 50th token. Model loss at 50th token is 3.10 nats and at 500th token is 2.68 nats. What is the score and how should a shift from −0.05 to this value be interpreted?",
        "options": [
          "+0.42; the model has become worse at using long context.",
          "−0.42; the model has become substantially better at using long context.",
          "0.865; the ratio indicates a mild improvement.",
          "−0.42; but the sign is uninformative, since only the magnitude is comparable across models."
        ],
        "correctAnswer": "−0.42; the model has become substantially better at using long context.",
        "explanation": "Score = 2.68 - 3.10 = -0.42. A more negative score indicates the model exploits context much more effectively (phase change)."
      },
      {
        "question": "70. Regarding counterintuitive findings about in-context demonstrations, which conclusion is FALSE?",
        "options": [
          "Replacing the labels in the demonstrations with random labels degrades in-context learning performance only marginally.",
          "Removing the demonstrations entirely ('No Demos') hurts far more than corrupting their labels, so demonstrations still carry substantial value.",
          "Accuracy rises steeply as k goes from 0 to roughly 4–8 demonstrations and then largely flattens, for both gold and random labels.",
          "Since random labels barely hurt, the demonstrations convey no usable information about the task, and their only function is to pad the context to a sufficient length."
        ],
        "correctAnswer": "Since random labels barely hurt, the demonstrations convey no usable information about the task, and their only function is to pad the context to a sufficient length.",
        "explanation": "Demonstrations convey substantial information regarding the input distribution, format, and label space, which is why 'No Demos' performs far worse."
      },
      {
        "question": "71. Which statement about chain-of-thought prompting is FALSE?",
        "options": [
          "Because CoT exposes intermediate steps, a correct final answer certifies that every intermediate step was also valid.",
          "CoT decomposes a complex problem into smaller sequential reasoning steps, mirroring human problem solving.",
          "Zero-shot CoT dispenses with worked exemplars and instead instructs the model to reason step by step.",
          "CoT is an in-context learning approach and applies to most well-trained off-the-shelf LLMs without gradient updates."
        ],
        "correctAnswer": "Because CoT exposes intermediate steps, a correct final answer certifies that every intermediate step was also valid.",
        "explanation": "CoT makes reasoning transparent, but LLMs can still arrive at correct final answers through unfaithful or invalid intermediate steps."
      },
      {
        "question": "72. Self-consistency samples 5 reasoning paths: P1->42 (log p=-3.0), P2->42 (log p=-4.5), P3->18 (log p=-1.2), P4->18 (log p=-3.5), P5->42 (log p=-6.0). Unweighted majority vote vs probability-weighted vote: Which is correct? (e^-1.2≈0.301, e^-3.0≈0.050, e^-3.5≈0.030, e^-4.5≈0.011, e^-6.0≈0.002)",
        "options": [
          "Both votes return 42.",
          "The unweighted vote returns 42; the weighted vote returns 18.",
          "Both votes return 18.",
          "The unweighted vote returns 18; the weighted vote returns 42."
        ],
        "correctAnswer": "The unweighted vote returns 42; the weighted vote returns 18.",
        "explanation": "Unweighted count: 42 has 3 votes, 18 has 2 votes -> 42 wins. Weighted probabilities: 42 gets 0.050+0.011+0.002 = 0.063, while 18 gets 0.301+0.030 = 0.331 -> 18 wins."
      },
      {
        "question": "73. A Tree-of-Thoughts system uses BFS. At each expansion the LLM generates b = 5 thought candidates in 1 query. Each candidate is scored by a separate evaluator query. Top k = 2 are retained. Root needs 1 generation query, depth d = 4. What is the total number of LLM queries?",
        "options": [
          "35",
          "7",
          "42",
          "45"
        ],
        "correctAnswer": "42",
        "explanation": "Generation queries: Root = 1; levels 2, 3, 4 each have k=2 retained nodes generating -> 1 + 2×3 = 7. Evaluation queries: Level 1 has 5 candidates; levels 2, 3, 4 each have 2×5 = 10 candidates -> 5 + 30 = 35. Total = 7 + 35 = 42 queries."
      },
      {
        "question": "74. For an API call, Toolformer measures Li(ε) = 1.85, Li(e(ci, ε)) = 1.60 and Li(e(ci, ri)) = 1.05, filtering threshold τf = 0.40. What happens to this API call?",
        "options": [
          "Retained, with a loss reduction of 0.55.",
          "Retained, with a loss reduction of 0.80.",
          "Discarded, since the reduction is 0.25 and falls below τf.",
          "Discarded, since Li− must be taken as Li(ε) and the comparison is then invalid."
        ],
        "correctAnswer": "Retained, with a loss reduction of 0.55.",
        "explanation": "Baseline loss Li- = min(1.85, 1.60) = 1.60. With result: Li+ = 1.05. Reduction = 1.60 - 1.05 = 0.55 ≥ 0.40, so the call is retained."
      },
      {
        "question": "75. AUTOPROMPT augments token replacement with beam search. Trigger of 5 tokens, k = 10 candidates per position, beam width of 3. How many beam scorings are performed in one complete left-to-right pass?",
        "options": [
          "15",
          "30",
          "50",
          "150"
        ],
        "correctAnswer": "150",
        "explanation": "At each of 5 positions, each of 3 beams is extended by 10 candidates: 3 × 10 = 30 scorings per position. Across 5 positions: 5 × 30 = 150 scorings."
      },
      {
        "question": "76. Which statement about the families of automatic prompt engineering methods is FALSE?",
        "options": [
          "Automated prompt design uses search or generation over a predefined search space and generally outperforms manual engineering.",
          "Prompt paraphrasing, gradient-based discrete prompt search, and prompt tuning are three distinct families of approaches.",
          "AUTOPROMPT returns discrete trigger tokens drawn from the vocabulary, so the resulting prompt is a genuine token sequence.",
          "Prompt tuning also searches over the discrete vocabulary, which is why its learned prompts remain human-readable."
        ],
        "correctAnswer": "Prompt tuning also searches over the discrete vocabulary, which is why its learned prompts remain human-readable.",
        "explanation": "Prompt tuning optimizes continuous 'soft prompt' embeddings directly via backpropagation; they do not map to discrete vocabulary words and are not human-readable."
      },
      {
        "question": "77. In AUTOPROMPT's scoring function p(y | x_prompt) = Σ p([MASK]=w | x_prompt) where each class y has disjoint label-token sets Vy ⊂ V: Which statement is TRUE?",
        "options": [
          "The quantities form a proper probability distribution over classes for any choice of label sets.",
          "Summing over classes gives at most 1, with equality only if label sets jointly cover the entire vocabulary; in general scores must be renormalised.",
          "The sum over classes always exceeds 1, because each label token is counted once per class.",
          "The formulation is valid only when |Vy| = 1 for every class."
        ],
        "correctAnswer": "Summing over classes gives at most 1, with equality only if label sets jointly cover the entire vocabulary; in general scores must be renormalised.",
        "explanation": "Because label sets Vy are disjoint subsets of the total vocabulary, the sum of probabilities over classes is ≤ 1, requiring renormalization to form valid class probabilities."
      },
      {
        "question": "78. A single output row of a weight matrix is W = (−0.6, 0.2, 0.5, −0.1), and input activation norms are a = (1, 8, 2, 30). Based on Wanda Importance Score |W_ij|·||x_j||, the two lowest-scoring weights in the row are pruned. Which weights survive?",
        "options": [
          "w2 and w4",
          "w1 and w3",
          "w1 and w4",
          "w3 and w4"
        ],
        "correctAnswer": "w2 and w4",
        "explanation": "Scores: S1 = 0.6×1 = 0.6; S2 = 0.2×8 = 1.6; S3 = 0.5×2 = 1.0; S4 = 0.1×30 = 3.0. Lowest two are w1 and w3, so w2 and w4 survive."
      },
      {
        "question": "79. For one token a teacher assigns distribution q = (0.7, 0.2, 0.1) and student assigns p = (0.5, 0.25, 0.25). The word-level distillation cross-entropy loss is closest to:",
        "options": [
          "0.901",
          "0.693",
          "0.485",
          "1.386"
        ],
        "correctAnswer": "0.901",
        "explanation": "Loss = -[0.7 ln(0.5) + 0.2 ln(0.25) + 0.1 ln(0.25)] = -[0.7(-0.693) + 0.3(-1.386)] = 0.485 + 0.416 = 0.901."
      },
      {
        "question": "80. A model has θ = 4 × 10^9 parameters. Mixed-precision Adam full fine-tuning requires 16 bytes per parameter. An alternative freezes the base model at 4-bit precision (0.5 bytes) and trains 35 × 10^6 LoRA parameters (16 bytes per param). By what factor does full fine-tuning exceed LoRA memory?",
        "options": [
          "25×",
          "32×",
          "8×",
          "114×"
        ],
        "correctAnswer": "25×",
        "explanation": "Full fine-tuning = 16 × 4 GB = 64 GB. QLoRA: frozen 4-bit base = 0.5 × 4 GB = 2 GB; LoRA adapter state = 16 × 0.035 GB = 0.56 GB. Total = 2.56 GB. Ratio = 64 / 2.56 = 25×."
      },
      {
        "question": "81. A decoder-only language model is adapted by inserting learned continuous vectors between source segment x and target segment y (infix). Hidden states at x remain identical to unadapted model, while states at y change. Which architectural property explains this?",
        "options": [
          "Frozen weights prevent representation drift",
          "The learned vectors receive no gradient",
          "Attention attends only to the left",
          "Layer normalisation rescales every activation"
        ],
        "correctAnswer": "Attention attends only to the left",
        "explanation": "In a causal decoder-only model, self-attention attends strictly to current and preceding tokens. Vectors inserted after x cannot be attended to by tokens in x."
      },
      {
        "question": "82. A fine-tuning run uses 4-bit base weights, LoRA adapters, and activation checkpointing. It crashes with an OOM error on occasional batches containing unusually long sequences. Which technique absorbs these memory spikes?",
        "options": [
          "Quantizing the quantization constants",
          "Choosing quantile-spaced code values",
          "Paging optimizer state to CPU",
          "Recomputing activations from checkpoints"
        ],
        "correctAnswer": "Paging optimizer state to CPU",
        "explanation": "QLoRA's Paged Optimizer uses CUDA Unified Memory to automatically page optimizer memory to CPU RAM during transient allocation spikes."
      },
      {
        "question": "83. Four weights w = (0.9, −2.0, 0.5, 20.0) are quantized to 4-bit integers in {-7, ..., 7} using qi = round(7 / max|w| * w). Comparing a global scale vs block-wise scale (block size 2), what code does w1 receive under global and block-wise schemes respectively?",
        "options": [
          "0 and 4",
          "1 and 3",
          "0 and 3",
          "3 and 0"
        ],
        "correctAnswer": "0 and 3",
        "explanation": "Global scale: max = 20.0, scale = 7/20 = 0.35. q1 = round(0.35 × 0.9) = round(0.315) = 0. Block 1 scale: max(|0.9|, |-2.0|) = 2.0, scale = 7/2 = 3.5. q1 = round(3.5 × 0.9) = round(3.15) = 3."
      },
      {
        "question": "84. A Transformer has L = 6 layers, d = 256. Adapters: bottleneck ra = 8 (with biases). LoRA: rank rl = 4 on Wq, Wv (no biases). Prefix tuning: prefix length p = 10. Maximum budget is 25,000 parameters. Which schemes satisfy the budget?",
        "options": [
          "Adapters and LoRA only",
          "Prefix tuning only",
          "Prefix tuning and LoRA only",
          "All three schemes"
        ],
        "correctAnswer": "Prefix tuning and LoRA only",
        "explanation": "Adapters: 12 × (2×256×8 + 256 + 8) = 52,320 (> 25k). LoRA: 12 matrices × (2×256×4) = 24,576 (≤ 25k). Prefix tuning: 6 × 10 × 256 = 15,360 (≤ 25k). Both Prefix tuning and LoRA qualify."
      },
      {
        "question": "85. Adopt the Chinchilla rule of thumb that, at the compute-optimal point, a model should see D* ≈ 20 N* training tokens, with C ≈ 6N D. For a budget of C = 1.2 × 10^24 FLOPs, what are N* and D*? If budget is raised 100×, what are the new optima?",
        "options": [
          "N* ≈ 100B, D* ≈ 2T; at 100× compute, N* ≈ 1T and D* ≈ 20T.",
          "N* ≈ 45B, D* ≈ 4.5T; at 100× compute, N* ≈ 450B and D* ≈ 45T.",
          "N* ≈ 100B, D* ≈ 2T; at 100× compute, N* ≈ 10T and D* stays ≈ 2T, since extra compute should go to parameters.",
          "N* ≈ 1T, D* ≈ 200B; at 100× compute, N* ≈ 10T and D* ≈ 2T."
        ],
        "correctAnswer": "N* ≈ 100B, D* ≈ 2T; at 100× compute, N* ≈ 1T and D* ≈ 20T.",
        "explanation": "C = 6 · N* · (20 N*) = 120 N*². 120 N*² = 1.2 × 10^24 => N*² = 10^22 => N* = 10^11 = 100B. D* = 20 N* = 2T. With 100× compute, both N and D scale with √100 = 10×, giving N* = 1T and D* = 20T."
      },
      {
        "question": "86. The lecture states that Kaplan et al. (2020) scaling laws are 'flawed' because of how learning-rate schedules were handled. Which statement most accurately describes the problem and its effect on conclusions?",
        "options": [
          "Kaplan et al. only trained models below 1M parameters, so the power laws were extrapolated across too many orders of magnitude; the schedule had no effect.",
          "Kaplan et al. estimated compute as 2N FLOPs per token instead of 6N, underestimating data cost and biasing the laws towards larger datasets.",
          "Kaplan et al. tuned a different learning-rate schedule for every run, which added hyperparameter noise that flattened the data exponent α_D.",
          "Kaplan et al. used the same learning-rate schedule for every run regardless of the number of training tokens. The loss recorded for shorter token budgets was therefore not what a schedule matched to that budget would reach, which biased the fitted N–D trade-off towards scaling model size faster than data."
        ],
        "correctAnswer": "Kaplan et al. used the same learning-rate schedule for every run regardless of the number of training tokens. The loss recorded for shorter token budgets was therefore not what a schedule matched to that budget would reach, which biased the fitted N–D trade-off towards scaling model size faster than data.",
        "explanation": "Kaplan et al. used a single long cosine LR schedule for all training runs, measuring intermediate checkpoints when the LR had not yet decayed properly. This penalized smaller token runs and led to the flawed conclusion that parameter count should scale faster than token count."
      },
      {
        "question": "87. A standard (bias-free) FFN with hidden size 4d uses two matrices, W1 in R^{4d x d} and W2 in R^{d x 4d}. A SwiGLU FFN computes FFN_SwiGLU(x) = (Swish(xW) * xV)W2 using three matrices. To keep the parameter count equal to standard FFN, what hidden size h must SwiGLU use, and how many parameters per layer result for d = 4096 (as in LLaMA-7B)?",
        "options": [
          "h = 8d/3 ≈ 10,923 (LLaMA rounds this to 11,008), giving 3dh = 8d² ≈ 1.34 × 10^8 parameters per layer.",
          "h = 4d = 16,384, because the gating branch shares weights with W, giving 8d² ≈ 1.34 × 10^8 parameters.",
          "h = 2d = 8,192, giving 6d² ≈ 1.01 × 10^8 parameters, which matches the standard FFN after rounding.",
          "h = 16d/3 ≈ 21,845, giving 16d² ≈ 2.68 × 10^8 parameters, since gating doubles the effective width."
        ],
        "correctAnswer": "h = 8d/3 ≈ 10,923 (LLaMA rounds this to 11,008), giving 3dh = 8d² ≈ 1.34 × 10^8 parameters per layer.",
        "explanation": "Standard FFN has 2 × 4d × d = 8d² parameters. SwiGLU has 3 × h × d parameters. Equating 3hd = 8d² yields h = 8d/3 ≈ 10,923 (rounded to 11,008 in LLaMA), giving 8d² ≈ 1.34 × 10^8 parameters."
      },
      {
        "question": "88. Gated Linear Units (GLU) are defined as the component-wise product of two linear projections, one of which first passes through a sigmoid. The same paper also proposes omitting the activation altogether ('bilinear' layer). Which statement is correct?",
        "options": [
          "The bilinear layer (xW + b) * (xV + c) is a linear function of x, so a bilinear FFN collapses into a single linear map and adds no expressive power.",
          "In GLU both projections pass through a sigmoid, and the product of two sigmoids acts as a soft AND gate.",
          "The bilinear layer has no pointwise activation but is still non-linear in x: each output is the product of two affine functions of x, i.e. a second-order interaction. In GLU the sigmoid branch acts as a gate in [0, 1]; SwiGLU replaces the sigmoid with Swish, so its 'gate' branch is no longer bounded to [0, 1] and can be negative.",
          "SwiGLU keeps the sigmoid gate of GLU and additionally applies Swish to the other (value) branch, so its gate remains bounded to [0, 1]."
        ],
        "correctAnswer": "The bilinear layer has no pointwise activation but is still non-linear in x: each output is the product of two affine functions of x, i.e. a second-order interaction. In GLU the sigmoid branch acts as a gate in [0, 1]; SwiGLU replaces the sigmoid with Swish, so its 'gate' branch is no longer bounded to [0, 1] and can be negative.",
        "explanation": "Multiplying two linear projections of x produces quadratic/second-order cross terms, making it non-linear even without activation functions. SwiGLU replaces sigmoid with Swish(x) = x · σ(βx), which is unbounded above and can take negative values."
      },
      {
        "question": "89. Let x = [1, 3, 5, 7], with gain g = 1, bias b = 0 and ε = 0. Using the population variance (1/n), what are the RMSNorm and LayerNorm outputs?",
        "options": [
          "RMSNorm ≈ [1.342, 0.447, 0.447, 1.342]; LayerNorm ≈ [0.218, 0.655, 1.091, 1.528]",
          "RMSNorm ≈ [0.25, 0.75, 1.25, 1.75]; LayerNorm ≈ [−1.342, −0.447, 0.447, 1.342]",
          "RMSNorm ≈ [0.109, 0.327, 0.546, 0.764]; LayerNorm ≈ [−1.342, −0.447, 0.447, 1.342]",
          "RMSNorm ≈ [0.218, 0.655, 1.091, 1.528]; LayerNorm ≈ [−1.342, −0.447, 0.447, 1.342]"
        ],
        "correctAnswer": "RMSNorm ≈ [0.218, 0.655, 1.091, 1.528]; LayerNorm ≈ [−1.342, −0.447, 0.447, 1.342]",
        "explanation": "RMS = sqrt((1 + 9 + 25 + 49) / 4) = sqrt(84 / 4) = sqrt(21) ≈ 4.583. RMSNorm = x / 4.583 ≈ [0.218, 0.655, 1.091, 1.528]. Mean μ = 4; variance σ² = ((9 + 1 + 1 + 9)/4) = 5; σ = sqrt(5) ≈ 2.236. LayerNorm = (x - 4)/2.236 ≈ [-1.342, -0.447, 0.447, 1.342]."
      },
      {
        "question": "90. A RoPE model trained with L = 2048 is extended to L' = 8192 using Position Interpolation (PI), mapping position m -> m L/L'. Consider tokens at positions 6000 and 6004. What are the interpolated positions, what happens to their relative offset, and why is a short fine-tune recommended?",
        "options": [
          "6000 -> 1500 and 6004 -> 1504; PI preserves relative offsets exactly, so no fine-tuning is needed.",
          "6000 -> 1500 and 6004 -> 1501; the offset of 4 shrinks to 1. Every position now falls inside [0, 2048], so no unseen rotation angles arise, but neighbouring tokens are 4× closer than in training. A short fine-tune (on the order of 1000s of examples, e.g. from the Pile) lets the model adapt to this finer resolution.",
          "6000 -> 6000 mod 2048 = 1904 and 6004 -> 1908 (wrap-around); the offset is preserved, and fine-tuning removes the aliasing.",
          "6000 -> 24,000 and 6004 -> 24,016 (scaling by L'/L); the offset grows to 16, and fine-tuning is needed to learn the larger angles."
        ],
        "correctAnswer": "6000 -> 1500 and 6004 -> 1501; the offset of 4 shrinks to 1. Every position now falls inside [0, 2048], so no unseen rotation angles arise, but neighbouring tokens are 4× closer than in training. A short fine-tune (on the order of 1000s of examples, e.g. from the Pile) lets the model adapt to this finer resolution.",
        "explanation": "Scaling by L/L' = 2048/8192 = 1/4 scales 6000 -> 1500 and 6004 -> 1501, shrinking the relative distance by 4×. Position angles stay within original training bounds, but fine-tuning adapts the model to the higher resolution."
      },
      {
        "question": "91. The phrase 'the cat ... sleeping' appears in two sentences: in the first, 'cat' is at position 2 and 'sleeping' at 5; in the second, at 102 and 105. Content vectors are identical. Which statement is correct?",
        "options": [
          "The two query–key scores are identical under additive sinusoidal embeddings, but differ under RoPE, because RoPE encodes absolute angles mθ.",
          "Under RoPE the later occurrence has a larger score, because rotation scales the norm of q and k in proportion to position.",
          "Under RoPE the scores are identical, because (R_m q)^T (R_n k) = q^T R_{n-m} k depends only on n − m = 3 and rotation preserves norms. Under additive sinusoidal embeddings the score expands into content–position cross terms that depend on absolute positions, so the scores generally differ.",
          "Both schemes give identical scores, because each depends only on the relative offset."
        ],
        "correctAnswer": "Under RoPE the scores are identical, because (R_m q)^T (R_n k) = q^T R_{n-m} k depends only on n − m = 3 and rotation preserves norms. Under additive sinusoidal embeddings the score expands into content–position cross terms that depend on absolute positions, so the scores generally differ.",
        "explanation": "RoPE orthogonal rotation matrices satisfy R_m^T R_n = R_{n-m}, ensuring that dot products depend exclusively on the relative offset (5 - 2 = 105 - 102 = 3). Additive embeddings contain absolute position inner products."
      },
      {
        "question": "92. In the kNN-augmented layer, one head has gate bias bg = 2, so g = σ(bg). kNN search returns two memories with scaled dot-product scores 1 and 0, and values v1 = [1, 0], v2 = [0, 1]. Local attention gives Vc = [0, 1]. With Vo = g Vm + (1 − g) Vc, what is Vo?",
        "options": [
          "Vo ≈ [0.731, 0.269]",
          "Vo ≈ [0.644, 0.356]",
          "Vo ≈ [0.087, 0.913]",
          "Vo ≈ [0.250, 0.750]"
        ],
        "correctAnswer": "Vo ≈ [0.644, 0.356]",
        "explanation": "g = σ(2) ≈ 0.8808. Softmax over scores [1, 0]: e^1 / (e^1 + 1) = 2.718 / 3.718 ≈ 0.731; e^0 / 3.718 ≈ 0.269. Vm = 0.731[1, 0] + 0.269[0, 1] = [0.731, 0.269]. Vo = 0.8808[0.731, 0.269] + (1 - 0.8808)[0, 1] = [0.6439, 0.237 + 0.119] ≈ [0.644, 0.356]."
      },
      {
        "question": "93. Self-Route (Li et al., 2024) sends every query to RAG prompt (5k tokens). 70% queries are answered in step one; remaining 30% are re-run with full long context (100k tokens). What is average input tokens per query, and savings vs always using LC?",
        "options": [
          "≈ 33.5k tokens per query; ≈ 66.5% saving.",
          "≈ 30k tokens per query; 70% saving.",
          "≈ 35k tokens per query; 65% saving.",
          "100k tokens per query; no saving, because every query must also go through LC to verify the RAG answer."
        ],
        "correctAnswer": "≈ 35k tokens per query; 65% saving.",
        "explanation": "All 100% queries take 5k tokens in step 1. 30% take an additional 100k in step 2. Average tokens = 5k + 0.30 × 100k = 5k + 30k = 35k tokens. Compared to always 100k, savings = (100k - 35k)/100k = 65%."
      },
      {
        "question": "94. Several 'fixed-size cache' designs are discussed for bounding inference memory: unweighted running average, RNN-like learned memory, and compressed key-value pairs. Which design principle does the lecture endorse for compressed-KV?",
        "options": [
          "Keep distant context explicitly and compress recent tokens, because recent tokens are the most predictable and carry the least information.",
          "A cumulative (unweighted) average of past key-value pairs can be updated in O(1) and still lets any individual earlier value be recovered exactly, so it is lossless.",
          "Keep the local context explicitly with minimal information loss and store long-range context in a more compressed form (e.g. a few summary slots produced by averaging or a learned network), so cache size stays bounded without losing detail in the nearby window.",
          "An RNN-like memory update mt = f(mt-1, kt, vt) requires storing every past (k, v) pair at inference in order to recompute f, so it gives no memory savings."
        ],
        "correctAnswer": "Keep the local context explicitly with minimal information loss and store long-range context in a more compressed form (e.g. a few summary slots produced by averaging or a learned network), so cache size stays bounded without losing detail in the nearby window.",
        "explanation": "The core design principle keeps full, uncompressed KV precision for recent local tokens where fine-grained syntactic/semantic attention is essential, while compressing older, distant context into summary tokens/slots."
      },
      {
        "question": "95. For a feed-forward memory cell with key k = (1, 2, -1) and activation f = ReLU, the prefix representation is x = (2, -1, 3). What is the memory coefficient?",
        "options": [
          "3",
          "7",
          "-3",
          "0"
        ],
        "correctAnswer": "0",
        "explanation": "Memory coefficient m = ReLU(x · k). Here x · k = 2(1) + (-1)(2) + 3(-1) = 2 - 2 - 3 = -3. Since ReLU(-3) = max(0, -3) = 0, the memory coefficient is 0. This prefix does not trigger the memory cell at all. (Ref: Lecture 58, Slide 7)."
      },
      {
        "question": "96. A neuron’s normalised activation probabilities across three languages are p' = (0.50, 0.25, 0.25). What is its LAPE score in bits?",
        "options": [
          "0.50",
          "1.00",
          "1.25",
          "1.50"
        ],
        "correctAnswer": "1.50",
        "explanation": "The Language-Agnostic Probability Entropy (LAPE) score is calculated using entropy in bits (base 2): LAPE = -Σ p'_i * log2(p'_i) = -[0.50 * log2(0.50) + 0.25 * log2(0.25) + 0.25 * log2(0.25)] = -[0.50 * (-1) + 0.25 * (-2) + 0.25 * (-2)] = -[-0.50 - 0.50 - 0.50] = 1.50 bits. (Ref: Lecture 57, Slide 9)."
      },
      {
        "question": "97. For the prompt \"The Eiffel Tower stands in the city of\", the clean run assigns P(o) = 0.86 to the correct object and the corrupted run assigns P*(o) = 0.07. Four separate corrupted-with-restoration runs each restore one hidden state and give the probabilities below:\n\n| State | Restored position / layer | Prestore(o) |\n|---|---|---|\n| S1 | last subject token, layer 6 | 0.41 |\n| S2 | last subject token, layer 15 | 0.63 |\n| S3 | last token, layer 32 | 0.58 |\n| S4 | first subject token, layer 15 | 0.12 |\n\nWhich state has the largest indirect effect, and what is its value?",
        "options": [
          "S2, 0.56",
          "S2, 0.63",
          "S3, 0.51",
          "S1, 0.34"
        ],
        "correctAnswer": "S2, 0.56",
        "explanation": "Indirect Effect (IE) is calculated by subtracting the corrupted baseline probability P*(o) = 0.07:\n• IE(S1) = 0.41 - 0.07 = 0.34\n• IE(S2) = 0.63 - 0.07 = 0.56\n• IE(S3) = 0.58 - 0.07 = 0.51\n• IE(S4) = 0.12 - 0.07 = 0.05\nTherefore, S2 has the largest indirect effect of 0.56, showing that the mid-layer state at the last subject token carries the strongest causal contribution. (Ref: Lecture 58, Slide 28)."
      },
      {
        "question": "98. A linear probing classifier consumes a learned scalar mixture of layer representations. For one token, h^(0) = (1, 0, 2), h^(1) = (0, 2, -1), h^(2) = (3, 1, 1), with learned task weights s0 = 0.5, s1 = 0.2, s2 = 0.3. The probe outputs z with w = (2, -1, 1) and b = -1. What is z?",
        "options": [
          "2.2",
          "3.2",
          "5.0",
          "6.0"
        ],
        "correctAnswer": "2.2",
        "explanation": "Step 1: Compute layer mixture representation:\nh = s0*h^(0) + s1*h^(1) + s2*h^(2) = 0.5(1, 0, 2) + 0.2(0, 2, -1) + 0.3(3, 1, 1) = (0.5 + 0 + 0.9, 0 + 0.4 + 0.3, 1.0 - 0.2 + 0.3) = (1.4, 0.7, 1.1).\nStep 2: Apply the linear probe:\nz = w · h + b = 2(1.4) - 1(0.7) + 1(1.1) - 1 = 2.8 - 0.7 + 1.1 - 1 = 2.2. (Ref: Lecture 56, Slide 14)."
      },
      {
        "question": "99. A Logit Lens readout at layer 12 produces an intermediate distribution with unnormalised probability weights proportional to (4, 4, 1, 1) over the four candidate tokens (w1, w2, w3, w4); normalising these gives the intermediate distribution p. The model’s final-layer distribution is q = (0.80, 0.10, 0.05, 0.05). What is D_KL(p || q) in bits?",
        "options": [
          "0.10",
          "0.60",
          "0.50",
          "1.10"
        ],
        "correctAnswer": "0.60",
        "explanation": "Step 1: Normalise intermediate weights: total = 4 + 4 + 1 + 1 = 10, so p = (0.4, 0.4, 0.1, 0.1).\nStep 2: D_KL(p || q) = Σ p_i * log2(p_i / q_i)\n= 0.4 * log2(0.4 / 0.8) + 0.4 * log2(0.4 / 0.1) + 0.1 * log2(0.1 / 0.05) + 0.1 * log2(0.1 / 0.05)\n= 0.4 * log2(0.5) + 0.4 * log2(4) + 0.1 * log2(2) + 0.1 * log2(2)\n= 0.4(-1) + 0.4(2) + 0.1(1) + 0.1(1) = -0.4 + 0.8 + 0.1 + 0.1 = 0.60 bits. (Ref: Lecture 56, Slide 23)."
      },
      {
        "question": "100. A team unlearns a set of question–answer pairs while using raw novel excerpts as the normal dataset. After the run, the model degrades on essentially all question–answer prompts, including entirely benign ones, yet still completes plain prose fluently. Which failure does this indicate?",
        "options": [
          "The forgetting set was too small",
          "KL was replaced by cross-entropy",
          "A format shortcut was learned",
          "The learning rate was too low"
        ],
        "correctAnswer": "A format shortcut was learned",
        "explanation": "When the forgetting dataset and normal dataset differ systematically in format (QA pairs vs novel excerpts), the optimization takes the shortcut of suppressing the entire QA format rather than targeted factual content. Matching format styles between retain and forget sets removes this shortcut. (Ref: Lecture 60, Slide 9)."
      },
      {
        "question": "101. An assistant answers a chemistry question correctly. The user replies \"That is wrong the answer is 12\", and the assistant apologises and adopts 12. Started fresh with the identical question and no pushback, it answers correctly again. Which issue does this pattern most specifically illustrate?",
        "options": [
          "Hallucination",
          "Miscalibration",
          "Inconsistency",
          "Sycophancy"
        ],
        "correctAnswer": "Sycophancy",
        "explanation": "The behaviour is triggered specifically by user pushback: the model abandons its own correct answer in deference to the user's assertion. Because the model answers correctly in a neutral session, this is sycophancy (excessive deference to the user) rather than a lack of knowledge or hallucination. (Ref: Lecture 59, Slide 8)."
      }
    ]
  },
  {
    "id": "genai-full-combined-test",
    "title": "Fundamentals of Generative AI - Full Combined Grand Test (Weeks 1-12)",
    "subject": "Fundamentals of Generative AI",
    "date": "14/10/2026",
    "questions": [
      {
        "question": "1. A model is trained on digit images without labels and later generates new digit-like images. Which distribution is the model primarily learning?",
        "options": [
          "p(y|x)",
          "p(x, y)",
          "p(x)",
          "p(y)"
        ],
        "correctAnswer": "p(x)",
        "explanation": "An unsupervised generative model trained on unlabeled digit images learns the true underlying marginal distribution of the input data p(x) in order to sample new digit-like images."
      },
      {
        "question": "2. A generative model is trained to generate a medical image only when the condition \"tumor present\" is provided. Which probability distribution best describes this task?",
        "options": [
          "p(x)",
          "p(y|x)",
          "p(x|y)",
          "p(x,y) only"
        ],
        "correctAnswer": "p(x|y)",
        "explanation": "Conditional generative models generate samples x conditioned on a given attribute or label y (here, y = 'tumor present'). Thus, it models the conditional distribution p(x|y)."
      },
      {
        "question": "3. A decoder produces one output value for every binary pixel, and each value must represent the probability that the pixel is 1. Which output-layer and loss combination is most appropriate?",
        "options": [
          "Linear activation with mean squared error",
          "Sigmoid activation with binary cross-entropy",
          "Softmax activation with categorical cross-entropy",
          "ReLU activation with mean squared error"
        ],
        "correctAnswer": "Sigmoid activation with binary cross-entropy",
        "explanation": "For independent binary pixels where each output represents the probability of pixel value being 1 (in range [0, 1]), the sigmoid activation function combined with binary cross-entropy loss is the theoretically principled choice."
      },
      {
        "question": "4. Why can stacking multiple linear layers without nonlinear activation functions not produce a genuinely deep nonlinear model?",
        "options": [
          "Linear layers cannot contain biases",
          "The composition of linear transformations is still a linear transformation",
          "Linear layers always produce zero gradients",
          "Multiple linear layers can only be used for classification"
        ],
        "correctAnswer": "The composition of linear transformations is still a linear transformation",
        "explanation": "Mathematically, the composition of any sequence of linear (or affine) transformations W_2(W_1 x + b_1) + b_2 collapses into a single affine transformation W'x + b'. Without non-linear activation functions, depth adds no representational power."
      },
      {
        "question": "5. A weight has current value: w = 4, The learning rate is: η = 0.1, The gradient is: ∂L/∂w = -3. Using the gradient-descent update rule: w_new = w - η(∂L/∂w). What is the updated weight?",
        "options": [
          "3.7",
          "4.0",
          "4.3",
          "7.0"
        ],
        "correctAnswer": "4.3",
        "explanation": "Applying the gradient descent update rule: w_new = w - η * (∂L/∂w) = 4 - 0.1 * (-3) = 4 + 0.3 = 4.3."
      },
      {
        "question": "6. An optimizer accumulates the squared gradients of a parameter over all previous training steps. After many updates, its effective learning rate becomes extremely small. Which optimizer is being described?",
        "options": [
          "Momentum",
          "AdaGrad",
          "RMSProp",
          "Standard mini-batch SGD"
        ],
        "correctAnswer": "AdaGrad",
        "explanation": "AdaGrad divides the learning rate by the square root of the sum of all historical squared gradients without decay. As steps accumulate, the denominator grows monotonically, causing the effective step size to diminish prematurely."
      },
      {
        "question": "7. Which statement correctly distinguishes RMSProp from AdaGrad?",
        "options": [
          "RMSProp uses only the current gradient and ignores previous gradients",
          "RMSProp accumulates all past squared gradients without decay",
          "RMSProp uses an exponentially weighted moving average of recent squared gradients",
          "RMSProp does not use adaptive learning rates"
        ],
        "correctAnswer": "RMSProp uses an exponentially weighted moving average of recent squared gradients",
        "explanation": "Unlike AdaGrad which accumulates all past squared gradients indefinitely, RMSProp uses an exponentially decaying moving average of past squared gradients, allowing it to adapt to recent curvature without diminishing the learning rate to zero."
      },
      {
        "question": "8. A convolutional layer receives an input of size: 32 × 32 × 3. It uses 8 filters, Filter size: 3 × 3, Stride: 1, Padding: 0. What is the output size?",
        "options": [
          "30 × 30 × 8",
          "32 × 32 × 8",
          "30 × 30 × 3",
          "32 × 32 × 3"
        ],
        "correctAnswer": "30 × 30 × 8",
        "explanation": "Spatial output dimension = (W - K + 2P)/S + 1 = (32 - 3 + 0)/1 + 1 = 30. With 8 filters applied across the input channels, the output depth is 8. Hence, the resulting feature map size is 30 × 30 × 8."
      },
      {
        "question": "9. A convolutional layer uses:\n• Filter size: 5 × 5\n• Input channels: 3\n• Number of filters: 6\n• One bias per filter\nHow many trainable parameters does the layer contain?",
        "options": [
          "450",
          "456",
          "480",
          "906"
        ],
        "correctAnswer": "456",
        "explanation": "Each filter contains (5 × 5 × 3) weights + 1 bias = 75 + 1 = 76 parameters. For 6 filters: 76 × 6 = 456 trainable parameters."
      },
      {
        "question": "10. A CNN produces a feature tensor of size: 4 × 4 × 3. This tensor is passed directly to a Flatten layer. How many values are present in the flattened vector?",
        "options": [
          "12",
          "16",
          "32",
          "48"
        ],
        "correctAnswer": "48",
        "explanation": "A Flatten layer unrolls all elements of the multi-dimensional tensor into a 1D vector: 4 × 4 × 3 = 48 values."
      },
      {
        "question": "11. An autoencoder has an input dimension of 100 and a latent dimension of 120. It achieves almost zero reconstruction error without any regularization. Which conclusion is most appropriate?",
        "options": [
          "The model must have learned a compact representation",
          "The model may have learned a trivial identity-like mapping",
          "The model is necessarily a denoising autoencoder",
          "The latent representation must contain less information than the input"
        ],
        "correctAnswer": "The model may have learned a trivial identity-like mapping",
        "explanation": "Because the latent dimension (120) is larger than the input dimension (100), an unregularized overcomplete autoencoder can simply memorize an identity mapping without learning meaningful features."
      },
      {
        "question": "12. A dataset contains standardized continuous-valued features that can take negative as well as positive values. Which decoder output and loss combination is most appropriate?",
        "options": [
          "Sigmoid output with binary cross-entropy",
          "Softmax output with categorical cross-entropy",
          "Linear output with mean squared error",
          "ReLU output with binary cross-entropy"
        ],
        "correctAnswer": "Linear output with mean squared error",
        "explanation": "For continuous standardized features that span both positive and negative real numbers, a linear output layer with mean squared error (MSE) reconstruction loss is the standard principled choice."
      },
      {
        "question": "13. An encoder maps a 6-dimensional input to a 3-dimensional latent vector using a weight matrix of shape 6×3. Under the tied-weights assumption, what should be the shape of the decoder weight matrix?",
        "options": [
          "6 × 3",
          "3 × 6",
          "3 × 3",
          "6 × 6"
        ],
        "correctAnswer": "3 × 6",
        "explanation": "Tied weights constrain the decoder weight matrix to be the transpose of the encoder weight matrix: (6 × 3)^T = 3 × 6."
      },
      {
        "question": "14. A convolutional autoencoder uses transposed convolution in the decoder. The reconstructed images contain regular grid-like bright and dark patterns. Which modification is most directly intended to reduce this problem?",
        "options": [
          "Replace the convolutional encoder with a dense encoder",
          "Increase the number of latent dimensions indefinitely",
          "Use upsampling followed by ordinary convolution",
          "Remove all nonlinear activation functions"
        ],
        "correctAnswer": "Use upsampling followed by ordinary convolution",
        "explanation": "Checkerboard/grid artifacts arise from uneven overlap in transposed convolutions. Replacing them with nearest-neighbor or bilinear upsampling followed by standard convolution directly resolves this issue."
      },
      {
        "question": "15. A clean binary input vector contains 20 components. Masking noise independently sets each component to zero with probability 0.30. What is the expected number of components masked in one corrupted input?",
        "options": [
          "3",
          "6",
          "14",
          "20"
        ],
        "correctAnswer": "6",
        "explanation": "Expected value E[X] = n × p = 20 × 0.30 = 6 components."
      },
      {
        "question": "16. In a denoising autoencoder, which pair is used during training?",
        "options": [
          "Clean input as input and corrupted input as target",
          "Corrupted input as input and the same corrupted input as target",
          "Corrupted input as input and clean input as target",
          "Random latent vector as input and clean input as target"
        ],
        "correctAnswer": "Corrupted input as input and clean input as target",
        "explanation": "A denoising autoencoder (DAE) receives a corrupted version x̃ as input and is trained to recover the original clean input x as its target."
      },
      {
        "question": "17. In a sparse autoencoder, the desired average activation of a hidden neuron is 0.05, but its actual average activation is 0.40. Which statement is correct?",
        "options": [
          "The sparsity penalty for this neuron will be zero",
          "The neuron is less active than desired",
          "The neuron is too active and receives a relatively large sparsity penalty",
          "The reconstruction loss must automatically become zero"
        ],
        "correctAnswer": "The neuron is too active and receives a relatively large sparsity penalty",
        "explanation": "Since the neuron's average activation (0.40) is substantially higher than the target threshold ρ = 0.05, KL divergence imposes a heavy sparsity penalty to suppress it."
      },
      {
        "question": "18. A sparse autoencoder contains many hidden neurons, but only a few neurons are active for any given input. Why can it still learn useful representations despite having an overcomplete hidden layer?",
        "options": [
          "The sparsity constraint prevents all hidden neurons from being freely active at the same time",
          "The decoder is removed during training",
          "The input is always compressed to fewer dimensions",
          "The hidden activations are forced to be exactly equal for every input"
        ],
        "correctAnswer": "The sparsity constraint prevents all hidden neurons from being freely active at the same time",
        "explanation": "By penalizing dense activations, the sparsity constraint acts as an information bottleneck that forces the network to discover salient statistical patterns rather than learning an unconstrained identity map."
      },
      {
        "question": "19. An input has 8 dimensions, and the hidden representation of a contractive auto encoder has 3 dimensions. What is the shape of the Jacobian of the hidden representation with respect to the input?",
        "options": [
          "8 × 8",
          "3 × 3",
          "8 × 3",
          "3 × 8"
        ],
        "correctAnswer": "3 × 8",
        "explanation": "The Jacobian matrix J = ∂h / ∂x contains partial derivatives of the 3 hidden outputs with respect to the 8 input features, giving dimension 3 × 8."
      },
      {
        "question": "20. A standard autoencoder reconstructs every training sample with very low error, but its latent codes perform poorly in clustering and classification. What is the most accurate conclusion?",
        "options": [
          "Low reconstruction error guarantees that the latent representation is semantically meaningful",
          "The decoder must be using an incorrect activation function",
          "Good reconstruction does not necessarily imply that the latent features are useful for downstream tasks",
          "The latent dimension must always be increased"
        ],
        "correctAnswer": "Good reconstruction does not necessarily imply that the latent features are useful for downstream tasks",
        "explanation": "Reconstruction objective only measures fidelity of signal reproduction; without proper regularization or inductive biases, the latent space can lack semantic structure or separability."
      },
      {
        "question": "21. The true data distribution contains two well-separated modes. A limited-capacity model is trained by minimizing forward KL divergence. Which behaviour is most likely?",
        "options": [
          "The learned distribution concentrates on only one mode.",
          "The learned distribution becomes broad enough to cover both modes, including the low-density region between them.",
          "The learned distribution assigns zero probability between the modes.",
          "The learned distribution must exactly reproduce both modes"
        ],
        "correctAnswer": "The learned distribution becomes broad enough to cover both modes, including the low-density region between them.",
        "explanation": "Forward KL D_KL(P || Q) is zero-avoiding (mean-seeking/mode-covering): it heavily penalizes Q(x) being small wherever P(x) is non-zero, forcing Q to stretch across all modes."
      },
      {
        "question": "22. Suppose the true distribution contains both cat and dog images, but a limited-capacity model trained using reverse KL divergence generates only sharp cat images. Which statement is most accurate?",
        "options": [
          "The model demonstrates mode-covering behaviour",
          "The model has necessarily learned the complete data distribution",
          "The model demonstrates mode-seeking behaviour and has missed a valid mode",
          "The KL divergence between the two distributions must be zero"
        ],
        "correctAnswer": "The model demonstrates mode-seeking behaviour and has missed a valid mode",
        "explanation": "Reverse KL D_KL(Q || P) is zero-forcing (mode-seeking): Q incurs zero penalty for placing zero mass on regions where P > 0, leading it to lock onto a single mode."
      },
      {
        "question": "23. An event occurs with probability: p(x) = 1/8, Using logarithm base 2, what is its self-information?",
        "options": [
          "1 bit",
          "2 bits",
          "3 bits",
          "8 bits"
        ],
        "correctAnswer": "3 bits",
        "explanation": "Self-information I(x) = -log2(p(x)) = -log2(1/8) = log2(8) = 3 bits."
      },
      {
        "question": "24. Which probability distribution has the highest entropy?",
        "options": [
          "[1.0, 0.0]",
          "[0.9, 0.1]",
          "[0.7, 0.3]",
          "[0.5, 0.5]"
        ],
        "correctAnswer": "[0.5, 0.5]",
        "explanation": "Entropy is maximized when the distribution is uniform. For two discrete outcomes, [0.5, 0.5] achieves maximum entropy of 1.0 bit."
      },
      {
        "question": "25. The true class is represented by the target distribution :P = [1, 0]. Two models predict: Model A: Q₁ = [0.8, 0.2]; Model B: Q₂ = [0.6, 0.4]. Which statement is correct?",
        "options": [
          "Model B has lower cross-entropy because it assigns more probability to the incorrect class",
          "Model A has lower cross-entropy because it assigns higher probability to the correct class",
          "Both models have equal cross-entropy because their probabilities add to 1",
          "Cross-entropy cannot be calculated for one-hot target distributions"
        ],
        "correctAnswer": "Model A has lower cross-entropy because it assigns higher probability to the correct class",
        "explanation": "Cross-entropy H(P, Q) = -1·ln(q1) - 0·ln(q2) = -ln(q1). Since 0.8 > 0.6, -ln(0.8) < -ln(0.6), so Model A achieves lower cross-entropy."
      },
      {
        "question": "26. Why does a VAE encoder learn an approximate posterior distribution qϕ(z|x) instead of directly computing the true posterior pθ(z|x)?",
        "options": [
          "The true posterior cannot depend on the observed input",
          "The true posterior requires an intractable evidence term involving integration over all possible latent values",
          "The approximate posterior does not contain any trainable parameters",
          "The true posterior is always a standard normal distribution"
        ],
        "correctAnswer": "The true posterior requires an intractable evidence term involving integration over all possible latent values",
        "explanation": "By Bayes' theorem, p(z|x) = p(x|z)p(z) / p(x). The marginal likelihood p(x) = ∫ p(x|z)p(z)dz is intractable in high-dimensional continuous latent spaces."
      },
      {
        "question": "27. A VAE encoder has a latent dimension of 5. It outputs one mean and one log-variance for every latent dimension. How many scalar values must the encoder output for the latent distribution?",
        "options": [
          "5",
          "7",
          "10",
          "15"
        ],
        "correctAnswer": "10",
        "explanation": "For 5 latent dimensions, the encoder predicts 5 mean values μ and 5 log-variance values log(σ²), totaling 10 scalar values."
      },
      {
        "question": "28. A decoder is designed for binary-valued images. Which output and likelihood combination is most appropriate?",
        "options": [
          "Unbounded linear outputs with a Gaussian likelihood only",
          "Probabilities between 0 and 1 with a Bernoulli likelihood",
          "Negative variance values with a Poisson likelihood",
          "A single class label with no probability distribution"
        ],
        "correctAnswer": "Probabilities between 0 and 1 with a Bernoulli likelihood",
        "explanation": "For binary pixel intensities in {0, 1}, the natural probabilistic model is independent Bernoulli trials parameterized by probabilities in [0, 1] output via sigmoid."
      },
      {
        "question": "29. The Evidence Lower Bound (ELBO) for a VAE contains two main components: 1. Expected reconstruction log-likelihood, 2. KL-divergence regularization. Suppose the encoder distribution becomes very close to the prior, but the decoder assigns very low probability to the observed input.",
        "options": [
          "The ELBO must be high because the KL-divergence term is small",
          "The ELBO may still be low because the reconstruction term is poor",
          "The reconstruction term does not affect the ELBO",
          "The VAE has necessarily learned a perfect latent representation"
        ],
        "correctAnswer": "The ELBO may still be low because the reconstruction term is poor",
        "explanation": "ELBO = E_q[log p(x|z)] - D_KL. Even with D_KL ≈ 0, a heavily negative reconstruction log-likelihood results in a low overall ELBO."
      },
      {
        "question": "30. The reparameterization trick expresses the latent variable as: z = μ + σ ⊙ ε where ε ∼ N(0, I). Which statement is correct during backpropagation?",
        "options": [
          "ε is learned by the encoder and updated using gradient descent",
          "ε is treated as constant with respect to μ and σ, allowing gradients to flow through μ and σ",
          "The derivative of z with respect to μ is zero",
          "The derivative of z with respect to σ is always one"
        ],
        "correctAnswer": "ε is treated as constant with respect to μ and σ, allowing gradients to flow through μ and σ",
        "explanation": "The reparameterization trick isolates the stochasticity into independent standard Gaussian noise ε, allowing gradients to backpropagate cleanly through deterministic operations on μ and σ."
      },
      {
        "question": "31. A VAE is trained on face images. During testing, increasing only z2 changes the person’s smile, head orientation, and lighting simultaneously. What does this observation most strongly indicate?",
        "options": [
          "The latent representation is perfectly regularized",
          "The latent representation is entangled",
          "The decoder has ignored Z2",
          "The reconstruction loss has become zero"
        ],
        "correctAnswer": "The latent representation is entangled",
        "explanation": "When changing a single latent variable alters multiple independent semantic properties simultaneously, the generative factors are entangled."
      },
      {
        "question": "32. Which observation provides the strongest evidence that a latent representation is disentangled?",
        "options": [
          "Every latent variable has a mean exactly equal to zero",
          "The decoder reconstructs every training image perfectly",
          "Changing one latent variable mainly changes one meaningful property while other properties remain nearly unchanged",
          "All latent variables contain equal amounts of information"
        ],
        "correctAnswer": "Changing one latent variable mainly changes one meaningful property while other properties remain nearly unchanged",
        "explanation": "Disentangled representations have an axis-aligned correspondence between individual latent dimensions and real-world ground truth factors of variation."
      },
      {
        "question": "33. The objective function of a β-VAE is: Suppose β is increased to a very large value. Which outcome is most likely?",
        "options": [
          "The encoder can freely store more input-specific information",
          "The approximate posterior is pushed closer to the prior, but reconstruction quality may decrease",
          "The KL-divergence term becomes irrelevant",
          "The model becomes equivalent to a deterministic autoencoder"
        ],
        "correctAnswer": "The approximate posterior is pushed closer to the prior, but reconstruction quality may decrease",
        "explanation": "A very large β heavily prioritizes matching the isotropic Gaussian prior over faithful reconstruction, resulting in a severe information bottleneck that degrades reconstruction sharpness."
      },
      {
        "question": "34. An image dataset contains six important independent factors of variation, but a β-VAE has only three latent dimensions. Strong disentanglement is enforced. Which result is most reasonable?",
        "options": [
          "Each of the six factors will necessarily receive an independent latent dimension",
          "Some latent dimensions will automatically split into additional dimensions",
          "Only some dominant factors may be represented well, while others may be ignored or weakly represented",
          "The reconstruction loss must become exactly zero"
        ],
        "correctAnswer": "Only some dominant factors may be represented well, while others may be ignored or weakly represented",
        "explanation": "Because capacity (3 latent dimensions) is strictly less than generative factors (6), a strongly regularized bottleneck model captures only the top 3 dominant factors of variance."
      },
      {
        "question": "35. Why can β-annealing be preferable to using a large value of β from the beginning of training?",
        "options": [
          "It permanently removes the KL-divergence term",
          "It allows the model to first learn useful reconstruction information and then gradually impose stronger latent regularization",
          "It prevents the decoder from receiving latent variables",
          "It makes the latent variables deterministic throughout training"
        ],
        "correctAnswer": "It allows the model to first learn useful reconstruction information and then gradually impose stronger latent regularization",
        "explanation": "Starting with small β allows the autoencoder to bootstrap meaningful reconstruction representations without collapsing latent codes, before gradually increasing β to enforce disentanglement."
      },
      {
        "question": "36. For a one-dimensional latent variable:\n$q_\phi(z|x) = \mathcal{N}(\mu, \sigma^2)$\nand the prior is:\n$p(z) = \mathcal{N}(0, 1)$\nThe KL divergence is calculated as:\n$D_{KL} = \frac{1}{2} [\mu^2 + \sigma^2 - \log(\sigma^2) - 1]$\nFor: $\mu = 1$ and $\sigma^2 = 1$, what is the KL-divergence value?",
        "options": [
          "0",
          "0.25",
          "0.5",
          "1"
        ],
        "correctAnswer": "0.5",
        "explanation": "Substituting $\mu = 1$ and $\sigma^2 = 1$ into $D_{KL} = \frac{1}{2} [\mu^2 + \sigma^2 - \log(\sigma^2) - 1]$ yields $\frac{1}{2} [1^2 + 1 - \log(1) - 1] = \frac{1}{2} [1 + 1 - 0 - 1] = \frac{1}{2} [1] = 0.5."
      },
      {
        "question": "37. Which architecture correctly represents a Conditional Variational Autoencoder?",
        "options": [
          "Encoder learns $q_\phi(z|x)$, and decoder learns $p_\theta(x|z)$",
          "Encoder learns $q_\phi(z|x, y)$, and decoder learns $p_\theta(x|z, y)$",
          "Encoder learns $q_\phi(y|x)$, and decoder learns $p_\theta(x|z)$",
          "Encoder learns $q_\phi(z|y)$, and decoder learns $p_\theta(y|x)$"
        ],
        "correctAnswer": "Encoder learns $q_\phi(z|x, y)$, and decoder learns $p_\theta(x|z, y)",
        "explanation": "In a Conditional VAE (CVAE), both the inference network (encoder) and the generative network (decoder) are conditioned on the label or attribute vector y."
      },
      {
        "question": "38. During inference, the same latent vector (z) is supplied twice to a trained CVAE decoder. In the first case, the condition is y=[1, 0], and in the second case, it is y=[0, 1]. What is the most appropriate expectation?",
        "options": [
          "The outputs must be identical because (z) is unchanged",
          "The outputs may differ because the decoder uses both (z) and (y)",
          "The second condition is ignored during generation",
          "The latent vector must be sampled again before the condition can affect the output"
        ],
        "correctAnswer": "The outputs may differ because the decoder uses both (z) and (y)",
        "explanation": "Because the decoder generates reconstructions conditioned jointly on latent code z and condition vector y, different conditions y yield different generated outputs even when z is identical."
      },
      {
        "question": "39. Two input samples have the following latent representations: zA = (2, -1), zB = (-2, 3).\nLinear interpolation is performed using: zα = (1 - α)zA + αzB.\nWhat is the interpolated latent vector when α = 0.25?",
        "options": [
          "(0, 1)",
          "(1, 0)",
          "(-1, 2)",
          "(1, 1)"
        ],
        "correctAnswer": "(1, 0)",
        "explanation": "z_α = (1 - 0.25)(2, -1) + 0.25(-2, 3) = 0.75(2, -1) + 0.25(-2, 3) = (1.5, -0.75) + (-0.5, 0.75) = (1.0, 0)."
      },
      {
        "question": "40. Consider the latent-space interpolation formula: zα = (1 - α)zA + αzB. Which statement is correct?",
        "options": [
          "When α = 0, zα = zB, and when α = 1, zα = zA",
          "When α = 0.5, zα is always the zero vector",
          "When α = 0, zα = zA, and when α = 1, zα = zB",
          "Values between 0 and 1 always generate latent points outside the line segment joining zA and zB"
        ],
        "correctAnswer": "When α = 0, zα = zA, and when α = 1, zα = zB",
        "explanation": "At α = 0, (1 - 0)zA + 0·zB = zA. At α = 1, (1 - 1)zA + 1·zB = zB. For α ∈ [0, 1], zα traverses the convex line segment connecting zA to zB."
      },
      {
        "question": "41. A VAE trained with pixel-wise mean squared error generates images with correct overall structure but blurred edges and textures. Which explanation is most appropriate?",
        "options": [
          "The decoder always ignores the latent vector",
          "Pixel-wise loss may encourage the decoder to average multiple plausible outputs",
          "The KL-divergence term forces every generated pixel to become zero",
          "Gaussian latent variables cannot represent image data"
        ],
        "correctAnswer": "Pixel-wise loss may encourage the decoder to average multiple plausible outputs",
        "explanation": "L2 pixel loss penalizes deviations from the conditional mean, leading the network to generate an average of all plausible sharp textures, which manifests as blurriness."
      },
      {
        "question": "42. During one generator-training step, a noise vector is passed through the generator and then through the discriminator. Which parameters should be updated in this step?",
        "options": [
          "Only the discriminator parameters",
          "Both generator and discriminator parameters",
          "Only the generator parameters",
          "Neither network’s parameters"
        ],
        "correctAnswer": "Only the generator parameters",
        "explanation": "During generator optimization, discriminator weights are frozen, and gradients pass back through the discriminator to update only the generator."
      },
      {
        "question": "43. During discriminator training, which target labels should be used?",
        "options": [
          "Real samples: 0; generated samples: 1",
          "Real samples: 1; generated samples: 0",
          "Real samples: 0.5; generated samples: 0.5",
          "Both real and generated samples: 1"
        ],
        "correctAnswer": "Real samples: 1; generated samples: 0",
        "explanation": "The standard supervised classification target labels for the discriminator are label 1 for real training data and label 0 for generated/synthetic samples."
      },
      {
        "question": "44. During generator training, the non-saturating binary cross-entropy loss is: LG = −log(D(G(z))). Suppose: D(G(z)) = 0.20. Using the natural logarithm, what is the generator loss, rounded to three decimal places?",
        "options": [
          "0.223",
          "0.800",
          "1.609",
          "2.303"
        ],
        "correctAnswer": "1.609",
        "explanation": "LG = -ln(0.20) ≈ 1.609."
      },
      {
        "question": "45. For one real sample and one generated sample, the discriminator loss is: LD = −log(D(x)) − log(1 − D(G(z))). Suppose D(x) = 0.80 and D(G(z)) = 0.30. Using the natural logarithm, what is the total discriminator loss, rounded to three decimal places?",
        "options": [
          "0.580",
          "0.916",
          "1.427",
          "2.120"
        ],
        "correctAnswer": "0.580",
        "explanation": "LD = -ln(0.80) - ln(1 - 0.30) = -ln(0.80) - ln(0.70) = 0.2231 + 0.3567 = 0.5798 ≈ 0.580."
      },
      {
        "question": "46. Consider the discriminator objective: log(D(x)) + log(1 − D(G(z))). Which pair of discriminator outputs maximizes this expression most effectively?",
        "options": [
          "D(x) → 0 and D(G(z)) → 1",
          "D(x) → 1 and D(G(z)) → 0",
          "D(x) → 0.5 and D(G(z)) → 0.5",
          "D(x) → 1 and D(G(z)) → 1"
        ],
        "correctAnswer": "D(x) → 1 and D(G(z)) → 0",
        "explanation": "When D(x) → 1, log(1) = 0. When D(G(z)) → 0, log(1 - 0) = 0. Their sum reaches 0, which is the global maximum of the negative cross-entropy."
      },
      {
        "question": "47. In the original GAN minimax value function, why can the generator ignore the real-sample term during its update?",
        "options": [
          "The real-sample term is always numerically equal to zero",
          "The real-sample term contains no generator output or generator parameters",
          "Real samples are not passed to the discriminator",
          "The discriminator is removed during generator training"
        ],
        "correctAnswer": "The real-sample term contains no generator output or generator parameters",
        "explanation": "The term E_{x~p_data}[log D(x)] is independent of generator parameters θ_G, so its gradient with respect to θ_G is identically zero."
      },
      {
        "question": "48. At the beginning of GAN training, the generated distribution is usually far from the real-data distribution. Which behaviour is most likely?",
        "options": [
          "The discriminator easily separates real and generated samples",
          "The discriminator outputs 0.5 for every sample",
          "The generator has already reached equilibrium",
          "The generated samples are necessarily identical to training samples"
        ],
        "correctAnswer": "The discriminator easily separates real and generated samples",
        "explanation": "Because initial generator outputs are unstructured noise, the discriminator can easily distinguish between real and fake samples with near-perfect accuracy."
      },
      {
        "question": "49. At the ideal GAN convergence point, what is the optimal discriminator output for samples from either distribution?",
        "options": [
          "0",
          "0.25",
          "0.5",
          "1"
        ],
        "correctAnswer": "0.5",
        "explanation": "At optimal convergence p_g = p_data, giving D*(x) = p_data(x) / (p_data(x) + p_g(x)) = 1/2 = 0.5 everywhere."
      },
      {
        "question": "50. Which statement best describes Nash equilibrium in a GAN?",
        "options": [
          "The generator loss becomes zero while the discriminator continues improving",
          "Both networks produce identical parameter values",
          "Neither network can improve its own outcome by changing its parameters alone while the other network remains fixed",
          "The discriminator classifies every generated sample as fake with complete confidence"
        ],
        "correctAnswer": "Neither network can improve its own outcome by changing its parameters alone while the other network remains fixed",
        "explanation": "A Nash equilibrium represents a state in a minimax zero-sum game where neither the generator nor the discriminator can unilaterally decrease its loss."
      },
      {
        "question": "51. Which of the following is the primary advantage of CycleGAN over Pix2Pix?",
        "options": [
          "It requires paired training images.",
          "It performs image classification.",
          "It can learn image-to-image translation using unpaired datasets.",
          "It generates only grayscale images."
        ],
        "correctAnswer": "It can learn image-to-image translation using unpaired datasets.",
        "explanation": "CycleGAN learns bidirectional mappings between domains without requiring paired corresponding examples in the training set."
      },
      {
        "question": "52. In CycleGAN, the cycle consistency loss ensures that:",
        "options": [
          "The discriminator always wins over the generator.",
          "The translated image can be converted back to the original image.",
          "Images have higher resolution.",
          "The latent vectors follow a Gaussian distribution"
        ],
        "correctAnswer": "The translated image can be converted back to the original image.",
        "explanation": "Cycle consistency enforces F(G(x)) ≈ x and G(F(y)) ≈ y, preventing mode collapse and ensuring content preservation."
      },
      {
        "question": "53. Which additional input distinguishes a Conditional GAN (cGAN) from a traditional GAN?",
        "options": [
          "Learning rate",
          "Noise vector only",
          "Condition or label information",
          "Batch size"
        ],
        "correctAnswer": "Condition or label information",
        "explanation": "cGAN conditions both the generator and discriminator on auxiliary information such as class labels or conditioning images."
      },
      {
        "question": "54. Pix2Pix is primarily designed for:",
        "options": [
          "Unpaired image translation",
          "Paired image-to-image translation",
          "Image classification",
          "Object detection"
        ],
        "correctAnswer": "Paired image-to-image translation",
        "explanation": "Pix2Pix is a supervised framework for paired image-to-image translation (e.g., edges-to-photo, map-to-aerial)."
      },
      {
        "question": "55. Which loss function is unique to Pix2Pix compared to a standard GAN?",
        "options": [
          "Cross-entropy loss only",
          "L1 reconstruction loss combined with adversarial loss",
          "Cycle consistency loss",
          "Triplet loss"
        ],
        "correctAnswer": "L1 reconstruction loss combined with adversarial loss",
        "explanation": "Pix2Pix combines conditional adversarial loss with an L1 reconstruction loss between the generated image and paired ground truth."
      },
      {
        "question": "56. StyleGAN controls image generation primarily through:",
        "options": [
          "Cycle consistency loss",
          "Style vectors injected at multiple layers of the generator",
          "Paired datasets",
          "Reinforcement learning"
        ],
        "correctAnswer": "Style vectors injected at multiple layers of the generator",
        "explanation": "StyleGAN feeds intermediate style vectors w into Adaptive Instance Normalization (AdaIN) layers at each resolution stage of the synthesis network."
      },
      {
        "question": "57. Which component in StyleGAN helps reduce the entanglement of latent features?",
        "options": [
          "PatchGAN discriminator",
          "Mapping network",
          "Cycle consistency module",
          "Skip connections"
        ],
        "correctAnswer": "Mapping network",
        "explanation": "The 8-layer MLP mapping network maps Gaussian latent z into an intermediate style space W, which avoids warping and disentangles semantic factors."
      },
      {
        "question": "58. Which of the following applications is best suited for CycleGAN rather than Pix2Pix?",
        "options": [
          "Converting architectural sketches into building photographs using paired data",
          "Translating horses into zebras without paired examples",
          "Image super-resolution using paired images",
          "Semantic segmentation from labeled datasets"
        ],
        "correctAnswer": "Translating horses into zebras without paired examples",
        "explanation": "Horse-to-zebra translation is an unpaired translation task where no direct 1-to-1 correspondences exist."
      },
      {
        "question": "59. In Pix2Pix, the discriminator commonly evaluates:",
        "options": [
          "Individual pixels independently",
          "The entire dataset statistics only",
          "Local image patches (PatchGAN)",
          "Only the latent vectors"
        ],
        "correctAnswer": "Local image patches (PatchGAN)",
        "explanation": "PatchGAN penalizes high-frequency structural errors by classifying whether each N×N local image patch is real or fake."
      },
      {
        "question": "60. Which statement correctly compares StyleGAN and Conditional GAN?",
        "options": [
          "Both require paired datasets",
          "StyleGAN mainly provides fine-grained control over image style, whereas cGAN controls generation using external conditions or labels.",
          "StyleGAN uses cycle consistency loss while cGAN does not.",
          "cGAN cannot generate realistic images."
        ],
        "correctAnswer": "StyleGAN mainly provides fine-grained control over image style, whereas cGAN controls generation using external conditions or labels.",
        "explanation": "StyleGAN focuses on unsupervised hierarchical feature control across multiple scales, while cGAN directs outputs based on explicit input conditioning labels."
      },
      {
        "question": "61. What is the primary objective of the forward diffusion process in a DDPM?",
        "options": [
          "To generate realistic images directly",
          "To gradually add Gaussian noise until the data resembles pure noise",
          "To remove noise from an image in a single step",
          "To classify images into different categories"
        ],
        "correctAnswer": "To gradually add Gaussian noise until the data resembles pure noise",
        "explanation": "The forward diffusion process iteratively corrupts the original image by adding Gaussian noise over T timesteps until it resembles isotropic Gaussian noise."
      },
      {
        "question": "62. During the reverse diffusion process, the neural network is trained to predict:",
        "options": [
          "The original image labels",
          "The noise added at each timestep",
          "The image resolution",
          "The latent vector of a GAN"
        ],
        "correctAnswer": "The noise added at each timestep",
        "explanation": "In DDPM, the neural network ϵ_θ(x_t, t) is trained to estimate the noise vector ϵ that was added to corrupt x_0 into x_t."
      },
      {
        "question": "63. Why does the reverse diffusion process require multiple iterations?",
        "options": [
          "Because the GPU memory is insufficient.",
          "Because noise is removed gradually to approximate the reverse probability distribution.",
          "Because diffusion models cannot process large images.",
          "Because the generator needs paired training data."
        ],
        "correctAnswer": "Because noise is removed gradually to approximate the reverse probability distribution.",
        "explanation": "The reverse true posterior q(x_{t-1}|x_t) is approximately Gaussian only for sufficiently small noise steps, requiring small iterative denoising steps."
      },
      {
        "question": "64. What is the purpose of the variance schedule (βt) in a diffusion model?",
        "options": [
          "To determine the learning rate during training",
          "To control how much Gaussian noise is added at each timestep",
          "To initialize network weights",
          "To calculate image classification accuracy"
        ],
        "correctAnswer": "To control how much Gaussian noise is added at each timestep",
        "explanation": "The variance schedule β_1, ..., β_T controls the noise variance injected at each discrete timestep t."
      },
      {
        "question": "65. Compared to GANs, diffusion models generally:",
        "options": [
          "Produce images faster during inference.",
          "Require paired datasets for training.",
          "Generate higher-quality and more diverse images but with slower sampling.",
          "Do not require neural networks."
        ],
        "correctAnswer": "Generate higher-quality and more diverse images but with slower sampling.",
        "explanation": "Diffusion models offer superior sample diversity and training stability, but require iterative multi-step denoising during inference."
      },
      {
        "question": "66. Why are diffusion models generally slower than GANs during image generation?",
        "options": [
          "They require a discriminator during inference.",
          "They generate the image through many iterative denoising steps.",
          "They require paired training images.",
          "They train a separate model for every timestep."
        ],
        "correctAnswer": "They generate the image through many iterative denoising steps.",
        "explanation": "Generating an image requires passing through many sequential evaluations (often 50–1000 steps) of the neural network."
      },
      {
        "question": "67. Which statement best describes the difference between the forward and reverse diffusion processes?",
        "options": [
          "Both processes add Gaussian noise to the image.",
          "The forward process removes noise, while the reverse process adds noise.",
          "The forward process gradually adds noise, whereas the reverse process progressively removes it.",
          "Both processes use the same trained neural network."
        ],
        "correctAnswer": "The forward process gradually adds noise, whereas the reverse process progressively removes it.",
        "explanation": "The forward process is a fixed Markov chain that destroys structure by adding noise, while the reverse process is a learned neural network that reconstructs data."
      },
      {
        "question": "68. During the reverse diffusion process, the model predicts the noise ϵθ(xt,t) instead of directly predicting the clean image x0. What is the primary reason for this design choice?",
        "options": [
          "Predicting noise is computationally cheaper because no neural network is required.",
          "Noise follows a simple Gaussian distribution, making the learning objective more stable than directly predicting x0.",
          "Predicting x0 is mathematically impossible.",
          "It eliminates the need for the forward diffusion process."
        ],
        "correctAnswer": "Noise follows a simple Gaussian distribution, making the learning objective more stable than directly predicting x0.",
        "explanation": "Predicting the zero-mean unit-variance noise simplifies the learning target and leads to reweighted variational bounds that stabilize training."
      },
      {
        "question": "69. Consider the forward diffusion equation where ϵ∼N(0,I). If the coefficients multiplying the image and noise are 0.9 and 0.436, respectively, which statement is correct?",
        "options": [
          "The noisy image consists of 90% original image information and 10% Gaussian noise.",
          "The noisy image consists of 81% original image information and 19% Gaussian noise.",
          "The coefficients multiplying the image and noise are 0.9 and 0.436, respectively.",
          "The original image contributes 0.81, while the noise contributes 0.19 directly."
        ],
        "correctAnswer": "The coefficients multiplying the image and noise are 0.9 and 0.436, respectively.",
        "explanation": "In x_t = √(α_bar_t) x_0 + √(1 - α_bar_t) ϵ, for α_bar_t = 0.81, the multiplying weights are √(0.81) = 0.9 and √(0.19) ≈ 0.436."
      },
      {
        "question": "70. In a Denoising Diffusion Probabilistic Model (DDPM), the forward diffusion process is fixed and does not require any training, whereas the reverse diffusion process is learned using a neural network. Why is this design adopted?",
        "options": [
          "Because the forward process is deterministic, while the reverse process is stochastic.",
          "Because adding Gaussian noise follows a known probability distribution, but reversing the process requires learning the complex data distribution.",
          "Because the reverse process does not involve probability distributions.",
          "Because the forward process requires labeled training data, while the reverse process does not."
        ],
        "correctAnswer": "Because adding Gaussian noise follows a known probability distribution, but reversing the process requires learning the complex data distribution.",
        "explanation": "Forward noising is analytical because the transition kernel is known, while reverse denoising requires estimating the intractable gradient of the data distribution."
      },
      {
        "question": "71. Which neural network architecture is most commonly used in modern diffusion models for image generation?",
        "options": [
          "VGG16",
          "ResNet18",
          "U-Net with attention mechanisms",
          "AlexNet"
        ],
        "correctAnswer": "U-Net with attention mechanisms",
        "explanation": "Modern diffusion models use an encoder-decoder U-Net backbone equipped with residual blocks, spatial down/up-sampling, and self/cross-attention."
      },
      {
        "question": "72. Which of the following is the primary role of the U-Net in a diffusion model?",
        "options": [
          "To classify noisy images into categories.",
          "To predict the Gaussian noise present in the noisy image at each timestep.",
          "To generate random latent vectors.",
          "To optimize the noise schedule."
        ],
        "correctAnswer": "To predict the Gaussian noise present in the noisy image at each timestep.",
        "explanation": "The U-Net takes noisy image x_t and timestep t and predicts the added noise component ϵ."
      },
      {
        "question": "73. Time-step embeddings are provided to the U-Net because they:",
        "options": [
          "Increase image resolution.",
          "Inform the network about the current stage of the diffusion process.",
          "Replace positional encoding in transformers.",
          "Reduce the dataset size."
        ],
        "correctAnswer": "Inform the network about the current stage of the diffusion process.",
        "explanation": "Timestep embeddings provide vital conditioning on current noise variance levels across the reverse diffusion process."
      },
      {
        "question": "74. In classifier-free guidance, image generation is controlled by:",
        "options": [
          "A separate image classifier only.",
          "Interpolating between conditional and unconditional model predictions.",
          "Removing the noise schedule.",
          "Training two discriminators."
        ],
        "correctAnswer": "Interpolating between conditional and unconditional model predictions.",
        "explanation": "CFG linearly combines predictions: ϵ_guided = ϵ_uncond + s · (ϵ_cond - ϵ_uncond)."
      },
      {
        "question": "75. What is the main purpose of the attention layers inside a diffusion model's U-Net?",
        "options": [
          "To reduce the number of diffusion steps.",
          "To capture long-range dependencies between different regions of the image.",
          "To replace convolutional layers completely.",
          "To perform image classification."
        ],
        "correctAnswer": "To capture long-range dependencies between different regions of the image.",
        "explanation": "Self-attention enables the model to integrate global context and correlate distant spatial features across the canvas."
      },
      {
        "question": "76. Which statement best explains why diffusion models are considered more stable to train than GANs?",
        "options": [
          "They do not use neural networks.",
          "They optimize a supervised denoising objective instead of an adversarial min-max game.",
          "They require much smaller datasets.",
          "They eliminate the need for loss functions."
        ],
        "correctAnswer": "They optimize a supervised denoising objective instead of an adversarial min-max game.",
        "explanation": "Diffusion models optimize standard L2 mean squared error loss on regression targets, avoiding minimax instability and mode collapse."
      },
      {
        "question": "77. In text-to-image diffusion models such as Stable Diffusion, how is the generated image guided toward the user's prompt?",
        "options": [
          "By conditioning the denoising process on text embeddings.",
          "By changing the learning rate during inference.",
          "By increasing the image resolution after generation.",
          "By training a separate GAN for every prompt."
        ],
        "correctAnswer": "By conditioning the denoising process on text embeddings.",
        "explanation": "Pretrained text encoders (like CLIP or T5) generate text embeddings that feed into the U-Net's cross-attention layers."
      },
      {
        "question": "78. Which of the following is a major advantage of Latent Diffusion Models (LDMs) over pixel-space diffusion models?",
        "options": [
          "They eliminate the need for a neural network.",
          "They generate images without any denoising steps.",
          "They require fewer training images because they use GANs.",
          "They perform diffusion in a compressed latent space, reducing computation and memory requirements."
        ],
        "correctAnswer": "They perform diffusion in a compressed latent space, reducing computation and memory requirements.",
        "explanation": "Operating in a perceptually equivalent low-dimensional latent space reduces training and sampling computational overhead by orders of magnitude."
      },
      {
        "question": "79. Which statement best explains the key advantage of Classifier-Free Guidance (CFG) over Classifier-Guided Diffusion?",
        "options": [
          "It eliminates the need for a separately trained classifier by combining conditional and unconditional predictions from the same diffusion model.",
          "It generates images without using a diffusion model.",
          "It removes the reverse diffusion process entirely.",
          "It requires fewer denoising steps than any other diffusion model."
        ],
        "correctAnswer": "It eliminates the need for a separately trained classifier by combining conditional and unconditional predictions from the same diffusion model.",
        "explanation": "CFG avoids training and evaluating an auxiliary noise-aware classifier by training a single diffusion model with condition dropout."
      },
      {
        "question": "80. During inference, increasing the guidance scale in Classifier-Free Guidance (CFG) primarily results in:",
        "options": [
          "Faster image generation because fewer denoising steps are required.",
          "Images that follow the conditioning prompt more closely, although excessively high guidance may reduce diversity and introduce artifacts.",
          "Complete removal of Gaussian noise in a single step.",
          "Better image quality regardless of the prompt."
        ],
        "correctAnswer": "Images that follow the conditioning prompt more closely, although excessively high guidance may reduce diversity and introduce artifacts.",
        "explanation": "Higher guidance scales strongly enforce prompt adherence, though very high values cause over-saturation and unnatural artifacts."
      },
      {
        "question": "81. Which of the following is the primary reason for using word embeddings instead of one-hot encoding in NLP?",
        "options": [
          "One-hot encoding preserves semantic similarity between words",
          "Word embeddings represent words as dense vectors that capture semantic relationships",
          "Word embeddings require a larger vocabulary than one-hot encoding.",
          "One-hot encoding reduces computational complexity more than word embeddings."
        ],
        "correctAnswer": "Word embeddings represent words as dense vectors that capture semantic relationships",
        "explanation": "Word embeddings project words into continuous low-dimensional spaces where geometric distances reflect semantic similarities."
      },
      {
        "question": "82. Which NLP preprocessing technique helps reduce different forms of the same word (e.g., 'playing,' 'played,' 'plays') to a common root while considering the word's meaning?",
        "options": [
          "Tokenization",
          "Stop-word removal",
          "Lemmatization",
          "Padding"
        ],
        "correctAnswer": "Lemmatization",
        "explanation": "Lemmatization applies vocabulary and morphological analysis to return the base dictionary headword (lemma) of a word."
      },
      {
        "question": "83. Why are Recurrent Neural Networks (RNNs) more suitable for sequence data than traditional feedforward neural networks?",
        "options": [
          "RNNs use convolution operations.",
          "RNNs process all input tokens simultaneously.",
          "RNNs require fewer parameters than feedforward networks.",
          "RNNs maintain a hidden state that carries information from previous time steps."
        ],
        "correctAnswer": "RNNs maintain a hidden state that carries information from previous time steps.",
        "explanation": "RNNs pass an internal hidden state forward across timesteps, enabling persistent memory of preceding context."
      },
      {
        "question": "84. Consider an LSTM processing a sentence one word at a time. At a particular time step, the forget gate outputs values close to 1, while the input gate outputs values close to 0. What is the most likely effect on the cell state?",
        "options": [
          "The previous cell state is largely retained, and very little new information is added.",
          "The previous cell state is discarded and replaced entirely with new information.",
          "Both the previous and new information are ignored, making the cell state zero.",
          "The hidden state becomes identical to the candidate cell state."
        ],
        "correctAnswer": "The previous cell state is largely retained, and very little new information is added.",
        "explanation": "The cell update is C_t = f_t * C_{t-1} + i_t * C~_t. With f_t ≈ 1 and i_t ≈ 0, the previous cell state is retained and new information is suppressed."
      },
      {
        "question": "85. Which problem commonly limits the ability of standard RNNs to learn long-term dependencies?",
        "options": [
          "Overfitting",
          "Vanishing and exploding gradients.",
          "Class imbalance",
          "Data augmentation"
        ],
        "correctAnswer": "Vanishing and exploding gradients.",
        "explanation": "Repeated Jacobian matrix multiplications across time cause backpropagated error gradients to exponentially shrink or explode."
      },
      {
        "question": "86. Which gate in an LSTM decides which information from the previous cell state should be discarded?",
        "options": [
          "Input Gate",
          "Output Gate",
          "Forget Gate",
          "Candidate Gate"
        ],
        "correctAnswer": "Forget Gate",
        "explanation": "The forget gate f_t = σ(W_f · [h_{t-1}, x_t] + b_f) computes values in [0, 1] determining what proportion of historical cell memory to discard."
      },
      {
        "question": "87. The candidate cell state C~ in an LSTM is primarily responsible for:",
        "options": [
          "Predicting the output label.",
          "Proposing new information that may be added to the cell state.",
          "Removing unnecessary neurons.",
          "Updating the learning rate."
        ],
        "correctAnswer": "Proposing new information that may be added to the cell state.",
        "explanation": "The candidate cell state C~_t generates candidate values via tanh activation that can be selectively gated into the cell state."
      },
      {
        "question": "88. Which statement correctly distinguishes the cell state from the hidden state in an LSTM?",
        "options": [
          "Both contain identical information.",
          "The cell state stores long-term information, while the hidden state represents the current output passed to the next layer or timestep.",
          "The hidden state stores long-term memory, while the cell state stores short-term memory.",
          "The cell state is only used during training."
        ],
        "correctAnswer": "The cell state stores long-term information, while the hidden state represents the current output passed to the next layer or timestep.",
        "explanation": "The cell state serves as the long-term internal memory carrier, while the hidden state is the filtered external representation."
      },
      {
        "question": "89. Which activation functions are commonly used in the gates of an LSTM?",
        "options": [
          "ReLU for all gates",
          "Sigmoid for gates and tanh for candidate cell state",
          "Softmax for gates and sigmoid for outputs",
          "Only tanh for all computations"
        ],
        "correctAnswer": "Sigmoid for gates and tanh for candidate cell state",
        "explanation": "Gates utilize sigmoid activations to output scale factors in [0, 1], while the candidate cell state and cell squashing use tanh in [-1, 1]."
      },
      {
        "question": "90. Why do LSTMs perform better than standard RNNs on long text sequences?",
        "options": [
          "They process all words simultaneously.",
          "Their gating mechanism helps preserve important information and mitigates the vanishing gradient problem",
          "They eliminate the need for backpropagation.",
          "They use convolutional filters to analyze text."
        ],
        "correctAnswer": "Their gating mechanism helps preserve important information and mitigates the vanishing gradient problem",
        "explanation": "Additive linear updates along the constant error carousel protect gradients from vanishing over long sequences."
      },
      {
        "question": "91. What is the primary advantage of the Transformer architecture over RNNs and LSTMs?",
        "options": [
          "It processes tokens sequentially, reducing memory usage.",
          "It requires fewer parameters than RNNs.",
          "It eliminates the need for positional information.",
          "It uses self-attention to process all tokens in parallel, enabling efficient learning of long-range dependencies."
        ],
        "correctAnswer": "It uses self-attention to process all tokens in parallel, enabling efficient learning of long-range dependencies.",
        "explanation": "Self-attention enables parallel sequence processing and connects any two tokens in O(1) path length regardless of distance."
      },
      {
        "question": "92. Why are positional encodings added to the input embeddings in a Transformer?",
        "options": [
          "To provide information about the order of tokens since self-attention itself is order-independent.",
          "To increase the vocabulary size.",
          "To reduce the number of model parameters.",
          "To replace token embeddings."
        ],
        "correctAnswer": "To provide information about the order of tokens since self-attention itself is order-independent.",
        "explanation": "Self-attention is permutation-equivariant; positional encodings provide essential word order and structural positioning."
      },
      {
        "question": "93. Which statement correctly distinguishes encoder self-attention from decoder masked self-attention?",
        "options": [
          "Encoder self-attention attends only to previoustokens.",
          "Decoder masked self-attention prevents each token from attending to future tokens during training.",
          "Both mechanisms use identical attention masks.",
          "Encoder self-attention ignores positional encodings."
        ],
        "correctAnswer": "Decoder masked self-attention prevents each token from attending to future tokens during training.",
        "explanation": "Causal masking prevents the decoder from attending to future tokens, preserving the autoregressive property during training."
      },
      {
        "question": "94. BERT is primarily trained using which learning objective?",
        "options": [
          "Next-word prediction only.",
          "Masked Language Modeling (MLM) and Next Sentence Prediction (NSP).",
          "Image classification.",
          "Reinforcement learning."
        ],
        "correctAnswer": "Masked Language Modeling (MLM) and Next Sentence Prediction (NSP).",
        "explanation": "BERT is pretrained on Masked Language Modeling (MLM) and Next Sentence Prediction (NSP)."
      },
      {
        "question": "95. Why is BERT considered a bidirectional language model?",
        "options": [
          "It predicts text from right to left only.",
          "It processes the input sequence using context from both the left and right of each token.",
          "It uses two separate encoders.",
          "It translates text in both directions."
        ],
        "correctAnswer": "It processes the input sequence using context from both the left and right of each token.",
        "explanation": "BERT uses unmasked self-attention across the entire sequence to condition representations on both left and right contexts."
      },
      {
        "question": "96. GPT differs from BERT because GPT:",
        "options": [
          "Uses only the encoder stack of the Transformer.",
          "Uses only the decoder stack with masked self-attention for autoregressive text generation.",
          "Is trained only on labeled datasets.",
          "Does not use self-attention."
        ],
        "correctAnswer": "Uses only the decoder stack with masked self-attention for autoregressive text generation.",
        "explanation": "GPT is an autoregressive decoder-only Transformer model designed for left-to-right generation."
      },
      {
        "question": "97. Which application is more suitable for GPT than BERT?",
        "options": [
          "Sentiment classification",
          "Named Entity Recognition (NER)",
          "Automatic text generation and conversational AI",
          "Masked word prediction"
        ],
        "correctAnswer": "Automatic text generation and conversational AI",
        "explanation": "Autoregressive generation models like GPT excel at open-ended text completion and dialogue generation."
      },
      {
        "question": "98. In prompt engineering, what is the primary purpose of providing few-shot examples?",
        "options": [
          "To guide the model toward the desired response format or reasoning pattern without updating its parameters.",
          "To retrain the language model.",
          "To reduce the vocabulary size.",
          "To increase the model's training accuracy."
        ],
        "correctAnswer": "To guide the model toward the desired response format or reasoning pattern without updating its parameters.",
        "explanation": "Few-shot prompting provides in-context demonstrations that guide formatting and reasoning behavior without weight optimization."
      },
      {
        "question": "99. Which of the following prompts is an example of Chain-of-Thought (CoT) prompting?",
        "options": [
          "Translate the following sentence into French.",
          "Classify this review as positive or negative.",
          "Solve the problem step by step before giving the final answer.",
          "Summarize the following paragraph in one sentence."
        ],
        "correctAnswer": "Solve the problem step by step before giving the final answer.",
        "explanation": "'Let's think step by step' is canonical Chain-of-Thought prompting, directing the model to output intermediate reasoning steps."
      },
      {
        "question": "100. Which statement correctly compares BERT and GPT?",
        "options": [
          "BERT uses an encoder-only architecture for bidirectional language understanding, whereas GPT uses a decoder-only architecture for autoregressive text generation.",
          "BERT and GPT both use encoder-only architectures but differ only in the size of their training datasets.",
          "GPT is bidirectional and predicts masked tokens, whereas BERT predicts the next word using causal attention.",
          "Both BERT and GPT require paired input-output datasets during pretraining."
        ],
        "correctAnswer": "BERT uses an encoder-only architecture for bidirectional language understanding, whereas GPT uses a decoder-only architecture for autoregressive text generation.",
        "explanation": "BERT is an encoder-only bidirectional understanding architecture, while GPT is a decoder-only autoregressive causal generation architecture."
      },
      {
        "question": "101. What is the primary motivation for using Retrieval-Augmented Generation (RAG)?",
        "options": [
          "To increase the number of parameters in the language model",
          "To ground generated responses using external information retrieved",
          "To replace tokenization with document retrieval",
          "To eliminate the need for a language model"
        ],
        "correctAnswer": "To ground generated responses using external information retrieved",
        "explanation": "RAG reduces hallucinations and grounds responses by fetching factual, up-to-date context from an external corpus."
      },
      {
        "question": "102. Which advantage does RAG provide when the underlying knowledge base changes frequently?",
        "options": [
          "The entire language model must be retrained after every change",
          "The tokenizer automatically learns the new information",
          "The external index can be updated without retraining the model",
          "The model permanently memorizes every retrieved document"
        ],
        "correctAnswer": "The external index can be updated without retraining the model",
        "explanation": "Knowledge bases can be dynamically updated, inserted, or removed from the vector database without retraining the foundational LLM."
      },
      {
        "question": "103. Which sequence correctly describes a basic RAG pipeline?",
        "options": [
          "Generation → Retrieval → Indexing → Chunking",
          "Retrieval → Model training → Tokenization → Generation",
          "Prompt construction → Chunking → Indexing → Retrieval",
          "Document indexing → Query retrieval → Prompt augmentation → Response generation"
        ],
        "correctAnswer": "Document indexing → Query retrieval → Prompt augmentation → Response generation",
        "explanation": "The standard RAG lifecycle consists of Document indexing, Query retrieval, Prompt augmentation, and Response generation."
      },
      {
        "question": "104. What is the primary role of the retriever in a RAG system?",
        "options": [
          "To identify documents relevant to the user query",
          "To generate the final natural-language response",
          "To update all parameters of the language model",
          "To select the decoding temperature"
        ],
        "correctAnswer": "To identify documents relevant to the user query",
        "explanation": "The retriever searches the index to identify and rank candidate documents relevant to the query."
      },
      {
        "question": "105. What is the primary purpose of a vector database in a dense RAG pipeline?",
        "options": [
          "To train the embedding model",
          "To generate answers without using an LLM and bypassing it",
          "To convert retrieved passages into labels",
          "To store vector representations for similarity search"
        ],
        "correctAnswer": "To store vector representations for similarity search",
        "explanation": "Vector databases index dense embedding vectors to enable rapid approximate nearest neighbor (ANN) similarity search."
      },
      {
        "question": "106. Why are long documents commonly divided into smaller chunks before indexing?",
        "options": [
          "Language models can only retrieve complete documents",
          "To allow retrieving more focused and relevant passages",
          "Chunking increases the number of model parameters",
          "Chunking removes the need for an embedding model"
        ],
        "correctAnswer": "To allow retrieving more focused and relevant passages",
        "explanation": "Chunking segments documents into semantically focused units that fit context windows and improve retrieval precision."
      },
      {
        "question": "107. What is a major advantage of dense retrieval over purely lexical retrieval?",
        "options": [
          "It does not require an indexed corpus",
          "It can retrieve semantically related passages with different words",
          "It guarantees that every retrieved document is correlated and correct",
          "It does not require a similarity function"
        ],
        "correctAnswer": "It can retrieve semantically related passages with different words",
        "explanation": "Dense embeddings encode conceptual semantics, matching queries to documents that express similar ideas with different vocabulary."
      },
      {
        "question": "108. What is the purpose of metadata filtering in document retrieval?",
        "options": [
          "To modify the parameters of the embedding model",
          "To summarize every document before retrieval",
          "To restrict retrieval using irrelevant attributes",
          "To replace semantic similarity with random selection"
        ],
        "correctAnswer": "To restrict retrieval using irrelevant attributes",
        "explanation": "Metadata filtering pre-filters or post-filters search space using structured attributes (such as dates, authors, categories, or tags)."
      },
      {
        "question": "109. What does Precision@k measure in a retrieval system?",
        "options": [
          "The percentage of generated tokens copied from the documents",
          "The average length of the top k documents",
          "The Percentage of relevant documents in top k retrieved results",
          "The time required to generate k responses"
        ],
        "correctAnswer": "The Percentage of relevant documents in top k retrieved results",
        "explanation": "Precision@k computes the fraction of relevant passages among the top-k retrieved items."
      },
      {
        "question": "110. In a basic retrieve-then-generate system, how is retrieved information usually provided to the language model?",
        "options": [
          "It is inserted into the prompt as additional context",
          "It is used to replace the tokenizer vocabulary",
          "It is converted into new trainable parameters",
          "It is used only after the answer has been generated"
        ],
        "correctAnswer": "It is inserted into the prompt as additional context",
        "explanation": "Retrieved passages are formatted into the input prompt as supporting context for the generator."
      },
      {
        "question": "111. What is the primary mechanism used by decoder-only LLMs to generate text?",
        "options": [
          "Predicting all output tokens simultaneously",
          "Predicting the next token based on the previous",
          "Retrieving a response from the training dataset",
          "Classifying the input into a fixed set of possible responses"
        ],
        "correctAnswer": "Predicting all output tokens simultaneously",
        "explanation": "Selected answer from the submitted assignment. Note: Autoregressive decoder-only language models predict text sequentially based on preceding context."
      },
      {
        "question": "112. Why can the same language model generate different responses to the same prompt?",
        "options": [
          "The model has trained parameters as random variables",
          "The tokenizer assigns different token IDs on every run",
          "Probabilistic decoding can sample different tokens",
          "The model retrieves a different training example for every query"
        ],
        "correctAnswer": "Probabilistic decoding can sample different tokens",
        "explanation": "Stochastic decoding strategies such as temperature scaling, top-k, and top-p (nucleus) sampling introduce randomness when selecting the next token from the predicted probability distribution."
      },
      {
        "question": "113. Which task is most naturally formulated as text generation rather than text classification?",
        "options": [
          "Assigning an email to spam or not",
          "Identifying whether a review is positive or negative",
          "Identifying the language in which a sentence is written",
          "Producing a summary of a long document"
        ],
        "correctAnswer": "Producing a summary of a long document",
        "explanation": "Summarization requires generating a novel sequence of natural language tokens, whereas spam detection, sentiment analysis, and language identification map inputs to categorical labels (classification)."
      },
      {
        "question": "114. What is a major limitation of relying only on an LLM's parametric knowledge for text generation?",
        "options": [
          "The model may not generate grammatically correct sentences",
          "Its knowledge may be outdated or incomplete",
          "It cannot encode prompts outside the training corpus",
          "It can generate only text seen exactly during training"
        ],
        "correctAnswer": "Its knowledge may be outdated or incomplete",
        "explanation": "Parametric knowledge is fixed at training time cut-off, making the model prone to hallucinations when asked about recent, private, or specialized factual knowledge not present in its weights."
      },
      {
        "question": "115. In a multimodal language model, what is the main role of a modality-specific encoder?",
        "options": [
          "To make non-text inputs usable by the language model",
          "To generate the final textual answer without using the language model",
          "To replace the language model's tokenizer",
          "To evaluate whether the non-text input can be encoded"
        ],
        "correctAnswer": "To make non-text inputs usable by the language model",
        "explanation": "A modality-specific encoder (such as a ViT for images or Whisper/wav2vec for audio) extracts features and representations from raw sensory inputs so they can be projected into the language model's token/embedding space."
      },
      {
        "question": "116. What is the purpose of aligning visual or acoustic representations with the language model's representation space?",
        "options": [
          "To allow information of different modalities to be jointly processed",
          "To ensure that all images and audio clips have the same dimension",
          "To eliminate the need for text instructions",
          "To convert the non-text modality input tokens to text tokens"
        ],
        "correctAnswer": "To allow information of different modalities to be jointly processed",
        "explanation": "Cross-modal projection/alignment maps vision or audio features into the same embedding space as text tokens, allowing the transformer layers to attend across modalities simultaneously using cross-attention or concatenated sequence self-attention."
      },
      {
        "question": "117. Why is processing a long video generally more computationally expensive than processing a single image?",
        "options": [
          "Video frames cannot be represented using image encoders",
          "Videos contain multiple temporally ordered frames",
          "Each video frame requires a separate language model",
          "Video models cannot reuse visual encoders"
        ],
        "correctAnswer": "Videos contain multiple temporally ordered frames",
        "explanation": "A video consists of dozens or hundreds of frames across time, multiplying the token count and dramatically increasing quadratic self-attention complexity over temporal and spatial dimensions."
      },
      {
        "question": "118. What is the best practical advantage of using a smaller language model?",
        "options": [
          "It always contains less conflicting factual knowledge",
          "It reduces hallucinations",
          "It generally requires less computation",
          "It requires less training data"
        ],
        "correctAnswer": "It generally requires less computation",
        "explanation": "Smaller language models have lower memory footprints (VRAM), faster inference latency, lower energy consumption, and can run efficiently on edge devices or commodity GPUs."
      },
      {
        "question": "119. What is meant by bias in the output of an AI model?",
        "options": [
          "The model consistently generates only short responses",
          "The model produces skewed outcomes for certain groups",
          "The model uses a fixed decoding temperature",
          "The model requires more computation for minority group prompts"
        ],
        "correctAnswer": "The model produces skewed outcomes for certain groups",
        "explanation": "AI output bias manifests when the model systematically exhibits prejudice, uneven performance, or skewed representations favoring or disfavoring specific demographic or societal groups."
      },
      {
        "question": "120. Which is a major source of social bias in large language models?",
        "options": [
          "Stereotypes present in the training data",
          "Lower learning rate used by LLMs for minority group data",
          "Different lengths of the model's context window for majority and minority group data",
          "The number of attention heads used for minority group data"
        ],
        "correctAnswer": "Stereotypes present in the training data",
        "explanation": "LLMs trained on massive web corpora inherit human cultural biases, historical prejudices, and stereotypes reflected in unfiltered text on the internet."
      }
    ]
  },
  {
    "id": "hr-analytics-full-combined-test",
    "title": "HR Analytics - Full Combined Grand Test (Weeks 1-12)",
    "subject": "HR Analytics",
    "date": "14/10/2026",
    "questions": [
      {
        "question": "1. Which of the following is NOT an example of a descriptive analytics tool used in HR?",
        "options": [
          "Mean and standard deviation",
          "Counts and ratios",
          "Decision trees and random forests",
          "Mode and median"
        ],
        "correctAnswer": "Decision trees and random forests",
        "explanation": "Decision trees and random forests are predictive analytics / machine learning tools, whereas mean, median, standard deviation, counts, and ratios are descriptive analytics tools."
      },
      {
        "question": "2. HR analytics differs from HRMIS primarily because HR analytics has the potential to connect HR processes and decisions with ______.",
        "options": [
          "Employee satisfaction scores only",
          "Regulatory compliance requirements",
          "Payroll and compensation structures",
          "Organization performance"
        ],
        "correctAnswer": "Organization performance",
        "explanation": "HR analytics connects HR processes and strategic decisions directly with organizational performance and business outcomes, moving beyond operational record-keeping typical of HRMIS."
      },
      {
        "question": "3. According to the criteria for good HR activity metrics, every metric must explicitly describe what it does NOT include. This rule primarily ensures ______.",
        "options": [
          "That metrics are visually appealing in dashboards",
          "Clarity and prevention of misinterpretation of calculations",
          "That metrics are aligned with competitor benchmarks",
          "That only positive outcomes are measured and reported"
        ],
        "correctAnswer": "Clarity and prevention of misinterpretation of calculations",
        "explanation": "Explicitly stating exclusions ensures clarity, consistent definitions, and prevents misinterpretation or manipulation in metric calculation."
      },
      {
        "question": "4. According to the criteria for good HR activity metrics, an organization should capture and track all possible metrics, even those not currently being used, to build a comprehensive data history.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Tracking unnecessary metrics leads to metric clutter, wasted resources, and analysis paralysis. Effective metrics focus specifically on actionable, strategically aligned needs."
      },
      {
        "question": "5. A good HR problem definition must cover three elements. Which of the following correctly lists all three?",
        "options": [
          "A statement of what, a statement of why, and a desired state or outcome",
          "A statement of who, a statement of when, and a budget estimate",
          "A statement of the problem, a timeline, and a team assignment",
          "A cost-benefit analysis, a risk assessment, and an expected output"
        ],
        "correctAnswer": "A statement of what, a statement of why, and a desired state or outcome",
        "explanation": "A complete problem definition requires articulating what the issue is, why it matters, and the target/desired outcome."
      },
      {
        "question": "6. The overconfidence trap is described as particularly dangerous because it prevents analysts and decision makers from ______.",
        "options": [
          "Using advanced statistical tools",
          "Questioning their methods, motivation, and the way they communicate findings",
          "Collaborating with HR business partners",
          "Collecting sufficient sample data for analysis"
        ],
        "correctAnswer": "Questioning their methods, motivation, and the way they communicate findings",
        "explanation": "The overconfidence trap makes analysts overly certain about conclusions, preventing critical questioning of assumptions, methods, and communication."
      },
      {
        "question": "7. Which of the following best describes the 'overfitting trap' in HR analytics?",
        "options": [
          "The analyst uses too few variables to build a reliable model",
          "The analyst collects more data than is needed for the analysis",
          "The visualization uses too many chart types, causing confusion",
          "The model performs well on training data but poorly on new real-world data"
        ],
        "correctAnswer": "The model performs well on training data but poorly on new real-world data",
        "explanation": "Overfitting occurs when a statistical or machine learning model fits noise and specific artifacts of historical training data, failing on new real-world data."
      },
      {
        "question": "8. In the stakeholder engagement framework for HR analytics, data owners, technology owners, and subject matter experts are classified as ______.",
        "options": [
          "Stakeholders served",
          "Stakeholders depended upon",
          "Stakeholders impacted",
          "Stakeholders managed"
        ],
        "correctAnswer": "Stakeholders depended upon",
        "explanation": "Analysts depend upon data owners, IT/technology owners, and SMEs to acquire data access, infrastructure, and contextual validation."
      },
      {
        "question": "9. Which of the following correctly lists the four components of the 'Six Skills for Success' category called 'Business Acumen'?",
        "options": [
          "Data awareness, Statistical methods, Visualization, Writing",
          "Problem definition, Project management, Change management, Stakeholder management",
          "Financial literacy, Political astuteness, Internal awareness, External awareness",
          "HR sub-functions, HR interdependencies, Privacy, Ethics"
        ],
        "correctAnswer": "Financial literacy, Political astuteness, Internal awareness, External awareness",
        "explanation": "The Business Acumen competency includes Financial literacy, Political astuteness, Internal organizational awareness, and External market awareness."
      },
      {
        "question": "10. Which of the following statements best describes the relationship between KPIs and HR metrics?",
        "options": [
          "KPIs and HR metrics are completely unrelated measurement tools",
          "HR metrics are a broader category, and every KPI is a metric",
          "KPIs replace traditional HR metrics in modern organizations",
          "HR metrics only apply to recruitment; KPIs apply to all functions"
        ],
        "correctAnswer": "HR metrics are a broader category, and every KPI is a metric",
        "explanation": "Metrics represent the broader umbrella of all measurable values; KPIs are a strategic subset of metrics focused on critical goals."
      },
      {
        "question": "11. Which of the following is NOT one of the steps of Data Analytics?",
        "options": [
          "Data Collection",
          "Data Visualization",
          "Data Encryption",
          "Findings"
        ],
        "correctAnswer": "Data Encryption",
        "explanation": "Data Analytics steps include Data Collection, Data Cleaning/Processing, Data Visualization, and Findings/Insights. Data Encryption is an information security practice, not an analytics pipeline step."
      },
      {
        "question": "12. Which of the following is a tool for Data Visualization?",
        "options": [
          "Power BI",
          "Photoshop",
          "AutoCAD",
          "MATLAB"
        ],
        "correctAnswer": "Power BI",
        "explanation": "Power BI is a leading dedicated business intelligence and data visualization software tool."
      },
      {
        "question": "13. An HR manager wants to know the average work experience of all applicants from a raw Excel dataset. Which Excel feature would be most appropriate to summarize this quickly?",
        "options": [
          "Data Studio",
          "Recommended Pivot tables",
          "Conditional Formatting",
          "Pivot Table"
        ],
        "correctAnswer": "Pivot Table",
        "explanation": "Pivot Tables in Excel allow fast aggregation, grouping, and calculation of averages across datasets."
      },
      {
        "question": "14. A manager wants a visual breakdown of \"how many applicants are UG, PG, and PhD\" for a quick presentation. Based on the Excel tools, which would best serve this purpose?",
        "options": [
          "Pivot Table",
          "Pivot Chart",
          "SN field",
          "Status of interview field"
        ],
        "correctAnswer": "Pivot Chart",
        "explanation": "A Pivot Chart provides an immediate visual graphical representation coupled with the summary data."
      },
      {
        "question": "15. After inserting a Pivot Table from your applicant dataset, where would you drag the \"City\" field to see the count of applicants per city as rows?",
        "options": [
          "Rows area",
          "Values area",
          "Filters area",
          "Columns area"
        ],
        "correctAnswer": "Rows area",
        "explanation": "Dragging 'City' to the Rows area groups the dataset by distinct cities down the rows."
      },
      {
        "question": "16. Recommended Pivot Tables in Excel require the user to manually drag every field into Rows, Columns, and Values.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Recommended Pivot Tables automatically pre-configure layouts and field placements based on data patterns without requiring manual setup."
      },
      {
        "question": "17. Among the Data Visualization tools, which one is a coding/statistical language rather than a dashboard or spreadsheet tool?",
        "options": [
          "Tableau",
          "Data Studio",
          "R",
          "Power-BI"
        ],
        "correctAnswer": "R",
        "explanation": "R is a programming and statistical computing language, whereas Tableau, Data Studio, and Power BI are GUI dashboard/BI applications."
      },
      {
        "question": "18. When an HR manager asks, \"How many are UG, PG, and PhD?\" the relevant field from Applicant Analysis used to answer this is ______.",
        "options": [
          "Work Experience",
          "Education",
          "Department",
          "Status of interview"
        ],
        "correctAnswer": "Education",
        "explanation": "UG, PG, and PhD are qualification levels stored in the Education field."
      },
      {
        "question": "19. You've built a Pivot Table showing applicant counts by City. To convert this into a visual chart, which route would you use?",
        "options": [
          "Formulas → Insert Chart",
          "PivotTable Analyze/Design → PivotChart",
          "Review → Chart Tools",
          "Page Layout → Visualize"
        ],
        "correctAnswer": "PivotTable Analyze/Design → PivotChart",
        "explanation": "PivotCharts are inserted via the PivotTable Analyze/Design contextual ribbon tab in Excel."
      },
      {
        "question": "20. When you drag a text/ID-type field like \"SN\" or \"Gender\" into the Values area of a Pivot Table, which summary function does it default to?",
        "options": [
          "Sum",
          "Product",
          "Average",
          "Count"
        ],
        "correctAnswer": "Count",
        "explanation": "Non-numeric or text fields automatically default to the Count summary function in Excel Pivot Tables."
      },
      {
        "question": "21. A manufacturing company with an outdated work culture and poor employer branding is struggling to attract candidates even after posting on multiple platforms. Which influence, as listed under constraints on choosing a recruiting source, most directly explains this problem?",
        "options": [
          "Limited budgetary support",
          "Restrictive policies of the government",
          "Poor image",
          "Conservative internal policies"
        ],
        "correctAnswer": "Poor image",
        "explanation": "An outdated culture and weak reputation constitute a 'Poor image' constraint, discouraging talented applicants regardless of advertising reach."
      },
      {
        "question": "22. Which of the following correctly pairs a recruitment source with its category?",
        "options": [
          "Job bidding — External Method",
          "Employee referrals — External Method",
          "Educational institutions — Internal Method",
          "Promotions and transfer — Internal Method"
        ],
        "correctAnswer": "Promotions and transfer — Internal Method",
        "explanation": "Promotions and transfers source talent from within the existing workforce, making them Internal Methods."
      },
      {
        "question": "23. FinServe, a financial services firm, identifies gaps in gender and ethnic diversity, particularly in senior management. Which combination of strategies most directly addresses this challenge?",
        "options": [
          "Increasing salaries and offering remote work options.",
          "Partnering with diverse professional organizations, mentorship programs, and unconscious bias training.",
          "Reducing qualification requirements and using only internal promotions.",
          "Outsourcing recruitment exclusively to third-party agencies."
        ],
        "correctAnswer": "Partnering with diverse professional organizations, mentorship programs, and unconscious bias training.",
        "explanation": "Addressing systemic leadership diversity gaps requires targeted sourcing partners, career mentorship pathways, and reducing cognitive bias in promotion and hiring."
      },
      {
        "question": "24. DiversityDesigns, a graphic design agency, wants to attract candidates from non-traditional and self-taught backgrounds. Which of the following actions directly supports this goal in the 'Identifying HR Requirements' step?",
        "options": [
          "Publishing job ads only on LinkedIn and Naukri.",
          "Requiring CISSP and CISM certifications for all applicants.",
          "Using inclusive language, avoiding unnecessary jargon, and highlighting flexible working arrangements in job descriptions.",
          "Limiting applications to candidates with formal degrees from recognized universities."
        ],
        "correctAnswer": "Using inclusive language, avoiding unnecessary jargon, and highlighting flexible working arrangements in job descriptions.",
        "explanation": "Inclusive language and eliminating rigid jargon/degree barriers opens requirements to competent non-traditional talent."
      },
      {
        "question": "25. A company adopted a __________ recruitment strategy, which involves removing names and other identifying information from resumes and applications, to minimize unconscious bias during candidate screening.",
        "options": [
          "Blind",
          "Panel-based",
          "Competency-based",
          "Structured"
        ],
        "correctAnswer": "Blind",
        "explanation": "Blind recruitment redacts personal demographic identifiers (name, gender, photo, age) to prevent unconscious bias during screening."
      },
      {
        "question": "26. A company adopting the 'hire for attitude, train for skill' philosophy primarily focuses on evaluating candidates' technical expertise and domain knowledge rather than their alignment with company values.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "'Hire for attitude, train for skill' explicitly prioritizes mindset, work ethic, and cultural value alignment over existing technical knowledge."
      },
      {
        "question": "27. An organization is experiencing high time-to-hire and is unable to identify which sourcing channels deliver the best candidates. Which combination of technological tools would best address both challenges simultaneously?",
        "options": [
          "Using spreadsheets for manual tracking combined with periodic reviews by HR managers.",
          "Increasing the number of job postings on paid portals and conducting monthly HR audits.",
          "Deploying an Applicant Tracking System (ATS) integrated with job boards and a Candidate Relationship Management (CRM) tool.",
          "Setting up an internal HR helpdesk and training managers in Excel-based reporting."
        ],
        "correctAnswer": "Deploying an Applicant Tracking System (ATS) integrated with job boards and a Candidate Relationship Management (CRM) tool.",
        "explanation": "An integrated ATS and CRM automates candidate pipeline workflows, shortens cycle times, and attributes source efficacy."
      },
      {
        "question": "28. An IT company facing a sudden spike in project demand needs to scale its workforce for 6 months without the long-term commitment of permanent hiring. At the same time, the HR team wants to evaluate the effectiveness of the current recruitment source before committing further. Which combination of strategies would be most appropriate?",
        "options": [
          "Use temporary employees as an alternative to recruiting and evaluate the source using yield ratios.",
          "Opt for employee leasing and evaluate the source using surveys and studies.",
          "Use subcontracting and evaluate the source using the recruitment process flowchart.",
          "Use outsourcing as an alternative to recruiting and evaluate the source using time-lapse data."
        ],
        "correctAnswer": "Use temporary employees as an alternative to recruiting and evaluate the source using yield ratios.",
        "explanation": "Temporary staffing fulfills short-term surge needs without permanent headcount commitments, and yield ratios measure applicant conversion per source."
      },
      {
        "question": "29. LinkedIn's primary strategy for external hiring was to focus on active job seekers, candidates who were actively looking for new employment at the time of recruitment.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "LinkedIn's breakthrough value proposition was targeting passive candidates—professionals not actively browsing job boards but open to opportunities."
      },
      {
        "question": "30. Any company’s average time to hire software engineers was 60 days, which was above the industry average. What two interventions might that company implement to reduce this gap?",
        "options": [
          "Increasing recruiter headcount and conducting walk-in interviews.",
          "Reducing the number of interview rounds and offering higher salaries.",
          "Partnering with universities and deploying campus placement drives.",
          "Implementing an AI-powered screening tool and a self-service interview scheduling system."
        ],
        "correctAnswer": "Implementing an AI-powered screening tool and a self-service interview scheduling system.",
        "explanation": "AI-automated resume screening and self-service interview scheduling eliminate administrative bottlenecks and scheduling delays."
      },
      {
        "question": "31. A candidate who answers 'Yes' to 'Would you like to work for this company?' but 'No' to 'Are you planning to apply for this company?' is classified at which stage of the Employer Brand Image Analysis framework?",
        "options": [
          "Awareness stage only.",
          "Consideration stage — interested but not yet at Preference.",
          "Preference stage — ready to apply.",
          "Neither Awareness nor Consideration — they have no interest."
        ],
        "correctAnswer": "Consideration stage — interested but not yet at Preference.",
        "explanation": "They are aware and interested (consideration), but have not yet converted into preference or active intent to apply."
      },
      {
        "question": "32. As per the Employer Branding Value Propositions framework (Complain and Praises Analysis), which of the following correctly describes what 'Praises' data from employees of the 'Best Place to Work' category represents?",
        "options": [
          "The reasons why employees leave the organization.",
          "The marginal cost of external hiring versus internal promotion.",
          "The metrics are tracked in the Social Media Matrix for career page views.",
          "The reasons why people come and stay in the organization."
        ],
        "correctAnswer": "The reasons why people come and stay in the organization.",
        "explanation": "'Praises' from employees at benchmark employers reveal key drivers of attraction and employee retention."
      },
      {
        "question": "33. The Internal Branding Matrix includes salary benchmarking and compensation revision as its primary tools for strengthening the employer brand among existing employees.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Internal branding emphasizes culture, shared values, communication, and employee engagement rather than mere transactional compensation changes."
      },
      {
        "question": "34. Which of the following correctly distinguishes 'Surface Diversity' from 'Deep Diversity'?",
        "options": [
          "Surface diversity includes attitude and belief; deep diversity includes gender and religion.",
          "Surface diversity is measured using the Employee Happiness Index; deep diversity is measured using the Employee Knowledge Sharing Index.",
          "Surface diversity covers observable attributes such as gender, religion, city, and education; deep diversity covers non-observable attributes such as attitude, belief, values, and motivation.",
          "Surface diversity refers to internal hires; deep diversity refers to external hires with different cultural backgrounds."
        ],
        "correctAnswer": "Surface diversity covers observable attributes such as gender, religion, city, and education; deep diversity covers non-observable attributes such as attitude, belief, values, and motivation.",
        "explanation": "Surface diversity reflects observable demographic attributes, while deep diversity captures underlying cognitive, psychological, and motivational characteristics."
      },
      {
        "question": "35. An HR analytics team wants to evaluate the quality of the recruitment process after candidates have joined. Which of the following post-hire metrics would most directly indicate whether the right people were recruited?",
        "options": [
          "Quality of hire and early attrition.",
          "Rengage rate and application-to-job-offer ratio.",
          "Number of applications received and cost per application.",
          "Candidate experience score and job search intensity."
        ],
        "correctAnswer": "Quality of hire and early attrition.",
        "explanation": "Quality of hire (performance appraisals, manager ratings) and early attrition rates directly reflect the accuracy and success of hiring decisions."
      },
      {
        "question": "36. The effectiveness of a recruitment source is evaluated solely based on the number of relevant applications received, with no consideration of cost.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Recruitment source effectiveness evaluates cost per hire, conversion rates, and subsequent performance, not application volume in isolation."
      },
      {
        "question": "37. In the Comprehensive End-to-End Recruitment and Selection Process, which of the following is listed as Best Practice for Developing the Pool?",
        "options": [
          "Looking only for external candidates to bring in fresh perspectives.",
          "Relying on generic competency models to shortlist candidates quickly.",
          "Developing a large pool that includes both internal and external candidates, and consulting employees.",
          "Hiring only when a vacancy arises and indulging in irrational optimism about available talent."
        ],
        "correctAnswer": "Developing a large pool that includes both internal and external candidates, and consulting employees.",
        "explanation": "Best practice involves combining internal mobility, external sourcing channels, and employee referral networks."
      },
      {
        "question": "38. Which of the following correctly matches a Type of Interview with its definition?",
        "options": [
          "Situational Interview – The recruiter asks questions as they come to mind.",
          "Structured Interview – The recruiter uses a predetermined set of questions that are clearly job-related.",
          "Panel Interview – The recruiter presents a hypothetical incident and asks the candidate to respond.",
          "Behavioural Interview – The focus is on actual work-related incidents, and the applicant is asked to reveal what he or she did in a given situation."
        ],
        "correctAnswer": "Behavioural Interview – The focus is on actual work-related incidents, and the applicant is asked to reveal what he or she did in a given situation.",
        "explanation": "Behavioral interviews operate on the premise that past behavior predicts future performance, probing how candidates handled real past situations."
      },
      {
        "question": "39. A company's HR team finds that: (i) new hires show high early attrition within six months of joining, (ii) interviewers consistently over-rate candidates who present confidently, regardless of technical fit, and (iii) the Audit and Review step is being skipped after each hiring cycle. Which combined approach would most comprehensively address all three issues?",
        "options": [
          "Replace all interview rounds with written aptitude tests alone to eliminate interviewer subjectivity.",
          "Train interviewers to recognize the Halo Effect so that one impressive trait does not distort the overall rating; track early attrition as a post-hire quality signal to assess whether the right candidates were selected; and institutionalize the Audit and Review step to regularly examine and improve hiring practices.",
          "Focus exclusively on expanding the application pool by including both internal and external candidates to improve the odds of finding the right hire.",
          "Use only the medical examination and reference check stages to filter candidates before the final placement decision."
        ],
        "correctAnswer": "Train interviewers to recognize the Halo Effect so that one impressive trait does not distort the overall rating; track early attrition as a post-hire quality signal to assess whether the right candidates were selected; and institutionalize the Audit and Review step to regularly examine and improve hiring practices.",
        "explanation": "Mitigating the halo effect ensures objective evaluations, tracking early attrition provides feedback on hiring quality, and audit/review institutionalizes continuous refinement."
      },
      {
        "question": "40. __________ is the ability of a selection tool to measure an attribute consistently, such that repeated administration to the same individual yields approximately identical scores.",
        "options": [
          "Reliability",
          "Validity",
          "Standardisation",
          "Suitability"
        ],
        "correctAnswer": "Reliability",
        "explanation": "Reliability is the degree of measurement consistency and stability across repeated administrations."
      },
      {
        "question": "41. What aspects does the 'Effectiveness of Selection Method' table assess?",
        "options": [
          "Resume quality",
          "Communication skills",
          "Person-job fit, performance rating, and cost",
          "Training effectiveness"
        ],
        "correctAnswer": "Person-job fit, performance rating, and cost",
        "explanation": "The 'Effectiveness of Selection Method' framework evaluates selection instruments across multidimensional criteria including person-job fit, resulting performance ratings, and associated costs."
      },
      {
        "question": "42. Which metric in recruitment visualization is used to assess recruitment efficiency?",
        "options": [
          "Yield ratio",
          "Absenteeism",
          "Diversity index",
          "Attrition rate"
        ],
        "correctAnswer": "Yield ratio",
        "explanation": "The yield ratio indicates the percentage of candidates who pass from one stage of the recruitment funnel to the next, serving as a key indicator of recruitment efficiency."
      },
      {
        "question": "43. Which recruitment source fulfilled the highest percentage of high-level role expectations?",
        "options": [
          "Consultants",
          "Employee Referrals",
          "Job Portal",
          "Campus hiring"
        ],
        "correctAnswer": "Employee Referrals",
        "explanation": "Employee referrals typically yield higher quality candidates with stronger cultural fit and higher fulfillment of role expectations, especially for high-level positions."
      },
      {
        "question": "44. What is the ideal characteristic of an effective testing component in the selection process?",
        "options": [
          "Ease of administration",
          "Low candidate drop rate",
          "High salary correlation",
          "Predictive of job performance"
        ],
        "correctAnswer": "Predictive of job performance",
        "explanation": "The primary hallmark of an effective selection test or assessment is its predictive validity—its empirical ability to accurately forecast future on-the-job performance."
      },
      {
        "question": "45. Which measure is used to evaluate how accurately selection analytics predict candidate performance?",
        "options": [
          "Number of selection rounds",
          "Actual vs. predicted performance",
          "Hiring manager's intuition",
          "Duration of the interview"
        ],
        "correctAnswer": "Actual vs. predicted performance",
        "explanation": "Evaluating predictive models in selection analytics requires comparing candidates' predicted scores/performance against their actual post-hire job performance."
      },
      {
        "question": "46. Which factors are considered when determining the 'Cost per Joinee'?",
        "options": [
          "Hiring manager's rating",
          "Interview duration",
          "Total recruitment expenditure and number of joinees",
          "Salary band only"
        ],
        "correctAnswer": "Total recruitment expenditure and number of joinees",
        "explanation": "Cost per Joinee (or Cost per Hire) is calculated by dividing total recruitment costs (advertising, agency fees, recruiter time, etc.) by the total number of successful joinees."
      },
      {
        "question": "47. In outcome-based selection analysis, which situation represents a 'false negative'?",
        "options": [
          "An unsuccessful candidate is hired",
          "A successful candidate is not hired",
          "An unsuccessful candidate is not hired",
          "A successful candidate is hired"
        ],
        "correctAnswer": "A successful candidate is not hired",
        "explanation": "In selection analytics, a false negative (Type II error) occurs when a candidate who would have been successful on the job is rejected (not hired)."
      },
      {
        "question": "48. What may result from using an inappropriate cut score in the selection process?",
        "options": [
          "Higher salaries offered",
          "Reduced cost per hire",
          "Increased false positives or false negatives",
          "Perfect employee performance"
        ],
        "correctAnswer": "Increased false positives or false negatives",
        "explanation": "Setting an incorrect cutoff score distorts classification: an excessively high cut score increases false negatives (rejecting good candidates), while an excessively low cut score increases false positives (hiring unqualified candidates)."
      },
      {
        "question": "49. In selection analytics, what does the term 'Fit Percentage' indicate?",
        "options": [
          "Degree of alignment among the job, team, supervisor, and organization",
          "Resume match rate",
          "Ratio of candidates to recruiters",
          "Level of salary satisfaction"
        ],
        "correctAnswer": "Degree of alignment among the job, team, supervisor, and organization",
        "explanation": "'Fit Percentage' measures holistic alignment across person-job, person-team, person-supervisor, and person-organization dimensions."
      },
      {
        "question": "50. Which data set is most appropriate for identifying potential bias in the hiring process?",
        "options": [
          "Cost per joinee",
          "Gender-wise hiring ratio",
          "Average number of interview questions",
          "Tenure by marital status"
        ],
        "correctAnswer": "Gender-wise hiring ratio",
        "explanation": "Demographic breakdown ratios such as the gender-wise hiring ratio (and pass-through rates by demographic group) are used to detect adverse impact and systemic bias in hiring."
      },
      {
        "question": "51. Which factor helps determine who should receive training first?",
        "options": [
          "Education level",
          "Motivation to learn",
          "Salary level",
          "Age"
        ],
        "correctAnswer": "Motivation to learn",
        "explanation": "Readiness for training depends heavily on employee motivation to learn, which predicts engagement, retention, and successful skill transfer."
      },
      {
        "question": "52. What does skill inventory analysis compare?",
        "options": [
          "Budget vs. outcomes",
          "Age vs. performance",
          "Available vs. required skills",
          "Training vs. education"
        ],
        "correctAnswer": "Available vs. required skills",
        "explanation": "A skill inventory analysis compares existing (available) workforce competencies against required organizational skills to identify capability gaps."
      },
      {
        "question": "53. Which phase focuses on measuring training outcomes?",
        "options": [
          "Assessment",
          "Implementation",
          "Alignment",
          "Evaluation"
        ],
        "correctAnswer": "Evaluation",
        "explanation": "The evaluation phase assesses the effectiveness, learning outcomes, and business impact of training programs."
      },
      {
        "question": "54. What indicates training coverage within the organization?",
        "options": [
          "Training budget",
          "Department size",
          "Employee trained / Total number of employees",
          "HR ratio"
        ],
        "correctAnswer": "Employee trained / Total number of employees",
        "explanation": "Training coverage (or penetration rate) is calculated as the ratio of employees who underwent training to the total employee headcount."
      },
      {
        "question": "55. What is the goal of training in contrast to development?",
        "options": [
          "Career enhancement",
          "Current job preparation",
          "Employee motivation",
          "Strategic planning"
        ],
        "correctAnswer": "Current job preparation",
        "explanation": "Training focuses on immediate competencies needed for current job performance, whereas development focuses on broader, future career growth."
      },
      {
        "question": "56. What is the correct formula for absenteeism in training?",
        "options": [
          "Total training time / Absent employees",
          "Employees present / Total employees",
          "Number of employee absent / Total training participants",
          "Employees trained / Absent employees"
        ],
        "correctAnswer": "Number of employee absent / Total training participants",
        "explanation": "Absenteeism in training is computed as the number of absent participants divided by the total enrolled/nominated training participants."
      },
      {
        "question": "57. What is considered in the importance dimension during task analysis?",
        "options": [
          "Age",
          "Training length",
          "Criticality of the task",
          "Training method"
        ],
        "correctAnswer": "Criticality of the task",
        "explanation": "In task analysis, the importance dimension evaluates how critical and essential the specific task is to overall organizational success."
      },
      {
        "question": "58. Who typically initiates training programs?",
        "options": [
          "Management",
          "Employees",
          "External trainers",
          "Government"
        ],
        "correctAnswer": "Management",
        "explanation": "Training programs are typically commissioned and initiated by management to bridge strategic skill gaps and enhance productivity."
      },
      {
        "question": "59. What does 'Cost per learning hour received' assess?",
        "options": [
          "Learning outcomes",
          "Staff engagement",
          "Cost efficiency",
          "Department needs"
        ],
        "correctAnswer": "Cost efficiency",
        "explanation": "'Cost per learning hour received' is a standard training metric assessing the cost efficiency of learning delivery across participant hours."
      },
      {
        "question": "60. How is teamwork skill level assessed in inventory analysis?",
        "options": [
          "Hours of training received",
          "Performance rating",
          "Seniority",
          "Department revenue"
        ],
        "correctAnswer": "Performance rating",
        "explanation": "Soft skills and competencies like teamwork are evaluated in inventory analysis through supervisory and peer performance ratings."
      },
      {
        "question": "61. Coaching is most effective when:",
        "options": [
          "Supervisors are uninvolved",
          "There is an open relationship",
          "Trainees are left alone",
          "Feedback is avoided"
        ],
        "correctAnswer": "There is an open relationship",
        "explanation": "Coaching relies on trust, transparent communication, and an open, supportive relationship between coach and coachee."
      },
      {
        "question": "62. Understudy training involves:",
        "options": [
          "Lecturing to senior executives",
          "Replacing peers without guidance",
          "Acting as a temporary substitute for a manager",
          "Random job hopping"
        ],
        "correctAnswer": "Acting as a temporary substitute for a manager",
        "explanation": "An understudy is designated to learn a manager's job by assisting and temporarily taking over their responsibilities during their absence."
      },
      {
        "question": "63. Which method provides exposure to diverse functions via advisory groups?",
        "options": [
          "Understudy",
          "Job rotation",
          "Multiple management",
          "Case study"
        ],
        "correctAnswer": "Multiple management",
        "explanation": "Multiple management (such as junior boards of directors) gives emerging managers exposure to high-level strategic problems and diverse organizational functions."
      },
      {
        "question": "64. A suitable method for developing reasoning skills is:",
        "options": [
          "Role playing",
          "Business games",
          "Case study",
          "Sensitivity training"
        ],
        "correctAnswer": "Case study",
        "explanation": "Case study analysis requires trainees to diagnose complex real-world organizational problems, developing critical analytical and reasoning skills."
      },
      {
        "question": "65. An executive gains cross-functional experience through:",
        "options": [
          "Job rotation",
          "Role play",
          "Coaching",
          "Special readings"
        ],
        "correctAnswer": "Job rotation",
        "explanation": "Job rotation systematically moves managers between different functional areas to develop broad cross-functional competence."
      },
      {
        "question": "66. According to the research findings, traditional practices are shifting toward:",
        "options": [
          "Eliminating training",
          "Fixed-role models",
          "Participation-based development",
          "Manager-exclusive development"
        ],
        "correctAnswer": "Participation-based development",
        "explanation": "Modern corporate development models emphasize active participation, experiential learning, and collaborative leadership."
      },
      {
        "question": "67. A suggested HR role in the future is to:",
        "options": [
          "Control salaries only",
          "Isolate departments",
          "Preserve and increase organizational knowledge",
          "Promote top-down learning only"
        ],
        "correctAnswer": "Preserve and increase organizational knowledge",
        "explanation": "Future HR roles focus on knowledge management—acting as strategic custodians to capture, preserve, and amplify organizational knowledge."
      },
      {
        "question": "68. What is an important learning metric from training?",
        "options": [
          "Number of holidays taken",
          "Attitude change",
          "New dress code adoption",
          "Marketing strategy redesign"
        ],
        "correctAnswer": "Attitude change",
        "explanation": "Under Kirkpatrick's Level 2 (Learning), changes in attitude, knowledge, and mental models serve as essential learning metrics."
      },
      {
        "question": "69. An employee’s reaction to training may include:",
        "options": [
          "Ignoring training content",
          "Dismissing instructors",
          "Satisfaction with course delivery",
          "Refusing to participate in appraisals"
        ],
        "correctAnswer": "Satisfaction with course delivery",
        "explanation": "Reaction evaluations (Kirkpatrick Level 1) measure participant satisfaction with the training design, facilitator, and delivery."
      },
      {
        "question": "70. Training evaluation criteria do NOT include:",
        "options": [
          "Sales promotions",
          "Learning",
          "Employee reactions",
          "Business results"
        ],
        "correctAnswer": "Sales promotions",
        "explanation": "Kirkpatrick's four levels of training evaluation are Reaction, Learning, Behavior, and Results. Sales promotions are marketing activities, not training evaluation criteria."
      },
      {
        "question": "71. What is visualized in the training effectiveness chart?",
        "options": [
          "Weather patterns",
          "Departmental shifts",
          "Subject-wise performance",
          "Meal preferences"
        ],
        "correctAnswer": "Subject-wise performance",
        "explanation": "Training effectiveness visualizations compare participant competency outcomes and test scores broken down across subject areas."
      },
      {
        "question": "72. What financial metric is tracked department-wise in training data?",
        "options": [
          "Training Cost",
          "Bonus expenditure",
          "Rent allocation",
          "Reimbursement rate"
        ],
        "correctAnswer": "Training Cost",
        "explanation": "Department-wise training cost tracks resource utilization and training budget expenditure per department."
      },
      {
        "question": "73. What duration metric is presented in the training visualization?",
        "options": [
          "Employee retention",
          "Department-wise Training Duration",
          "Vacation time",
          "Resignation period"
        ],
        "correctAnswer": "Department-wise Training Duration",
        "explanation": "Visual dashboards track training hours and session duration delivered across individual departments."
      },
      {
        "question": "74. What character trait is listed in the benchmark skills table?",
        "options": [
          "Punctuality",
          "Compassion and sensitivity",
          "Typing speed",
          "Accent clarity"
        ],
        "correctAnswer": "Compassion and sensitivity",
        "explanation": "Benchmark managerial competencies highlight emotional intelligence traits such as compassion and interpersonal sensitivity."
      },
      {
        "question": "75. Which is a component of development summary based on self and others’ input?",
        "options": [
          "Leave balance",
          "Listens to others",
          "Health insurance",
          "Seating layout"
        ],
        "correctAnswer": "Listens to others",
        "explanation": "360-degree development feedback summaries evaluate active listening competencies based on multisource ratings."
      },
      {
        "question": "76. What is included in interpersonal relationship development?",
        "options": [
          "Conflict creation",
          "Facilitates team success",
          "Attendance reporting",
          "Wage compliance"
        ],
        "correctAnswer": "Facilitates team success",
        "explanation": "Interpersonal skill development emphasizes collaboration, trust building, and facilitating collective team achievement."
      },
      {
        "question": "77. Which activity is part of internal development programs?",
        "options": [
          "External consulting",
          "Job rotation",
          "Legal compliance",
          "Budget proposal writing"
        ],
        "correctAnswer": "Job rotation",
        "explanation": "Job rotation is a primary internal development method for expanding experiential breadth within the firm."
      },
      {
        "question": "78. What method in job experiences matrix involves decision-making under stress?",
        "options": [
          "Group exercise",
          "Adverse business conditions",
          "Annual party planning",
          "Time logging"
        ],
        "correctAnswer": "Adverse business conditions",
        "explanation": "Experiencing adverse business conditions challenges leaders to make high-stakes decisions under genuine organizational stress."
      },
      {
        "question": "79. What does 'Making Transitions' in the job experience matrix signify?",
        "options": [
          "Time zone shift",
          "Unfamiliar responsibilities",
          "Changing passwords",
          "Location mapping"
        ],
        "correctAnswer": "Unfamiliar responsibilities",
        "explanation": "Transition experiences involve stepping into unfamiliar roles, managing different functional scopes, or leading new initiatives."
      },
      {
        "question": "80. What element supports the development of a culture?",
        "options": [
          "Leave policy",
          "Feedback mechanism",
          "Snack availability",
          "Commute distance"
        ],
        "correctAnswer": "Feedback mechanism",
        "explanation": "Robust feedback mechanisms foster psychological safety, transparency, continuous learning, and healthy organizational culture."
      },
      {
        "question": "81. Performance appraisal is primarily concerned with:",
        "options": [
          "Monitoring organizational finance activities",
          "Expanding external customer relationships",
          "Evaluating employee work behavior and potential",
          "Managing technological infrastructure systems"
        ],
        "correctAnswer": "Evaluating employee work behavior and potential",
        "explanation": "Performance appraisal systematically evaluates an employee's job performance, work behaviors, and future potential against established criteria."
      },
      {
        "question": "82. Performance management differs from performance appraisal because it:",
        "options": [
          "focuses only on salary revisions",
          "emphasizes only annual reporting systems",
          "excludes employee development processes",
          "includes evaluation, improvement, and rewards"
        ],
        "correctAnswer": "includes evaluation, improvement, and rewards",
        "explanation": "Performance appraisal is a periodic evaluation event, whereas performance management is an ongoing, continuous process integrating goal setting, evaluation, development, and reward systems."
      },
      {
        "question": "83. After measuring actual performance, organizations compare results with ________.",
        "options": [
          "compensation plans",
          "standards",
          "labor unions",
          "inventories"
        ],
        "correctAnswer": "standards",
        "explanation": "The performance evaluation cycle involves setting standards, measuring actual performance, and comparing actual performance against those predetermined standards."
      },
      {
        "question": "84. Which method belongs to multiple-person evaluation methods?",
        "options": [
          "Essay evaluation",
          "Paired comparison",
          "Critical incidents",
          "Checklist method"
        ],
        "correctAnswer": "Paired comparison",
        "explanation": "Paired comparison is a relative, multiple-person evaluation technique where each employee's performance is compared directly against every other peer in the group."
      },
      {
        "question": "85. Which performance appraisal method uses specific, observable behavioural examples as anchors to define different levels of employee performance?",
        "options": [
          "KRA",
          "BARS",
          "MBO",
          "HRA"
        ],
        "correctAnswer": "BARS",
        "explanation": "Behaviorally Anchored Rating Scales (BARS) combine qualitative critical incidents with quantitative ratings by using specific behavioral examples as numerical anchors."
      },
      {
        "question": "86. 360-degree appraisal mainly provides:",
        "options": [
          "confidential anonymous feedback",
          "annual tax computation records",
          "product development estimates",
          "inventory utilization statistics"
        ],
        "correctAnswer": "confidential anonymous feedback",
        "explanation": "360-degree appraisal gathers multisource feedback from peers, subordinates, supervisors, and internal customers, typically anonymized to ensure candid input."
      },
      {
        "question": "87. If innovation is a company’s strategic objective, performance standards should include metrics related to:",
        "options": [
          "administrative hierarchy",
          "employee attendance frequency",
          "new ideas and implemented projects",
          "warehouse inventory movement"
        ],
        "correctAnswer": "new ideas and implemented projects",
        "explanation": "Performance metrics should align directly with strategic priorities; for an innovation-led strategy, metrics measure idea generation, patent filings, and successful project rollouts."
      },
      {
        "question": "88. InnovateTech included participation in cross-functional ________ as part of performance standards.",
        "options": [
          "outsourcing",
          "auditing",
          "training",
          "marketing"
        ],
        "correctAnswer": "training",
        "explanation": "Cross-functional training participation enhances organizational versatility and collaborative problem-solving, making it a key performance standard criterion."
      },
      {
        "question": "89. Quantitative criteria include measurable factors such as sales figures and project completion ________.",
        "options": [
          "behaviors",
          "policies",
          "attitudes",
          "times"
        ],
        "correctAnswer": "times",
        "explanation": "Project completion time (duration/deadlines) and sales figures are objective, quantifiable performance metrics, unlike subjective traits or attitudes."
      },
      {
        "question": "90. Intentional performance rating distortion refers to:",
        "options": [
          "deliberate manipulation of ratings",
          "accidental system calculation errors",
          "technological communication failures",
          "legal auditing inconsistencies"
        ],
        "correctAnswer": "deliberate manipulation of ratings",
        "explanation": "Intentional rating distortion occurs when raters consciously inflate or deflate employee ratings for political reasons, impression management, or avoiding conflict."
      },
      {
        "question": "91. In the balanced score approach, return on equity is classified as a:",
        "options": [
          "behavioral indicator",
          "lag indicator",
          "recruitment indicator",
          "training indicator"
        ],
        "correctAnswer": "lag indicator",
        "explanation": "Return on equity (ROE) is a financial output metric reflecting past activities and historical performance, making it a classic lag indicator in the Balanced Scorecard framework."
      },
      {
        "question": "92. The 9 Box Matrix evaluates potential rating and:",
        "options": [
          "compensation ratio",
          "training frequency",
          "attendance score",
          "performance rating"
        ],
        "correctAnswer": "performance rating",
        "explanation": "The 9-Box Grid is a classic talent management tool that plots employee current performance rating on one axis against future potential rating on the other."
      },
      {
        "question": "93. State True and False On-time delivery was identified as a lead indicator for customers.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanation": "On-time delivery drives subsequent customer satisfaction and repeat business, serving as a leading indicator of customer loyalty and retention."
      },
      {
        "question": "94. Product defect rate and unit product cost were categorized under:",
        "options": [
          "internal business processes",
          "external customer relations",
          "workforce engagement",
          "strategic compensation planning"
        ],
        "correctAnswer": "internal business processes",
        "explanation": "In the Balanced Scorecard, manufacturing quality (defect rate) and cost efficiency belong to the Internal Business Process perspective."
      },
      {
        "question": "95. Motivation, ability, and opportunity are analyzed in order to identify:",
        "options": [
          "compensation structures",
          "causes of underperformance",
          "recruitment procedures",
          "leadership succession plans"
        ],
        "correctAnswer": "causes of underperformance",
        "explanation": "The AMO (Ability, Motivation, Opportunity) model is used to diagnose root causes of individual employee performance issues or underperformance."
      },
      {
        "question": "96. Variable pay includes bonuses, incentives, and stock ________.",
        "options": [
          "exchange",
          "allocation",
          "option",
          "planning"
        ],
        "correctAnswer": "option",
        "explanation": "Variable compensation comprises performance bonuses, commissions, profit sharing, and equity-based long-term incentives like stock options."
      },
      {
        "question": "97. Which of the following is classified as a non-financial reward?",
        "options": [
          "retirement pension",
          "family picnic",
          "performance bonus",
          "stock option"
        ],
        "correctAnswer": "family picnic",
        "explanation": "Social events, recognition certificates, and company picnics provide relational and symbolic value, classifying them as non-financial rewards."
      },
      {
        "question": "98. Skills Gap Analysis identifies differences between current workforce skills and:",
        "options": [
          "transportation requirements",
          "inventory classifications",
          "future organizational needs",
          "taxation regulations"
        ],
        "correctAnswer": "future organizational needs",
        "explanation": "Skills gap analysis benchmarks existing workforce capabilities against projected future skills demanded by the organization's strategic goals."
      },
      {
        "question": "99. DEI stands for Diversity, Equity, and:",
        "options": [
          "Integrity",
          "Investment",
          "Innovation",
          "Inclusion"
        ],
        "correctAnswer": "Inclusion",
        "explanation": "DEI stands for Diversity, Equity, and Inclusion in modern human resources and organizational development."
      },
      {
        "question": "100. Compensation philosophy mainly defines the organization’s:",
        "options": [
          "transportation infrastructure",
          "employee value proposition",
          "taxation reporting mechanism",
          "warehouse planning strategy"
        ],
        "correctAnswer": "employee value proposition",
        "explanation": "An organization's compensation philosophy articulates its strategy for attracting, motivating, and retaining talent through its core Employee Value Proposition (EVP)."
      },
      {
        "question": "101. Pay mix policies included analysis of base wage, benefits, and:",
        "options": [
          "transportation allowance",
          "long-term incentives",
          "taxation credits",
          "inventory rewards"
        ],
        "correctAnswer": "long-term incentives",
        "explanation": "A complete total rewards pay mix encompasses base pay, short- and long-term incentives, and employee benefits."
      },
      {
        "question": "102. State true and false Job evaluation points are linked with compensation and benefits amounts.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanation": "Job evaluation points establish relative internal job worth, which directly determines salary grades and compensation bands."
      },
      {
        "question": "103. Compensation matrices primarily help organizations align compensation with:",
        "options": [
          "job worth and evaluation points",
          "warehouse efficiency",
          "taxation compliance",
          "transportation scheduling"
        ],
        "correctAnswer": "job worth and evaluation points",
        "explanation": "Compensation matrices align pay ranges and merit increase distributions with evaluated job worth and performance levels."
      },
      {
        "question": "104. Impact of pay increase on employees compared old employees with:",
        "options": [
          "contractual workers",
          "consultants",
          "new employees",
          "interns"
        ],
        "correctAnswer": "new employees",
        "explanation": "Pay increase impact analyses examine internal equity and salary compression by comparing tenured (old) employees with newly hired employees."
      },
      {
        "question": "105. Quartile-wise salary analysis is mainly used for identifying:",
        "options": [
          "supply chain gaps",
          "pay-gap patterns",
          "transportation inefficiencies",
          "inventory shortages"
        ],
        "correctAnswer": "pay-gap patterns",
        "explanation": "Quartile-wise distribution analysis identifies internal wage discrepancies, demographic pay gaps, and salary compression."
      },
      {
        "question": "106. Employee benefit analysis included retirement plans and:",
        "options": [
          "transportation insurance",
          "taxation assistance",
          "warehouse maintenance",
          "wellness programs"
        ],
        "correctAnswer": "wellness programs",
        "explanation": "Comprehensive benefits packages typically pair traditional retirement plans with health and employee wellness programs."
      },
      {
        "question": "107. Work attendance was one qualifying criterion for ________ incentive plans.",
        "options": [
          "departmental",
          "individual",
          "regional",
          "operational"
        ],
        "correctAnswer": "individual",
        "explanation": "Individual incentive plans frequently require meeting baseline attendance and punctuality thresholds before bonuses are paid."
      },
      {
        "question": "108. Companywide incentive plans may be linked to operational efficiency and:",
        "options": [
          "transportation expenses",
          "office maintenance",
          "employee stock earnings",
          "inventory movement"
        ],
        "correctAnswer": "employee stock earnings",
        "explanation": "Enterprise-wide incentive schemes (such as profit-sharing and ESOPs) align employee rewards with overall company operational efficiency and stock performance."
      },
      {
        "question": "109. Compa Ratio is calculated using employee pay rate and:",
        "options": [
          "pay range midpoint",
          "annual tax rate",
          "transportation allowance",
          "inventory value"
        ],
        "correctAnswer": "pay range midpoint",
        "explanation": "Compa-Ratio is calculated as (Actual Salary / Pay Range Midpoint), measuring where an employee sits relative to market reference pay."
      },
      {
        "question": "110. Hiring management trainees was suggested to build a talent ________.",
        "options": [
          "network",
          "matrix",
          "pipeline",
          "database"
        ],
        "correctAnswer": "pipeline",
        "explanation": "Management trainee programs systematically develop entry-level high-potential candidates to build a steady talent pipeline for future leadership roles."
      },
      {
        "question": "111. Which statement best explains the role of Tableau in HR Analytics?",
        "options": [
          "It primarily stores employee records",
          "It converts data into visual analytical insights",
          "It primarily manages employee communication",
          "It primarily develops organizational websites"
        ],
        "correctAnswer": "It converts data into visual analytical insights",
        "explanation": "Tableau is a leading data visualization tool that transforms raw HR datasets into intuitive dashboards and visual insights."
      },
      {
        "question": "112. True OR False Tableau can work with information obtained from different types of data sources.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanation": "Tableau natively connects to a wide variety of data sources including spreadsheets, relational SQL databases, cloud warehouses, and flat files."
      },
      {
        "question": "113. Which visualization would be most suitable for comparing values across different departments?",
        "options": [
          "Scatter Plot",
          "Text Document",
          "Bar Chart",
          "Data Table"
        ],
        "correctAnswer": "Bar Chart",
        "explanation": "Bar charts are optimal for comparing discrete numerical metrics across categorical groups such as departments."
      },
      {
        "question": "114. The calculation of an average joining delay across employees is an example of:",
        "options": [
          "Data connection",
          "Data aggregation",
          "Data extraction",
          "Data formatting"
        ],
        "correctAnswer": "Data aggregation",
        "explanation": "Calculating summary statistics like averages, totals, and counts across individual records is called data aggregation."
      },
      {
        "question": "115. Which feature makes Tableau particularly useful for exploring complex datasets?",
        "options": [
          "Fixed reporting structure",
          "Manual data entry process",
          "Static document preparation",
          "Interactive visual exploration"
        ],
        "correctAnswer": "Interactive visual exploration",
        "explanation": "Tableau provides interactive visual exploration, enabling users to filter, slice, drill down, and discover insights in complex datasets."
      },
      {
        "question": "116. Which situation represents multidimensional analysis?",
        "options": [
          "Examining one variable in isolation",
          "Viewing one employee record at a time",
          "Comparing data across several dimensions",
          "Studying information in a single fixed view"
        ],
        "correctAnswer": "Comparing data across several dimensions",
        "explanation": "Multidimensional analysis involves evaluating metrics across multiple attributes simultaneously, such as department, job band, gender, and performance level."
      },
      {
        "question": "117. A worksheet in Tableau is best understood as:",
        "options": [
          "A collection of connected data sources",
          "An individual analytical view of data",
          "A collection of multiple dashboards",
          "A storage system for employee records"
        ],
        "correctAnswer": "An individual analytical view of data",
        "explanation": "In Tableau, a worksheet contains a single chart or data view, which can subsequently be assembled with other views into dashboards."
      },
      {
        "question": "118. What is the primary benefit of presenting aggregated HR data visually?",
        "options": [
          "It increases the number of employee records",
          "It eliminates the need for source data",
          "It makes patterns and comparisons easier to interpret",
          "It prevents users from exploring the underlying data"
        ],
        "correctAnswer": "It makes patterns and comparisons easier to interpret",
        "explanation": "Visual charts facilitate rapid pattern recognition, comparative analysis, and trend identification compared to raw numbers."
      },
      {
        "question": "119. What is the main purpose of creating a calculated field in Tableau?",
        "options": [
          "To create a new variable using existing information",
          "To delete existing variables from the dataset",
          "To replace the original data source completely",
          "To convert every variable into a graphical format"
        ],
        "correctAnswer": "To create a new variable using existing information",
        "explanation": "A calculated field allows users to generate new variables and customized metrics by applying mathematical or logical formulas to existing data."
      },
      {
        "question": "120. Which Tableau function is appropriate for finding the difference between two dates?",
        "options": [
          "DATEADD",
          "DATENAME",
          "DATEPART",
          "DATEDIFF"
        ],
        "correctAnswer": "DATEDIFF",
        "explanation": "The DATEDIFF function calculates the difference between two date fields in terms of specified units such as days, months, or years."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-1",
    "title": "DLNLP Assignment 1 Solution",
    "subject": "DLNLP",
    "date": "09/10/2026",
    "questions": [
      {
        "question": "1. A bigram model approximates P(w_i | w_1, ..., w_{i-1}) as:",
        "options": [
          "P(w_i)",
          "P(w_i | w_{i-1})",
          "P(w_i | w_{i-1}, w_{i-2})",
          "P(w_{i-1} | w_i)"
        ],
        "correctAnswer": "P(w_i | w_{i-1})",
        "explanation": "The (first-order) Markov assumption underlying a bigram model conditions each word only on the single previous word."
      },
      {
        "question": "2. Using the reference confusion matrix, what is the overall accuracy of the model?\n\n| | Predicted Positive | Predicted Negative |\n|---|---|---|\n| Actual Positive | 40 | 10 |\n| Actual Negative | 20 | 30 |",
        "options": [
          "0.6",
          "0.67",
          "0.70",
          "0.75"
        ],
        "correctAnswer": "0.70",
        "explanation": "Accuracy = (TP + TN) / Total = (40 + 30) / (40 + 10 + 20 + 30) = 70 / 100 = 0.70."
      },
      {
        "question": "3. A test set W = w_1 w_2 (N = 2 words) has model probabilities P(w_1) = 1/2 and P(w_2) = 1/8. What is the perplexity PP(W)? Assume the word choices are conditionally independent.",
        "options": [
          "4",
          "2",
          "8",
          "16"
        ],
        "correctAnswer": "4",
        "explanation": "Perplexity PP(W) = P(w_1 w_2)^(-1/N) = (P(w_1) * P(w_2))^(-1/2) = (1/2 * 1/8)^(-1/2) = (1/16)^(-1/2) = sqrt(16) = 4."
      },
      {
        "question": "4. Word embeddings (e.g., from Word2Vec or the embedding layer of an LLM) are useful primarily because they:",
        "options": [
          "Reduce all words to a single scalar value",
          "Guarantee zero probability for unseen words",
          "Represent words as dense vectors capturing semantic and syntactic similarity",
          "Eliminate the need for training data"
        ],
        "correctAnswer": "Represent words as dense vectors capturing semantic and syntactic similarity",
        "explanation": "Embeddings map words to dense continuous vectors so that semantically and syntactically related words lie close together in vector space, unlike sparse one-hot representations."
      },
      {
        "question": "5. In a corpus, the bigram \"and the\" occurs 2 times, the unigram \"and\" occurs 48 times, and the vocabulary size is V = 500. Under Add-1 smoothing, P(\"the\" | \"and\") is approximately:",
        "options": [
          "0.0055",
          "0.0417",
          "0.0020",
          "0.5000"
        ],
        "correctAnswer": "0.0055",
        "explanation": "P_Add-1(w_2 | w_1) = (C(w_1, w_2) + 1) / (C(w_1) + V) = (2 + 1) / (48 + 500) = 3 / 548 ≈ 0.0055."
      },
      {
        "question": "6. Consider the training corpus (with sentence boundaries):\n<s> the cat runs </s>\n<s> the dog runs </s>\n<s> the cat sleeps </s>\n\nUsing MLE, what is the bigram probability P(cat | the)?",
        "options": [
          "1/3",
          "1/2",
          "2/3",
          "1"
        ],
        "correctAnswer": "2/3",
        "explanation": "\"the\" occurs 3 times. It is followed by \"cat\" twice and \"dog\" once. P(cat | the) = count(the, cat) / count(the) = 2/3."
      },
      {
        "question": "7. What is the effect of Add-1 smoothing on the relative probabilities of a frequent word pair versus an infrequent word pair?",
        "options": [
          "It widens the gap between their probabilities",
          "It narrows (compresses) the gap between their probabilities, moving both toward a more uniform distribution",
          "It leaves all relative probabilities unchanged",
          "It sets both probabilities exactly equal"
        ],
        "correctAnswer": "It narrows (compresses) the gap between their probabilities, moving both toward a more uniform distribution",
        "explanation": "By uniformly adding 1 to every count, Add-1 smoothing takes a large amount of probability mass from high-count pairs and gives it to low/zero-count pairs, compressing the gap between frequent and infrequent pairs (it can over-smooth)."
      },
      {
        "question": "8. In corpus C, the bigram probability P(paper | question) = 0.25 and count(\"question\") = 800. If the vocabulary size is V = 1000, what is P(paper | question) after Add-1 smoothing?",
        "options": [
          "0.112",
          "0.250",
          "0.100",
          "0.212"
        ],
        "correctAnswer": "0.112",
        "explanation": "C(question, paper) = P(paper | question) * C(question) = 0.25 * 800 = 200. P_Add-1(paper | question) = (C(w_1, w_2) + 1) / (C(w_1) + V) = (200 + 1) / (800 + 1000) = 201 / 1800 ≈ 0.112."
      },
      {
        "question": "9. Why do unigram models perform especially poorly in the Shannon \"predict the next word\" game (e.g., \"For breakfast I ate my usual ___\")?",
        "options": [
          "Because unigrams overfit long contexts",
          "Because unigrams require the entire vocabulary to be labeled",
          "Because unigrams ignore all preceding words and predict based only on individual word frequencies",
          "Because unigrams cannot assign probabilities at all"
        ],
        "correctAnswer": "Because unigrams ignore all preceding words and predict based only on individual word frequencies",
        "explanation": "A unigram model assigns probabilities to words independent of context. Since it ignores the preceding words entirely, it cannot use the context that makes the next word predictable, so it is terrible at next-word prediction."
      },
      {
        "question": "10. A unigram language model that treats all words as equally likely achieves a perplexity of 100 on a test set. What is the probability the model assigns to each individual word?",
        "options": [
          "0.01",
          "0.001",
          "0.1",
          "1.0"
        ],
        "correctAnswer": "0.01",
        "explanation": "For equal probabilities, perplexity PP(W) = V = 100. The probability assigned to each individual word is P(w) = 1 / V = 1 / 100 = 0.01."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-2",
    "title": "DLNLP Assignment 2 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. A shallow ReLU network has hidden pre-activations z = Wx + b with W = [[1, −1], [2, 1], [−1, 1]] and b = [0, −3, 1]. The hidden activations h = ReLU(z) feed an output y = vᵀh with v = [1, 2, 1] and no output bias. For the input x = [1, 2], what is y?",
        "options": [
          "0",
          "2",
          "4",
          "6"
        ],
        "correctAnswer": "4",
        "explanation": "Pre-activations: z₁ = 1(1) + (−1)(2) + 0 = −1; z₂ = 2(1) + 1(2) − 3 = 1; z₃ = −1(1) + 1(2) + 1 = 2. After ReLU: h = [0, 1, 2] (the first unit is switched off). Output: y = 1(0) + 2(1) + 1(2) = 4."
      },
      {
        "question": "2. A single hidden unit computes h = ReLU(wx + b) with w = −2, b = 1, evaluated at x = 3. What is ∂h/∂w at this input?",
        "options": [
          "3",
          "0",
          "-2",
          "-6"
        ],
        "correctAnswer": "0",
        "explanation": "Pre-activation = wx + b = (−2)(3) + 1 = −5 < 0, so the ReLU is in its flat region and h = 0. The derivative of ReLU is 0 for negative pre-activations, hence ∂h/∂w = 0 × x = 0 (dead ReLU)."
      },
      {
        "question": "3. A softmax output layer receives the logits [2, 1, 0]. If the correct class is the first one, what is the cross-entropy loss (using natural logarithm)?",
        "options": [
          "0.335",
          "0.408",
          "0.665",
          "1.407"
        ],
        "correctAnswer": "0.408",
        "explanation": "exp(2) = 7.389, exp(1) = 2.718, exp(0) = 1.000; sum = 11.107. Softmax probabilities = [0.665, 0.245, 0.090]. Loss = −ln(0.665) = 0.408."
      },
      {
        "question": "4. A network with a single weight w produces the output y = w³, and the loss is L = ½(y − t)² with target t = 5. If the current value is w = 2, what is ∂L/∂w?",
        "options": [
          "12",
          "24",
          "36",
          "108"
        ],
        "correctAnswer": "36",
        "explanation": "y = w³ = 8. ∂L/∂y = y − t = 8 − 5 = 3. ∂y/∂w = 3w² = 3(4) = 12. By the chain rule, ∂L/∂w = (y − t) · 3w² = 3 × 12 = 36."
      },
      {
        "question": "5. Gradient descent is run on L(w) = w² − 4w + 3 starting from w₀ = 4 with learning rate η = 0.1. What is the value of w after TWO updates?",
        "options": [
          "3.28",
          "3.60",
          "3.40",
          "2.21"
        ],
        "correctAnswer": "3.28",
        "explanation": "∂L/∂w = 2w − 4. Step 1: gradient = 2(4) − 4 = 4, so w₁ = 4 − 0.1(4) = 3.6. Step 2: gradient = 2(3.6) − 4 = 3.2, so w₂ = 3.6 − 0.1(3.2) = 3.28."
      },
      {
        "question": "6. A model is trained on 50,000 examples using mini-batch stochastic gradient descent with a batch size of 250, for 12 epochs. How many parameter updates are performed in total?",
        "options": [
          "200",
          "600",
          "2400",
          "600000"
        ],
        "correctAnswer": "2400",
        "explanation": "Updates per epoch = 50,000 / 250 = 200. Total updates = 200 × 12 = 2,400."
      },
      {
        "question": "7. For the function f(w₁, w₂) = w₁² − w₂², the gradient vanishes at the origin. What kind of stationary point is the origin?",
        "options": [
          "A global minimum",
          "A local maximum",
          "A local minimum that is not global",
          "A saddle point"
        ],
        "correctAnswer": "A saddle point",
        "explanation": "Along w₁, f = w₁² has a minimum at 0; along w₂, f = −w₂² has a maximum at 0. The Hessian is diag(2, −2) with eigenvalues of opposite sign, meaning the origin is a saddle point."
      },
      {
        "question": "8. Using the least squares loss L = (1/N) Σᵢ (yᵢ − ŷᵢ)² with ŷ = wx + b, evaluate the loss for x = [1, 2, 3, 4], y = [3, 5, 7, 10], w = 2 and b = 1.",
        "options": [
          "0.00",
          "0.25",
          "0.50",
          "1.00"
        ],
        "correctAnswer": "0.25",
        "explanation": "Predictions = [3, 5, 7, 9]; residuals = [0, 0, 0, 1]. Sum of squared residuals = 1; dividing by N = 4 gives L = 0.25."
      },
      {
        "question": "9. A linear regression model predicts 3 real-valued outputs from 100 input features, with a separate bias for each output. How many parameters must be learned?",
        "options": [
          "303",
          "103",
          "300",
          "309"
        ],
        "correctAnswer": "303",
        "explanation": "The weight matrix has 100 × 3 = 300 entries and there are 3 bias terms. Total = 300 + 3 = 303 parameters."
      },
      {
        "question": "10. Which of the following statements is FALSE?",
        "options": [
          "A shallow network with sufficiently many hidden units can approximate any continuous function on a compact subset of Rᴰ to arbitrary precision.",
          "The universal approximation theorem guarantees that gradient descent will find the parameters achieving that approximation.",
          "Increasing the number of hidden units increases the number of linear regions a ReLU network can represent.",
          "The universal approximation theorem gives no practical bound on how many hidden units are required for a given function."
        ],
        "correctAnswer": "The universal approximation theorem guarantees that gradient descent will find the parameters achieving that approximation.",
        "explanation": "The universal approximation theorem is an existence/representational result; it does not guarantee that gradient descent or any optimization algorithm can actually find those parameters."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-3",
    "title": "DLNLP Assignment 3 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Match each situation to the most appropriate family of cross-lingual embedding model (each family used at most once):\n(a) Large monolingual corpora for both languages plus a dictionary of about 5,000 translated frequent words, but no parallel sentences.\n(b) Only topic-aligned encyclopaedia articles: no dictionary, no sentence alignments, no word alignments.\n(c) A moderate sentence-aligned parallel corpus without word alignments, plus a very large monolingual corpus for the high-resource language only.",
        "options": [
          "(a) monolingual mapping, (b) pseudo-cross-lingual training, (c) joint optimization.",
          "(a) joint optimization, (b) cross-lingual training, (c) monolingual mapping.",
          "(a) pseudo-cross-lingual training, (b) monolingual mapping, (c) cross-lingual training.",
          "(a) cross-lingual training, (b) joint optimization, (c) pseudo-cross-lingual training."
        ],
        "correctAnswer": "(a) monolingual mapping, (b) pseudo-cross-lingual training, (c) joint optimization.",
        "explanation": "(a) Monolingual mapping learns word embeddings on monolingual corpora then learns a linear map via a bilingual dictionary. (b) Pseudo-cross-lingual creates mixed contexts via merge-and-shuffle on document-aligned data. (c) Joint optimization (such as BilBOWA) jointly optimizes monolingual and cross-lingual sentence-mean objectives."
      },
      {
        "question": "2. A Skip-gram model with full softmax has two-dimensional embeddings and vocabulary V = {river, delta, silt, ledger, audit}. The target (centre) vector of river is vriver = (2, 1) and the context vectors are uriver = (0.5, −1), udelta = (1, 0), usilt = (0, 1), uledger = (−1, 1), uaudit = (−0.5, 0), with P(o | c) = exp(u_o^T v_c) / Σ exp(u_w^T v_c). Using e^0 = 1, e^1 = 2.718, e^2 = 7.389, e^{-1} = 0.368, with river as the centre word, what are P(delta | river) and P(silt | river)?",
        "options": [
          "0.240 and 0.510",
          "0.500 and 0.250",
          "0.230 and 0.624",
          "0.624 and 0.230"
        ],
        "correctAnswer": "0.624 and 0.230",
        "explanation": "Scores: river: 0, delta: 2, silt: 1, ledger: -1, audit: -1. Denominator = 1 + 7.389 + 2.718 + 0.368 + 0.368 = 11.843. P(delta|river) = 7.389 / 11.843 = 0.624, P(silt|river) = 2.718 / 11.843 = 0.230."
      },
      {
        "question": "3. A corpus consists of exactly two sentences: “solar panels charge the battery” and “wind turbines spin”. Skip-gram pairs use a window of 2 words on each side of the target, truncated at sentence boundaries. How many (target, context) pairs are produced in total, and how many have charge as the target?",
        "options": [
          "32 pairs; 4 with charge as target.",
          "20 pairs; 4 with charge as target.",
          "20 pairs; 2 with charge as target.",
          "14 pairs; 4 with charge as target."
        ],
        "correctAnswer": "20 pairs; 4 with charge as target.",
        "explanation": "Sentence 1 positions: 2, 3, 4, 3, 2 = 14 pairs. Sentence 2 positions: 2, 2, 2 = 6 pairs. Grand total = 20 pairs. 'charge' has position 3 with full ±2 context, yielding 4 pairs: (solar, panels, the, battery)."
      },
      {
        "question": "4. A linear mapping W projects source-language embeddings into target-language space, minimising Σ ∥Wxi − zi∥². With W = [[0.5, 1], [1, -0.5]], xlibro = (2, 1)^T, and candidates zbook = (1.8, 1.6)^T, zbridge = (2.5, 0.5)^T, zhouse = (1.5, 1.0)^T: Which option correctly gives the mapped vector, squared Euclidean distances, and nearest target vector?",
        "options": [
          "Wx = (2, 1.5); d²_book = 1.25, d²_bridge = 0.05, d²_house = 0.50 ⇒ bridge.",
          "Wx = (2, 1.5); d²_book = 0.05, d²_bridge = 1.25, d²_house = 0.50 ⇒ book.",
          "Wx = (1, −0.5); d²_book = 5.05, d²_bridge = 3.25, d²_house = 2.50 ⇒ house.",
          "Wx = (2, 1.5); d²_book = 0.50, d²_bridge = 1.25, d²_house = 0.05 ⇒ house."
        ],
        "correctAnswer": "Wx = (2, 1.5); d²_book = 0.05, d²_bridge = 1.25, d²_house = 0.50 ⇒ book.",
        "explanation": "Wx = [0.5(2)+1(1), 1(2)-0.5(1)]^T = [2, 1.5]^T. d²_book = (0.2)² + (-0.1)² = 0.05; d²_bridge = (-0.5)² + (1.0)² = 1.25; d²_house = (0.5)² + (0.5)² = 0.50. Closest is book."
      },
      {
        "question": "5. A bilingual model trains on aligned sentence pairs by minimising the squared Euclidean distance between the means of their word vectors. A source sentence has three words with vectors (1, 2), (3, 0), (2, 1); the aligned target sentence has two words with vectors (1, 2) and (3, 1). What are the two means and the loss?",
        "options": [
          "Means (2, 1) and (2, 1.5); loss = 0.5.",
          "Means (2, 1) and (4, 3); loss = 8.0.",
          "Means (2, 1) and (2, 1.5); loss = 0.25.",
          "Means (6, 3) and (4, 3); loss = 4.0."
        ],
        "correctAnswer": "Means (2, 1) and (2, 1.5); loss = 0.25.",
        "explanation": "Source mean = ((1+3+2)/3, (2+0+1)/3) = (2, 1). Target mean = ((1+3)/2, (2+1)/2) = (2, 1.5). Difference = (0, -0.5), so squared Euclidean distance = 0² + (-0.5)² = 0.25."
      },
      {
        "question": "6. In Skip-gram with negative sampling, vharbour = (1, 2), uwharf = (1, 0.5) (positive), urecipe = (−1, 0) and usprint = (0, 0.5) (negatives). With σ(2) = 0.881, σ(1) = 0.731, σ(−1) = 0.269, log 0.881 = −0.127, log 0.731 = −0.313, log 0.269 = −1.313: What are the three loss terms, the total, and the required update?",
        "options": [
          "0.127, 1.313, 0.313; L = 1.753; recipe contributes more, and the update must decrease u_recipe^T v_harbour.",
          "0.127, 0.313, 1.313; L = 1.753; sprint contributes more, and the update must decrease u_sprint^T v_harbour and increase u_wharf^T v_harbour.",
          "0.881, 0.731, 0.269; L = 1.881; wharf contributes most, since it is the positive example.",
          "0.127, 0.313, 1.313; L = 1.753; sprint contributes more, and the update must increase u_sprint^T v_harbour so that the model can tell the two negatives apart."
        ],
        "correctAnswer": "0.127, 0.313, 1.313; L = 1.753; sprint contributes more, and the update must decrease u_sprint^T v_harbour and increase u_wharf^T v_harbour.",
        "explanation": "Dot products: wharf = 2, recipe = -1, sprint = 1. Losses: positive = -log σ(2) = 0.127; recipe = -log σ(1) = 0.313; sprint = -log σ(-1) = 1.313. Total L = 1.753. Sprint dominates and needs to be pushed further away while wharf is pulled closer."
      },
      {
        "question": "7. A team builds sparse word vectors from a 40,000-token corpus of gardening articles. Each word is an 8,000-dimensional PPMI vector. The near-synonyms spade and shovel each occur ~60 times, yet their vectors share only 2 non-zero dimensions and have cosine similarity 0.04. What is the cause, and which remedy addresses it?",
        "options": [
          "The distributional hypothesis fails for synonyms; widen the context window",
          "PPMI over-weights frequent contexts; switch to raw co-occurrence counts",
          "The vectors are too sparse to share dimensions; learn short dense vectors",
          "Cosine is unreliable on sparse vectors; use the unnormalised dot product"
        ],
        "correctAnswer": "The vectors are too sparse to share dimensions; learn short dense vectors",
        "explanation": "Because each word occurs only ~60 times in a small window, their contexts are severely undersampled across 8,000 sparse dimensions. Learning short dense vectors (e.g. Word2Vec/GloVe or SVD) collapses related context dimensions into shared latent factors."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-4",
    "title": "DLNLP Assignment 4 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Which statement comparing greedy decoding and beam search is TRUE?",
        "options": [
          "Greedy decoding is the special case of beam search with beam width k = 1, and both are deterministic.",
          "Beam search is a stochastic decoding strategy, whereas greedy decoding is deterministic.",
          "Beam search with any k > 1 is guaranteed to return the globally optimal sequence.",
          "Greedy decoding maximises the total sequence log-probability by construction."
        ],
        "correctAnswer": "Greedy decoding is the special case of beam search with beam width k = 1, and both are deterministic.",
        "explanation": "Greedy decoding maintains exactly one best hypothesis at each step (beam width k = 1) and both methods are deterministic (unlike temperature sampling)."
      },
      {
        "question": "2. A named-entity recognition system must recognise 7 distinct entity types and uses the BIO tagging scheme. How many distinct tags does the per-token classifier have to choose from?",
        "options": [
          "7",
          "14",
          "15",
          "16"
        ],
        "correctAnswer": "15",
        "explanation": "BIO tagging requires a B-tag and an I-tag for each entity type, plus one shared O (Outside) tag: 2n + 1 = 2(7) + 1 = 15 tags."
      },
      {
        "question": "3. An RNN language model is trained on a 4-token sequence. At the four timesteps it assigns the following probabilities to the correct next token: 0.5, 0.25, 0.125, 0.0625. Using logarithms to base 2, what is the average cross-entropy loss per token?",
        "options": [
          "0.625",
          "1.25",
          "2.5",
          "10"
        ],
        "correctAnswer": "2.5",
        "explanation": "-log2(0.5) = 1; -log2(0.25) = 2; -log2(0.125) = 3; -log2(0.0625) = 4. Sum = 10 bits. Average = 10 / 4 = 2.5 bits per token."
      },
      {
        "question": "4. A sequence-to-sequence model with dot-product attention translates a source sentence of 12 tokens into a target sentence of 9 tokens. How many attention weights α_ij are computed in total over the whole decoding process?",
        "options": [
          "12",
          "21",
          "9",
          "108"
        ],
        "correctAnswer": "108",
        "explanation": "At each of the 9 decoder steps, 12 attention weights (one per source token) are computed: 9 × 12 = 108 attention weights."
      },
      {
        "question": "5. A Bi-LSTM is used for NER. Word embeddings are 100-dimensional; the forward and backward LSTMs each have a hidden state of 64 dimensions. There are 4 entity types and the BIO scheme is used. The output layer is applied to the concatenated hidden state. How many parameters must be trained, excluding biases and excluding the embedding table?",
        "options": [
          "85120",
          "43136",
          "84544",
          "83968"
        ],
        "correctAnswer": "85120",
        "explanation": "Tags = 2(4) + 1 = 9. Per LSTM direction: 4 gates × (64×100 + 64×64) = 4 × 10,496 = 41,984. Both directions: 2 × 41,984 = 83,968. Output projection on concatenated 128 hidden state: 9 × 128 = 1,152. Total = 83,968 + 1,152 = 85,120."
      },
      {
        "question": "6. A sequence-to-sequence RNN with dot-product attention has 3 encoder hidden states (2-dimensional): h_1 = [2, 0], h_2 = [0, 2], h_3 = [1, 1] and the relevant decoder hidden state is h^d_{i-1} = [1, −1]. Which is the resulting context vector c_i (to 2 decimal places)?",
        "options": [
          "[1.85, 0.15]",
          "[1.00, 0.33]",
          "[0.15, 1.85]",
          "[1.50, 0.50]"
        ],
        "correctAnswer": "[1.85, 0.15]",
        "explanation": "Scores: h^d · h_1 = 2, h^d · h_2 = -2, h^d · h_3 = 0. Softmax over [2, -2, 0] gives α ≈ [0.867, 0.016, 0.117]. Context vector c_i = 0.867[2, 0] + 0.016[0, 2] + 0.117[1, 1] ≈ [1.85, 0.15]."
      },
      {
        "question": "7. A machine-translation system uses an RNN encoder–decoder with dot-product attention. Source vocab = 30,000, target vocab = 20,000, embeddings = 200d, encoder & decoder hidden states = 150d. Counting both embedding tables, both recurrent units, and the output projection (ignoring biases), how many parameters are there in total?",
        "options": [
          "9,105,000",
          "13,105,000",
          "13,405,000",
          "10,105,000"
        ],
        "correctAnswer": "13,105,000",
        "explanation": "Source embeddings: 30,000 × 200 = 6M. Encoder W & U: 150×200 + 150×150 = 52,500. Target embeddings: 20,000 × 200 = 4M. Decoder W & U: 150×200 + 150×150 = 52,500. Output projection: 20,000 × 150 = 3M. Total = 6M + 52,500 + 4M + 52,500 + 3M = 13,105,000."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-5",
    "title": "DLNLP Assignment 5 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. An encoder–decoder Transformer translates a 6-token source to a 5-token target. Consider the two attention sub-layers of one decoder block while computing representation of target position 3. Which option correctly states source of Q, K, V and visible key positions?",
        "options": [
          "Masked self-attention: Q from the decoder, K, V from the encoder output; 3 visible positions. Cross-attention: Q, K, V all from the encoder; 6 visible positions.",
          "Masked self-attention: Q, K, V all from the decoder; 5 visible positions, since teacher forcing makes the whole target available. Cross-attention: Q from the encoder, K, V from the decoder; 6 visible positions.",
          "Masked self-attention: Q, K, V all from the decoder; 3 visible positions. Cross-attention: Q from the decoder, K, V from the output of the top encoder block; 6 visible positions.",
          "Masked self-attention: Q, K, V all from the decoder; 3 visible positions. Cross-attention: Q from the decoder, K, V from the top encoder block; 3 visible positions, because the same causal mask is applied there as well."
        ],
        "correctAnswer": "Masked self-attention: Q, K, V all from the decoder; 3 visible positions. Cross-attention: Q from the decoder, K, V from the output of the top encoder block; 6 visible positions.",
        "explanation": "Masked self-attention operates within the target sequence with causal mask hiding positions 4 and 5 (so 3 visible keys: 1, 2, 3). Cross-attention uses Q from the decoder and K, V from the full top encoder block (all 6 source positions visible)."
      },
      {
        "question": "2. A single-head encoder self-attention layer has dmodel = 3 and dk = dv = 2. Token embeddings are x1 = [1, 0, 1], x2 = [0, 1, 2]. Projections are WQ = [[1, 0], [0, 1], [1, 0]], WK = [[1, 1], [0, -1], [0, 1]], WV = [[2, 0], [0, 1], [0, 1]]. Scores scaled by √dk. With e^1.414 ≈ 4.113, e^0 = 1, what is the self-attention output a1 for token 1?",
        "options": [
          "[ 1.609, 1.391 ]",
          "[ 1.762, 1.238 ]",
          "[ 0.392, 2.608 ]",
          "[ 1.000, 2.000 ]"
        ],
        "correctAnswer": "[ 1.609, 1.391 ]",
        "explanation": "q1 = [2, 0]; k1 = [1, 2], k2 = [0, 1]; v1 = [2, 1], v2 = [0, 3]. Dot products: q1·k1 = 2, q1·k2 = 0. Scaled by √2: [1.414, 0]. Softmax weights: α = [0.804, 0.196]. Output a1 = 0.804[2, 1] + 0.196[0, 3] = [1.609, 1.391]."
      },
      {
        "question": "3. Two multi-head attention layers have dmodel = 96. Config A: h = 6, dq = dk = dv = 16. Config B: h = 12, dq = dk = dv = 8. Ignoring biases, what is the total number of parameters in WQ, WK, WV and WO for A and B respectively?",
        "options": [
          "27,648 and 27,648",
          "36,864 and 36,864",
          "36,864 and 73,728",
          "13,824 and 11,520"
        ],
        "correctAnswer": "36,864 and 36,864",
        "explanation": "In both configurations h × dk = 96 = dmodel. Projections cost 3 × dmodel × (h × dk) = 3 × 96 × 96 = 27,648. Output projection WO costs 96 × 96 = 9,216. Total for each = 36,864."
      },
      {
        "question": "4. A sparse mixture-of-experts layer contains E = 8 experts and routes each token independently with top-k routing, k = 2. A sequence of 6 tokens passes through the layer. How many token–expert feed-forward computations are performed, how many for Switch layer, and what fraction of all possible pairs is evaluated in the first case?",
        "options": [
          "12; 6; 25%",
          "48; 48; 100%",
          "12; 12; 25%",
          "2; 1; ≈ 4.2%"
        ],
        "correctAnswer": "12; 6; 25%",
        "explanation": "With k = 2: 6 × 2 = 12 computations. Switch layer has k = 1: 6 × 1 = 6 computations. Total possible pairs = 6 × 8 = 48, so 12 / 48 = 25%."
      },
      {
        "question": "5. In one attention head a query has dot products 2, 0 and −2 with the three keys of the sequence, and dk = 4. What is the attention distribution over the three keys?",
        "options": [
          "[ 0.867, 0.117, 0.016 ]",
          "[ 0.506, 0.307, 0.186 ]",
          "[ 0.665, 0.245, 0.090 ]",
          "[ 0.333, 0.333, 0.333 ]"
        ],
        "correctAnswer": "[ 0.665, 0.245, 0.090 ]",
        "explanation": "Scale by √dk = 2: scores become [1, 0, -1]. Softmax denominators = 2.718 + 1 + 0.368 = 4.086. Probabilities = [2.718/4.086, 1/4.086, 0.368/4.086] = [0.665, 0.245, 0.090]."
      },
      {
        "question": "6. A sequence of N = 4096 tokens is processed by a Linformer-style layer, which replaces the N × N attention-score matrix with an N × k matrix, k = 128. How many entries does each matrix contain, by what factor does the number of score entries fall, and is a 20× reduction achieved?",
        "options": [
          "16,777,216 and 524,288; a 16× reduction; the target is not met.",
          "8,388,608 and 524,288; a 16× reduction; the target is not met.",
          "16,777,216 and 16,384; a 1024× reduction; the target is met.",
          "16,777,216 and 524,288; a 32× reduction; the target is met."
        ],
        "correctAnswer": "16,777,216 and 524,288; a 32× reduction; the target is met.",
        "explanation": "N² = 4096² = 16,777,216. N × k = 4096 × 128 = 524,288. Reduction factor = N / k = 4096 / 128 = 32× (≥ 20×, target met)."
      },
      {
        "question": "7. A sparse mixture-of-experts layer has N = 4 experts with router logits (1, 2, 0, −1). Softmax gate values p = [0.237, 0.644, 0.087, 0.032], k = 2. Expert outputs: E1 = [1, 0], E2 = [0, 2], E3 = [2, 2], E4 = [-1, 1]. What are y and the output a Switch layer would produce?",
        "options": [
          "y = [ 0.237, 1.288 ]; Switch: [ 0, 1.288 ]",
          "y = [ 0.269, 1.462 ]; Switch: [ 0, 2.000 ]",
          "y = [ 0.379, 1.494 ]; Switch: [ 0, 1.288 ]",
          "y = [ 1.000, 4.000 ]; Switch: [ 0, 4.000 ]"
        ],
        "correctAnswer": "y = [ 0.237, 1.288 ]; Switch: [ 0, 1.288 ]",
        "explanation": "Top-2 experts are E2 (p2 = 0.644) and E1 (p1 = 0.237). Combined y = 0.644[0, 2] + 0.237[1, 0] = [0.237, 1.288]. Switch layer takes top-1 (E2): 0.644[0, 2] = [0, 1.288]."
      },
      {
        "question": "8. A decoder self-attention layer processes a sequence of 7 tokens; entry (i, j) of the 7 × 7 score matrix is masked whenever j > i. How many entries survive the mask, and what fraction of the corresponding encoder count is that?",
        "options": [
          "28 entries; ≈ 0.667",
          "28 entries; ≈ 0.571",
          "21 entries; ≈ 0.429",
          "49 entries; 1.000"
        ],
        "correctAnswer": "28 entries; ≈ 0.571",
        "explanation": "Sum for i=1 to 7 is 7 × 8 / 2 = 28 entries. Encoder computes 7² = 49 entries. Fraction = 28 / 49 = 4/7 ≈ 0.571."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-6",
    "title": "DLNLP Assignment 6 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. A BERT encoder is pretrained with masked language modelling on '[CLS]1 the2 technician3 [MASK]4 the5 faulty6 [MASK]7 quickly8 [SEP]9'. Which context is available when computing output at position 4, and how many loss terms does this instance contribute?",
        "options": [
          "Positions 1–3 only; nine loss terms",
          "All other positions; nine loss terms",
          "Positions 1–3 only; two loss terms",
          "All other positions; two loss terms"
        ],
        "correctAnswer": "All other positions; two loss terms",
        "explanation": "BERT self-attention is bidirectional without causal masking, so position 4 attends to all other positions. Only masked positions (4 and 7) contribute loss terms, so 2 loss terms."
      },
      {
        "question": "2. A span-based model processes an input sequence of T = 12 tokens. A span runs from start i to end j with 1 ≤ i ≤ j ≤ T, with length limit L = 4 (j − i < L). How many legal spans does the model enumerate?",
        "options": [
          "78",
          "33",
          "42",
          "48"
        ],
        "correctAnswer": "42",
        "explanation": "Lengths l in {1, 2, 3, 4}. Number of spans of length l is T - l + 1: l=1: 12, l=2: 11, l=3: 10, l=4: 9. Sum = 12 + 11 + 10 + 9 = 42."
      },
      {
        "question": "3. A BERT-based reading comprehension model uses start vector S = [1, 1] and end vector E = [1, −1]. Final representations: T1=[6, 2], T2=[2, 0], T3=[3, −3], T4=[3, −1], T5=[5, −1], T6=[3, −5]. Span score is S·Ti + E·Tj with j ≥ i and j − i < 3. Which span is predicted and its score?",
        "options": [
          "Tokens 1 to 6, with score 16",
          "Tokens 1 to 1, with score 12",
          "Tokens 1 to 3, with score 14",
          "Tokens 5 to 6, with score 12"
        ],
        "correctAnswer": "Tokens 1 to 3, with score 14",
        "explanation": "Start scores: s1=8, s2=2, s3=0, s4=2, s5=4, s6=-2. End scores: e1=4, e2=2, e3=6, e4=4, e5=6, e6=8. Under j ≥ i and j - i ≤ 2: span (1, 3) gives s1 + e3 = 8 + 6 = 14, which is the maximum legal score."
      },
      {
        "question": "4. A single T5 model is fine-tuned for two tasks: judging grammatical acceptability (2-way decision) and rating sentence pair similarity (1–5 scale). Under the text-to-text framework, how are the two outputs produced?",
        "options": [
          "Both require task-specific output heads",
          "Only generation tasks are supported",
          "Classification as text; score by regression",
          "Both are generated as literal text"
        ],
        "correctAnswer": "Both are generated as literal text",
        "explanation": "In T5's text-to-text framework, both classification decisions (e.g. 'not acceptable') and continuous scores (e.g. '3.8') are emitted directly as literal text tokens by the decoder."
      },
      {
        "question": "5. A decoder-only Transformer is pretrained on w1 w2 w3 w4 w5. Conditional probabilities: p(w2|w1)=0.5, p(w3|w1w2)=0.25, p(w4|w1..w3)=0.5, p(w5|w1..w4)=0.125. Using log2(0.5)=-1, log2(0.25)=-2, log2(0.125)=-3, what is the total negative log-likelihood of the tokens predicted by this pretraining objective?",
        "options": [
          "8",
          "7",
          "1.75",
          "3"
        ],
        "correctAnswer": "7",
        "explanation": "w1 is context-only and not predicted. The 4 predicted tokens have -log2 values: 1 + 2 + 1 + 3 = 7."
      },
      {
        "question": "6. A team continues pretraining RoBERTa on appliance e-manuals. In-domain QA improves substantially, but average GLUE score falls below the original checkpoint. Which diagnosis and remedy apply?",
        "options": [
          "Catastrophic forgetting; replace the model vocabulary",
          "Catastrophic forgetting; mix general pretraining data",
          "Overfitting to GLUE; use early stopping",
          "Curse of multilinguality; use temperature sampling"
        ],
        "correctAnswer": "Catastrophic forgetting; mix general pretraining data",
        "explanation": "Continued training on narrow in-domain data causes catastrophic forgetting of general domain capabilities. The remedy is rehearsal: mixing general pretraining data into continued pretraining."
      },
      {
        "question": "7. A 2-layer biLM produces ELMo representations with weights s0=0.1, s1=0.5, s2=0.4 and scale factor γ=2. xk=[1, 0]; h1=[2, 1, 0, 3]; h2=[1, 4, 2, 0]. What is ELMo_k?",
        "options": [
          "[1.5, 2.1, 0.9, 1.5]",
          "[2.67, 3.33, 2.00, 2.00]",
          "[2.0, 8.0, 4.0, 0.0]",
          "[3.0, 4.2, 1.8, 3.0]"
        ],
        "correctAnswer": "[3.0, 4.2, 1.8, 3.0]",
        "explanation": "h0 = [1, 0, 1, 0]. Weighted sum = 0.1[1, 0, 1, 0] + 0.5[2, 1, 0, 3] + 0.4[1, 4, 2, 0] = [1.5, 2.1, 0.9, 1.5]. Multiplied by γ=2 gives [3.0, 4.2, 1.8, 3.0]."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-7",
    "title": "DLNLP Assignment 7 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. A TF-IDF retriever uses tf(t, d) = log10(count(t, d)) + 1 and idf(t) = log10(N / df(t)). A collection has N = 10,000 documents. 'neural' occurs in df = 100 documents and 100 times inside document d. What is the tf-idf weight of 'neural' in d?",
        "options": [
          "3.0",
          "4.0",
          "6.0",
          "2.0"
        ],
        "correctAnswer": "6.0",
        "explanation": "tf = log10(100) + 1 = 3. idf = log10(10000 / 100) = log10(100) = 2. tf-idf = 3 × 2 = 6.0."
      },
      {
        "question": "2. SQuAD exact match and F1 (max over gold answers, stripped of articles/punctuation). Gold: {'the Bengal tiger', 'a Bengal tiger', 'a Bengal tiger in India'}. Prediction: 'the Bengal tiger habitat'. What are the EM and F1 scores?",
        "options": [
          "EM = 0, F1 = 0.57",
          "EM = 0, F1 = 0.80",
          "EM = 1, F1 = 1.00",
          "EM = 0, F1 = 0.67"
        ],
        "correctAnswer": "EM = 0, F1 = 0.80",
        "explanation": "Prediction tokens: {bengal, tiger, habitat} (3). Gold 1 & 2 tokens: {bengal, tiger} (2). Overlap = 2. F1 = 2(2)/(3+2) = 4/5 = 0.80. None match exactly, so EM = 0."
      },
      {
        "question": "3. ColBERT scores a query–document pair by late interaction MaxSim. For a query of N = 32 tokens and passage of m = 180 tokens, how many token-level dot products must be computed, and how many values are summed?",
        "options": [
          "5760 dot products; 32 values summed",
          "5760 dot products; 180 values summed",
          "212 dot products; 32 values summed",
          "32 dot products; 180 values summed"
        ],
        "correctAnswer": "5760 dot products; 32 values summed",
        "explanation": "The full cross-token similarity matrix is 32 × 180 = 5,760 dot products. Taking max along the passage dimension yields 32 MaxSim values (one per query token) to sum."
      },
      {
        "question": "4. BM25 parameters k = 1.2, b = 0.75. Query has N/df = 100, raw tf = 5, document length is 2× average length. What is the BM25 score (to 2 decimals)?",
        "options": [
          "1.41",
          "2.00",
          "1.19",
          "0.70"
        ],
        "correctAnswer": "1.41",
        "explanation": "IDF = log10(100) = 2. Denominator factor = 1.2 × (1 - 0.75 + 0.75×2) = 2.1. Term weight = 5 / (2.1 + 5) = 0.7042. BM25 score = 2 × 0.7042 ≈ 1.41."
      },
      {
        "question": "5. A reference has 3 tokens with idf weights [1.0, 2.0, 3.0] and greedy-matched cosine similarities [0.9, 0.6, 0.4]. What are the idf-weighted and plain uniform BERTScore recall values?",
        "options": [
          "weighted 0.55, uniform 0.63",
          "weighted 0.63, uniform 0.55",
          "weighted 0.55, uniform 0.55",
          "weighted 0.73, uniform 0.63"
        ],
        "correctAnswer": "weighted 0.55, uniform 0.63",
        "explanation": "Weighted: (1.0×0.9 + 2.0×0.6 + 3.0×0.4) / (1+2+3) = 3.3 / 6 = 0.55. Uniform: (0.9 + 0.6 + 0.4) / 3 = 1.9 / 3 = 0.633 ≈ 0.63."
      },
      {
        "question": "6. A DPR bi-encoder is trained with batch B = 8 questions. Each has 1 positive and 1 BM25 hard negative. In-batch negatives are shared across all questions. How many negative passages does each question have, and how many question–passage dot products are computed?",
        "options": [
          "7 negatives, 64 dot products",
          "8 negatives, 64 dot products",
          "15 negatives, 128 dot products",
          "14 negatives, 128 dot products"
        ],
        "correctAnswer": "15 negatives, 128 dot products",
        "explanation": "Batch contains 8 × 2 = 16 passages. For any question, 1 is positive and the remaining 15 serve as negatives. Total dot products = 8 questions × 16 passages = 128."
      },
      {
        "question": "7. In an open-domain QA pipeline, retriever recall@20 is 0.80. The reader gives correct answer 75% when gold passage is retrieved, and 5% when not retrieved. What is expected end-to-end Exact Match?",
        "options": [
          "60.0%",
          "61.0%",
          "75.0%",
          "80.0%"
        ],
        "correctAnswer": "61.0%",
        "explanation": "EM = P(retrieved) × P(correct|retrieved) + P(not) × P(correct|not) = 0.80 × 0.75 + 0.20 × 0.05 = 0.60 + 0.01 = 0.61 = 61.0%."
      },
      {
        "question": "8. TF-IDF cosine similarity: query 'neural network' has tf=log10(2)=0.301. df: neural=100 (count=9 in d), network=10 (count=99 in d). N=1000. What is score(q, d)?",
        "options": [
          "0.976",
          "0.707",
          "1.000",
          "0.812"
        ],
        "correctAnswer": "0.976",
        "explanation": "Doc tf-idf: neural = 1×1 = 1, network = 2×2 = 4. Query weights proportional to (1, 2). Cosine similarity = (1·1 + 2·4) / (√(5) · √(17)) = 9 / √85 ≈ 0.976."
      },
      {
        "question": "9. A 3-token hypothesis has token log-probabilities [−0.5, −1.0, −2.0]. Compute BARTScore under (i) uniform weights and (ii) idf weights [0.5, 1.0, 1.5] normalized to sum to 1.",
        "options": [
          "(i) −1.17, (ii) −1.42",
          "(i) −3.50, (ii) −4.25",
          "(i) −1.42, (ii) −1.17",
          "(i) −1.17, (ii) −4.25"
        ],
        "correctAnswer": "(i) −1.17, (ii) −1.42",
        "explanation": "(i) Uniform = (1/3)(-0.5 - 1.0 - 2.0) = -3.5/3 ≈ -1.17. (ii) Normalized weights = [1/6, 1/3, 1/2]. BARTScore = (1/6)(-0.5) + (1/3)(-1.0) + (1/2)(-2.0) = -1.417 ≈ -1.42."
      },
      {
        "question": "10. In dialogue generation, unnormalized logits for {w1, w2, w3} are [ln(4), ln(2), 0]. Temperature T = 0.5 is applied. What is the probability of selecting w1?",
        "options": [
          "4/7",
          "16/21",
          "2/3",
          "4/5"
        ],
        "correctAnswer": "16/21",
        "explanation": "Scaled logits: [ln(4)/0.5, ln(2)/0.5, 0] = [2 ln(4), 2 ln(2), 0] = [ln(16), ln(4), 0]. Exponentials: [16, 4, 1]. P(w1) = 16 / (16 + 4 + 1) = 16/21."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-8",
    "title": "DLNLP Assignment 8 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. A self-instruction task pool initially holds {P1, P2}. Candidates are added if ROUGE-L similarity with all existing pool instructions is < 0.70, and discarded if containing 'image', 'picture', or 'graph'. Candidates in order: C1 (sims: 0.52, 0.61), C2 (sims: 0.44, 0.58, 0.73), C3 (sims: 0.66, 0.35, 0.68), C4 ('Summarize graph...'). How many instructions does the pool contain after processing?",
        "options": [
          "3",
          "4",
          "5",
          "6"
        ],
        "correctAnswer": "4",
        "explanation": "C1 added (< 0.70). C2 rejected (0.73 ≥ 0.70 with C1). C3 added (< 0.70 with P1, P2, C1). C4 discarded due to keyword 'graph'. Final pool = {P1, P2, C1, C3} = 4 instructions."
      },
      {
        "question": "2. A probability ratio of 0.78 is passed through clip(rt, 1 − ε, 1 + ε) with ε = 0.15. What value emerges?",
        "options": [
          "0.78",
          "0.85",
          "1.15",
          "0.93"
        ],
        "correctAnswer": "0.85",
        "explanation": "Permitted clipping interval is [1 - 0.15, 1 + 0.15] = [0.85, 1.15]. Since 0.78 < 0.85, clipping bounds it to 0.85."
      },
      {
        "question": "3. At one decoding step the value head estimates V(s) = 0.84, while the return obtained from that step onward is Q(s, a) = 0.57. What is the advantage of the sampled token?",
        "options": [
          "−0.27",
          "+0.27",
          "−1.41",
          "+1.41"
        ],
        "correctAnswer": "−0.27",
        "explanation": "Advantage A = Q(s, a) - V(s) = 0.57 - 0.84 = -0.27."
      },
      {
        "question": "4. A task entry in an instruction dataset supplies a title, a definition, an avoidance note, and two demonstrations of acceptable behaviour. A reviewer objects that there is no display of a plausible but unacceptable output with repair advice. Which schema element is absent?",
        "options": [
          "Prompt message field",
          "Positive example explanation",
          "Negative example suggestion",
          "Task definition text"
        ],
        "correctAnswer": "Negative example suggestion",
        "explanation": "In the instruction schema, the 'suggestion' field accompanies negative examples explaining how an unacceptable output should be repaired."
      },
      {
        "question": "5. A pipeline creates instances for a classification instruction by sampling input first and then label. Labels collapse towards a single majority class. Which change counters this?",
        "options": [
          "Sorting instructions by token length",
          "Raising the decoding temperature",
          "Removing the task definition field",
          "Generating the output label first"
        ],
        "correctAnswer": "Generating the output label first",
        "explanation": "Conditioning input generation on pre-selected output labels forces balanced coverage across the entire label space."
      },
      {
        "question": "6. Under DPO objective, for chosen response yw and rejected yl, β = 0.5: log πθ(yw|x) = -2.4, log πref(yw|x) = -3.0; log πθ(yl|x) = -4.1, log πref(yl|x) = -3.5. What is Prθ(yw ≻ yl | x)?",
        "options": [
          "0.354",
          "0.574",
          "0.646",
          "0.769"
        ],
        "correctAnswer": "0.646",
        "explanation": "Log ratios: yw = -2.4 - (-3.0) = 0.6; yl = -4.1 - (-3.5) = -0.6. Difference scaled by β = 0.5(0.6 - (-0.6)) = 0.6. Sigmoid σ(0.6) = 1 / (1 + e^-0.6) = 0.646."
      },
      {
        "question": "7. A completion receives raw reward score 3.4. KL divergence from reference policy is D_KL = 1.6, penalty coefficient β = 0.25. What is the regularized reward?",
        "options": [
          "1.80",
          "3.40",
          "3.00",
          "3.15"
        ],
        "correctAnswer": "3.00",
        "explanation": "R' = R - β · D_KL = 3.4 - 0.25 × 1.6 = 3.4 - 0.4 = 3.00."
      },
      {
        "question": "8. An assistant generates 5 candidate outputs. Length policy discards length > 200 tokens. Adjusted score s'_i = r_i - 0.004 × length. Candidates: y1(3.10, 120), y2(3.55, 240), y3(2.95, 60), y4(3.30, 175), y5(3.02, 95). Which candidate is returned?",
        "options": [
          "yˆ2",
          "yˆ3",
          "yˆ4",
          "yˆ5"
        ],
        "correctAnswer": "yˆ3",
        "explanation": "y2 is discarded (240 > 200). Adjusted scores: s1 = 3.10 - 0.48 = 2.62; s3 = 2.95 - 0.24 = 2.71; s4 = 3.30 - 0.70 = 2.60; s5 = 3.02 - 0.38 = 2.64. Max is y3 (2.71)."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-9",
    "title": "DLNLP Assignment 9 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Which statement about the formal definition of an induction head is FALSE?",
        "options": [
          "Prefix matching: the head attends back to previous tokens that were followed by the current and/or recent token.",
          "Copying: the head's output increases the logit corresponding to the attended-to token.",
          "The two properties are required to hold on a repeated sequence of completely random tokens.",
          "A single head in a one-layer attention-only transformer can satisfy both properties, which is why one-layer models also exhibit the in-context learning phase change."
        ],
        "correctAnswer": "A single head in a one-layer attention-only transformer can satisfy both properties, which is why one-layer models also exhibit the in-context learning phase change.",
        "explanation": "Induction heads require at least two attention layers to form (composition of a previous-token head with an induction head); one-layer attention models cannot implement induction heads."
      },
      {
        "question": "2. In-context learning score is loss at 500th token minus loss at 50th token. Model loss at 50th token is 3.10 nats and at 500th token is 2.68 nats. What is the score and how should a shift from −0.05 to this value be interpreted?",
        "options": [
          "+0.42; the model has become worse at using long context.",
          "−0.42; the model has become substantially better at using long context.",
          "0.865; the ratio indicates a mild improvement.",
          "−0.42; but the sign is uninformative, since only the magnitude is comparable across models."
        ],
        "correctAnswer": "−0.42; the model has become substantially better at using long context.",
        "explanation": "Score = 2.68 - 3.10 = -0.42. A more negative score indicates the model exploits context much more effectively (phase change)."
      },
      {
        "question": "3. Regarding counterintuitive findings about in-context demonstrations, which conclusion is FALSE?",
        "options": [
          "Replacing the labels in the demonstrations with random labels degrades in-context learning performance only marginally.",
          "Removing the demonstrations entirely ('No Demos') hurts far more than corrupting their labels, so demonstrations still carry substantial value.",
          "Accuracy rises steeply as k goes from 0 to roughly 4–8 demonstrations and then largely flattens, for both gold and random labels.",
          "Since random labels barely hurt, the demonstrations convey no usable information about the task, and their only function is to pad the context to a sufficient length."
        ],
        "correctAnswer": "Since random labels barely hurt, the demonstrations convey no usable information about the task, and their only function is to pad the context to a sufficient length.",
        "explanation": "Demonstrations convey substantial information regarding the input distribution, format, and label space, which is why 'No Demos' performs far worse."
      },
      {
        "question": "4. Which statement about chain-of-thought prompting is FALSE?",
        "options": [
          "Because CoT exposes intermediate steps, a correct final answer certifies that every intermediate step was also valid.",
          "CoT decomposes a complex problem into smaller sequential reasoning steps, mirroring human problem solving.",
          "Zero-shot CoT dispenses with worked exemplars and instead instructs the model to reason step by step.",
          "CoT is an in-context learning approach and applies to most well-trained off-the-shelf LLMs without gradient updates."
        ],
        "correctAnswer": "Because CoT exposes intermediate steps, a correct final answer certifies that every intermediate step was also valid.",
        "explanation": "CoT makes reasoning transparent, but LLMs can still arrive at correct final answers through unfaithful or invalid intermediate steps."
      },
      {
        "question": "5. Self-consistency samples 5 reasoning paths: P1->42 (log p=-3.0), P2->42 (log p=-4.5), P3->18 (log p=-1.2), P4->18 (log p=-3.5), P5->42 (log p=-6.0). Unweighted majority vote vs probability-weighted vote: Which is correct? (e^-1.2≈0.301, e^-3.0≈0.050, e^-3.5≈0.030, e^-4.5≈0.011, e^-6.0≈0.002)",
        "options": [
          "Both votes return 42.",
          "The unweighted vote returns 42; the weighted vote returns 18.",
          "Both votes return 18.",
          "The unweighted vote returns 18; the weighted vote returns 42."
        ],
        "correctAnswer": "The unweighted vote returns 42; the weighted vote returns 18.",
        "explanation": "Unweighted count: 42 has 3 votes, 18 has 2 votes -> 42 wins. Weighted probabilities: 42 gets 0.050+0.011+0.002 = 0.063, while 18 gets 0.301+0.030 = 0.331 -> 18 wins."
      },
      {
        "question": "6. A Tree-of-Thoughts system uses BFS. At each expansion the LLM generates b = 5 thought candidates in 1 query. Each candidate is scored by a separate evaluator query. Top k = 2 are retained. Root needs 1 generation query, depth d = 4. What is the total number of LLM queries?",
        "options": [
          "35",
          "7",
          "42",
          "45"
        ],
        "correctAnswer": "42",
        "explanation": "Generation queries: Root = 1; levels 2, 3, 4 each have k=2 retained nodes generating -> 1 + 2×3 = 7. Evaluation queries: Level 1 has 5 candidates; levels 2, 3, 4 each have 2×5 = 10 candidates -> 5 + 30 = 35. Total = 7 + 35 = 42 queries."
      },
      {
        "question": "7. For an API call, Toolformer measures Li(ε) = 1.85, Li(e(ci, ε)) = 1.60 and Li(e(ci, ri)) = 1.05, filtering threshold τf = 0.40. What happens to this API call?",
        "options": [
          "Retained, with a loss reduction of 0.55.",
          "Retained, with a loss reduction of 0.80.",
          "Discarded, since the reduction is 0.25 and falls below τf.",
          "Discarded, since Li− must be taken as Li(ε) and the comparison is then invalid."
        ],
        "correctAnswer": "Retained, with a loss reduction of 0.55.",
        "explanation": "Baseline loss Li- = min(1.85, 1.60) = 1.60. With result: Li+ = 1.05. Reduction = 1.60 - 1.05 = 0.55 ≥ 0.40, so the call is retained."
      },
      {
        "question": "8. AUTOPROMPT augments token replacement with beam search. Trigger of 5 tokens, k = 10 candidates per position, beam width of 3. How many beam scorings are performed in one complete left-to-right pass?",
        "options": [
          "15",
          "30",
          "50",
          "150"
        ],
        "correctAnswer": "150",
        "explanation": "At each of 5 positions, each of 3 beams is extended by 10 candidates: 3 × 10 = 30 scorings per position. Across 5 positions: 5 × 30 = 150 scorings."
      },
      {
        "question": "9. Which statement about the families of automatic prompt engineering methods is FALSE?",
        "options": [
          "Automated prompt design uses search or generation over a predefined search space and generally outperforms manual engineering.",
          "Prompt paraphrasing, gradient-based discrete prompt search, and prompt tuning are three distinct families of approaches.",
          "AUTOPROMPT returns discrete trigger tokens drawn from the vocabulary, so the resulting prompt is a genuine token sequence.",
          "Prompt tuning also searches over the discrete vocabulary, which is why its learned prompts remain human-readable."
        ],
        "correctAnswer": "Prompt tuning also searches over the discrete vocabulary, which is why its learned prompts remain human-readable.",
        "explanation": "Prompt tuning optimizes continuous 'soft prompt' embeddings directly via backpropagation; they do not map to discrete vocabulary words and are not human-readable."
      },
      {
        "question": "10. In AUTOPROMPT's scoring function p(y | x_prompt) = Σ p([MASK]=w | x_prompt) where each class y has disjoint label-token sets Vy ⊂ V: Which statement is TRUE?",
        "options": [
          "The quantities form a proper probability distribution over classes for any choice of label sets.",
          "Summing over classes gives at most 1, with equality only if label sets jointly cover the entire vocabulary; in general scores must be renormalised.",
          "The sum over classes always exceeds 1, because each label token is counted once per class.",
          "The formulation is valid only when |Vy| = 1 for every class."
        ],
        "correctAnswer": "Summing over classes gives at most 1, with equality only if label sets jointly cover the entire vocabulary; in general scores must be renormalised.",
        "explanation": "Because label sets Vy are disjoint subsets of the total vocabulary, the sum of probabilities over classes is ≤ 1, requiring renormalization to form valid class probabilities."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-10",
    "title": "DLNLP Assignment 10 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. A single output row of a weight matrix is W = (−0.6, 0.2, 0.5, −0.1), and input activation norms are a = (1, 8, 2, 30). Based on Wanda Importance Score |W_ij|·||x_j||, the two lowest-scoring weights in the row are pruned. Which weights survive?",
        "options": [
          "w2 and w4",
          "w1 and w3",
          "w1 and w4",
          "w3 and w4"
        ],
        "correctAnswer": "w2 and w4",
        "explanation": "Scores: S1 = 0.6×1 = 0.6; S2 = 0.2×8 = 1.6; S3 = 0.5×2 = 1.0; S4 = 0.1×30 = 3.0. Lowest two are w1 and w3, so w2 and w4 survive."
      },
      {
        "question": "2. For one token a teacher assigns distribution q = (0.7, 0.2, 0.1) and student assigns p = (0.5, 0.25, 0.25). The word-level distillation cross-entropy loss is closest to:",
        "options": [
          "0.901",
          "0.693",
          "0.485",
          "1.386"
        ],
        "correctAnswer": "0.901",
        "explanation": "Loss = -[0.7 ln(0.5) + 0.2 ln(0.25) + 0.1 ln(0.25)] = -[0.7(-0.693) + 0.3(-1.386)] = 0.485 + 0.416 = 0.901."
      },
      {
        "question": "3. A model has θ = 4 × 10^9 parameters. Mixed-precision Adam full fine-tuning requires 16 bytes per parameter. An alternative freezes the base model at 4-bit precision (0.5 bytes) and trains 35 × 10^6 LoRA parameters (16 bytes per param). By what factor does full fine-tuning exceed LoRA memory?",
        "options": [
          "25×",
          "32×",
          "8×",
          "114×"
        ],
        "correctAnswer": "25×",
        "explanation": "Full fine-tuning = 16 × 4 GB = 64 GB. QLoRA: frozen 4-bit base = 0.5 × 4 GB = 2 GB; LoRA adapter state = 16 × 0.035 GB = 0.56 GB. Total = 2.56 GB. Ratio = 64 / 2.56 = 25×."
      },
      {
        "question": "4. A decoder-only language model is adapted by inserting learned continuous vectors between source segment x and target segment y (infix). Hidden states at x remain identical to unadapted model, while states at y change. Which architectural property explains this?",
        "options": [
          "Frozen weights prevent representation drift",
          "The learned vectors receive no gradient",
          "Attention attends only to the left",
          "Layer normalisation rescales every activation"
        ],
        "correctAnswer": "Attention attends only to the left",
        "explanation": "In a causal decoder-only model, self-attention attends strictly to current and preceding tokens. Vectors inserted after x cannot be attended to by tokens in x."
      },
      {
        "question": "5. A fine-tuning run uses 4-bit base weights, LoRA adapters, and activation checkpointing. It crashes with an OOM error on occasional batches containing unusually long sequences. Which technique absorbs these memory spikes?",
        "options": [
          "Quantizing the quantization constants",
          "Choosing quantile-spaced code values",
          "Paging optimizer state to CPU",
          "Recomputing activations from checkpoints"
        ],
        "correctAnswer": "Paging optimizer state to CPU",
        "explanation": "QLoRA's Paged Optimizer uses CUDA Unified Memory to automatically page optimizer memory to CPU RAM during transient allocation spikes."
      },
      {
        "question": "6. Four weights w = (0.9, −2.0, 0.5, 20.0) are quantized to 4-bit integers in {-7, ..., 7} using qi = round(7 / max|w| * w). Comparing a global scale vs block-wise scale (block size 2), what code does w1 receive under global and block-wise schemes respectively?",
        "options": [
          "0 and 4",
          "1 and 3",
          "0 and 3",
          "3 and 0"
        ],
        "correctAnswer": "0 and 3",
        "explanation": "Global scale: max = 20.0, scale = 7/20 = 0.35. q1 = round(0.35 × 0.9) = round(0.315) = 0. Block 1 scale: max(|0.9|, |-2.0|) = 2.0, scale = 7/2 = 3.5. q1 = round(3.5 × 0.9) = round(3.15) = 3."
      },
      {
        "question": "7. A Transformer has L = 6 layers, d = 256. Adapters: bottleneck ra = 8 (with biases). LoRA: rank rl = 4 on Wq, Wv (no biases). Prefix tuning: prefix length p = 10. Maximum budget is 25,000 parameters. Which schemes satisfy the budget?",
        "options": [
          "Adapters and LoRA only",
          "Prefix tuning only",
          "Prefix tuning and LoRA only",
          "All three schemes"
        ],
        "correctAnswer": "Prefix tuning and LoRA only",
        "explanation": "Adapters: 12 × (2×256×8 + 256 + 8) = 52,320 (> 25k). LoRA: 12 matrices × (2×256×4) = 24,576 (≤ 25k). Prefix tuning: 6 × 10 × 256 = 15,360 (≤ 25k). Both Prefix tuning and LoRA qualify."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-11",
    "title": "DLNLP Assignment 11 Solutions",
    "subject": "DLNLP",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Adopt the Chinchilla rule of thumb that, at the compute-optimal point, a model should see D* ≈ 20 N* training tokens, with C ≈ 6N D. For a budget of C = 1.2 × 10^24 FLOPs, what are N* and D*? If budget is raised 100×, what are the new optima?",
        "options": [
          "N* ≈ 100B, D* ≈ 2T; at 100× compute, N* ≈ 1T and D* ≈ 20T.",
          "N* ≈ 45B, D* ≈ 4.5T; at 100× compute, N* ≈ 450B and D* ≈ 45T.",
          "N* ≈ 100B, D* ≈ 2T; at 100× compute, N* ≈ 10T and D* stays ≈ 2T, since extra compute should go to parameters.",
          "N* ≈ 1T, D* ≈ 200B; at 100× compute, N* ≈ 10T and D* ≈ 2T."
        ],
        "correctAnswer": "N* ≈ 100B, D* ≈ 2T; at 100× compute, N* ≈ 1T and D* ≈ 20T.",
        "explanation": "C = 6 · N* · (20 N*) = 120 N*². 120 N*² = 1.2 × 10^24 => N*² = 10^22 => N* = 10^11 = 100B. D* = 20 N* = 2T. With 100× compute, both N and D scale with √100 = 10×, giving N* = 1T and D* = 20T."
      },
      {
        "question": "2. The lecture states that Kaplan et al. (2020) scaling laws are 'flawed' because of how learning-rate schedules were handled. Which statement most accurately describes the problem and its effect on conclusions?",
        "options": [
          "Kaplan et al. only trained models below 1M parameters, so the power laws were extrapolated across too many orders of magnitude; the schedule had no effect.",
          "Kaplan et al. estimated compute as 2N FLOPs per token instead of 6N, underestimating data cost and biasing the laws towards larger datasets.",
          "Kaplan et al. tuned a different learning-rate schedule for every run, which added hyperparameter noise that flattened the data exponent α_D.",
          "Kaplan et al. used the same learning-rate schedule for every run regardless of the number of training tokens. The loss recorded for shorter token budgets was therefore not what a schedule matched to that budget would reach, which biased the fitted N–D trade-off towards scaling model size faster than data."
        ],
        "correctAnswer": "Kaplan et al. used the same learning-rate schedule for every run regardless of the number of training tokens. The loss recorded for shorter token budgets was therefore not what a schedule matched to that budget would reach, which biased the fitted N–D trade-off towards scaling model size faster than data.",
        "explanation": "Kaplan et al. used a single long cosine LR schedule for all training runs, measuring intermediate checkpoints when the LR had not yet decayed properly. This penalized smaller token runs and led to the flawed conclusion that parameter count should scale faster than token count."
      },
      {
        "question": "3. A standard (bias-free) FFN with hidden size 4d uses two matrices, W1 in R^{4d x d} and W2 in R^{d x 4d}. A SwiGLU FFN computes FFN_SwiGLU(x) = (Swish(xW) * xV)W2 using three matrices. To keep the parameter count equal to standard FFN, what hidden size h must SwiGLU use, and how many parameters per layer result for d = 4096 (as in LLaMA-7B)?",
        "options": [
          "h = 8d/3 ≈ 10,923 (LLaMA rounds this to 11,008), giving 3dh = 8d² ≈ 1.34 × 10^8 parameters per layer.",
          "h = 4d = 16,384, because the gating branch shares weights with W, giving 8d² ≈ 1.34 × 10^8 parameters.",
          "h = 2d = 8,192, giving 6d² ≈ 1.01 × 10^8 parameters, which matches the standard FFN after rounding.",
          "h = 16d/3 ≈ 21,845, giving 16d² ≈ 2.68 × 10^8 parameters, since gating doubles the effective width."
        ],
        "correctAnswer": "h = 8d/3 ≈ 10,923 (LLaMA rounds this to 11,008), giving 3dh = 8d² ≈ 1.34 × 10^8 parameters per layer.",
        "explanation": "Standard FFN has 2 × 4d × d = 8d² parameters. SwiGLU has 3 × h × d parameters. Equating 3hd = 8d² yields h = 8d/3 ≈ 10,923 (rounded to 11,008 in LLaMA), giving 8d² ≈ 1.34 × 10^8 parameters."
      },
      {
        "question": "4. Gated Linear Units (GLU) are defined as the component-wise product of two linear projections, one of which first passes through a sigmoid. The same paper also proposes omitting the activation altogether ('bilinear' layer). Which statement is correct?",
        "options": [
          "The bilinear layer (xW + b) * (xV + c) is a linear function of x, so a bilinear FFN collapses into a single linear map and adds no expressive power.",
          "In GLU both projections pass through a sigmoid, and the product of two sigmoids acts as a soft AND gate.",
          "The bilinear layer has no pointwise activation but is still non-linear in x: each output is the product of two affine functions of x, i.e. a second-order interaction. In GLU the sigmoid branch acts as a gate in [0, 1]; SwiGLU replaces the sigmoid with Swish, so its 'gate' branch is no longer bounded to [0, 1] and can be negative.",
          "SwiGLU keeps the sigmoid gate of GLU and additionally applies Swish to the other (value) branch, so its gate remains bounded to [0, 1]."
        ],
        "correctAnswer": "The bilinear layer has no pointwise activation but is still non-linear in x: each output is the product of two affine functions of x, i.e. a second-order interaction. In GLU the sigmoid branch acts as a gate in [0, 1]; SwiGLU replaces the sigmoid with Swish, so its 'gate' branch is no longer bounded to [0, 1] and can be negative.",
        "explanation": "Multiplying two linear projections of x produces quadratic/second-order cross terms, making it non-linear even without activation functions. SwiGLU replaces sigmoid with Swish(x) = x · σ(βx), which is unbounded above and can take negative values."
      },
      {
        "question": "5. Let x = [1, 3, 5, 7], with gain g = 1, bias b = 0 and ε = 0. Using the population variance (1/n), what are the RMSNorm and LayerNorm outputs?",
        "options": [
          "RMSNorm ≈ [1.342, 0.447, 0.447, 1.342]; LayerNorm ≈ [0.218, 0.655, 1.091, 1.528]",
          "RMSNorm ≈ [0.25, 0.75, 1.25, 1.75]; LayerNorm ≈ [−1.342, −0.447, 0.447, 1.342]",
          "RMSNorm ≈ [0.109, 0.327, 0.546, 0.764]; LayerNorm ≈ [−1.342, −0.447, 0.447, 1.342]",
          "RMSNorm ≈ [0.218, 0.655, 1.091, 1.528]; LayerNorm ≈ [−1.342, −0.447, 0.447, 1.342]"
        ],
        "correctAnswer": "RMSNorm ≈ [0.218, 0.655, 1.091, 1.528]; LayerNorm ≈ [−1.342, −0.447, 0.447, 1.342]",
        "explanation": "RMS = sqrt((1 + 9 + 25 + 49) / 4) = sqrt(84 / 4) = sqrt(21) ≈ 4.583. RMSNorm = x / 4.583 ≈ [0.218, 0.655, 1.091, 1.528]. Mean μ = 4; variance σ² = ((9 + 1 + 1 + 9)/4) = 5; σ = sqrt(5) ≈ 2.236. LayerNorm = (x - 4)/2.236 ≈ [-1.342, -0.447, 0.447, 1.342]."
      },
      {
        "question": "6. A RoPE model trained with L = 2048 is extended to L' = 8192 using Position Interpolation (PI), mapping position m -> m L/L'. Consider tokens at positions 6000 and 6004. What are the interpolated positions, what happens to their relative offset, and why is a short fine-tune recommended?",
        "options": [
          "6000 -> 1500 and 6004 -> 1504; PI preserves relative offsets exactly, so no fine-tuning is needed.",
          "6000 -> 1500 and 6004 -> 1501; the offset of 4 shrinks to 1. Every position now falls inside [0, 2048], so no unseen rotation angles arise, but neighbouring tokens are 4× closer than in training. A short fine-tune (on the order of 1000s of examples, e.g. from the Pile) lets the model adapt to this finer resolution.",
          "6000 -> 6000 mod 2048 = 1904 and 6004 -> 1908 (wrap-around); the offset is preserved, and fine-tuning removes the aliasing.",
          "6000 -> 24,000 and 6004 -> 24,016 (scaling by L'/L); the offset grows to 16, and fine-tuning is needed to learn the larger angles."
        ],
        "correctAnswer": "6000 -> 1500 and 6004 -> 1501; the offset of 4 shrinks to 1. Every position now falls inside [0, 2048], so no unseen rotation angles arise, but neighbouring tokens are 4× closer than in training. A short fine-tune (on the order of 1000s of examples, e.g. from the Pile) lets the model adapt to this finer resolution.",
        "explanation": "Scaling by L/L' = 2048/8192 = 1/4 scales 6000 -> 1500 and 6004 -> 1501, shrinking the relative distance by 4×. Position angles stay within original training bounds, but fine-tuning adapts the model to the higher resolution."
      },
      {
        "question": "7. The phrase 'the cat ... sleeping' appears in two sentences: in the first, 'cat' is at position 2 and 'sleeping' at 5; in the second, at 102 and 105. Content vectors are identical. Which statement is correct?",
        "options": [
          "The two query–key scores are identical under additive sinusoidal embeddings, but differ under RoPE, because RoPE encodes absolute angles mθ.",
          "Under RoPE the later occurrence has a larger score, because rotation scales the norm of q and k in proportion to position.",
          "Under RoPE the scores are identical, because (R_m q)^T (R_n k) = q^T R_{n-m} k depends only on n − m = 3 and rotation preserves norms. Under additive sinusoidal embeddings the score expands into content–position cross terms that depend on absolute positions, so the scores generally differ.",
          "Both schemes give identical scores, because each depends only on the relative offset."
        ],
        "correctAnswer": "Under RoPE the scores are identical, because (R_m q)^T (R_n k) = q^T R_{n-m} k depends only on n − m = 3 and rotation preserves norms. Under additive sinusoidal embeddings the score expands into content–position cross terms that depend on absolute positions, so the scores generally differ.",
        "explanation": "RoPE orthogonal rotation matrices satisfy R_m^T R_n = R_{n-m}, ensuring that dot products depend exclusively on the relative offset (5 - 2 = 105 - 102 = 3). Additive embeddings contain absolute position inner products."
      },
      {
        "question": "8. In the kNN-augmented layer, one head has gate bias bg = 2, so g = σ(bg). kNN search returns two memories with scaled dot-product scores 1 and 0, and values v1 = [1, 0], v2 = [0, 1]. Local attention gives Vc = [0, 1]. With Vo = g Vm + (1 − g) Vc, what is Vo?",
        "options": [
          "Vo ≈ [0.731, 0.269]",
          "Vo ≈ [0.644, 0.356]",
          "Vo ≈ [0.087, 0.913]",
          "Vo ≈ [0.250, 0.750]"
        ],
        "correctAnswer": "Vo ≈ [0.644, 0.356]",
        "explanation": "g = σ(2) ≈ 0.8808. Softmax over scores [1, 0]: e^1 / (e^1 + 1) = 2.718 / 3.718 ≈ 0.731; e^0 / 3.718 ≈ 0.269. Vm = 0.731[1, 0] + 0.269[0, 1] = [0.731, 0.269]. Vo = 0.8808[0.731, 0.269] + (1 - 0.8808)[0, 1] = [0.6439, 0.237 + 0.119] ≈ [0.644, 0.356]."
      },
      {
        "question": "9. Self-Route (Li et al., 2024) sends every query to RAG prompt (5k tokens). 70% queries are answered in step one; remaining 30% are re-run with full long context (100k tokens). What is average input tokens per query, and savings vs always using LC?",
        "options": [
          "≈ 33.5k tokens per query; ≈ 66.5% saving.",
          "≈ 30k tokens per query; 70% saving.",
          "≈ 35k tokens per query; 65% saving.",
          "100k tokens per query; no saving, because every query must also go through LC to verify the RAG answer."
        ],
        "correctAnswer": "≈ 35k tokens per query; 65% saving.",
        "explanation": "All 100% queries take 5k tokens in step 1. 30% take an additional 100k in step 2. Average tokens = 5k + 0.30 × 100k = 5k + 30k = 35k tokens. Compared to always 100k, savings = (100k - 35k)/100k = 65%."
      },
      {
        "question": "10. Several 'fixed-size cache' designs are discussed for bounding inference memory: unweighted running average, RNN-like learned memory, and compressed key-value pairs. Which design principle does the lecture endorse for compressed-KV?",
        "options": [
          "Keep distant context explicitly and compress recent tokens, because recent tokens are the most predictable and carry the least information.",
          "A cumulative (unweighted) average of past key-value pairs can be updated in O(1) and still lets any individual earlier value be recovered exactly, so it is lossless.",
          "Keep the local context explicitly with minimal information loss and store long-range context in a more compressed form (e.g. a few summary slots produced by averaging or a learned network), so cache size stays bounded without losing detail in the nearby window.",
          "An RNN-like memory update mt = f(mt-1, kt, vt) requires storing every past (k, v) pair at inference in order to recompute f, so it gives no memory savings."
        ],
        "correctAnswer": "Keep the local context explicitly with minimal information loss and store long-range context in a more compressed form (e.g. a few summary slots produced by averaging or a learned network), so cache size stays bounded without losing detail in the nearby window.",
        "explanation": "The core design principle keeps full, uncompressed KV precision for recent local tokens where fine-grained syntactic/semantic attention is essential, while compressing older, distant context into summary tokens/slots."
      }
    ]
  },
  {
    "id": "dlnlp-assignment-12",
    "title": "DLNLP Assignment 12 Solutions",
    "subject": "DLNLP",
    "date": "16/10/2026",
    "questions": [
      {
        "question": "1. For a feed-forward memory cell with key k = (1, 2, -1) and activation f = ReLU, the prefix representation is x = (2, -1, 3). What is the memory coefficient?",
        "options": [
          "3",
          "7",
          "-3",
          "0"
        ],
        "correctAnswer": "0",
        "explanation": "Memory coefficient m = ReLU(x · k). Here x · k = 2(1) + (-1)(2) + 3(-1) = 2 - 2 - 3 = -3. Since ReLU(-3) = max(0, -3) = 0, the memory coefficient is 0. This prefix does not trigger the memory cell at all. (Ref: Lecture 58, Slide 7)."
      },
      {
        "question": "2. A neuron’s normalised activation probabilities across three languages are p' = (0.50, 0.25, 0.25). What is its LAPE score in bits?",
        "options": [
          "0.50",
          "1.00",
          "1.25",
          "1.50"
        ],
        "correctAnswer": "1.50",
        "explanation": "The Language-Agnostic Probability Entropy (LAPE) score is calculated using entropy in bits (base 2): LAPE = -Σ p'_i * log2(p'_i) = -[0.50 * log2(0.50) + 0.25 * log2(0.25) + 0.25 * log2(0.25)] = -[0.50 * (-1) + 0.25 * (-2) + 0.25 * (-2)] = -[-0.50 - 0.50 - 0.50] = 1.50 bits. (Ref: Lecture 57, Slide 9)."
      },
      {
        "question": "3. For the prompt \"The Eiffel Tower stands in the city of\", the clean run assigns P(o) = 0.86 to the correct object and the corrupted run assigns P*(o) = 0.07. Four separate corrupted-with-restoration runs each restore one hidden state and give the probabilities below:\n\n| State | Restored position / layer | Prestore(o) |\n|---|---|---|\n| S1 | last subject token, layer 6 | 0.41 |\n| S2 | last subject token, layer 15 | 0.63 |\n| S3 | last token, layer 32 | 0.58 |\n| S4 | first subject token, layer 15 | 0.12 |\n\nWhich state has the largest indirect effect, and what is its value?",
        "options": [
          "S2, 0.56",
          "S2, 0.63",
          "S3, 0.51",
          "S1, 0.34"
        ],
        "correctAnswer": "S2, 0.56",
        "explanation": "Indirect Effect (IE) is calculated by subtracting the corrupted baseline probability P*(o) = 0.07:\n• IE(S1) = 0.41 - 0.07 = 0.34\n• IE(S2) = 0.63 - 0.07 = 0.56\n• IE(S3) = 0.58 - 0.07 = 0.51\n• IE(S4) = 0.12 - 0.07 = 0.05\nTherefore, S2 has the largest indirect effect of 0.56, showing that the mid-layer state at the last subject token carries the strongest causal contribution. (Ref: Lecture 58, Slide 28)."
      },
      {
        "question": "4. A linear probing classifier consumes a learned scalar mixture of layer representations. For one token, h^(0) = (1, 0, 2), h^(1) = (0, 2, -1), h^(2) = (3, 1, 1), with learned task weights s0 = 0.5, s1 = 0.2, s2 = 0.3. The probe outputs z with w = (2, -1, 1) and b = -1. What is z?",
        "options": [
          "2.2",
          "3.2",
          "5.0",
          "6.0"
        ],
        "correctAnswer": "2.2",
        "explanation": "Step 1: Compute layer mixture representation:\nh = s0*h^(0) + s1*h^(1) + s2*h^(2) = 0.5(1, 0, 2) + 0.2(0, 2, -1) + 0.3(3, 1, 1) = (0.5 + 0 + 0.9, 0 + 0.4 + 0.3, 1.0 - 0.2 + 0.3) = (1.4, 0.7, 1.1).\nStep 2: Apply the linear probe:\nz = w · h + b = 2(1.4) - 1(0.7) + 1(1.1) - 1 = 2.8 - 0.7 + 1.1 - 1 = 2.2. (Ref: Lecture 56, Slide 14)."
      },
      {
        "question": "5. A Logit Lens readout at layer 12 produces an intermediate distribution with unnormalised probability weights proportional to (4, 4, 1, 1) over the four candidate tokens (w1, w2, w3, w4); normalising these gives the intermediate distribution p. The model’s final-layer distribution is q = (0.80, 0.10, 0.05, 0.05). What is D_KL(p || q) in bits?",
        "options": [
          "0.10",
          "0.60",
          "0.50",
          "1.10"
        ],
        "correctAnswer": "0.60",
        "explanation": "Step 1: Normalise intermediate weights: total = 4 + 4 + 1 + 1 = 10, so p = (0.4, 0.4, 0.1, 0.1).\nStep 2: D_KL(p || q) = Σ p_i * log2(p_i / q_i)\n= 0.4 * log2(0.4 / 0.8) + 0.4 * log2(0.4 / 0.1) + 0.1 * log2(0.1 / 0.05) + 0.1 * log2(0.1 / 0.05)\n= 0.4 * log2(0.5) + 0.4 * log2(4) + 0.1 * log2(2) + 0.1 * log2(2)\n= 0.4(-1) + 0.4(2) + 0.1(1) + 0.1(1) = -0.4 + 0.8 + 0.1 + 0.1 = 0.60 bits. (Ref: Lecture 56, Slide 23)."
      },
      {
        "question": "6. A team unlearns a set of question–answer pairs while using raw novel excerpts as the normal dataset. After the run, the model degrades on essentially all question–answer prompts, including entirely benign ones, yet still completes plain prose fluently. Which failure does this indicate?",
        "options": [
          "The forgetting set was too small",
          "KL was replaced by cross-entropy",
          "A format shortcut was learned",
          "The learning rate was too low"
        ],
        "correctAnswer": "A format shortcut was learned",
        "explanation": "When the forgetting dataset and normal dataset differ systematically in format (QA pairs vs novel excerpts), the optimization takes the shortcut of suppressing the entire QA format rather than targeted factual content. Matching format styles between retain and forget sets removes this shortcut. (Ref: Lecture 60, Slide 9)."
      },
      {
        "question": "7. An assistant answers a chemistry question correctly. The user replies \"That is wrong the answer is 12\", and the assistant apologises and adopts 12. Started fresh with the identical question and no pushback, it answers correctly again. Which issue does this pattern most specifically illustrate?",
        "options": [
          "Hallucination",
          "Miscalibration",
          "Inconsistency",
          "Sycophancy"
        ],
        "correctAnswer": "Sycophancy",
        "explanation": "The behaviour is triggered specifically by user pushback: the model abandons its own correct answer in deference to the user's assertion. Because the model answers correctly in a neutral session, this is sycophancy (excessive deference to the user) rather than a lack of knowledge or hallucination. (Ref: Lecture 59, Slide 8)."
      }
    ]
  },
  {
    "id": "genai-week-1",
    "title": "Fundamentals of Generative AI - Week 1 Assignment 1",
    "subject": "Fundamentals of Generative AI",
    "date": "08/10/2026",
    "questions": [
      {
        "question": "1. A model is trained on digit images without labels and later generates new digit-like images. Which distribution is the model primarily learning?",
        "options": [
          "p(y|x)",
          "p(x, y)",
          "p(x)",
          "p(y)"
        ],
        "correctAnswer": "p(x)",
        "explanation": "An unsupervised generative model trained on unlabeled digit images learns the true underlying marginal distribution of the input data p(x) in order to sample new digit-like images."
      },
      {
        "question": "2. A generative model is trained to generate a medical image only when the condition \"tumor present\" is provided. Which probability distribution best describes this task?",
        "options": [
          "p(x)",
          "p(y|x)",
          "p(x|y)",
          "p(x,y) only"
        ],
        "correctAnswer": "p(x|y)",
        "explanation": "Conditional generative models generate samples x conditioned on a given attribute or label y (here, y = 'tumor present'). Thus, it models the conditional distribution p(x|y)."
      },
      {
        "question": "3. A decoder produces one output value for every binary pixel, and each value must represent the probability that the pixel is 1. Which output-layer and loss combination is most appropriate?",
        "options": [
          "Linear activation with mean squared error",
          "Sigmoid activation with binary cross-entropy",
          "Softmax activation with categorical cross-entropy",
          "ReLU activation with mean squared error"
        ],
        "correctAnswer": "Sigmoid activation with binary cross-entropy",
        "explanation": "For independent binary pixels where each output represents the probability of pixel value being 1 (in range [0, 1]), the sigmoid activation function combined with binary cross-entropy loss is the theoretically principled choice."
      },
      {
        "question": "4. Why can stacking multiple linear layers without nonlinear activation functions not produce a genuinely deep nonlinear model?",
        "options": [
          "Linear layers cannot contain biases",
          "The composition of linear transformations is still a linear transformation",
          "Linear layers always produce zero gradients",
          "Multiple linear layers can only be used for classification"
        ],
        "correctAnswer": "The composition of linear transformations is still a linear transformation",
        "explanation": "Mathematically, the composition of any sequence of linear (or affine) transformations W_2(W_1 x + b_1) + b_2 collapses into a single affine transformation W'x + b'. Without non-linear activation functions, depth adds no representational power."
      },
      {
        "question": "5. A weight has current value: w = 4, The learning rate is: η = 0.1, The gradient is: ∂L/∂w = -3. Using the gradient-descent update rule: w_new = w - η(∂L/∂w). What is the updated weight?",
        "options": [
          "3.7",
          "4.0",
          "4.3",
          "7.0"
        ],
        "correctAnswer": "4.3",
        "explanation": "Applying the gradient descent update rule: w_new = w - η * (∂L/∂w) = 4 - 0.1 * (-3) = 4 + 0.3 = 4.3."
      },
      {
        "question": "6. An optimizer accumulates the squared gradients of a parameter over all previous training steps. After many updates, its effective learning rate becomes extremely small. Which optimizer is being described?",
        "options": [
          "Momentum",
          "AdaGrad",
          "RMSProp",
          "Standard mini-batch SGD"
        ],
        "correctAnswer": "AdaGrad",
        "explanation": "AdaGrad divides the learning rate by the square root of the sum of all historical squared gradients without decay. As steps accumulate, the denominator grows monotonically, causing the effective step size to diminish prematurely."
      },
      {
        "question": "7. Which statement correctly distinguishes RMSProp from AdaGrad?",
        "options": [
          "RMSProp uses only the current gradient and ignores previous gradients",
          "RMSProp accumulates all past squared gradients without decay",
          "RMSProp uses an exponentially weighted moving average of recent squared gradients",
          "RMSProp does not use adaptive learning rates"
        ],
        "correctAnswer": "RMSProp uses an exponentially weighted moving average of recent squared gradients",
        "explanation": "Unlike AdaGrad which accumulates all past squared gradients indefinitely, RMSProp uses an exponentially decaying moving average of past squared gradients, allowing it to adapt to recent curvature without diminishing the learning rate to zero."
      },
      {
        "question": "8. A convolutional layer receives an input of size: 32 × 32 × 3. It uses 8 filters, Filter size: 3 × 3, Stride: 1, Padding: 0. What is the output size?",
        "options": [
          "30 × 30 × 8",
          "32 × 32 × 8",
          "30 × 30 × 3",
          "32 × 32 × 3"
        ],
        "correctAnswer": "30 × 30 × 8",
        "explanation": "Spatial output dimension = (W - K + 2P)/S + 1 = (32 - 3 + 0)/1 + 1 = 30. With 8 filters applied across the input channels, the output depth is 8. Hence, the resulting feature map size is 30 × 30 × 8."
      },
      {
        "question": "9. A convolutional layer uses:\n• Filter size: 5 × 5\n• Input channels: 3\n• Number of filters: 6\n• One bias per filter\nHow many trainable parameters does the layer contain?",
        "options": [
          "450",
          "456",
          "480",
          "906"
        ],
        "correctAnswer": "456",
        "explanation": "Each filter contains (5 × 5 × 3) weights + 1 bias = 75 + 1 = 76 parameters. For 6 filters: 76 × 6 = 456 trainable parameters."
      },
      {
        "question": "10. A CNN produces a feature tensor of size: 4 × 4 × 3. This tensor is passed directly to a Flatten layer. How many values are present in the flattened vector?",
        "options": [
          "12",
          "16",
          "32",
          "48"
        ],
        "correctAnswer": "48",
        "explanation": "A Flatten layer unrolls all elements of the multi-dimensional tensor into a 1D vector: 4 × 4 × 3 = 48 values."
      }
    ]
  },
  {
    "id": "genai-week-2",
    "title": "Fundamentals of Generative AI - Week 2 Assignment 2",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. An autoencoder has an input dimension of 100 and a latent dimension of 120. It achieves almost zero reconstruction error without any regularization. Which conclusion is most appropriate?",
        "options": [
          "The model must have learned a compact representation",
          "The model may have learned a trivial identity-like mapping",
          "The model is necessarily a denoising autoencoder",
          "The latent representation must contain less information than the input"
        ],
        "correctAnswer": "The model may have learned a trivial identity-like mapping",
        "explanation": "Because the latent dimension (120) is larger than the input dimension (100), an unregularized overcomplete autoencoder can simply memorize an identity mapping without learning meaningful features."
      },
      {
        "question": "2. A dataset contains standardized continuous-valued features that can take negative as well as positive values. Which decoder output and loss combination is most appropriate?",
        "options": [
          "Sigmoid output with binary cross-entropy",
          "Softmax output with categorical cross-entropy",
          "Linear output with mean squared error",
          "ReLU output with binary cross-entropy"
        ],
        "correctAnswer": "Linear output with mean squared error",
        "explanation": "For continuous standardized features that span both positive and negative real numbers, a linear output layer with mean squared error (MSE) reconstruction loss is the standard principled choice."
      },
      {
        "question": "3. An encoder maps a 6-dimensional input to a 3-dimensional latent vector using a weight matrix of shape 6×3. Under the tied-weights assumption, what should be the shape of the decoder weight matrix?",
        "options": [
          "6 × 3",
          "3 × 6",
          "3 × 3",
          "6 × 6"
        ],
        "correctAnswer": "3 × 6",
        "explanation": "Tied weights constrain the decoder weight matrix to be the transpose of the encoder weight matrix: (6 × 3)^T = 3 × 6."
      },
      {
        "question": "4. A convolutional autoencoder uses transposed convolution in the decoder. The reconstructed images contain regular grid-like bright and dark patterns. Which modification is most directly intended to reduce this problem?",
        "options": [
          "Replace the convolutional encoder with a dense encoder",
          "Increase the number of latent dimensions indefinitely",
          "Use upsampling followed by ordinary convolution",
          "Remove all nonlinear activation functions"
        ],
        "correctAnswer": "Use upsampling followed by ordinary convolution",
        "explanation": "Checkerboard/grid artifacts arise from uneven overlap in transposed convolutions. Replacing them with nearest-neighbor or bilinear upsampling followed by standard convolution directly resolves this issue."
      },
      {
        "question": "5. A clean binary input vector contains 20 components. Masking noise independently sets each component to zero with probability 0.30. What is the expected number of components masked in one corrupted input?",
        "options": [
          "3",
          "6",
          "14",
          "20"
        ],
        "correctAnswer": "6",
        "explanation": "Expected value E[X] = n × p = 20 × 0.30 = 6 components."
      },
      {
        "question": "6. In a denoising autoencoder, which pair is used during training?",
        "options": [
          "Clean input as input and corrupted input as target",
          "Corrupted input as input and the same corrupted input as target",
          "Corrupted input as input and clean input as target",
          "Random latent vector as input and clean input as target"
        ],
        "correctAnswer": "Corrupted input as input and clean input as target",
        "explanation": "A denoising autoencoder (DAE) receives a corrupted version x̃ as input and is trained to recover the original clean input x as its target."
      },
      {
        "question": "7. In a sparse autoencoder, the desired average activation of a hidden neuron is 0.05, but its actual average activation is 0.40. Which statement is correct?",
        "options": [
          "The sparsity penalty for this neuron will be zero",
          "The neuron is less active than desired",
          "The neuron is too active and receives a relatively large sparsity penalty",
          "The reconstruction loss must automatically become zero"
        ],
        "correctAnswer": "The neuron is too active and receives a relatively large sparsity penalty",
        "explanation": "Since the neuron's average activation (0.40) is substantially higher than the target threshold ρ = 0.05, KL divergence imposes a heavy sparsity penalty to suppress it."
      },
      {
        "question": "8. A sparse autoencoder contains many hidden neurons, but only a few neurons are active for any given input. Why can it still learn useful representations despite having an overcomplete hidden layer?",
        "options": [
          "The sparsity constraint prevents all hidden neurons from being freely active at the same time",
          "The decoder is removed during training",
          "The input is always compressed to fewer dimensions",
          "The hidden activations are forced to be exactly equal for every input"
        ],
        "correctAnswer": "The sparsity constraint prevents all hidden neurons from being freely active at the same time",
        "explanation": "By penalizing dense activations, the sparsity constraint acts as an information bottleneck that forces the network to discover salient statistical patterns rather than learning an unconstrained identity map."
      },
      {
        "question": "9. An input has 8 dimensions, and the hidden representation of a contractive auto encoder has 3 dimensions. What is the shape of the Jacobian of the hidden representation with respect to the input?",
        "options": [
          "8 × 8",
          "3 × 3",
          "8 × 3",
          "3 × 8"
        ],
        "correctAnswer": "3 × 8",
        "explanation": "The Jacobian matrix J = ∂h / ∂x contains partial derivatives of the 3 hidden outputs with respect to the 8 input features, giving dimension 3 × 8."
      },
      {
        "question": "10. A standard autoencoder reconstructs every training sample with very low error, but its latent codes perform poorly in clustering and classification. What is the most accurate conclusion?",
        "options": [
          "Low reconstruction error guarantees that the latent representation is semantically meaningful",
          "The decoder must be using an incorrect activation function",
          "Good reconstruction does not necessarily imply that the latent features are useful for downstream tasks",
          "The latent dimension must always be increased"
        ],
        "correctAnswer": "Good reconstruction does not necessarily imply that the latent features are useful for downstream tasks",
        "explanation": "Reconstruction objective only measures fidelity of signal reproduction; without proper regularization or inductive biases, the latent space can lack semantic structure or separability."
      }
    ]
  },
  {
    "id": "genai-week-3",
    "title": "Fundamentals of Generative AI - Week 3 Assignment 3",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. The true data distribution contains two well-separated modes. A limited-capacity model is trained by minimizing forward KL divergence. Which behaviour is most likely?",
        "options": [
          "The learned distribution concentrates on only one mode.",
          "The learned distribution becomes broad enough to cover both modes, including the low-density region between them.",
          "The learned distribution assigns zero probability between the modes.",
          "The learned distribution must exactly reproduce both modes"
        ],
        "correctAnswer": "The learned distribution becomes broad enough to cover both modes, including the low-density region between them.",
        "explanation": "Forward KL D_KL(P || Q) is zero-avoiding (mean-seeking/mode-covering): it heavily penalizes Q(x) being small wherever P(x) is non-zero, forcing Q to stretch across all modes."
      },
      {
        "question": "2. Suppose the true distribution contains both cat and dog images, but a limited-capacity model trained using reverse KL divergence generates only sharp cat images. Which statement is most accurate?",
        "options": [
          "The model demonstrates mode-covering behaviour",
          "The model has necessarily learned the complete data distribution",
          "The model demonstrates mode-seeking behaviour and has missed a valid mode",
          "The KL divergence between the two distributions must be zero"
        ],
        "correctAnswer": "The model demonstrates mode-seeking behaviour and has missed a valid mode",
        "explanation": "Reverse KL D_KL(Q || P) is zero-forcing (mode-seeking): Q incurs zero penalty for placing zero mass on regions where P > 0, leading it to lock onto a single mode."
      },
      {
        "question": "3. An event occurs with probability: p(x) = 1/8, Using logarithm base 2, what is its self-information?",
        "options": [
          "1 bit",
          "2 bits",
          "3 bits",
          "8 bits"
        ],
        "correctAnswer": "3 bits",
        "explanation": "Self-information I(x) = -log2(p(x)) = -log2(1/8) = log2(8) = 3 bits."
      },
      {
        "question": "4. Which probability distribution has the highest entropy?",
        "options": [
          "[1.0, 0.0]",
          "[0.9, 0.1]",
          "[0.7, 0.3]",
          "[0.5, 0.5]"
        ],
        "correctAnswer": "[0.5, 0.5]",
        "explanation": "Entropy is maximized when the distribution is uniform. For two discrete outcomes, [0.5, 0.5] achieves maximum entropy of 1.0 bit."
      },
      {
        "question": "5. The true class is represented by the target distribution :P = [1, 0]. Two models predict: Model A: Q₁ = [0.8, 0.2]; Model B: Q₂ = [0.6, 0.4]. Which statement is correct?",
        "options": [
          "Model B has lower cross-entropy because it assigns more probability to the incorrect class",
          "Model A has lower cross-entropy because it assigns higher probability to the correct class",
          "Both models have equal cross-entropy because their probabilities add to 1",
          "Cross-entropy cannot be calculated for one-hot target distributions"
        ],
        "correctAnswer": "Model A has lower cross-entropy because it assigns higher probability to the correct class",
        "explanation": "Cross-entropy H(P, Q) = -1·ln(q1) - 0·ln(q2) = -ln(q1). Since 0.8 > 0.6, -ln(0.8) < -ln(0.6), so Model A achieves lower cross-entropy."
      },
      {
        "question": "6. Why does a VAE encoder learn an approximate posterior distribution qϕ(z|x) instead of directly computing the true posterior pθ(z|x)?",
        "options": [
          "The true posterior cannot depend on the observed input",
          "The true posterior requires an intractable evidence term involving integration over all possible latent values",
          "The approximate posterior does not contain any trainable parameters",
          "The true posterior is always a standard normal distribution"
        ],
        "correctAnswer": "The true posterior requires an intractable evidence term involving integration over all possible latent values",
        "explanation": "By Bayes' theorem, p(z|x) = p(x|z)p(z) / p(x). The marginal likelihood p(x) = ∫ p(x|z)p(z)dz is intractable in high-dimensional continuous latent spaces."
      },
      {
        "question": "7. A VAE encoder has a latent dimension of 5. It outputs one mean and one log-variance for every latent dimension. How many scalar values must the encoder output for the latent distribution?",
        "options": [
          "5",
          "7",
          "10",
          "15"
        ],
        "correctAnswer": "10",
        "explanation": "For 5 latent dimensions, the encoder predicts 5 mean values μ and 5 log-variance values log(σ²), totaling 10 scalar values."
      },
      {
        "question": "8. A decoder is designed for binary-valued images. Which output and likelihood combination is most appropriate?",
        "options": [
          "Unbounded linear outputs with a Gaussian likelihood only",
          "Probabilities between 0 and 1 with a Bernoulli likelihood",
          "Negative variance values with a Poisson likelihood",
          "A single class label with no probability distribution"
        ],
        "correctAnswer": "Probabilities between 0 and 1 with a Bernoulli likelihood",
        "explanation": "For binary pixel intensities in {0, 1}, the natural probabilistic model is independent Bernoulli trials parameterized by probabilities in [0, 1] output via sigmoid."
      },
      {
        "question": "9. The Evidence Lower Bound (ELBO) for a VAE contains two main components: 1. Expected reconstruction log-likelihood, 2. KL-divergence regularization. Suppose the encoder distribution becomes very close to the prior, but the decoder assigns very low probability to the observed input.",
        "options": [
          "The ELBO must be high because the KL-divergence term is small",
          "The ELBO may still be low because the reconstruction term is poor",
          "The reconstruction term does not affect the ELBO",
          "The VAE has necessarily learned a perfect latent representation"
        ],
        "correctAnswer": "The ELBO may still be low because the reconstruction term is poor",
        "explanation": "ELBO = E_q[log p(x|z)] - D_KL. Even with D_KL ≈ 0, a heavily negative reconstruction log-likelihood results in a low overall ELBO."
      },
      {
        "question": "10. The reparameterization trick expresses the latent variable as: z = μ + σ ⊙ ε where ε ∼ N(0, I). Which statement is correct during backpropagation?",
        "options": [
          "ε is learned by the encoder and updated using gradient descent",
          "ε is treated as constant with respect to μ and σ, allowing gradients to flow through μ and σ",
          "The derivative of z with respect to μ is zero",
          "The derivative of z with respect to σ is always one"
        ],
        "correctAnswer": "ε is treated as constant with respect to μ and σ, allowing gradients to flow through μ and σ",
        "explanation": "The reparameterization trick isolates the stochasticity into independent standard Gaussian noise ε, allowing gradients to backpropagate cleanly through deterministic operations on μ and σ."
      }
    ]
  },
  {
    "id": "genai-week-4",
    "title": "Fundamentals of Generative AI - Week 4 Assignment 4",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. A VAE is trained on face images. During testing, increasing only z2 changes the person’s smile, head orientation, and lighting simultaneously. What does this observation most strongly indicate?",
        "options": [
          "The latent representation is perfectly regularized",
          "The latent representation is entangled",
          "The decoder has ignored Z2",
          "The reconstruction loss has become zero"
        ],
        "correctAnswer": "The latent representation is entangled",
        "explanation": "When changing a single latent variable alters multiple independent semantic properties simultaneously, the generative factors are entangled."
      },
      {
        "question": "2. Which observation provides the strongest evidence that a latent representation is disentangled?",
        "options": [
          "Every latent variable has a mean exactly equal to zero",
          "The decoder reconstructs every training image perfectly",
          "Changing one latent variable mainly changes one meaningful property while other properties remain nearly unchanged",
          "All latent variables contain equal amounts of information"
        ],
        "correctAnswer": "Changing one latent variable mainly changes one meaningful property while other properties remain nearly unchanged",
        "explanation": "Disentangled representations have an axis-aligned correspondence between individual latent dimensions and real-world ground truth factors of variation."
      },
      {
        "question": "3. The objective function of a β-VAE is: Suppose β is increased to a very large value. Which outcome is most likely?",
        "options": [
          "The encoder can freely store more input-specific information",
          "The approximate posterior is pushed closer to the prior, but reconstruction quality may decrease",
          "The KL-divergence term becomes irrelevant",
          "The model becomes equivalent to a deterministic autoencoder"
        ],
        "correctAnswer": "The approximate posterior is pushed closer to the prior, but reconstruction quality may decrease",
        "explanation": "A very large β heavily prioritizes matching the isotropic Gaussian prior over faithful reconstruction, resulting in a severe information bottleneck that degrades reconstruction sharpness."
      },
      {
        "question": "4. An image dataset contains six important independent factors of variation, but a β-VAE has only three latent dimensions. Strong disentanglement is enforced. Which result is most reasonable?",
        "options": [
          "Each of the six factors will necessarily receive an independent latent dimension",
          "Some latent dimensions will automatically split into additional dimensions",
          "Only some dominant factors may be represented well, while others may be ignored or weakly represented",
          "The reconstruction loss must become exactly zero"
        ],
        "correctAnswer": "Only some dominant factors may be represented well, while others may be ignored or weakly represented",
        "explanation": "Because capacity (3 latent dimensions) is strictly less than generative factors (6), a strongly regularized bottleneck model captures only the top 3 dominant factors of variance."
      },
      {
        "question": "5. Why can β-annealing be preferable to using a large value of β from the beginning of training?",
        "options": [
          "It permanently removes the KL-divergence term",
          "It allows the model to first learn useful reconstruction information and then gradually impose stronger latent regularization",
          "It prevents the decoder from receiving latent variables",
          "It makes the latent variables deterministic throughout training"
        ],
        "correctAnswer": "It allows the model to first learn useful reconstruction information and then gradually impose stronger latent regularization",
        "explanation": "Starting with small β allows the autoencoder to bootstrap meaningful reconstruction representations without collapsing latent codes, before gradually increasing β to enforce disentanglement."
      },
      {
        "question": "6. For a one-dimensional latent variable:\n$q_\phi(z|x) = \mathcal{N}(\mu, \sigma^2)$\nand the prior is:\n$p(z) = \mathcal{N}(0, 1)$\nThe KL divergence is calculated as:\n$D_{KL} = \frac{1}{2} [\mu^2 + \sigma^2 - \log(\sigma^2) - 1]$\nFor: $\mu = 1$ and $\sigma^2 = 1$, what is the KL-divergence value?",
        "options": [
          "0",
          "0.25",
          "0.5",
          "1"
        ],
        "correctAnswer": "0.5",
        "explanation": "Substituting $\mu = 1$ and $\sigma^2 = 1$ into $D_{KL} = \frac{1}{2} [\mu^2 + \sigma^2 - \log(\sigma^2) - 1]$ yields $\frac{1}{2} [1^2 + 1 - \log(1) - 1] = \frac{1}{2} [1 + 1 - 0 - 1] = \frac{1}{2} [1] = 0.5."
      },
      {
        "question": "7. Which architecture correctly represents a Conditional Variational Autoencoder?",
        "options": [
          "Encoder learns $q_\phi(z|x)$, and decoder learns $p_\theta(x|z)$",
          "Encoder learns $q_\phi(z|x, y)$, and decoder learns $p_\theta(x|z, y)$",
          "Encoder learns $q_\phi(y|x)$, and decoder learns $p_\theta(x|z)$",
          "Encoder learns $q_\phi(z|y)$, and decoder learns $p_\theta(y|x)$"
        ],
        "correctAnswer": "Encoder learns $q_\phi(z|x, y)$, and decoder learns $p_\theta(x|z, y)",
        "explanation": "In a Conditional VAE (CVAE), both the inference network (encoder) and the generative network (decoder) are conditioned on the label or attribute vector y."
      },
      {
        "question": "8. During inference, the same latent vector (z) is supplied twice to a trained CVAE decoder. In the first case, the condition is y=[1, 0], and in the second case, it is y=[0, 1]. What is the most appropriate expectation?",
        "options": [
          "The outputs must be identical because (z) is unchanged",
          "The outputs may differ because the decoder uses both (z) and (y)",
          "The second condition is ignored during generation",
          "The latent vector must be sampled again before the condition can affect the output"
        ],
        "correctAnswer": "The outputs may differ because the decoder uses both (z) and (y)",
        "explanation": "Because the decoder generates reconstructions conditioned jointly on latent code z and condition vector y, different conditions y yield different generated outputs even when z is identical."
      },
      {
        "question": "9. Two input samples have the following latent representations: zA = (2, -1), zB = (-2, 3).\nLinear interpolation is performed using: zα = (1 - α)zA + αzB.\nWhat is the interpolated latent vector when α = 0.25?",
        "options": [
          "(0, 1)",
          "(1, 0)",
          "(-1, 2)",
          "(1, 1)"
        ],
        "correctAnswer": "(1, 0)",
        "explanation": "z_α = (1 - 0.25)(2, -1) + 0.25(-2, 3) = 0.75(2, -1) + 0.25(-2, 3) = (1.5, -0.75) + (-0.5, 0.75) = (1.0, 0)."
      },
      {
        "question": "10. Consider the latent-space interpolation formula: zα = (1 - α)zA + αzB. Which statement is correct?",
        "options": [
          "When α = 0, zα = zB, and when α = 1, zα = zA",
          "When α = 0.5, zα is always the zero vector",
          "When α = 0, zα = zA, and when α = 1, zα = zB",
          "Values between 0 and 1 always generate latent points outside the line segment joining zA and zB"
        ],
        "correctAnswer": "When α = 0, zα = zA, and when α = 1, zα = zB",
        "explanation": "At α = 0, (1 - 0)zA + 0·zB = zA. At α = 1, (1 - 1)zA + 1·zB = zB. For α ∈ [0, 1], zα traverses the convex line segment connecting zA to zB."
      }
    ]
  },
  {
    "id": "genai-week-5",
    "title": "Fundamentals of Generative AI - Week 5 Assignment 5",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. A VAE trained with pixel-wise mean squared error generates images with correct overall structure but blurred edges and textures. Which explanation is most appropriate?",
        "options": [
          "The decoder always ignores the latent vector",
          "Pixel-wise loss may encourage the decoder to average multiple plausible outputs",
          "The KL-divergence term forces every generated pixel to become zero",
          "Gaussian latent variables cannot represent image data"
        ],
        "correctAnswer": "Pixel-wise loss may encourage the decoder to average multiple plausible outputs",
        "explanation": "L2 pixel loss penalizes deviations from the conditional mean, leading the network to generate an average of all plausible sharp textures, which manifests as blurriness."
      },
      {
        "question": "2. During one generator-training step, a noise vector is passed through the generator and then through the discriminator. Which parameters should be updated in this step?",
        "options": [
          "Only the discriminator parameters",
          "Both generator and discriminator parameters",
          "Only the generator parameters",
          "Neither network’s parameters"
        ],
        "correctAnswer": "Only the generator parameters",
        "explanation": "During generator optimization, discriminator weights are frozen, and gradients pass back through the discriminator to update only the generator."
      },
      {
        "question": "3. During discriminator training, which target labels should be used?",
        "options": [
          "Real samples: 0; generated samples: 1",
          "Real samples: 1; generated samples: 0",
          "Real samples: 0.5; generated samples: 0.5",
          "Both real and generated samples: 1"
        ],
        "correctAnswer": "Real samples: 1; generated samples: 0",
        "explanation": "The standard supervised classification target labels for the discriminator are label 1 for real training data and label 0 for generated/synthetic samples."
      },
      {
        "question": "4. During generator training, the non-saturating binary cross-entropy loss is: LG = −log(D(G(z))). Suppose: D(G(z)) = 0.20. Using the natural logarithm, what is the generator loss, rounded to three decimal places?",
        "options": [
          "0.223",
          "0.800",
          "1.609",
          "2.303"
        ],
        "correctAnswer": "1.609",
        "explanation": "LG = -ln(0.20) ≈ 1.609."
      },
      {
        "question": "5. For one real sample and one generated sample, the discriminator loss is: LD = −log(D(x)) − log(1 − D(G(z))). Suppose D(x) = 0.80 and D(G(z)) = 0.30. Using the natural logarithm, what is the total discriminator loss, rounded to three decimal places?",
        "options": [
          "0.580",
          "0.916",
          "1.427",
          "2.120"
        ],
        "correctAnswer": "0.580",
        "explanation": "LD = -ln(0.80) - ln(1 - 0.30) = -ln(0.80) - ln(0.70) = 0.2231 + 0.3567 = 0.5798 ≈ 0.580."
      },
      {
        "question": "6. Consider the discriminator objective: log(D(x)) + log(1 − D(G(z))). Which pair of discriminator outputs maximizes this expression most effectively?",
        "options": [
          "D(x) → 0 and D(G(z)) → 1",
          "D(x) → 1 and D(G(z)) → 0",
          "D(x) → 0.5 and D(G(z)) → 0.5",
          "D(x) → 1 and D(G(z)) → 1"
        ],
        "correctAnswer": "D(x) → 1 and D(G(z)) → 0",
        "explanation": "When D(x) → 1, log(1) = 0. When D(G(z)) → 0, log(1 - 0) = 0. Their sum reaches 0, which is the global maximum of the negative cross-entropy."
      },
      {
        "question": "7. In the original GAN minimax value function, why can the generator ignore the real-sample term during its update?",
        "options": [
          "The real-sample term is always numerically equal to zero",
          "The real-sample term contains no generator output or generator parameters",
          "Real samples are not passed to the discriminator",
          "The discriminator is removed during generator training"
        ],
        "correctAnswer": "The real-sample term contains no generator output or generator parameters",
        "explanation": "The term E_{x~p_data}[log D(x)] is independent of generator parameters θ_G, so its gradient with respect to θ_G is identically zero."
      },
      {
        "question": "8. At the beginning of GAN training, the generated distribution is usually far from the real-data distribution. Which behaviour is most likely?",
        "options": [
          "The discriminator easily separates real and generated samples",
          "The discriminator outputs 0.5 for every sample",
          "The generator has already reached equilibrium",
          "The generated samples are necessarily identical to training samples"
        ],
        "correctAnswer": "The discriminator easily separates real and generated samples",
        "explanation": "Because initial generator outputs are unstructured noise, the discriminator can easily distinguish between real and fake samples with near-perfect accuracy."
      },
      {
        "question": "9. At the ideal GAN convergence point, what is the optimal discriminator output for samples from either distribution?",
        "options": [
          "0",
          "0.25",
          "0.5",
          "1"
        ],
        "correctAnswer": "0.5",
        "explanation": "At optimal convergence p_g = p_data, giving D*(x) = p_data(x) / (p_data(x) + p_g(x)) = 1/2 = 0.5 everywhere."
      },
      {
        "question": "10. Which statement best describes Nash equilibrium in a GAN?",
        "options": [
          "The generator loss becomes zero while the discriminator continues improving",
          "Both networks produce identical parameter values",
          "Neither network can improve its own outcome by changing its parameters alone while the other network remains fixed",
          "The discriminator classifies every generated sample as fake with complete confidence"
        ],
        "correctAnswer": "Neither network can improve its own outcome by changing its parameters alone while the other network remains fixed",
        "explanation": "A Nash equilibrium represents a state in a minimax zero-sum game where neither the generator nor the discriminator can unilaterally decrease its loss."
      }
    ]
  },
  {
    "id": "genai-week-6",
    "title": "Fundamentals of Generative AI - Week 6 Assignment 6",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Which of the following is the primary advantage of CycleGAN over Pix2Pix?",
        "options": [
          "It requires paired training images.",
          "It performs image classification.",
          "It can learn image-to-image translation using unpaired datasets.",
          "It generates only grayscale images."
        ],
        "correctAnswer": "It can learn image-to-image translation using unpaired datasets.",
        "explanation": "CycleGAN learns bidirectional mappings between domains without requiring paired corresponding examples in the training set."
      },
      {
        "question": "2. In CycleGAN, the cycle consistency loss ensures that:",
        "options": [
          "The discriminator always wins over the generator.",
          "The translated image can be converted back to the original image.",
          "Images have higher resolution.",
          "The latent vectors follow a Gaussian distribution"
        ],
        "correctAnswer": "The translated image can be converted back to the original image.",
        "explanation": "Cycle consistency enforces F(G(x)) ≈ x and G(F(y)) ≈ y, preventing mode collapse and ensuring content preservation."
      },
      {
        "question": "3. Which additional input distinguishes a Conditional GAN (cGAN) from a traditional GAN?",
        "options": [
          "Learning rate",
          "Noise vector only",
          "Condition or label information",
          "Batch size"
        ],
        "correctAnswer": "Condition or label information",
        "explanation": "cGAN conditions both the generator and discriminator on auxiliary information such as class labels or conditioning images."
      },
      {
        "question": "4. Pix2Pix is primarily designed for:",
        "options": [
          "Unpaired image translation",
          "Paired image-to-image translation",
          "Image classification",
          "Object detection"
        ],
        "correctAnswer": "Paired image-to-image translation",
        "explanation": "Pix2Pix is a supervised framework for paired image-to-image translation (e.g., edges-to-photo, map-to-aerial)."
      },
      {
        "question": "5. Which loss function is unique to Pix2Pix compared to a standard GAN?",
        "options": [
          "Cross-entropy loss only",
          "L1 reconstruction loss combined with adversarial loss",
          "Cycle consistency loss",
          "Triplet loss"
        ],
        "correctAnswer": "L1 reconstruction loss combined with adversarial loss",
        "explanation": "Pix2Pix combines conditional adversarial loss with an L1 reconstruction loss between the generated image and paired ground truth."
      },
      {
        "question": "6. StyleGAN controls image generation primarily through:",
        "options": [
          "Cycle consistency loss",
          "Style vectors injected at multiple layers of the generator",
          "Paired datasets",
          "Reinforcement learning"
        ],
        "correctAnswer": "Style vectors injected at multiple layers of the generator",
        "explanation": "StyleGAN feeds intermediate style vectors w into Adaptive Instance Normalization (AdaIN) layers at each resolution stage of the synthesis network."
      },
      {
        "question": "7. Which component in StyleGAN helps reduce the entanglement of latent features?",
        "options": [
          "PatchGAN discriminator",
          "Mapping network",
          "Cycle consistency module",
          "Skip connections"
        ],
        "correctAnswer": "Mapping network",
        "explanation": "The 8-layer MLP mapping network maps Gaussian latent z into an intermediate style space W, which avoids warping and disentangles semantic factors."
      },
      {
        "question": "8. Which of the following applications is best suited for CycleGAN rather than Pix2Pix?",
        "options": [
          "Converting architectural sketches into building photographs using paired data",
          "Translating horses into zebras without paired examples",
          "Image super-resolution using paired images",
          "Semantic segmentation from labeled datasets"
        ],
        "correctAnswer": "Translating horses into zebras without paired examples",
        "explanation": "Horse-to-zebra translation is an unpaired translation task where no direct 1-to-1 correspondences exist."
      },
      {
        "question": "9. In Pix2Pix, the discriminator commonly evaluates:",
        "options": [
          "Individual pixels independently",
          "The entire dataset statistics only",
          "Local image patches (PatchGAN)",
          "Only the latent vectors"
        ],
        "correctAnswer": "Local image patches (PatchGAN)",
        "explanation": "PatchGAN penalizes high-frequency structural errors by classifying whether each N×N local image patch is real or fake."
      },
      {
        "question": "10. Which statement correctly compares StyleGAN and Conditional GAN?",
        "options": [
          "Both require paired datasets",
          "StyleGAN mainly provides fine-grained control over image style, whereas cGAN controls generation using external conditions or labels.",
          "StyleGAN uses cycle consistency loss while cGAN does not.",
          "cGAN cannot generate realistic images."
        ],
        "correctAnswer": "StyleGAN mainly provides fine-grained control over image style, whereas cGAN controls generation using external conditions or labels.",
        "explanation": "StyleGAN focuses on unsupervised hierarchical feature control across multiple scales, while cGAN directs outputs based on explicit input conditioning labels."
      }
    ]
  },
  {
    "id": "genai-week-7",
    "title": "Fundamentals of Generative AI - Week 7 Assignment 7",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. What is the primary objective of the forward diffusion process in a DDPM?",
        "options": [
          "To generate realistic images directly",
          "To gradually add Gaussian noise until the data resembles pure noise",
          "To remove noise from an image in a single step",
          "To classify images into different categories"
        ],
        "correctAnswer": "To gradually add Gaussian noise until the data resembles pure noise",
        "explanation": "The forward diffusion process iteratively corrupts the original image by adding Gaussian noise over T timesteps until it resembles isotropic Gaussian noise."
      },
      {
        "question": "2. During the reverse diffusion process, the neural network is trained to predict:",
        "options": [
          "The original image labels",
          "The noise added at each timestep",
          "The image resolution",
          "The latent vector of a GAN"
        ],
        "correctAnswer": "The noise added at each timestep",
        "explanation": "In DDPM, the neural network ϵ_θ(x_t, t) is trained to estimate the noise vector ϵ that was added to corrupt x_0 into x_t."
      },
      {
        "question": "3. Why does the reverse diffusion process require multiple iterations?",
        "options": [
          "Because the GPU memory is insufficient.",
          "Because noise is removed gradually to approximate the reverse probability distribution.",
          "Because diffusion models cannot process large images.",
          "Because the generator needs paired training data."
        ],
        "correctAnswer": "Because noise is removed gradually to approximate the reverse probability distribution.",
        "explanation": "The reverse true posterior q(x_{t-1}|x_t) is approximately Gaussian only for sufficiently small noise steps, requiring small iterative denoising steps."
      },
      {
        "question": "4. What is the purpose of the variance schedule (βt) in a diffusion model?",
        "options": [
          "To determine the learning rate during training",
          "To control how much Gaussian noise is added at each timestep",
          "To initialize network weights",
          "To calculate image classification accuracy"
        ],
        "correctAnswer": "To control how much Gaussian noise is added at each timestep",
        "explanation": "The variance schedule β_1, ..., β_T controls the noise variance injected at each discrete timestep t."
      },
      {
        "question": "5. Compared to GANs, diffusion models generally:",
        "options": [
          "Produce images faster during inference.",
          "Require paired datasets for training.",
          "Generate higher-quality and more diverse images but with slower sampling.",
          "Do not require neural networks."
        ],
        "correctAnswer": "Generate higher-quality and more diverse images but with slower sampling.",
        "explanation": "Diffusion models offer superior sample diversity and training stability, but require iterative multi-step denoising during inference."
      },
      {
        "question": "6. Why are diffusion models generally slower than GANs during image generation?",
        "options": [
          "They require a discriminator during inference.",
          "They generate the image through many iterative denoising steps.",
          "They require paired training images.",
          "They train a separate model for every timestep."
        ],
        "correctAnswer": "They generate the image through many iterative denoising steps.",
        "explanation": "Generating an image requires passing through many sequential evaluations (often 50–1000 steps) of the neural network."
      },
      {
        "question": "7. Which statement best describes the difference between the forward and reverse diffusion processes?",
        "options": [
          "Both processes add Gaussian noise to the image.",
          "The forward process removes noise, while the reverse process adds noise.",
          "The forward process gradually adds noise, whereas the reverse process progressively removes it.",
          "Both processes use the same trained neural network."
        ],
        "correctAnswer": "The forward process gradually adds noise, whereas the reverse process progressively removes it.",
        "explanation": "The forward process is a fixed Markov chain that destroys structure by adding noise, while the reverse process is a learned neural network that reconstructs data."
      },
      {
        "question": "8. During the reverse diffusion process, the model predicts the noise ϵθ(xt,t) instead of directly predicting the clean image x0. What is the primary reason for this design choice?",
        "options": [
          "Predicting noise is computationally cheaper because no neural network is required.",
          "Noise follows a simple Gaussian distribution, making the learning objective more stable than directly predicting x0.",
          "Predicting x0 is mathematically impossible.",
          "It eliminates the need for the forward diffusion process."
        ],
        "correctAnswer": "Noise follows a simple Gaussian distribution, making the learning objective more stable than directly predicting x0.",
        "explanation": "Predicting the zero-mean unit-variance noise simplifies the learning target and leads to reweighted variational bounds that stabilize training."
      },
      {
        "question": "9. Consider the forward diffusion equation where ϵ∼N(0,I). If the coefficients multiplying the image and noise are 0.9 and 0.436, respectively, which statement is correct?",
        "options": [
          "The noisy image consists of 90% original image information and 10% Gaussian noise.",
          "The noisy image consists of 81% original image information and 19% Gaussian noise.",
          "The coefficients multiplying the image and noise are 0.9 and 0.436, respectively.",
          "The original image contributes 0.81, while the noise contributes 0.19 directly."
        ],
        "correctAnswer": "The coefficients multiplying the image and noise are 0.9 and 0.436, respectively.",
        "explanation": "In x_t = √(α_bar_t) x_0 + √(1 - α_bar_t) ϵ, for α_bar_t = 0.81, the multiplying weights are √(0.81) = 0.9 and √(0.19) ≈ 0.436."
      },
      {
        "question": "10. In a Denoising Diffusion Probabilistic Model (DDPM), the forward diffusion process is fixed and does not require any training, whereas the reverse diffusion process is learned using a neural network. Why is this design adopted?",
        "options": [
          "Because the forward process is deterministic, while the reverse process is stochastic.",
          "Because adding Gaussian noise follows a known probability distribution, but reversing the process requires learning the complex data distribution.",
          "Because the reverse process does not involve probability distributions.",
          "Because the forward process requires labeled training data, while the reverse process does not."
        ],
        "correctAnswer": "Because adding Gaussian noise follows a known probability distribution, but reversing the process requires learning the complex data distribution.",
        "explanation": "Forward noising is analytical because the transition kernel is known, while reverse denoising requires estimating the intractable gradient of the data distribution."
      }
    ]
  },
  {
    "id": "genai-week-8",
    "title": "Fundamentals of Generative AI - Week 8 Assignment 8",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Which neural network architecture is most commonly used in modern diffusion models for image generation?",
        "options": [
          "VGG16",
          "ResNet18",
          "U-Net with attention mechanisms",
          "AlexNet"
        ],
        "correctAnswer": "U-Net with attention mechanisms",
        "explanation": "Modern diffusion models use an encoder-decoder U-Net backbone equipped with residual blocks, spatial down/up-sampling, and self/cross-attention."
      },
      {
        "question": "2. Which of the following is the primary role of the U-Net in a diffusion model?",
        "options": [
          "To classify noisy images into categories.",
          "To predict the Gaussian noise present in the noisy image at each timestep.",
          "To generate random latent vectors.",
          "To optimize the noise schedule."
        ],
        "correctAnswer": "To predict the Gaussian noise present in the noisy image at each timestep.",
        "explanation": "The U-Net takes noisy image x_t and timestep t and predicts the added noise component ϵ."
      },
      {
        "question": "3. Time-step embeddings are provided to the U-Net because they:",
        "options": [
          "Increase image resolution.",
          "Inform the network about the current stage of the diffusion process.",
          "Replace positional encoding in transformers.",
          "Reduce the dataset size."
        ],
        "correctAnswer": "Inform the network about the current stage of the diffusion process.",
        "explanation": "Timestep embeddings provide vital conditioning on current noise variance levels across the reverse diffusion process."
      },
      {
        "question": "4. In classifier-free guidance, image generation is controlled by:",
        "options": [
          "A separate image classifier only.",
          "Interpolating between conditional and unconditional model predictions.",
          "Removing the noise schedule.",
          "Training two discriminators."
        ],
        "correctAnswer": "Interpolating between conditional and unconditional model predictions.",
        "explanation": "CFG linearly combines predictions: ϵ_guided = ϵ_uncond + s · (ϵ_cond - ϵ_uncond)."
      },
      {
        "question": "5. What is the main purpose of the attention layers inside a diffusion model's U-Net?",
        "options": [
          "To reduce the number of diffusion steps.",
          "To capture long-range dependencies between different regions of the image.",
          "To replace convolutional layers completely.",
          "To perform image classification."
        ],
        "correctAnswer": "To capture long-range dependencies between different regions of the image.",
        "explanation": "Self-attention enables the model to integrate global context and correlate distant spatial features across the canvas."
      },
      {
        "question": "6. Which statement best explains why diffusion models are considered more stable to train than GANs?",
        "options": [
          "They do not use neural networks.",
          "They optimize a supervised denoising objective instead of an adversarial min-max game.",
          "They require much smaller datasets.",
          "They eliminate the need for loss functions."
        ],
        "correctAnswer": "They optimize a supervised denoising objective instead of an adversarial min-max game.",
        "explanation": "Diffusion models optimize standard L2 mean squared error loss on regression targets, avoiding minimax instability and mode collapse."
      },
      {
        "question": "7. In text-to-image diffusion models such as Stable Diffusion, how is the generated image guided toward the user's prompt?",
        "options": [
          "By conditioning the denoising process on text embeddings.",
          "By changing the learning rate during inference.",
          "By increasing the image resolution after generation.",
          "By training a separate GAN for every prompt."
        ],
        "correctAnswer": "By conditioning the denoising process on text embeddings.",
        "explanation": "Pretrained text encoders (like CLIP or T5) generate text embeddings that feed into the U-Net's cross-attention layers."
      },
      {
        "question": "8. Which of the following is a major advantage of Latent Diffusion Models (LDMs) over pixel-space diffusion models?",
        "options": [
          "They eliminate the need for a neural network.",
          "They generate images without any denoising steps.",
          "They require fewer training images because they use GANs.",
          "They perform diffusion in a compressed latent space, reducing computation and memory requirements."
        ],
        "correctAnswer": "They perform diffusion in a compressed latent space, reducing computation and memory requirements.",
        "explanation": "Operating in a perceptually equivalent low-dimensional latent space reduces training and sampling computational overhead by orders of magnitude."
      },
      {
        "question": "9. Which statement best explains the key advantage of Classifier-Free Guidance (CFG) over Classifier-Guided Diffusion?",
        "options": [
          "It eliminates the need for a separately trained classifier by combining conditional and unconditional predictions from the same diffusion model.",
          "It generates images without using a diffusion model.",
          "It removes the reverse diffusion process entirely.",
          "It requires fewer denoising steps than any other diffusion model."
        ],
        "correctAnswer": "It eliminates the need for a separately trained classifier by combining conditional and unconditional predictions from the same diffusion model.",
        "explanation": "CFG avoids training and evaluating an auxiliary noise-aware classifier by training a single diffusion model with condition dropout."
      },
      {
        "question": "10. During inference, increasing the guidance scale in Classifier-Free Guidance (CFG) primarily results in:",
        "options": [
          "Faster image generation because fewer denoising steps are required.",
          "Images that follow the conditioning prompt more closely, although excessively high guidance may reduce diversity and introduce artifacts.",
          "Complete removal of Gaussian noise in a single step.",
          "Better image quality regardless of the prompt."
        ],
        "correctAnswer": "Images that follow the conditioning prompt more closely, although excessively high guidance may reduce diversity and introduce artifacts.",
        "explanation": "Higher guidance scales strongly enforce prompt adherence, though very high values cause over-saturation and unnatural artifacts."
      }
    ]
  },
  {
    "id": "genai-week-9",
    "title": "Fundamentals of Generative AI - Week 9 Assignment 9",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Which of the following is the primary reason for using word embeddings instead of one-hot encoding in NLP?",
        "options": [
          "One-hot encoding preserves semantic similarity between words",
          "Word embeddings represent words as dense vectors that capture semantic relationships",
          "Word embeddings require a larger vocabulary than one-hot encoding.",
          "One-hot encoding reduces computational complexity more than word embeddings."
        ],
        "correctAnswer": "Word embeddings represent words as dense vectors that capture semantic relationships",
        "explanation": "Word embeddings project words into continuous low-dimensional spaces where geometric distances reflect semantic similarities."
      },
      {
        "question": "2. Which NLP preprocessing technique helps reduce different forms of the same word (e.g., 'playing,' 'played,' 'plays') to a common root while considering the word's meaning?",
        "options": [
          "Tokenization",
          "Stop-word removal",
          "Lemmatization",
          "Padding"
        ],
        "correctAnswer": "Lemmatization",
        "explanation": "Lemmatization applies vocabulary and morphological analysis to return the base dictionary headword (lemma) of a word."
      },
      {
        "question": "3. Why are Recurrent Neural Networks (RNNs) more suitable for sequence data than traditional feedforward neural networks?",
        "options": [
          "RNNs use convolution operations.",
          "RNNs process all input tokens simultaneously.",
          "RNNs require fewer parameters than feedforward networks.",
          "RNNs maintain a hidden state that carries information from previous time steps."
        ],
        "correctAnswer": "RNNs maintain a hidden state that carries information from previous time steps.",
        "explanation": "RNNs pass an internal hidden state forward across timesteps, enabling persistent memory of preceding context."
      },
      {
        "question": "4. Consider an LSTM processing a sentence one word at a time. At a particular time step, the forget gate outputs values close to 1, while the input gate outputs values close to 0. What is the most likely effect on the cell state?",
        "options": [
          "The previous cell state is largely retained, and very little new information is added.",
          "The previous cell state is discarded and replaced entirely with new information.",
          "Both the previous and new information are ignored, making the cell state zero.",
          "The hidden state becomes identical to the candidate cell state."
        ],
        "correctAnswer": "The previous cell state is largely retained, and very little new information is added.",
        "explanation": "The cell update is C_t = f_t * C_{t-1} + i_t * C~_t. With f_t ≈ 1 and i_t ≈ 0, the previous cell state is retained and new information is suppressed."
      },
      {
        "question": "5. Which problem commonly limits the ability of standard RNNs to learn long-term dependencies?",
        "options": [
          "Overfitting",
          "Vanishing and exploding gradients.",
          "Class imbalance",
          "Data augmentation"
        ],
        "correctAnswer": "Vanishing and exploding gradients.",
        "explanation": "Repeated Jacobian matrix multiplications across time cause backpropagated error gradients to exponentially shrink or explode."
      },
      {
        "question": "6. Which gate in an LSTM decides which information from the previous cell state should be discarded?",
        "options": [
          "Input Gate",
          "Output Gate",
          "Forget Gate",
          "Candidate Gate"
        ],
        "correctAnswer": "Forget Gate",
        "explanation": "The forget gate f_t = σ(W_f · [h_{t-1}, x_t] + b_f) computes values in [0, 1] determining what proportion of historical cell memory to discard."
      },
      {
        "question": "7. The candidate cell state C~ in an LSTM is primarily responsible for:",
        "options": [
          "Predicting the output label.",
          "Proposing new information that may be added to the cell state.",
          "Removing unnecessary neurons.",
          "Updating the learning rate."
        ],
        "correctAnswer": "Proposing new information that may be added to the cell state.",
        "explanation": "The candidate cell state C~_t generates candidate values via tanh activation that can be selectively gated into the cell state."
      },
      {
        "question": "8. Which statement correctly distinguishes the cell state from the hidden state in an LSTM?",
        "options": [
          "Both contain identical information.",
          "The cell state stores long-term information, while the hidden state represents the current output passed to the next layer or timestep.",
          "The hidden state stores long-term memory, while the cell state stores short-term memory.",
          "The cell state is only used during training."
        ],
        "correctAnswer": "The cell state stores long-term information, while the hidden state represents the current output passed to the next layer or timestep.",
        "explanation": "The cell state serves as the long-term internal memory carrier, while the hidden state is the filtered external representation."
      },
      {
        "question": "9. Which activation functions are commonly used in the gates of an LSTM?",
        "options": [
          "ReLU for all gates",
          "Sigmoid for gates and tanh for candidate cell state",
          "Softmax for gates and sigmoid for outputs",
          "Only tanh for all computations"
        ],
        "correctAnswer": "Sigmoid for gates and tanh for candidate cell state",
        "explanation": "Gates utilize sigmoid activations to output scale factors in [0, 1], while the candidate cell state and cell squashing use tanh in [-1, 1]."
      },
      {
        "question": "10. Why do LSTMs perform better than standard RNNs on long text sequences?",
        "options": [
          "They process all words simultaneously.",
          "Their gating mechanism helps preserve important information and mitigates the vanishing gradient problem",
          "They eliminate the need for backpropagation.",
          "They use convolutional filters to analyze text."
        ],
        "correctAnswer": "Their gating mechanism helps preserve important information and mitigates the vanishing gradient problem",
        "explanation": "Additive linear updates along the constant error carousel protect gradients from vanishing over long sequences."
      }
    ]
  },
  {
    "id": "genai-week-10",
    "title": "Fundamentals of Generative AI - Week 10 Assignment 10",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. What is the primary advantage of the Transformer architecture over RNNs and LSTMs?",
        "options": [
          "It processes tokens sequentially, reducing memory usage.",
          "It requires fewer parameters than RNNs.",
          "It eliminates the need for positional information.",
          "It uses self-attention to process all tokens in parallel, enabling efficient learning of long-range dependencies."
        ],
        "correctAnswer": "It uses self-attention to process all tokens in parallel, enabling efficient learning of long-range dependencies.",
        "explanation": "Self-attention enables parallel sequence processing and connects any two tokens in O(1) path length regardless of distance."
      },
      {
        "question": "2. Why are positional encodings added to the input embeddings in a Transformer?",
        "options": [
          "To provide information about the order of tokens since self-attention itself is order-independent.",
          "To increase the vocabulary size.",
          "To reduce the number of model parameters.",
          "To replace token embeddings."
        ],
        "correctAnswer": "To provide information about the order of tokens since self-attention itself is order-independent.",
        "explanation": "Self-attention is permutation-equivariant; positional encodings provide essential word order and structural positioning."
      },
      {
        "question": "3. Which statement correctly distinguishes encoder self-attention from decoder masked self-attention?",
        "options": [
          "Encoder self-attention attends only to previoustokens.",
          "Decoder masked self-attention prevents each token from attending to future tokens during training.",
          "Both mechanisms use identical attention masks.",
          "Encoder self-attention ignores positional encodings."
        ],
        "correctAnswer": "Decoder masked self-attention prevents each token from attending to future tokens during training.",
        "explanation": "Causal masking prevents the decoder from attending to future tokens, preserving the autoregressive property during training."
      },
      {
        "question": "4. BERT is primarily trained using which learning objective?",
        "options": [
          "Next-word prediction only.",
          "Masked Language Modeling (MLM) and Next Sentence Prediction (NSP).",
          "Image classification.",
          "Reinforcement learning."
        ],
        "correctAnswer": "Masked Language Modeling (MLM) and Next Sentence Prediction (NSP).",
        "explanation": "BERT is pretrained on Masked Language Modeling (MLM) and Next Sentence Prediction (NSP)."
      },
      {
        "question": "5. Why is BERT considered a bidirectional language model?",
        "options": [
          "It predicts text from right to left only.",
          "It processes the input sequence using context from both the left and right of each token.",
          "It uses two separate encoders.",
          "It translates text in both directions."
        ],
        "correctAnswer": "It processes the input sequence using context from both the left and right of each token.",
        "explanation": "BERT uses unmasked self-attention across the entire sequence to condition representations on both left and right contexts."
      },
      {
        "question": "6. GPT differs from BERT because GPT:",
        "options": [
          "Uses only the encoder stack of the Transformer.",
          "Uses only the decoder stack with masked self-attention for autoregressive text generation.",
          "Is trained only on labeled datasets.",
          "Does not use self-attention."
        ],
        "correctAnswer": "Uses only the decoder stack with masked self-attention for autoregressive text generation.",
        "explanation": "GPT is an autoregressive decoder-only Transformer model designed for left-to-right generation."
      },
      {
        "question": "7. Which application is more suitable for GPT than BERT?",
        "options": [
          "Sentiment classification",
          "Named Entity Recognition (NER)",
          "Automatic text generation and conversational AI",
          "Masked word prediction"
        ],
        "correctAnswer": "Automatic text generation and conversational AI",
        "explanation": "Autoregressive generation models like GPT excel at open-ended text completion and dialogue generation."
      },
      {
        "question": "8. In prompt engineering, what is the primary purpose of providing few-shot examples?",
        "options": [
          "To guide the model toward the desired response format or reasoning pattern without updating its parameters.",
          "To retrain the language model.",
          "To reduce the vocabulary size.",
          "To increase the model's training accuracy."
        ],
        "correctAnswer": "To guide the model toward the desired response format or reasoning pattern without updating its parameters.",
        "explanation": "Few-shot prompting provides in-context demonstrations that guide formatting and reasoning behavior without weight optimization."
      },
      {
        "question": "9. Which of the following prompts is an example of Chain-of-Thought (CoT) prompting?",
        "options": [
          "Translate the following sentence into French.",
          "Classify this review as positive or negative.",
          "Solve the problem step by step before giving the final answer.",
          "Summarize the following paragraph in one sentence."
        ],
        "correctAnswer": "Solve the problem step by step before giving the final answer.",
        "explanation": "'Let's think step by step' is canonical Chain-of-Thought prompting, directing the model to output intermediate reasoning steps."
      },
      {
        "question": "10. Which statement correctly compares BERT and GPT?",
        "options": [
          "BERT uses an encoder-only architecture for bidirectional language understanding, whereas GPT uses a decoder-only architecture for autoregressive text generation.",
          "BERT and GPT both use encoder-only architectures but differ only in the size of their training datasets.",
          "GPT is bidirectional and predicts masked tokens, whereas BERT predicts the next word using causal attention.",
          "Both BERT and GPT require paired input-output datasets during pretraining."
        ],
        "correctAnswer": "BERT uses an encoder-only architecture for bidirectional language understanding, whereas GPT uses a decoder-only architecture for autoregressive text generation.",
        "explanation": "BERT is an encoder-only bidirectional understanding architecture, while GPT is a decoder-only autoregressive causal generation architecture."
      }
    ]
  },
  {
    "id": "genai-week-11",
    "title": "Fundamentals of Generative AI - Week 11 Assignment 11",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. What is the primary motivation for using Retrieval-Augmented Generation (RAG)?",
        "options": [
          "To increase the number of parameters in the language model",
          "To ground generated responses using external information retrieved",
          "To replace tokenization with document retrieval",
          "To eliminate the need for a language model"
        ],
        "correctAnswer": "To ground generated responses using external information retrieved",
        "explanation": "RAG reduces hallucinations and grounds responses by fetching factual, up-to-date context from an external corpus."
      },
      {
        "question": "2. Which advantage does RAG provide when the underlying knowledge base changes frequently?",
        "options": [
          "The entire language model must be retrained after every change",
          "The tokenizer automatically learns the new information",
          "The external index can be updated without retraining the model",
          "The model permanently memorizes every retrieved document"
        ],
        "correctAnswer": "The external index can be updated without retraining the model",
        "explanation": "Knowledge bases can be dynamically updated, inserted, or removed from the vector database without retraining the foundational LLM."
      },
      {
        "question": "3. Which sequence correctly describes a basic RAG pipeline?",
        "options": [
          "Generation → Retrieval → Indexing → Chunking",
          "Retrieval → Model training → Tokenization → Generation",
          "Prompt construction → Chunking → Indexing → Retrieval",
          "Document indexing → Query retrieval → Prompt augmentation → Response generation"
        ],
        "correctAnswer": "Document indexing → Query retrieval → Prompt augmentation → Response generation",
        "explanation": "The standard RAG lifecycle consists of Document indexing, Query retrieval, Prompt augmentation, and Response generation."
      },
      {
        "question": "4. What is the primary role of the retriever in a RAG system?",
        "options": [
          "To identify documents relevant to the user query",
          "To generate the final natural-language response",
          "To update all parameters of the language model",
          "To select the decoding temperature"
        ],
        "correctAnswer": "To identify documents relevant to the user query",
        "explanation": "The retriever searches the index to identify and rank candidate documents relevant to the query."
      },
      {
        "question": "5. What is the primary purpose of a vector database in a dense RAG pipeline?",
        "options": [
          "To train the embedding model",
          "To generate answers without using an LLM and bypassing it",
          "To convert retrieved passages into labels",
          "To store vector representations for similarity search"
        ],
        "correctAnswer": "To store vector representations for similarity search",
        "explanation": "Vector databases index dense embedding vectors to enable rapid approximate nearest neighbor (ANN) similarity search."
      },
      {
        "question": "6. Why are long documents commonly divided into smaller chunks before indexing?",
        "options": [
          "Language models can only retrieve complete documents",
          "To allow retrieving more focused and relevant passages",
          "Chunking increases the number of model parameters",
          "Chunking removes the need for an embedding model"
        ],
        "correctAnswer": "To allow retrieving more focused and relevant passages",
        "explanation": "Chunking segments documents into semantically focused units that fit context windows and improve retrieval precision."
      },
      {
        "question": "7. What is a major advantage of dense retrieval over purely lexical retrieval?",
        "options": [
          "It does not require an indexed corpus",
          "It can retrieve semantically related passages with different words",
          "It guarantees that every retrieved document is correlated and correct",
          "It does not require a similarity function"
        ],
        "correctAnswer": "It can retrieve semantically related passages with different words",
        "explanation": "Dense embeddings encode conceptual semantics, matching queries to documents that express similar ideas with different vocabulary."
      },
      {
        "question": "8. What is the purpose of metadata filtering in document retrieval?",
        "options": [
          "To modify the parameters of the embedding model",
          "To summarize every document before retrieval",
          "To restrict retrieval using irrelevant attributes",
          "To replace semantic similarity with random selection"
        ],
        "correctAnswer": "To restrict retrieval using irrelevant attributes",
        "explanation": "Metadata filtering pre-filters or post-filters search space using structured attributes (such as dates, authors, categories, or tags)."
      },
      {
        "question": "9. What does Precision@k measure in a retrieval system?",
        "options": [
          "The percentage of generated tokens copied from the documents",
          "The average length of the top k documents",
          "The Percentage of relevant documents in top k retrieved results",
          "The time required to generate k responses"
        ],
        "correctAnswer": "The Percentage of relevant documents in top k retrieved results",
        "explanation": "Precision@k computes the fraction of relevant passages among the top-k retrieved items."
      },
      {
        "question": "10. In a basic retrieve-then-generate system, how is retrieved information usually provided to the language model?",
        "options": [
          "It is inserted into the prompt as additional context",
          "It is used to replace the tokenizer vocabulary",
          "It is converted into new trainable parameters",
          "It is used only after the answer has been generated"
        ],
        "correctAnswer": "It is inserted into the prompt as additional context",
        "explanation": "Retrieved passages are formatted into the input prompt as supporting context for the generator."
      }
    ]
  },
  {
    "id": "genai-week-12",
    "title": "Fundamentals of Generative AI - Week 12 Assignment 12",
    "subject": "Fundamentals of Generative AI",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. What is the primary mechanism used by decoder-only LLMs to generate text?",
        "options": [
          "Predicting all output tokens simultaneously",
          "Predicting the next token based on the previous",
          "Retrieving a response from the training dataset",
          "Classifying the input into a fixed set of possible responses"
        ],
        "correctAnswer": "Predicting all output tokens simultaneously",
        "explanation": "Selected answer from the submitted assignment. Note: Autoregressive decoder-only language models predict text sequentially based on preceding context."
      },
      {
        "question": "2. Why can the same language model generate different responses to the same prompt?",
        "options": [
          "The model has trained parameters as random variables",
          "The tokenizer assigns different token IDs on every run",
          "Probabilistic decoding can sample different tokens",
          "The model retrieves a different training example for every query"
        ],
        "correctAnswer": "Probabilistic decoding can sample different tokens",
        "explanation": "Stochastic decoding strategies such as temperature scaling, top-k, and top-p (nucleus) sampling introduce randomness when selecting the next token from the predicted probability distribution."
      },
      {
        "question": "3. Which task is most naturally formulated as text generation rather than text classification?",
        "options": [
          "Assigning an email to spam or not",
          "Identifying whether a review is positive or negative",
          "Identifying the language in which a sentence is written",
          "Producing a summary of a long document"
        ],
        "correctAnswer": "Producing a summary of a long document",
        "explanation": "Summarization requires generating a novel sequence of natural language tokens, whereas spam detection, sentiment analysis, and language identification map inputs to categorical labels (classification)."
      },
      {
        "question": "4. What is a major limitation of relying only on an LLM's parametric knowledge for text generation?",
        "options": [
          "The model may not generate grammatically correct sentences",
          "Its knowledge may be outdated or incomplete",
          "It cannot encode prompts outside the training corpus",
          "It can generate only text seen exactly during training"
        ],
        "correctAnswer": "Its knowledge may be outdated or incomplete",
        "explanation": "Parametric knowledge is fixed at training time cut-off, making the model prone to hallucinations when asked about recent, private, or specialized factual knowledge not present in its weights."
      },
      {
        "question": "5. In a multimodal language model, what is the main role of a modality-specific encoder?",
        "options": [
          "To make non-text inputs usable by the language model",
          "To generate the final textual answer without using the language model",
          "To replace the language model's tokenizer",
          "To evaluate whether the non-text input can be encoded"
        ],
        "correctAnswer": "To make non-text inputs usable by the language model",
        "explanation": "A modality-specific encoder (such as a ViT for images or Whisper/wav2vec for audio) extracts features and representations from raw sensory inputs so they can be projected into the language model's token/embedding space."
      },
      {
        "question": "6. What is the purpose of aligning visual or acoustic representations with the language model's representation space?",
        "options": [
          "To allow information of different modalities to be jointly processed",
          "To ensure that all images and audio clips have the same dimension",
          "To eliminate the need for text instructions",
          "To convert the non-text modality input tokens to text tokens"
        ],
        "correctAnswer": "To allow information of different modalities to be jointly processed",
        "explanation": "Cross-modal projection/alignment maps vision or audio features into the same embedding space as text tokens, allowing the transformer layers to attend across modalities simultaneously using cross-attention or concatenated sequence self-attention."
      },
      {
        "question": "7. Why is processing a long video generally more computationally expensive than processing a single image?",
        "options": [
          "Video frames cannot be represented using image encoders",
          "Videos contain multiple temporally ordered frames",
          "Each video frame requires a separate language model",
          "Video models cannot reuse visual encoders"
        ],
        "correctAnswer": "Videos contain multiple temporally ordered frames",
        "explanation": "A video consists of dozens or hundreds of frames across time, multiplying the token count and dramatically increasing quadratic self-attention complexity over temporal and spatial dimensions."
      },
      {
        "question": "8. What is the best practical advantage of using a smaller language model?",
        "options": [
          "It always contains less conflicting factual knowledge",
          "It reduces hallucinations",
          "It generally requires less computation",
          "It requires less training data"
        ],
        "correctAnswer": "It generally requires less computation",
        "explanation": "Smaller language models have lower memory footprints (VRAM), faster inference latency, lower energy consumption, and can run efficiently on edge devices or commodity GPUs."
      },
      {
        "question": "9. What is meant by bias in the output of an AI model?",
        "options": [
          "The model consistently generates only short responses",
          "The model produces skewed outcomes for certain groups",
          "The model uses a fixed decoding temperature",
          "The model requires more computation for minority group prompts"
        ],
        "correctAnswer": "The model produces skewed outcomes for certain groups",
        "explanation": "AI output bias manifests when the model systematically exhibits prejudice, uneven performance, or skewed representations favoring or disfavoring specific demographic or societal groups."
      },
      {
        "question": "10. Which is a major source of social bias in large language models?",
        "options": [
          "Stereotypes present in the training data",
          "Lower learning rate used by LLMs for minority group data",
          "Different lengths of the model's context window for majority and minority group data",
          "The number of attention heads used for minority group data"
        ],
        "correctAnswer": "Stereotypes present in the training data",
        "explanation": "LLMs trained on massive web corpora inherit human cultural biases, historical prejudices, and stereotypes reflected in unfiltered text on the internet."
      }
    ]
  },
    {
      "id": "genai-pending",
      "title": "Pending",
      "subject": "Fundamentals of Generative AI",
      "date": "14/10/2026",
      "questions": [
        {
          "question": "1. A model is trained on digit images without labels and later generates new digit-like images. Which distribution is the model primarily learning?",
          "options": [
            "p(y|x)",
            "p(x, y)",
            "p(x)",
            "p(y)"
          ],
          "correctAnswer": "p(x)",
          "explanation": "An unsupervised generative model trained on unlabeled digit images learns the true underlying marginal distribution of the input data p(x) in order to sample new digit-like images."
        },
        {
          "question": "2. A generative model is trained to generate a medical image only when the condition \"tumor present\" is provided. Which probability distribution best describes this task?",
          "options": [
            "p(x)",
            "p(y|x)",
            "p(x|y)",
            "p(x,y) only"
          ],
          "correctAnswer": "p(x|y)",
          "explanation": "Conditional generative models generate samples x conditioned on a given attribute or label y (here, y = 'tumor present'). Thus, it models the conditional distribution p(x|y)."
        },
        {
          "question": "3. A decoder produces one output value for every binary pixel, and each value must represent the probability that the pixel is 1. Which output-layer and loss combination is most appropriate?",
          "options": [
            "Linear activation with mean squared error",
            "Sigmoid activation with binary cross-entropy",
            "Softmax activation with categorical cross-entropy",
            "ReLU activation with mean squared error"
          ],
          "correctAnswer": "Sigmoid activation with binary cross-entropy",
          "explanation": "For independent binary pixels where each output represents the probability of pixel value being 1 (in range [0, 1]), the sigmoid activation function combined with binary cross-entropy loss is the theoretically principled choice."
        },
        {
          "question": "4. An optimizer accumulates the squared gradients of a parameter over all previous training steps. After many updates, its effective learning rate becomes extremely small. Which optimizer is being described?",
          "options": [
            "Momentum",
            "AdaGrad",
            "RMSProp",
            "Standard mini-batch SGD"
          ],
          "correctAnswer": "AdaGrad",
          "explanation": "AdaGrad divides the learning rate by the square root of the sum of all historical squared gradients without decay. As steps accumulate, the denominator grows monotonically, causing the effective step size to diminish prematurely."
        },
        {
          "question": "5. Which statement correctly distinguishes RMSProp from AdaGrad?",
          "options": [
            "RMSProp uses only the current gradient and ignores previous gradients",
            "RMSProp accumulates all past squared gradients without decay",
            "RMSProp uses an exponentially weighted moving average of recent squared gradients",
            "RMSProp does not use adaptive learning rates"
          ],
          "correctAnswer": "RMSProp uses an exponentially weighted moving average of recent squared gradients",
          "explanation": "Unlike AdaGrad which accumulates all past squared gradients indefinitely, RMSProp uses an exponentially decaying moving average of past squared gradients, allowing it to adapt to recent curvature without diminishing the learning rate to zero."
        },
        {
          "question": "6. A dataset contains standardized continuous-valued features that can take negative as well as positive values. Which decoder output and loss combination is most appropriate?",
          "options": [
            "Sigmoid output with binary cross-entropy",
            "Softmax output with categorical cross-entropy",
            "Linear output with mean squared error",
            "ReLU output with binary cross-entropy"
          ],
          "correctAnswer": "Linear output with mean squared error",
          "explanation": "For continuous standardized features that span both positive and negative real numbers, a linear output layer with mean squared error (MSE) reconstruction loss is the standard principled choice."
        },
        {
          "question": "7. An encoder maps a 6-dimensional input to a 3-dimensional latent vector using a weight matrix of shape 6x3. Under the tied-weights assumption, what should be the shape of the decoder weight matrix?",
          "options": [
            "6 x 3",
            "3 x 6",
            "3 x 3",
            "6 x 6"
          ],
          "correctAnswer": "3 x 6",
          "explanation": "Tied weights constrain the decoder weight matrix to be the transpose of the encoder weight matrix: (6 x 3)^T = 3 x 6."
        },
        {
          "question": "8. A clean binary input vector contains 20 components. Masking noise independently sets each component to zero with probability 0.30. What is the expected number of components masked in one corrupted input?",
          "options": [
            "3",
            "6",
            "14",
            "20"
          ],
          "correctAnswer": "6",
          "explanation": "Expected value E[X] = n x p = 20 x 0.30 = 6 components."
        },
        {
          "question": "9. In a denoising autoencoder, which pair is used during training?",
          "options": [
            "Clean input as input and corrupted input as target",
            "Corrupted input as input and the same corrupted input as target",
            "Corrupted input as input and clean input as target",
            "Random latent vector as input and clean input as target"
          ],
          "correctAnswer": "Corrupted input as input and clean input as target",
          "explanation": "A denoising autoencoder (DAE) receives a corrupted version x~ as input and is trained to recover the original clean input x as its target."
        },
        {
          "question": "10. In a sparse autoencoder, the desired average activation of a hidden neuron is 0.05, but its actual average activation is 0.40. Which statement is correct?",
          "options": [
            "The sparsity penalty for this neuron will be zero",
            "The neuron is less active than desired",
            "The neuron is too active and receives a relatively large sparsity penalty",
            "The reconstruction loss must automatically become zero"
          ],
          "correctAnswer": "The neuron is too active and receives a relatively large sparsity penalty",
          "explanation": "Since the neuron's average activation (0.40) is substantially higher than the target threshold $\\rho = 0.05$, KL divergence imposes a heavy sparsity penalty to suppress it."
        },
        {
          "question": "11. A standard autoencoder reconstructs every training sample with very low error, but its latent codes perform poorly in clustering and classification. What is the most accurate conclusion?",
          "options": [
            "Low reconstruction error guarantees that the latent representation is semantically meaningful",
            "The decoder must be using an incorrect activation function",
            "Good reconstruction does not necessarily imply that the latent features are useful for downstream tasks",
            "The latent dimension must always be increased"
          ],
          "correctAnswer": "Good reconstruction does not necessarily imply that the latent features are useful for downstream tasks",
          "explanation": "Reconstruction objective only measures fidelity of signal reproduction; without proper regularization or inductive biases, the latent space can lack semantic structure or separability."
        },
        {
          "question": "12. The true data distribution contains two well-separated modes. A limited-capacity model is trained by minimizing forward KL divergence. Which behaviour is most likely?",
          "options": [
            "The learned distribution concentrates on only one mode.",
            "The learned distribution becomes broad enough to cover both modes, including the low-density region between them.",
            "The learned distribution assigns zero probability between the modes.",
            "The learned distribution must exactly reproduce both modes"
          ],
          "correctAnswer": "The learned distribution becomes broad enough to cover both modes, including the low-density region between them.",
          "explanation": "Forward KL D_KL(P || Q) is zero-avoiding (mean-seeking/mode-covering): it heavily penalizes Q(x) being small wherever P(x) is non-zero, forcing Q to stretch across all modes."
        },
        {
          "question": "13. Suppose the true distribution contains both cat and dog images, but a limited-capacity model trained using reverse KL divergence generates only sharp cat images. Which statement is most accurate?",
          "options": [
            "The model demonstrates mode-covering behaviour",
            "The model has necessarily learned the complete data distribution",
            "The model demonstrates mode-seeking behaviour and has missed a valid mode",
            "The KL divergence between the two distributions must be zero"
          ],
          "correctAnswer": "The model demonstrates mode-seeking behaviour and has missed a valid mode",
          "explanation": "Reverse KL D_KL(Q || P) is zero-forcing (mode-seeking): Q incurs zero penalty for placing zero mass on regions where P > 0, leading it to lock onto a single mode."
        },
        {
          "question": "14. An event occurs with probability: p(x) = 1/8, Using logarithm base 2, what is its self-information?",
          "options": [
            "1 bit",
            "2 bits",
            "3 bits",
            "8 bits"
          ],
          "correctAnswer": "3 bits",
          "explanation": "Self-information I(x) = -log2(p(x)) = -log2(1/8) = log2(8) = 3 bits."
        },
        {
          "question": "15. A VAE encoder has a latent dimension of 5. It outputs one mean and one log-variance for every latent dimension. How many scalar values must the encoder output for the latent distribution?",
          "options": [
            "5",
            "7",
            "10",
            "15"
          ],
          "correctAnswer": "10",
          "explanation": "For 5 latent dimensions, the encoder predicts 5 mean values $\\mu$ and 5 log-variance values $\\log(\\sigma^2)$, totaling 10 scalar values."
        },
        {
          "question": "16. The Evidence Lower Bound (ELBO) for a VAE contains two main components: 1. Expected reconstruction log-likelihood, 2. KL-divergence regularization. Suppose the encoder distribution becomes very close to the prior, but the decoder assigns very low probability to the observed input.",
          "options": [
            "The ELBO must be high because the KL-divergence term is small",
            "The ELBO may still be low because the reconstruction term is poor",
            "The reconstruction term does not affect the ELBO",
            "The VAE has necessarily learned a perfect latent representation"
          ],
          "correctAnswer": "The ELBO may still be low because the reconstruction term is poor",
          "explanation": "$\\text{ELBO} = \\mathbb{E}_q[\\log p(x|z)] - D_{KL}$. Even with $D_{KL} \\approx 0$, a heavily negative reconstruction log-likelihood results in a low overall ELBO."
        },
        {
          "question": "17. The reparameterization trick expresses the latent variable as: $z = \\mu + \\sigma \\odot \\epsilon$ where $\\epsilon \\sim \\mathcal{N}(0, I)$. Which statement is correct during backpropagation?",
          "options": [
            "$\\epsilon$ is learned by the encoder and updated using gradient descent",
            "$\\epsilon$ is treated as constant with respect to $\\mu$ and $\\sigma$, allowing gradients to flow through $\\mu$ and $\\sigma$",
            "The derivative of $z$ with respect to $\\epsilon$ is zero",
            "The derivative of $z$ with respect to $\\epsilon$ is always one"
          ],
          "correctAnswer": "$\\epsilon$ is treated as constant with respect to $\\mu$ and $\\sigma$, allowing gradients to flow through $\\mu$ and $\\sigma$",
          "explanation": "The reparameterization trick isolates the stochasticity into independent standard Gaussian noise $\\epsilon$, allowing gradients to backpropagate cleanly through deterministic operations on $\\mu$ and $\\sigma$."
        },
        {
          "question": "18. A VAE is trained on face images. During testing, increasing only z2 changes the person's smile, head orientation, and lighting simultaneously. What does this observation most strongly indicate?",
          "options": [
            "The latent representation is perfectly regularized",
            "The latent representation is entangled",
            "The decoder has ignored Z2",
            "The reconstruction loss has become zero"
          ],
          "correctAnswer": "The latent representation is entangled",
          "explanation": "When changing a single latent variable alters multiple independent semantic properties simultaneously, the generative factors are entangled."
        },
        {
          "question": "19. An image dataset contains six important independent factors of variation, but a $\\beta$-VAE has only three latent dimensions. Strong disentanglement is enforced. Which result is most reasonable?",
          "options": [
            "Each of the six factors will necessarily receive an independent latent dimension",
            "Some latent dimensions will automatically split into additional dimensions",
            "Only some dominant factors may be represented well, while others may be ignored or weakly represented",
            "The reconstruction loss must become exactly zero"
          ],
          "correctAnswer": "Only some dominant factors may be represented well, while others may be ignored or weakly represented",
          "explanation": "Because capacity (3 latent dimensions) is strictly less than generative factors (6), a strongly regularized bottleneck model captures only the top 3 dominant factors of variance."
        },
        {
          "question": "20. For a one-dimensional latent variable:\n$q_\phi(z|x) = \mathcal{N}(\mu, \sigma^2)$\nand the prior is:\n$p(z) = \mathcal{N}(0, 1)$\nThe KL divergence is calculated as:\n$D_{KL} = \frac{1}{2} [\mu^2 + \sigma^2 - \log(\sigma^2) - 1]$\nFor: $\mu = 1$ and $\sigma^2 = 1$, what is the KL-divergence value?",
          "options": [
            "0",
            "0.25",
            "0.5",
            "1"
          ],
          "correctAnswer": "0.5",
          "explanation": "Substituting $\\mu = 1$ and $\\sigma^2 = 1$ into $D_{KL} = \\frac{1}{2} [\\mu^2 + \\sigma^2 - \\log(\\sigma^2) - 1]$ yields $\\frac{1}{2} [1^2 + 1 - \\log(1) - 1] = \\frac{1}{2} [1 + 1 - 0 - 1] = \\frac{1}{2} [1] = 0.5$."
        },
        {
          "question": "21. Which architecture correctly represents a Conditional Variational Autoencoder?",
          "options": [
            "Encoder learns $q_\\phi(z|x)$, and decoder learns $p_\\theta(x|z)$",
            "Encoder learns $q_\\phi(z|x, y)$, and decoder learns $p_\\theta(x|z, y)$",
            "Encoder learns $q_\\phi(y|x)$, and decoder learns $p_\\theta(x|z)$",
            "Encoder learns $q_\\phi(z|y)$, and decoder learns $p_\\theta(y|x)$"
          ],
          "correctAnswer": "Encoder learns $q_\\phi(z|x, y)$, and decoder learns $p_\\theta(x|z, y)",
          "explanation": "In a Conditional VAE (CVAE), both the inference network (encoder) and the generative network (decoder) are conditioned on the label or attribute vector $y$."
        },
        {
          "question": "22. During inference, the same latent vector ($z$) is supplied twice to a trained CVAE decoder. In the first case, the condition is $y=[1, 0]$, and in the second case, it is $y=[0, 1]$. What is the most appropriate expectation?",
          "options": [
            "The outputs must be identical because ($z$) is unchanged",
            "The outputs may differ because the decoder uses both ($z$) and ($y$)",
            "The second condition is ignored during generation",
            "The latent vector must be sampled again before the condition can affect the output"
          ],
          "correctAnswer": "The outputs may differ because the decoder uses both ($z$) and ($y$)",
          "explanation": "Because the decoder generates reconstructions conditioned jointly on latent code $z$ and condition vector $y$, different conditions $y$ yield different generated outputs even when $z$ is identical."
        },
        {
          "question": "23. Consider the latent-space interpolation formula: $z_\\alpha = (1 - \\alpha)z_A + \\alpha z_B$. Which statement is correct?",
          "options": [
            "When $\\alpha = 0$, $z_\\alpha = z_B$, and when $\\alpha = 1$, $z_\\alpha = z_A$",
            "When $\\alpha = 0.5$, $z_\\alpha$ is always the zero vector",
            "When $\\alpha = 0$, $z_\\alpha = z_A$, and when $\\alpha = 1$, $z_\\alpha = z_B$",
            "Values between 0 and 1 always generate latent points outside the line segment joining $z_A$ and $z_B$"
          ],
          "correctAnswer": "When $\\alpha = 0$, $z_\\alpha = z_A$, and when $\\alpha = 1$, $z_\\alpha = z_B$",
          "explanation": "At $\\alpha = 0$, $(1 - 0)z_A + 0 \\cdot z_B = z_A$. At $\\alpha = 1$, $(1 - 1)z_A + 1 \\cdot z_B = z_B$. For $\\alpha \\in [0, 1]$, $z_\\alpha$ traverses the convex line segment connecting $z_A$ to $z_B$."
        },
        {
          "question": "24. A VAE trained with pixel-wise mean squared error generates images with correct overall structure but blurred edges and textures. Which explanation is most appropriate?",
          "options": [
            "The decoder always ignores the latent vector",
            "Pixel-wise loss may encourage the decoder to average multiple plausible outputs",
            "The KL-divergence term forces every generated pixel to become zero",
            "Gaussian latent variables cannot represent image data"
          ],
          "correctAnswer": "Pixel-wise loss may encourage the decoder to average multiple plausible outputs",
          "explanation": "L2 pixel loss penalizes deviations from the conditional mean, leading the network to generate an average of all plausible sharp textures, which manifests as blurriness."
        },
        {
          "question": "25. During one generator-training step, a noise vector is passed through the generator and then through the discriminator. Which parameters should be updated in this step?",
          "options": [
            "Only the discriminator parameters",
            "Both generator and discriminator parameters",
            "Only the generator parameters",
            "Neither network's parameters"
          ],
          "correctAnswer": "Only the generator parameters",
          "explanation": "During generator optimization, discriminator weights are frozen, and gradients pass back through the discriminator to update only the generator."
        },
        {
          "question": "26. During discriminator training, which target labels should be used?",
          "options": [
            "Real samples: 0; generated samples: 1",
            "Real samples: 1; generated samples: 0",
            "Real samples: 0.5; generated samples: 0.5",
            "Both real and generated samples: 1"
          ],
          "correctAnswer": "Real samples: 1; generated samples: 0",
          "explanation": "The standard supervised classification target labels for the discriminator are label 1 for real training data and label 0 for generated/synthetic samples."
        },
        {
          "question": "27. During generator training, the non-saturating binary cross-entropy loss is: $L_G = -\\log(D(G(z)))$. Suppose: $D(G(z)) = 0.20$. Using the natural logarithm, what is the generator loss, rounded to three decimal places?",
          "options": [
            "0.223",
            "0.800",
            "1.609",
            "2.303"
          ],
          "correctAnswer": "1.609",
          "explanation": "$L_G = -\\ln(0.20) \\approx 1.609$."
        },
        {
          "question": "28. For one real sample and one generated sample, the discriminator loss is: $L_D = -\\log(D(x)) - \\log(1 - D(G(z)))$. Suppose $D(x) = 0.80$ and $D(G(z)) = 0.30$. Using the natural logarithm, what is the total discriminator loss, rounded to three decimal places?",
          "options": [
            "0.580",
            "0.916",
            "1.427",
            "2.120"
          ],
          "correctAnswer": "0.580",
          "explanation": "$L_D = -\\ln(0.80) - \\ln(1 - 0.30) = -\\ln(0.80) - \\ln(0.70) = 0.2231 + 0.3567 = 0.5798 \\approx 0.580$."
        },
        {
          "question": "29. Consider the discriminator objective: log(D(x)) + log(1 - D(G(z))). Which pair of discriminator outputs maximizes this expression most effectively?",
          "options": [
            "D(x) \u001a 0 and D(G(z)) \u001a 1",
            "D(x) \u001a 1 and D(G(z)) \u001a 0",
            "D(x) \u001a 0.5 and D(G(z)) \u001a 0.5",
            "D(x) \u001a 1 and D(G(z)) \u001a 1"
          ],
          "correctAnswer": "D(x) \u001a 1 and D(G(z)) \u001a 0",
          "explanation": "When D(x) \u001a 1, log(1) = 0. When D(G(z)) \u001a 0, log(1 - 0) = 0. Their sum reaches 0, which is the global maximum of the negative cross-entropy."
        },
        {
          "question": "30. At the beginning of GAN training, the generated distribution is usually far from the real-data distribution. Which behaviour is most likely?",
          "options": [
            "The discriminator easily separates real and generated samples",
            "The discriminator outputs 0.5 for every sample",
            "The generator has already reached equilibrium",
            "The generated samples are necessarily identical to training samples"
          ],
          "correctAnswer": "The discriminator easily separates real and generated samples",
          "explanation": "Because initial generator outputs are unstructured noise, the discriminator can easily distinguish between real and fake samples with near-perfect accuracy."
        },
        {
          "question": "31. Which of the following is the primary advantage of CycleGAN over Pix2Pix?",
          "options": [
            "It requires paired training images.",
            "It performs image classification.",
            "It can learn image-to-image translation using unpaired datasets.",
            "It generates only grayscale images."
          ],
          "correctAnswer": "It can learn image-to-image translation using unpaired datasets.",
          "explanation": "CycleGAN learns bidirectional mappings between domains without requiring paired corresponding examples in the training set."
        },
        {
          "question": "32. In CycleGAN, the cycle consistency loss ensures that:",
          "options": [
            "The discriminator always wins over the generator.",
            "The translated image can be converted back to the original image.",
            "Images have higher resolution.",
            "The latent vectors follow a Gaussian distribution"
          ],
          "correctAnswer": "The translated image can be converted back to the original image.",
          "explanation": "Cycle consistency enforces $F(G(x)) \\approx x$ and $G(F(y)) \\approx y$, preventing mode collapse and ensuring content preservation."
        },
        {
          "question": "33. Which loss function is unique to Pix2Pix compared to a standard GAN?",
          "options": [
            "Cross-entropy loss only",
            "L1 reconstruction loss combined with adversarial loss",
            "Cycle consistency loss",
            "Triplet loss"
          ],
          "correctAnswer": "L1 reconstruction loss combined with adversarial loss",
          "explanation": "Pix2Pix combines conditional adversarial loss with an L1 reconstruction loss between the generated image and paired ground truth."
        },
        {
          "question": "34. StyleGAN controls image generation primarily through:",
          "options": [
            "Cycle consistency loss",
            "Style vectors injected at multiple layers of the generator",
            "Paired datasets",
            "Reinforcement learning"
          ],
          "correctAnswer": "Style vectors injected at multiple layers of the generator",
          "explanation": "StyleGAN feeds intermediate style vectors w into Adaptive Instance Normalization (AdaIN) layers at each resolution stage of the synthesis network."
        },
        {
          "question": "35. Which component in StyleGAN helps reduce the entanglement of latent features?",
          "options": [
            "PatchGAN discriminator",
            "Mapping network",
            "Cycle consistency module",
            "Skip connections"
          ],
          "correctAnswer": "Mapping network",
          "explanation": "The 8-layer MLP mapping network maps Gaussian latent z into an intermediate style space W, which avoids warping and disentangles semantic factors."
        },
        {
          "question": "36. Which of the following applications is best suited for CycleGAN rather than Pix2Pix?",
          "options": [
            "Converting architectural sketches into building photographs using paired data",
            "Translating horses into zebras without paired examples",
            "Image super-resolution using paired images",
            "Semantic segmentation from labeled datasets"
          ],
          "correctAnswer": "Translating horses into zebras without paired examples",
          "explanation": "Horse-to-zebra translation is an unpaired translation task where no direct 1-to-1 correspondences exist."
        },
        {
          "question": "37. Which statement correctly compares StyleGAN and Conditional GAN?",
          "options": [
            "Both require paired datasets",
            "StyleGAN mainly provides fine-grained control over image style, whereas cGAN controls generation using external conditions or labels.",
            "StyleGAN uses cycle consistency loss while cGAN does not.",
            "cGAN cannot generate realistic images."
          ],
          "correctAnswer": "StyleGAN mainly provides fine-grained control over image style, whereas cGAN controls generation using external conditions or labels.",
          "explanation": "StyleGAN focuses on unsupervised hierarchical feature control across multiple scales, while cGAN directs outputs based on explicit input conditioning labels."
        },
        {
          "question": "38. During the reverse diffusion process, the neural network is trained to predict:",
          "options": [
            "The original image labels",
            "The noise added at each timestep",
            "The image resolution",
            "The latent vector of a GAN"
          ],
          "correctAnswer": "The noise added at each timestep",
          "explanation": "In DDPM, the neural network $\\epsilon_\\theta(x_t, t)$ is trained to estimate the noise vector $\\epsilon$ that was added to corrupt $x_0$ into $x_t$."
        },
        {
          "question": "39. What is the purpose of the variance schedule ($\\beta_t$) in a diffusion model?",
          "options": [
            "To determine the learning rate during training",
            "To control how much Gaussian noise is added at each timestep",
            "To initialize network weights",
            "To calculate image classification accuracy"
          ],
          "correctAnswer": "To control how much Gaussian noise is added at each timestep",
          "explanation": "The variance schedule $\\beta_1, \\dots, \\beta_T$ controls the noise variance injected at each discrete timestep $t$."
        },
        {
          "question": "40. Why are diffusion models generally slower than GANs during image generation?",
          "options": [
            "They require a discriminator during inference.",
            "They generate the image through many iterative denoising steps.",
            "They require paired training images.",
            "They train a separate model for every timestep."
          ],
          "correctAnswer": "They generate the image through many iterative denoising steps.",
          "explanation": "Generating an image requires passing through many sequential evaluations (often 50-1000 steps) of the neural network."
        },
        {
          "question": "41. Which statement best describes the difference between the forward and reverse diffusion processes?",
          "options": [
            "Both processes add Gaussian noise to the image.",
            "The forward process removes noise, while the reverse process adds noise.",
            "The forward process gradually adds noise, whereas the reverse process progressively removes it.",
            "Both processes use the same trained neural network."
          ],
          "correctAnswer": "The forward process gradually adds noise, whereas the reverse process progressively removes it.",
          "explanation": "The forward process is a fixed Markov chain that destroys structure by adding noise, while the reverse process is a learned neural network that reconstructs data."
        },
        {
          "question": "42. During the reverse diffusion process, the model predicts the noise $\\epsilon_\\theta(x_t, t)$ instead of directly predicting the clean image $x_0$. What is the primary reason for this design choice?",
          "options": [
            "Predicting noise is computationally cheaper because no neural network is required.",
            "Noise follows a simple Gaussian distribution, making the learning objective more stable than directly predicting x0.",
            "Predicting x0 is mathematically impossible.",
            "It eliminates the need for the forward diffusion process."
          ],
          "correctAnswer": "Noise follows a simple Gaussian distribution, making the learning objective more stable than directly predicting x0.",
          "explanation": "Predicting the zero-mean unit-variance noise simplifies the learning target and leads to reweighted variational bounds that stabilize training."
        },
        {
          "question": "43. Which neural network architecture is most commonly used in modern diffusion models for image generation?",
          "options": [
            "VGG16",
            "ResNet18",
            "U-Net with attention mechanisms",
            "AlexNet"
          ],
          "correctAnswer": "U-Net with attention mechanisms",
          "explanation": "Modern diffusion models use an encoder-decoder U-Net backbone equipped with residual blocks, spatial down/up-sampling, and self/cross-attention."
        },
        {
          "question": "44. Which of the following is the primary role of the U-Net in a diffusion model?",
          "options": [
            "To classify noisy images into categories.",
            "To predict the Gaussian noise present in the noisy image at each timestep.",
            "To generate random latent vectors.",
            "To optimize the noise schedule."
          ],
          "correctAnswer": "To predict the Gaussian noise present in the noisy image at each timestep.",
          "explanation": "The U-Net takes noisy image $x_t$ and timestep $t$ and predicts the added noise component $\\epsilon$."
        },
        {
          "question": "45. Time-step embeddings are provided to the U-Net because they:",
          "options": [
            "Increase image resolution.",
            "Inform the network about the current stage of the diffusion process.",
            "Replace positional encoding in transformers.",
            "Reduce the dataset size."
          ],
          "correctAnswer": "Inform the network about the current stage of the diffusion process.",
          "explanation": "Timestep embeddings provide vital conditioning on current noise variance levels across the reverse diffusion process."
        },
        {
          "question": "46. In classifier-free guidance, image generation is controlled by:",
          "options": [
            "A separate image classifier only.",
            "Interpolating between conditional and unconditional model predictions.",
            "Removing the noise schedule.",
            "Training two discriminators."
          ],
          "correctAnswer": "Interpolating between conditional and unconditional model predictions.",
          "explanation": "CFG linearly combines predictions: $\\epsilon_{\\text{guided}} = \\epsilon_{\\text{uncond}} + s \\cdot (\\epsilon_{\\text{cond}} - \\epsilon_{\\text{uncond}})$."
        },
        {
          "question": "47. What is the main purpose of the attention layers inside a diffusion model's U-Net?",
          "options": [
            "To reduce the number of diffusion steps.",
            "To capture long-range dependencies between different regions of the image.",
            "To replace convolutional layers completely.",
            "To perform image classification."
          ],
          "correctAnswer": "To capture long-range dependencies between different regions of the image.",
          "explanation": "Self-attention enables the model to integrate global context and correlate distant spatial features across the canvas."
        },
        {
          "question": "48. Which statement best explains why diffusion models are considered more stable to train than GANs?",
          "options": [
            "They do not use neural networks.",
            "They optimize a supervised denoising objective instead of an adversarial min-max game.",
            "They require much smaller datasets.",
            "They eliminate the need for loss functions."
          ],
          "correctAnswer": "They optimize a supervised denoising objective instead of an adversarial min-max game.",
          "explanation": "Diffusion models optimize standard L2 mean squared error loss on regression targets, avoiding minimax instability and mode collapse."
        },
        {
          "question": "49. In text-to-image diffusion models such as Stable Diffusion, how is the generated image guided toward the user's prompt?",
          "options": [
            "By conditioning the denoising process on text embeddings.",
            "By changing the learning rate during inference.",
            "By increasing the image resolution after generation.",
            "By training a separate GAN for every prompt."
          ],
          "correctAnswer": "By conditioning the denoising process on text embeddings.",
          "explanation": "Pretrained text encoders (like CLIP or T5) generate text embeddings that feed into the U-Net's cross-attention layers."
        },
        {
          "question": "50. Which of the following is a major advantage of Latent Diffusion Models (LDMs) over pixel-space diffusion models?",
          "options": [
            "They eliminate the need for a neural network.",
            "They generate images without any denoising steps.",
            "They require fewer training images because they use GANs.",
            "They perform diffusion in a compressed latent space, reducing computation and memory requirements."
          ],
          "correctAnswer": "They perform diffusion in a compressed latent space, reducing computation and memory requirements.",
          "explanation": "Operating in a perceptually equivalent low-dimensional latent space reduces training and sampling computational overhead by orders of magnitude."
        },
        {
          "question": "51. Which NLP preprocessing technique helps reduce different forms of the same word (e.g., 'playing,' 'played,' 'plays') to a common root while considering the word's meaning?",
          "options": [
            "Tokenization",
            "Stop-word removal",
            "Lemmatization",
            "Padding"
          ],
          "correctAnswer": "Lemmatization",
          "explanation": "Lemmatization applies vocabulary and morphological analysis to return the base dictionary headword (lemma) of a word."
        },
        {
          "question": "52. Consider an LSTM processing a sentence one word at a time. At a particular time step, the forget gate outputs values close to 1, while the input gate outputs values close to 0. What is the most likely effect on the cell state?",
          "options": [
            "The previous cell state is largely retained, and very little new information is added.",
            "The previous cell state is discarded and replaced entirely with new information.",
            "Both the previous and new information are ignored, making the cell state zero.",
            "The hidden state becomes identical to the candidate cell state."
          ],
          "correctAnswer": "The previous cell state is largely retained, and very little new information is added.",
          "explanation": "The cell update is $C_t = f_t * C_{t-1} + i_t * \\tilde{C}_t$. With $f_t \\approx 1$ and $i_t \\approx 0$, the previous cell state is retained and new information is suppressed."
        },
        {
          "question": "53. Which gate in an LSTM decides which information from the previous cell state should be discarded?",
          "options": [
            "Input Gate",
            "Output Gate",
            "Forget Gate",
            "Candidate Gate"
          ],
          "correctAnswer": "Forget Gate",
          "explanation": "The forget gate $f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)$ computes values in $[0, 1]$ determining what proportion of historical cell memory to discard."
        },
        {
          "question": "54. Which statement correctly distinguishes the cell state from the hidden state in an LSTM?",
          "options": [
            "Both contain identical information.",
            "The cell state stores long-term information, while the hidden state represents the current output passed to the next layer or timestep.",
            "The hidden state stores long-term memory, while the cell state stores short-term memory.",
            "The cell state is only used during training."
          ],
          "correctAnswer": "The cell state stores long-term information, while the hidden state represents the current output passed to the next layer or timestep.",
          "explanation": "The cell state serves as the long-term internal memory carrier, while the hidden state is the filtered external representation."
        },
        {
          "question": "55. Which activation functions are commonly used in the gates of an LSTM?",
          "options": [
            "ReLU for all gates",
            "Sigmoid for gates and tanh for candidate cell state",
            "Softmax for gates and sigmoid for outputs",
            "Only tanh for all computations"
          ],
          "correctAnswer": "Sigmoid for gates and tanh for candidate cell state",
          "explanation": "Gates utilize sigmoid activations to output scale factors in [0, 1], while the candidate cell state and cell squashing use tanh in [-1, 1]."
        },
        {
          "question": "56. Why do LSTMs perform better than standard RNNs on long text sequences?",
          "options": [
            "They process all words simultaneously.",
            "Their gating mechanism helps preserve important information and mitigates the vanishing gradient problem",
            "They eliminate the need for backpropagation.",
            "They use convolutional filters to analyze text."
          ],
          "correctAnswer": "Their gating mechanism helps preserve important information and mitigates the vanishing gradient problem",
          "explanation": "Additive linear updates along the constant error carousel protect gradients from vanishing over long sequences."
        },
        {
          "question": "57. Why are positional encodings added to the input embeddings in a Transformer?",
          "options": [
            "To provide information about the order of tokens since self-attention itself is order-independent.",
            "To increase the vocabulary size.",
            "To reduce the number of model parameters.",
            "To replace token embeddings."
          ],
          "correctAnswer": "To provide information about the order of tokens since self-attention itself is order-independent.",
          "explanation": "Self-attention is permutation-equivariant; positional encodings provide essential word order and structural positioning."
        },
        {
          "question": "58. GPT differs from BERT because GPT:",
          "options": [
            "Uses only the encoder stack of the Transformer.",
            "Uses only the decoder stack with masked self-attention for autoregressive text generation.",
            "Is trained only on labeled datasets.",
            "Does not use self-attention."
          ],
          "correctAnswer": "Uses only the decoder stack with masked self-attention for autoregressive text generation.",
          "explanation": "GPT is an autoregressive decoder-only Transformer model designed for left-to-right generation."
        },
        {
          "question": "59. In prompt engineering, what is the primary purpose of providing few-shot examples?",
          "options": [
            "To guide the model toward the desired response format or reasoning pattern without updating its parameters.",
            "To retrain the language model.",
            "To reduce the vocabulary size.",
            "To increase the model's training accuracy."
          ],
          "correctAnswer": "To guide the model toward the desired response format or reasoning pattern without updating its parameters.",
          "explanation": "Few-shot prompting provides in-context demonstrations that guide formatting and reasoning behavior without weight optimization."
        },
        {
          "question": "60. Which of the following prompts is an example of Chain-of-Thought (CoT) prompting?",
          "options": [
            "Translate the following sentence into French.",
            "Classify this review as positive or negative.",
            "Solve the problem step by step before giving the final answer.",
            "Summarize the following paragraph in one sentence."
          ],
          "correctAnswer": "Solve the problem step by step before giving the final answer.",
          "explanation": "'Let's think step by step' is canonical Chain-of-Thought prompting, directing the model to output intermediate reasoning steps."
        },
        {
          "question": "61. Which statement correctly compares BERT and GPT?",
          "options": [
            "BERT uses an encoder-only architecture for bidirectional language understanding, whereas GPT uses a decoder-only architecture for autoregressive text generation.",
            "BERT and GPT both use encoder-only architectures but differ only in the size of their training datasets.",
            "GPT is bidirectional and predicts masked tokens, whereas BERT predicts the next word using causal attention.",
            "Both BERT and GPT require paired input-output datasets during pretraining."
          ],
          "correctAnswer": "BERT uses an encoder-only architecture for bidirectional language understanding, whereas GPT uses a decoder-only architecture for autoregressive text generation.",
          "explanation": "BERT is an encoder-only bidirectional understanding architecture, while GPT is a decoder-only autoregressive causal generation architecture."
        },
        {
          "question": "62. What is the primary motivation for using Retrieval-Augmented Generation (RAG)?",
          "options": [
            "To increase the number of parameters in the language model",
            "To ground generated responses using external information retrieved",
            "To replace tokenization with document retrieval",
            "To eliminate the need for a language model"
          ],
          "correctAnswer": "To ground generated responses using external information retrieved",
          "explanation": "RAG reduces hallucinations and grounds responses by fetching factual, up-to-date context from an external corpus."
        },
        {
          "question": "63. Which advantage does RAG provide when the underlying knowledge base changes frequently?",
          "options": [
            "The entire language model must be retrained after every change",
            "The tokenizer automatically learns the new information",
            "The external index can be updated without retraining the model",
            "The model permanently memorizes every retrieved document"
          ],
          "correctAnswer": "The external index can be updated without retraining the model",
          "explanation": "Knowledge bases can be dynamically updated, inserted, or removed from the vector database without retraining the foundational LLM."
        },
        {
          "question": "64. What is the primary purpose of a vector database in a dense RAG pipeline?",
          "options": [
            "To train the embedding model",
            "To generate answers without using an LLM and bypassing it",
            "To convert retrieved passages into labels",
            "To store vector representations for similarity search"
          ],
          "correctAnswer": "To store vector representations for similarity search",
          "explanation": "Vector databases index dense embedding vectors to enable rapid approximate nearest neighbor (ANN) similarity search."
        },
        {
          "question": "65. Why are long documents commonly divided into smaller chunks before indexing?",
          "options": [
            "Language models can only retrieve complete documents",
            "To allow retrieving more focused and relevant passages",
            "Chunking increases the number of model parameters",
            "Chunking removes the need for an embedding model"
          ],
          "correctAnswer": "To allow retrieving more focused and relevant passages",
          "explanation": "Chunking segments documents into semantically focused units that fit context windows and improve retrieval precision."
        },
        {
          "question": "66. What is a major advantage of dense retrieval over purely lexical retrieval?",
          "options": [
            "It does not require an indexed corpus",
            "It can retrieve semantically related passages with different words",
            "It guarantees that every retrieved document is correlated and correct",
            "It does not require a similarity function"
          ],
          "correctAnswer": "It can retrieve semantically related passages with different words",
          "explanation": "Dense embeddings encode conceptual semantics, matching queries to documents that express similar ideas with different vocabulary."
        },
        {
          "question": "67. What is the purpose of metadata filtering in document retrieval?",
          "options": [
            "To modify the parameters of the embedding model",
            "To summarize every document before retrieval",
            "To restrict retrieval using irrelevant attributes",
            "To replace semantic similarity with random selection"
          ],
          "correctAnswer": "To restrict retrieval using irrelevant attributes",
          "explanation": "Metadata filtering pre-filters or post-filters search space using structured attributes (such as dates, authors, categories, or tags)."
        },
        {
          "question": "68. What is the primary mechanism used by decoder-only LLMs to generate text?",
          "options": [
            "Predicting all output tokens simultaneously",
            "Predicting the next token based on the previous",
            "Retrieving a response from the training dataset",
            "Classifying the input into a fixed set of possible responses"
          ],
          "correctAnswer": "Predicting all output tokens simultaneously",
          "explanation": "Selected answer from the submitted assignment. Note: Autoregressive decoder-only language models predict text sequentially based on preceding context."
        },
        {
          "question": "69. What is the purpose of aligning visual or acoustic representations with the language model's representation space?",
          "options": [
            "To allow information of different modalities to be jointly processed",
            "To ensure that all images and audio clips have the same dimension",
            "To eliminate the need for text instructions",
            "To convert the non-text modality input tokens to text tokens"
          ],
          "correctAnswer": "To allow information of different modalities to be jointly processed",
          "explanation": "Cross-modal projection/alignment maps vision or audio features into the same embedding space as text tokens, allowing the transformer layers to attend across modalities simultaneously using cross-attention or concatenated sequence self-attention."
        },
        {
          "question": "70. What is meant by bias in the output of an AI model?",
          "options": [
            "The model consistently generates only short responses",
            "The model produces skewed outcomes for certain groups",
            "The model uses a fixed decoding temperature",
            "The model requires more computation for minority group prompts"
          ],
          "correctAnswer": "The model produces skewed outcomes for certain groups",
          "explanation": "AI output bias manifests when the model systematically exhibits prejudice, uneven performance, or skewed representations favoring or disfavoring specific demographic or societal groups."
        },
        {
          "question": "71. Which is a major source of social bias in large language models?",
          "options": [
            "Stereotypes present in the training data",
            "Lower learning rate used by LLMs for minority group data",
            "Different lengths of the model's context window for majority and minority group data",
            "The number of attention heads used for minority group data"
          ],
          "correctAnswer": "Stereotypes present in the training data",
          "explanation": "LLMs trained on massive web corpora inherit human cultural biases, historical prejudices, and stereotypes reflected in unfiltered text on the internet."
        }
      ]
    },
  {
    "id": "hr-analytics-week-1",
    "title": "HR Analytics - Week 1 Assignment 1",
    "subject": "HR Analytics",
    "date": "09/10/2026",
    "questions": [
      {
        "question": "1. Which of the following is NOT an example of a descriptive analytics tool used in HR?",
        "options": [
          "Mean and standard deviation",
          "Counts and ratios",
          "Decision trees and random forests",
          "Mode and median"
        ],
        "correctAnswer": "Decision trees and random forests",
        "explanation": "Decision trees and random forests are predictive analytics / machine learning tools, whereas mean, median, standard deviation, counts, and ratios are descriptive analytics tools."
      },
      {
        "question": "2. HR analytics differs from HRMIS primarily because HR analytics has the potential to connect HR processes and decisions with ______.",
        "options": [
          "Employee satisfaction scores only",
          "Regulatory compliance requirements",
          "Payroll and compensation structures",
          "Organization performance"
        ],
        "correctAnswer": "Organization performance",
        "explanation": "HR analytics connects HR processes and strategic decisions directly with organizational performance and business outcomes, moving beyond operational record-keeping typical of HRMIS."
      },
      {
        "question": "3. According to the criteria for good HR activity metrics, every metric must explicitly describe what it does NOT include. This rule primarily ensures ______.",
        "options": [
          "That metrics are visually appealing in dashboards",
          "Clarity and prevention of misinterpretation of calculations",
          "That metrics are aligned with competitor benchmarks",
          "That only positive outcomes are measured and reported"
        ],
        "correctAnswer": "Clarity and prevention of misinterpretation of calculations",
        "explanation": "Explicitly stating exclusions ensures clarity, consistent definitions, and prevents misinterpretation or manipulation in metric calculation."
      },
      {
        "question": "4. According to the criteria for good HR activity metrics, an organization should capture and track all possible metrics, even those not currently being used, to build a comprehensive data history.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Tracking unnecessary metrics leads to metric clutter, wasted resources, and analysis paralysis. Effective metrics focus specifically on actionable, strategically aligned needs."
      },
      {
        "question": "5. A good HR problem definition must cover three elements. Which of the following correctly lists all three?",
        "options": [
          "A statement of what, a statement of why, and a desired state or outcome",
          "A statement of who, a statement of when, and a budget estimate",
          "A statement of the problem, a timeline, and a team assignment",
          "A cost-benefit analysis, a risk assessment, and an expected output"
        ],
        "correctAnswer": "A statement of what, a statement of why, and a desired state or outcome",
        "explanation": "A complete problem definition requires articulating what the issue is, why it matters, and the target/desired outcome."
      },
      {
        "question": "6. The overconfidence trap is described as particularly dangerous because it prevents analysts and decision makers from ______.",
        "options": [
          "Using advanced statistical tools",
          "Questioning their methods, motivation, and the way they communicate findings",
          "Collaborating with HR business partners",
          "Collecting sufficient sample data for analysis"
        ],
        "correctAnswer": "Questioning their methods, motivation, and the way they communicate findings",
        "explanation": "The overconfidence trap makes analysts overly certain about conclusions, preventing critical questioning of assumptions, methods, and communication."
      },
      {
        "question": "7. Which of the following best describes the 'overfitting trap' in HR analytics?",
        "options": [
          "The analyst uses too few variables to build a reliable model",
          "The analyst collects more data than is needed for the analysis",
          "The visualization uses too many chart types, causing confusion",
          "The model performs well on training data but poorly on new real-world data"
        ],
        "correctAnswer": "The model performs well on training data but poorly on new real-world data",
        "explanation": "Overfitting occurs when a statistical or machine learning model fits noise and specific artifacts of historical training data, failing on new real-world data."
      },
      {
        "question": "8. In the stakeholder engagement framework for HR analytics, data owners, technology owners, and subject matter experts are classified as ______.",
        "options": [
          "Stakeholders served",
          "Stakeholders depended upon",
          "Stakeholders impacted",
          "Stakeholders managed"
        ],
        "correctAnswer": "Stakeholders depended upon",
        "explanation": "Analysts depend upon data owners, IT/technology owners, and SMEs to acquire data access, infrastructure, and contextual validation."
      },
      {
        "question": "9. Which of the following correctly lists the four components of the 'Six Skills for Success' category called 'Business Acumen'?",
        "options": [
          "Data awareness, Statistical methods, Visualization, Writing",
          "Problem definition, Project management, Change management, Stakeholder management",
          "Financial literacy, Political astuteness, Internal awareness, External awareness",
          "HR sub-functions, HR interdependencies, Privacy, Ethics"
        ],
        "correctAnswer": "Financial literacy, Political astuteness, Internal awareness, External awareness",
        "explanation": "The Business Acumen competency includes Financial literacy, Political astuteness, Internal organizational awareness, and External market awareness."
      },
      {
        "question": "10. Which of the following statements best describes the relationship between KPIs and HR metrics?",
        "options": [
          "KPIs and HR metrics are completely unrelated measurement tools",
          "HR metrics are a broader category, and every KPI is a metric",
          "KPIs replace traditional HR metrics in modern organizations",
          "HR metrics only apply to recruitment; KPIs apply to all functions"
        ],
        "correctAnswer": "HR metrics are a broader category, and every KPI is a metric",
        "explanation": "Metrics represent the broader umbrella of all measurable values; KPIs are a strategic subset of metrics focused on critical goals."
      }
    ]
  },
  {
    "id": "hr-analytics-week-2",
    "title": "HR Analytics - Week 2 Assignment 2",
    "subject": "HR Analytics",
    "date": "09/10/2026",
    "questions": [
      {
        "question": "1. Which of the following is NOT one of the steps of Data Analytics?",
        "options": [
          "Data Collection",
          "Data Visualization",
          "Data Encryption",
          "Findings"
        ],
        "correctAnswer": "Data Encryption",
        "explanation": "Data Analytics steps include Data Collection, Data Cleaning/Processing, Data Visualization, and Findings/Insights. Data Encryption is an information security practice, not an analytics pipeline step."
      },
      {
        "question": "2. Which of the following is a tool for Data Visualization?",
        "options": [
          "Power BI",
          "Photoshop",
          "AutoCAD",
          "MATLAB"
        ],
        "correctAnswer": "Power BI",
        "explanation": "Power BI is a leading dedicated business intelligence and data visualization software tool."
      },
      {
        "question": "3. An HR manager wants to know the average work experience of all applicants from a raw Excel dataset. Which Excel feature would be most appropriate to summarize this quickly?",
        "options": [
          "Data Studio",
          "Recommended Pivot tables",
          "Conditional Formatting",
          "Pivot Table"
        ],
        "correctAnswer": "Pivot Table",
        "explanation": "Pivot Tables in Excel allow fast aggregation, grouping, and calculation of averages across datasets."
      },
      {
        "question": "4. A manager wants a visual breakdown of \"how many applicants are UG, PG, and PhD\" for a quick presentation. Based on the Excel tools, which would best serve this purpose?",
        "options": [
          "Pivot Table",
          "Pivot Chart",
          "SN field",
          "Status of interview field"
        ],
        "correctAnswer": "Pivot Chart",
        "explanation": "A Pivot Chart provides an immediate visual graphical representation coupled with the summary data."
      },
      {
        "question": "5. After inserting a Pivot Table from your applicant dataset, where would you drag the \"City\" field to see the count of applicants per city as rows?",
        "options": [
          "Rows area",
          "Values area",
          "Filters area",
          "Columns area"
        ],
        "correctAnswer": "Rows area",
        "explanation": "Dragging 'City' to the Rows area groups the dataset by distinct cities down the rows."
      },
      {
        "question": "6. Recommended Pivot Tables in Excel require the user to manually drag every field into Rows, Columns, and Values.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Recommended Pivot Tables automatically pre-configure layouts and field placements based on data patterns without requiring manual setup."
      },
      {
        "question": "7. Among the Data Visualization tools, which one is a coding/statistical language rather than a dashboard or spreadsheet tool?",
        "options": [
          "Tableau",
          "Data Studio",
          "R",
          "Power-BI"
        ],
        "correctAnswer": "R",
        "explanation": "R is a programming and statistical computing language, whereas Tableau, Data Studio, and Power BI are GUI dashboard/BI applications."
      },
      {
        "question": "8. When an HR manager asks, \"How many are UG, PG, and PhD?\" the relevant field from Applicant Analysis used to answer this is ______.",
        "options": [
          "Work Experience",
          "Education",
          "Department",
          "Status of interview"
        ],
        "correctAnswer": "Education",
        "explanation": "UG, PG, and PhD are qualification levels stored in the Education field."
      },
      {
        "question": "9. You've built a Pivot Table showing applicant counts by City. To convert this into a visual chart, which route would you use?",
        "options": [
          "Formulas → Insert Chart",
          "PivotTable Analyze/Design → PivotChart",
          "Review → Chart Tools",
          "Page Layout → Visualize"
        ],
        "correctAnswer": "PivotTable Analyze/Design → PivotChart",
        "explanation": "PivotCharts are inserted via the PivotTable Analyze/Design contextual ribbon tab in Excel."
      },
      {
        "question": "10. When you drag a text/ID-type field like \"SN\" or \"Gender\" into the Values area of a Pivot Table, which summary function does it default to?",
        "options": [
          "Sum",
          "Product",
          "Average",
          "Count"
        ],
        "correctAnswer": "Count",
        "explanation": "Non-numeric or text fields automatically default to the Count summary function in Excel Pivot Tables."
      }
    ]
  },
  {
    "id": "hr-analytics-week-3",
    "title": "HR Analytics - Week 3 Assignment 3",
    "subject": "HR Analytics",
    "date": "09/10/2026",
    "questions": [
      {
        "question": "1. A manufacturing company with an outdated work culture and poor employer branding is struggling to attract candidates even after posting on multiple platforms. Which influence, as listed under constraints on choosing a recruiting source, most directly explains this problem?",
        "options": [
          "Limited budgetary support",
          "Restrictive policies of the government",
          "Poor image",
          "Conservative internal policies"
        ],
        "correctAnswer": "Poor image",
        "explanation": "An outdated culture and weak reputation constitute a 'Poor image' constraint, discouraging talented applicants regardless of advertising reach."
      },
      {
        "question": "2. Which of the following correctly pairs a recruitment source with its category?",
        "options": [
          "Job bidding — External Method",
          "Employee referrals — External Method",
          "Educational institutions — Internal Method",
          "Promotions and transfer — Internal Method"
        ],
        "correctAnswer": "Promotions and transfer — Internal Method",
        "explanation": "Promotions and transfers source talent from within the existing workforce, making them Internal Methods."
      },
      {
        "question": "3. FinServe, a financial services firm, identifies gaps in gender and ethnic diversity, particularly in senior management. Which combination of strategies most directly addresses this challenge?",
        "options": [
          "Increasing salaries and offering remote work options.",
          "Partnering with diverse professional organizations, mentorship programs, and unconscious bias training.",
          "Reducing qualification requirements and using only internal promotions.",
          "Outsourcing recruitment exclusively to third-party agencies."
        ],
        "correctAnswer": "Partnering with diverse professional organizations, mentorship programs, and unconscious bias training.",
        "explanation": "Addressing systemic leadership diversity gaps requires targeted sourcing partners, career mentorship pathways, and reducing cognitive bias in promotion and hiring."
      },
      {
        "question": "4. DiversityDesigns, a graphic design agency, wants to attract candidates from non-traditional and self-taught backgrounds. Which of the following actions directly supports this goal in the 'Identifying HR Requirements' step?",
        "options": [
          "Publishing job ads only on LinkedIn and Naukri.",
          "Requiring CISSP and CISM certifications for all applicants.",
          "Using inclusive language, avoiding unnecessary jargon, and highlighting flexible working arrangements in job descriptions.",
          "Limiting applications to candidates with formal degrees from recognized universities."
        ],
        "correctAnswer": "Using inclusive language, avoiding unnecessary jargon, and highlighting flexible working arrangements in job descriptions.",
        "explanation": "Inclusive language and eliminating rigid jargon/degree barriers opens requirements to competent non-traditional talent."
      },
      {
        "question": "5. A company adopted a __________ recruitment strategy, which involves removing names and other identifying information from resumes and applications, to minimize unconscious bias during candidate screening.",
        "options": [
          "Blind",
          "Panel-based",
          "Competency-based",
          "Structured"
        ],
        "correctAnswer": "Blind",
        "explanation": "Blind recruitment redacts personal demographic identifiers (name, gender, photo, age) to prevent unconscious bias during screening."
      },
      {
        "question": "6. A company adopting the 'hire for attitude, train for skill' philosophy primarily focuses on evaluating candidates' technical expertise and domain knowledge rather than their alignment with company values.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "'Hire for attitude, train for skill' explicitly prioritizes mindset, work ethic, and cultural value alignment over existing technical knowledge."
      },
      {
        "question": "7. An organization is experiencing high time-to-hire and is unable to identify which sourcing channels deliver the best candidates. Which combination of technological tools would best address both challenges simultaneously?",
        "options": [
          "Using spreadsheets for manual tracking combined with periodic reviews by HR managers.",
          "Increasing the number of job postings on paid portals and conducting monthly HR audits.",
          "Deploying an Applicant Tracking System (ATS) integrated with job boards and a Candidate Relationship Management (CRM) tool.",
          "Setting up an internal HR helpdesk and training managers in Excel-based reporting."
        ],
        "correctAnswer": "Deploying an Applicant Tracking System (ATS) integrated with job boards and a Candidate Relationship Management (CRM) tool.",
        "explanation": "An integrated ATS and CRM automates candidate pipeline workflows, shortens cycle times, and attributes source efficacy."
      },
      {
        "question": "8. An IT company facing a sudden spike in project demand needs to scale its workforce for 6 months without the long-term commitment of permanent hiring. At the same time, the HR team wants to evaluate the effectiveness of the current recruitment source before committing further. Which combination of strategies would be most appropriate?",
        "options": [
          "Use temporary employees as an alternative to recruiting and evaluate the source using yield ratios.",
          "Opt for employee leasing and evaluate the source using surveys and studies.",
          "Use subcontracting and evaluate the source using the recruitment process flowchart.",
          "Use outsourcing as an alternative to recruiting and evaluate the source using time-lapse data."
        ],
        "correctAnswer": "Use temporary employees as an alternative to recruiting and evaluate the source using yield ratios.",
        "explanation": "Temporary staffing fulfills short-term surge needs without permanent headcount commitments, and yield ratios measure applicant conversion per source."
      },
      {
        "question": "9. LinkedIn's primary strategy for external hiring was to focus on active job seekers, candidates who were actively looking for new employment at the time of recruitment.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "LinkedIn's breakthrough value proposition was targeting passive candidates—professionals not actively browsing job boards but open to opportunities."
      },
      {
        "question": "10. Any company’s average time to hire software engineers was 60 days, which was above the industry average. What two interventions might that company implement to reduce this gap?",
        "options": [
          "Increasing recruiter headcount and conducting walk-in interviews.",
          "Reducing the number of interview rounds and offering higher salaries.",
          "Partnering with universities and deploying campus placement drives.",
          "Implementing an AI-powered screening tool and a self-service interview scheduling system."
        ],
        "correctAnswer": "Implementing an AI-powered screening tool and a self-service interview scheduling system.",
        "explanation": "AI-automated resume screening and self-service interview scheduling eliminate administrative bottlenecks and scheduling delays."
      }
    ]
  },
  {
    "id": "hr-analytics-week-4",
    "title": "HR Analytics - Week 4 Assignment 4",
    "subject": "HR Analytics",
    "date": "09/10/2026",
    "questions": [
      {
        "question": "1. A candidate who answers 'Yes' to 'Would you like to work for this company?' but 'No' to 'Are you planning to apply for this company?' is classified at which stage of the Employer Brand Image Analysis framework?",
        "options": [
          "Awareness stage only.",
          "Consideration stage — interested but not yet at Preference.",
          "Preference stage — ready to apply.",
          "Neither Awareness nor Consideration — they have no interest."
        ],
        "correctAnswer": "Consideration stage — interested but not yet at Preference.",
        "explanation": "They are aware and interested (consideration), but have not yet converted into preference or active intent to apply."
      },
      {
        "question": "2. As per the Employer Branding Value Propositions framework (Complain and Praises Analysis), which of the following correctly describes what 'Praises' data from employees of the 'Best Place to Work' category represents?",
        "options": [
          "The reasons why employees leave the organization.",
          "The marginal cost of external hiring versus internal promotion.",
          "The metrics are tracked in the Social Media Matrix for career page views.",
          "The reasons why people come and stay in the organization."
        ],
        "correctAnswer": "The reasons why people come and stay in the organization.",
        "explanation": "'Praises' from employees at benchmark employers reveal key drivers of attraction and employee retention."
      },
      {
        "question": "3. The Internal Branding Matrix includes salary benchmarking and compensation revision as its primary tools for strengthening the employer brand among existing employees.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Internal branding emphasizes culture, shared values, communication, and employee engagement rather than mere transactional compensation changes."
      },
      {
        "question": "4. Which of the following correctly distinguishes 'Surface Diversity' from 'Deep Diversity'?",
        "options": [
          "Surface diversity includes attitude and belief; deep diversity includes gender and religion.",
          "Surface diversity is measured using the Employee Happiness Index; deep diversity is measured using the Employee Knowledge Sharing Index.",
          "Surface diversity covers observable attributes such as gender, religion, city, and education; deep diversity covers non-observable attributes such as attitude, belief, values, and motivation.",
          "Surface diversity refers to internal hires; deep diversity refers to external hires with different cultural backgrounds."
        ],
        "correctAnswer": "Surface diversity covers observable attributes such as gender, religion, city, and education; deep diversity covers non-observable attributes such as attitude, belief, values, and motivation.",
        "explanation": "Surface diversity reflects observable demographic attributes, while deep diversity captures underlying cognitive, psychological, and motivational characteristics."
      },
      {
        "question": "5. An HR analytics team wants to evaluate the quality of the recruitment process after candidates have joined. Which of the following post-hire metrics would most directly indicate whether the right people were recruited?",
        "options": [
          "Quality of hire and early attrition.",
          "Rengage rate and application-to-job-offer ratio.",
          "Number of applications received and cost per application.",
          "Candidate experience score and job search intensity."
        ],
        "correctAnswer": "Quality of hire and early attrition.",
        "explanation": "Quality of hire (performance appraisals, manager ratings) and early attrition rates directly reflect the accuracy and success of hiring decisions."
      },
      {
        "question": "6. The effectiveness of a recruitment source is evaluated solely based on the number of relevant applications received, with no consideration of cost.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Recruitment source effectiveness evaluates cost per hire, conversion rates, and subsequent performance, not application volume in isolation."
      },
      {
        "question": "7. In the Comprehensive End-to-End Recruitment and Selection Process, which of the following is listed as Best Practice for Developing the Pool?",
        "options": [
          "Looking only for external candidates to bring in fresh perspectives.",
          "Relying on generic competency models to shortlist candidates quickly.",
          "Developing a large pool that includes both internal and external candidates, and consulting employees.",
          "Hiring only when a vacancy arises and indulging in irrational optimism about available talent."
        ],
        "correctAnswer": "Developing a large pool that includes both internal and external candidates, and consulting employees.",
        "explanation": "Best practice involves combining internal mobility, external sourcing channels, and employee referral networks."
      },
      {
        "question": "8. Which of the following correctly matches a Type of Interview with its definition?",
        "options": [
          "Situational Interview – The recruiter asks questions as they come to mind.",
          "Structured Interview – The recruiter uses a predetermined set of questions that are clearly job-related.",
          "Panel Interview – The recruiter presents a hypothetical incident and asks the candidate to respond.",
          "Behavioural Interview – The focus is on actual work-related incidents, and the applicant is asked to reveal what he or she did in a given situation."
        ],
        "correctAnswer": "Behavioural Interview – The focus is on actual work-related incidents, and the applicant is asked to reveal what he or she did in a given situation.",
        "explanation": "Behavioral interviews operate on the premise that past behavior predicts future performance, probing how candidates handled real past situations."
      },
      {
        "question": "9. A company's HR team finds that: (i) new hires show high early attrition within six months of joining, (ii) interviewers consistently over-rate candidates who present confidently, regardless of technical fit, and (iii) the Audit and Review step is being skipped after each hiring cycle. Which combined approach would most comprehensively address all three issues?",
        "options": [
          "Replace all interview rounds with written aptitude tests alone to eliminate interviewer subjectivity.",
          "Train interviewers to recognize the Halo Effect so that one impressive trait does not distort the overall rating; track early attrition as a post-hire quality signal to assess whether the right candidates were selected; and institutionalize the Audit and Review step to regularly examine and improve hiring practices.",
          "Focus exclusively on expanding the application pool by including both internal and external candidates to improve the odds of finding the right hire.",
          "Use only the medical examination and reference check stages to filter candidates before the final placement decision."
        ],
        "correctAnswer": "Train interviewers to recognize the Halo Effect so that one impressive trait does not distort the overall rating; track early attrition as a post-hire quality signal to assess whether the right candidates were selected; and institutionalize the Audit and Review step to regularly examine and improve hiring practices.",
        "explanation": "Mitigating the halo effect ensures objective evaluations, tracking early attrition provides feedback on hiring quality, and audit/review institutionalizes continuous refinement."
      },
      {
        "question": "10. __________ is the ability of a selection tool to measure an attribute consistently, such that repeated administration to the same individual yields approximately identical scores.",
        "options": [
          "Reliability",
          "Validity",
          "Standardisation",
          "Suitability"
        ],
        "correctAnswer": "Reliability",
        "explanation": "Reliability is the degree of measurement consistency and stability across repeated administrations."
      }
    ]
  },
  {
    "id": "hr-analytics-week-5",
    "title": "HR Analytics - Week 5 Assignment 5",
    "subject": "HR Analytics",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. What aspects does the 'Effectiveness of Selection Method' table assess?",
        "options": [
          "Resume quality",
          "Communication skills",
          "Person-job fit, performance rating, and cost",
          "Training effectiveness"
        ],
        "correctAnswer": "Person-job fit, performance rating, and cost",
        "explanation": "The 'Effectiveness of Selection Method' framework evaluates selection instruments across multidimensional criteria including person-job fit, resulting performance ratings, and associated costs."
      },
      {
        "question": "2. Which metric in recruitment visualization is used to assess recruitment efficiency?",
        "options": [
          "Yield ratio",
          "Absenteeism",
          "Diversity index",
          "Attrition rate"
        ],
        "correctAnswer": "Yield ratio",
        "explanation": "The yield ratio indicates the percentage of candidates who pass from one stage of the recruitment funnel to the next, serving as a key indicator of recruitment efficiency."
      },
      {
        "question": "3. Which recruitment source fulfilled the highest percentage of high-level role expectations?",
        "options": [
          "Consultants",
          "Employee Referrals",
          "Job Portal",
          "Campus hiring"
        ],
        "correctAnswer": "Employee Referrals",
        "explanation": "Employee referrals typically yield higher quality candidates with stronger cultural fit and higher fulfillment of role expectations, especially for high-level positions."
      },
      {
        "question": "4. What is the ideal characteristic of an effective testing component in the selection process?",
        "options": [
          "Ease of administration",
          "Low candidate drop rate",
          "High salary correlation",
          "Predictive of job performance"
        ],
        "correctAnswer": "Predictive of job performance",
        "explanation": "The primary hallmark of an effective selection test or assessment is its predictive validity—its empirical ability to accurately forecast future on-the-job performance."
      },
      {
        "question": "5. Which measure is used to evaluate how accurately selection analytics predict candidate performance?",
        "options": [
          "Number of selection rounds",
          "Actual vs. predicted performance",
          "Hiring manager's intuition",
          "Duration of the interview"
        ],
        "correctAnswer": "Actual vs. predicted performance",
        "explanation": "Evaluating predictive models in selection analytics requires comparing candidates' predicted scores/performance against their actual post-hire job performance."
      },
      {
        "question": "6. Which factors are considered when determining the 'Cost per Joinee'?",
        "options": [
          "Hiring manager's rating",
          "Interview duration",
          "Total recruitment expenditure and number of joinees",
          "Salary band only"
        ],
        "correctAnswer": "Total recruitment expenditure and number of joinees",
        "explanation": "Cost per Joinee (or Cost per Hire) is calculated by dividing total recruitment costs (advertising, agency fees, recruiter time, etc.) by the total number of successful joinees."
      },
      {
        "question": "7. In outcome-based selection analysis, which situation represents a 'false negative'?",
        "options": [
          "An unsuccessful candidate is hired",
          "A successful candidate is not hired",
          "An unsuccessful candidate is not hired",
          "A successful candidate is hired"
        ],
        "correctAnswer": "A successful candidate is not hired",
        "explanation": "In selection analytics, a false negative (Type II error) occurs when a candidate who would have been successful on the job is rejected (not hired)."
      },
      {
        "question": "8. What may result from using an inappropriate cut score in the selection process?",
        "options": [
          "Higher salaries offered",
          "Reduced cost per hire",
          "Increased false positives or false negatives",
          "Perfect employee performance"
        ],
        "correctAnswer": "Increased false positives or false negatives",
        "explanation": "Setting an incorrect cutoff score distorts classification: an excessively high cut score increases false negatives (rejecting good candidates), while an excessively low cut score increases false positives (hiring unqualified candidates)."
      },
      {
        "question": "9. In selection analytics, what does the term 'Fit Percentage' indicate?",
        "options": [
          "Degree of alignment among the job, team, supervisor, and organization",
          "Resume match rate",
          "Ratio of candidates to recruiters",
          "Level of salary satisfaction"
        ],
        "correctAnswer": "Degree of alignment among the job, team, supervisor, and organization",
        "explanation": "'Fit Percentage' measures holistic alignment across person-job, person-team, person-supervisor, and person-organization dimensions."
      },
      {
        "question": "10. Which data set is most appropriate for identifying potential bias in the hiring process?",
        "options": [
          "Cost per joinee",
          "Gender-wise hiring ratio",
          "Average number of interview questions",
          "Tenure by marital status"
        ],
        "correctAnswer": "Gender-wise hiring ratio",
        "explanation": "Demographic breakdown ratios such as the gender-wise hiring ratio (and pass-through rates by demographic group) are used to detect adverse impact and systemic bias in hiring."
      }
    ]
  },
  {
    "id": "hr-analytics-week-6",
    "title": "HR Analytics - Week 6 Assignment 6",
    "subject": "HR Analytics",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Which factor helps determine who should receive training first?",
        "options": [
          "Education level",
          "Motivation to learn",
          "Salary level",
          "Age"
        ],
        "correctAnswer": "Motivation to learn",
        "explanation": "Readiness for training depends heavily on employee motivation to learn, which predicts engagement, retention, and successful skill transfer."
      },
      {
        "question": "2. What does skill inventory analysis compare?",
        "options": [
          "Budget vs. outcomes",
          "Age vs. performance",
          "Available vs. required skills",
          "Training vs. education"
        ],
        "correctAnswer": "Available vs. required skills",
        "explanation": "A skill inventory analysis compares existing (available) workforce competencies against required organizational skills to identify capability gaps."
      },
      {
        "question": "3. Which phase focuses on measuring training outcomes?",
        "options": [
          "Assessment",
          "Implementation",
          "Alignment",
          "Evaluation"
        ],
        "correctAnswer": "Evaluation",
        "explanation": "The evaluation phase assesses the effectiveness, learning outcomes, and business impact of training programs."
      },
      {
        "question": "4. What indicates training coverage within the organization?",
        "options": [
          "Training budget",
          "Department size",
          "Employee trained / Total number of employees",
          "HR ratio"
        ],
        "correctAnswer": "Employee trained / Total number of employees",
        "explanation": "Training coverage (or penetration rate) is calculated as the ratio of employees who underwent training to the total employee headcount."
      },
      {
        "question": "5. What is the goal of training in contrast to development?",
        "options": [
          "Career enhancement",
          "Current job preparation",
          "Employee motivation",
          "Strategic planning"
        ],
        "correctAnswer": "Current job preparation",
        "explanation": "Training focuses on immediate competencies needed for current job performance, whereas development focuses on broader, future career growth."
      },
      {
        "question": "6. What is the correct formula for absenteeism in training?",
        "options": [
          "Total training time / Absent employees",
          "Employees present / Total employees",
          "Number of employee absent / Total training participants",
          "Employees trained / Absent employees"
        ],
        "correctAnswer": "Number of employee absent / Total training participants",
        "explanation": "Absenteeism in training is computed as the number of absent participants divided by the total enrolled/nominated training participants."
      },
      {
        "question": "7. What is considered in the importance dimension during task analysis?",
        "options": [
          "Age",
          "Training length",
          "Criticality of the task",
          "Training method"
        ],
        "correctAnswer": "Criticality of the task",
        "explanation": "In task analysis, the importance dimension evaluates how critical and essential the specific task is to overall organizational success."
      },
      {
        "question": "8. Who typically initiates training programs?",
        "options": [
          "Management",
          "Employees",
          "External trainers",
          "Government"
        ],
        "correctAnswer": "Management",
        "explanation": "Training programs are typically commissioned and initiated by management to bridge strategic skill gaps and enhance productivity."
      },
      {
        "question": "9. What does 'Cost per learning hour received' assess?",
        "options": [
          "Learning outcomes",
          "Staff engagement",
          "Cost efficiency",
          "Department needs"
        ],
        "correctAnswer": "Cost efficiency",
        "explanation": "'Cost per learning hour received' is a standard training metric assessing the cost efficiency of learning delivery across participant hours."
      },
      {
        "question": "10. How is teamwork skill level assessed in inventory analysis?",
        "options": [
          "Hours of training received",
          "Performance rating",
          "Seniority",
          "Department revenue"
        ],
        "correctAnswer": "Performance rating",
        "explanation": "Soft skills and competencies like teamwork are evaluated in inventory analysis through supervisory and peer performance ratings."
      }
    ]
  },
  {
    "id": "hr-analytics-week-7",
    "title": "HR Analytics - Week 7 Assignment 7",
    "subject": "HR Analytics",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Coaching is most effective when:",
        "options": [
          "Supervisors are uninvolved",
          "There is an open relationship",
          "Trainees are left alone",
          "Feedback is avoided"
        ],
        "correctAnswer": "There is an open relationship",
        "explanation": "Coaching relies on trust, transparent communication, and an open, supportive relationship between coach and coachee."
      },
      {
        "question": "2. Understudy training involves:",
        "options": [
          "Lecturing to senior executives",
          "Replacing peers without guidance",
          "Acting as a temporary substitute for a manager",
          "Random job hopping"
        ],
        "correctAnswer": "Acting as a temporary substitute for a manager",
        "explanation": "An understudy is designated to learn a manager's job by assisting and temporarily taking over their responsibilities during their absence."
      },
      {
        "question": "3. Which method provides exposure to diverse functions via advisory groups?",
        "options": [
          "Understudy",
          "Job rotation",
          "Multiple management",
          "Case study"
        ],
        "correctAnswer": "Multiple management",
        "explanation": "Multiple management (such as junior boards of directors) gives emerging managers exposure to high-level strategic problems and diverse organizational functions."
      },
      {
        "question": "4. A suitable method for developing reasoning skills is:",
        "options": [
          "Role playing",
          "Business games",
          "Case study",
          "Sensitivity training"
        ],
        "correctAnswer": "Case study",
        "explanation": "Case study analysis requires trainees to diagnose complex real-world organizational problems, developing critical analytical and reasoning skills."
      },
      {
        "question": "5. An executive gains cross-functional experience through:",
        "options": [
          "Job rotation",
          "Role play",
          "Coaching",
          "Special readings"
        ],
        "correctAnswer": "Job rotation",
        "explanation": "Job rotation systematically moves managers between different functional areas to develop broad cross-functional competence."
      },
      {
        "question": "6. According to the research findings, traditional practices are shifting toward:",
        "options": [
          "Eliminating training",
          "Fixed-role models",
          "Participation-based development",
          "Manager-exclusive development"
        ],
        "correctAnswer": "Participation-based development",
        "explanation": "Modern corporate development models emphasize active participation, experiential learning, and collaborative leadership."
      },
      {
        "question": "7. A suggested HR role in the future is to:",
        "options": [
          "Control salaries only",
          "Isolate departments",
          "Preserve and increase organizational knowledge",
          "Promote top-down learning only"
        ],
        "correctAnswer": "Preserve and increase organizational knowledge",
        "explanation": "Future HR roles focus on knowledge management—acting as strategic custodians to capture, preserve, and amplify organizational knowledge."
      },
      {
        "question": "8. What is an important learning metric from training?",
        "options": [
          "Number of holidays taken",
          "Attitude change",
          "New dress code adoption",
          "Marketing strategy redesign"
        ],
        "correctAnswer": "Attitude change",
        "explanation": "Under Kirkpatrick's Level 2 (Learning), changes in attitude, knowledge, and mental models serve as essential learning metrics."
      },
      {
        "question": "9. An employee’s reaction to training may include:",
        "options": [
          "Ignoring training content",
          "Dismissing instructors",
          "Satisfaction with course delivery",
          "Refusing to participate in appraisals"
        ],
        "correctAnswer": "Satisfaction with course delivery",
        "explanation": "Reaction evaluations (Kirkpatrick Level 1) measure participant satisfaction with the training design, facilitator, and delivery."
      },
      {
        "question": "10. Training evaluation criteria do NOT include:",
        "options": [
          "Sales promotions",
          "Learning",
          "Employee reactions",
          "Business results"
        ],
        "correctAnswer": "Sales promotions",
        "explanation": "Kirkpatrick's four levels of training evaluation are Reaction, Learning, Behavior, and Results. Sales promotions are marketing activities, not training evaluation criteria."
      }
    ]
  },
  {
    "id": "hr-analytics-week-8",
    "title": "HR Analytics - Week 8 Assignment 8",
    "subject": "HR Analytics",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. What is visualized in the training effectiveness chart?",
        "options": [
          "Weather patterns",
          "Departmental shifts",
          "Subject-wise performance",
          "Meal preferences"
        ],
        "correctAnswer": "Subject-wise performance",
        "explanation": "Training effectiveness visualizations compare participant competency outcomes and test scores broken down across subject areas."
      },
      {
        "question": "2. What financial metric is tracked department-wise in training data?",
        "options": [
          "Training Cost",
          "Bonus expenditure",
          "Rent allocation",
          "Reimbursement rate"
        ],
        "correctAnswer": "Training Cost",
        "explanation": "Department-wise training cost tracks resource utilization and training budget expenditure per department."
      },
      {
        "question": "3. What duration metric is presented in the training visualization?",
        "options": [
          "Employee retention",
          "Department-wise Training Duration",
          "Vacation time",
          "Resignation period"
        ],
        "correctAnswer": "Department-wise Training Duration",
        "explanation": "Visual dashboards track training hours and session duration delivered across individual departments."
      },
      {
        "question": "4. What character trait is listed in the benchmark skills table?",
        "options": [
          "Punctuality",
          "Compassion and sensitivity",
          "Typing speed",
          "Accent clarity"
        ],
        "correctAnswer": "Compassion and sensitivity",
        "explanation": "Benchmark managerial competencies highlight emotional intelligence traits such as compassion and interpersonal sensitivity."
      },
      {
        "question": "5. Which is a component of development summary based on self and others’ input?",
        "options": [
          "Leave balance",
          "Listens to others",
          "Health insurance",
          "Seating layout"
        ],
        "correctAnswer": "Listens to others",
        "explanation": "360-degree development feedback summaries evaluate active listening competencies based on multisource ratings."
      },
      {
        "question": "6. What is included in interpersonal relationship development?",
        "options": [
          "Conflict creation",
          "Facilitates team success",
          "Attendance reporting",
          "Wage compliance"
        ],
        "correctAnswer": "Facilitates team success",
        "explanation": "Interpersonal skill development emphasizes collaboration, trust building, and facilitating collective team achievement."
      },
      {
        "question": "7. Which activity is part of internal development programs?",
        "options": [
          "External consulting",
          "Job rotation",
          "Legal compliance",
          "Budget proposal writing"
        ],
        "correctAnswer": "Job rotation",
        "explanation": "Job rotation is a primary internal development method for expanding experiential breadth within the firm."
      },
      {
        "question": "8. What method in job experiences matrix involves decision-making under stress?",
        "options": [
          "Group exercise",
          "Adverse business conditions",
          "Annual party planning",
          "Time logging"
        ],
        "correctAnswer": "Adverse business conditions",
        "explanation": "Experiencing adverse business conditions challenges leaders to make high-stakes decisions under genuine organizational stress."
      },
      {
        "question": "9. What does 'Making Transitions' in the job experience matrix signify?",
        "options": [
          "Time zone shift",
          "Unfamiliar responsibilities",
          "Changing passwords",
          "Location mapping"
        ],
        "correctAnswer": "Unfamiliar responsibilities",
        "explanation": "Transition experiences involve stepping into unfamiliar roles, managing different functional scopes, or leading new initiatives."
      },
      {
        "question": "10. What element supports the development of a culture?",
        "options": [
          "Leave policy",
          "Feedback mechanism",
          "Snack availability",
          "Commute distance"
        ],
        "correctAnswer": "Feedback mechanism",
        "explanation": "Robust feedback mechanisms foster psychological safety, transparency, continuous learning, and healthy organizational culture."
      }
    ]
  },
  {
    "id": "hr-analytics-week-9",
    "title": "HR Analytics - Week 9 Assignment 9",
    "subject": "HR Analytics",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Performance appraisal is primarily concerned with:",
        "options": [
          "Monitoring organizational finance activities",
          "Expanding external customer relationships",
          "Evaluating employee work behavior and potential",
          "Managing technological infrastructure systems"
        ],
        "correctAnswer": "Evaluating employee work behavior and potential",
        "explanation": "Performance appraisal systematically evaluates an employee's job performance, work behaviors, and future potential against established criteria."
      },
      {
        "question": "2. Performance management differs from performance appraisal because it:",
        "options": [
          "focuses only on salary revisions",
          "emphasizes only annual reporting systems",
          "excludes employee development processes",
          "includes evaluation, improvement, and rewards"
        ],
        "correctAnswer": "includes evaluation, improvement, and rewards",
        "explanation": "Performance appraisal is a periodic evaluation event, whereas performance management is an ongoing, continuous process integrating goal setting, evaluation, development, and reward systems."
      },
      {
        "question": "3. After measuring actual performance, organizations compare results with ________.",
        "options": [
          "compensation plans",
          "standards",
          "labor unions",
          "inventories"
        ],
        "correctAnswer": "standards",
        "explanation": "The performance evaluation cycle involves setting standards, measuring actual performance, and comparing actual performance against those predetermined standards."
      },
      {
        "question": "4. Which method belongs to multiple-person evaluation methods?",
        "options": [
          "Essay evaluation",
          "Paired comparison",
          "Critical incidents",
          "Checklist method"
        ],
        "correctAnswer": "Paired comparison",
        "explanation": "Paired comparison is a relative, multiple-person evaluation technique where each employee's performance is compared directly against every other peer in the group."
      },
      {
        "question": "5. Which performance appraisal method uses specific, observable behavioural examples as anchors to define different levels of employee performance?",
        "options": [
          "KRA",
          "BARS",
          "MBO",
          "HRA"
        ],
        "correctAnswer": "BARS",
        "explanation": "Behaviorally Anchored Rating Scales (BARS) combine qualitative critical incidents with quantitative ratings by using specific behavioral examples as numerical anchors."
      },
      {
        "question": "6. 360-degree appraisal mainly provides:",
        "options": [
          "confidential anonymous feedback",
          "annual tax computation records",
          "product development estimates",
          "inventory utilization statistics"
        ],
        "correctAnswer": "confidential anonymous feedback",
        "explanation": "360-degree appraisal gathers multisource feedback from peers, subordinates, supervisors, and internal customers, typically anonymized to ensure candid input."
      },
      {
        "question": "7. If innovation is a company’s strategic objective, performance standards should include metrics related to:",
        "options": [
          "administrative hierarchy",
          "employee attendance frequency",
          "new ideas and implemented projects",
          "warehouse inventory movement"
        ],
        "correctAnswer": "new ideas and implemented projects",
        "explanation": "Performance metrics should align directly with strategic priorities; for an innovation-led strategy, metrics measure idea generation, patent filings, and successful project rollouts."
      },
      {
        "question": "8. InnovateTech included participation in cross-functional ________ as part of performance standards.",
        "options": [
          "outsourcing",
          "auditing",
          "training",
          "marketing"
        ],
        "correctAnswer": "training",
        "explanation": "Cross-functional training participation enhances organizational versatility and collaborative problem-solving, making it a key performance standard criterion."
      },
      {
        "question": "9. Quantitative criteria include measurable factors such as sales figures and project completion ________.",
        "options": [
          "behaviors",
          "policies",
          "attitudes",
          "times"
        ],
        "correctAnswer": "times",
        "explanation": "Project completion time (duration/deadlines) and sales figures are objective, quantifiable performance metrics, unlike subjective traits or attitudes."
      },
      {
        "question": "10. Intentional performance rating distortion refers to:",
        "options": [
          "deliberate manipulation of ratings",
          "accidental system calculation errors",
          "technological communication failures",
          "legal auditing inconsistencies"
        ],
        "correctAnswer": "deliberate manipulation of ratings",
        "explanation": "Intentional rating distortion occurs when raters consciously inflate or deflate employee ratings for political reasons, impression management, or avoiding conflict."
      }
    ]
  },
  {
    "id": "hr-analytics-week-10",
    "title": "HR Analytics - Week 10 Assignment 10",
    "subject": "HR Analytics",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. In the balanced score approach, return on equity is classified as a:",
        "options": [
          "behavioral indicator",
          "lag indicator",
          "recruitment indicator",
          "training indicator"
        ],
        "correctAnswer": "lag indicator",
        "explanation": "Return on equity (ROE) is a financial output metric reflecting past activities and historical performance, making it a classic lag indicator in the Balanced Scorecard framework."
      },
      {
        "question": "2. The 9 Box Matrix evaluates potential rating and:",
        "options": [
          "compensation ratio",
          "training frequency",
          "attendance score",
          "performance rating"
        ],
        "correctAnswer": "performance rating",
        "explanation": "The 9-Box Grid is a classic talent management tool that plots employee current performance rating on one axis against future potential rating on the other."
      },
      {
        "question": "3. State True and False On-time delivery was identified as a lead indicator for customers.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanation": "On-time delivery drives subsequent customer satisfaction and repeat business, serving as a leading indicator of customer loyalty and retention."
      },
      {
        "question": "4. Product defect rate and unit product cost were categorized under:",
        "options": [
          "internal business processes",
          "external customer relations",
          "workforce engagement",
          "strategic compensation planning"
        ],
        "correctAnswer": "internal business processes",
        "explanation": "In the Balanced Scorecard, manufacturing quality (defect rate) and cost efficiency belong to the Internal Business Process perspective."
      },
      {
        "question": "5. Motivation, ability, and opportunity are analyzed in order to identify:",
        "options": [
          "compensation structures",
          "causes of underperformance",
          "recruitment procedures",
          "leadership succession plans"
        ],
        "correctAnswer": "causes of underperformance",
        "explanation": "The AMO (Ability, Motivation, Opportunity) model is used to diagnose root causes of individual employee performance issues or underperformance."
      },
      {
        "question": "6. Variable pay includes bonuses, incentives, and stock ________.",
        "options": [
          "exchange",
          "allocation",
          "option",
          "planning"
        ],
        "correctAnswer": "option",
        "explanation": "Variable compensation comprises performance bonuses, commissions, profit sharing, and equity-based long-term incentives like stock options."
      },
      {
        "question": "7. Which of the following is classified as a non-financial reward?",
        "options": [
          "retirement pension",
          "family picnic",
          "performance bonus",
          "stock option"
        ],
        "correctAnswer": "family picnic",
        "explanation": "Social events, recognition certificates, and company picnics provide relational and symbolic value, classifying them as non-financial rewards."
      },
      {
        "question": "8. Skills Gap Analysis identifies differences between current workforce skills and:",
        "options": [
          "transportation requirements",
          "inventory classifications",
          "future organizational needs",
          "taxation regulations"
        ],
        "correctAnswer": "future organizational needs",
        "explanation": "Skills gap analysis benchmarks existing workforce capabilities against projected future skills demanded by the organization's strategic goals."
      },
      {
        "question": "9. DEI stands for Diversity, Equity, and:",
        "options": [
          "Integrity",
          "Investment",
          "Innovation",
          "Inclusion"
        ],
        "correctAnswer": "Inclusion",
        "explanation": "DEI stands for Diversity, Equity, and Inclusion in modern human resources and organizational development."
      },
      {
        "question": "10. Compensation philosophy mainly defines the organization’s:",
        "options": [
          "transportation infrastructure",
          "employee value proposition",
          "taxation reporting mechanism",
          "warehouse planning strategy"
        ],
        "correctAnswer": "employee value proposition",
        "explanation": "An organization's compensation philosophy articulates its strategy for attracting, motivating, and retaining talent through its core Employee Value Proposition (EVP)."
      }
    ]
  },
  {
    "id": "hr-analytics-week-11",
    "title": "HR Analytics - Week 11 Assignment 11",
    "subject": "HR Analytics",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Pay mix policies included analysis of base wage, benefits, and:",
        "options": [
          "transportation allowance",
          "long-term incentives",
          "taxation credits",
          "inventory rewards"
        ],
        "correctAnswer": "long-term incentives",
        "explanation": "A complete total rewards pay mix encompasses base pay, short- and long-term incentives, and employee benefits."
      },
      {
        "question": "2. State true and false Job evaluation points are linked with compensation and benefits amounts.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanation": "Job evaluation points establish relative internal job worth, which directly determines salary grades and compensation bands."
      },
      {
        "question": "3. Compensation matrices primarily help organizations align compensation with:",
        "options": [
          "job worth and evaluation points",
          "warehouse efficiency",
          "taxation compliance",
          "transportation scheduling"
        ],
        "correctAnswer": "job worth and evaluation points",
        "explanation": "Compensation matrices align pay ranges and merit increase distributions with evaluated job worth and performance levels."
      },
      {
        "question": "4. Impact of pay increase on employees compared old employees with:",
        "options": [
          "contractual workers",
          "consultants",
          "new employees",
          "interns"
        ],
        "correctAnswer": "new employees",
        "explanation": "Pay increase impact analyses examine internal equity and salary compression by comparing tenured (old) employees with newly hired employees."
      },
      {
        "question": "5. Quartile-wise salary analysis is mainly used for identifying:",
        "options": [
          "supply chain gaps",
          "pay-gap patterns",
          "transportation inefficiencies",
          "inventory shortages"
        ],
        "correctAnswer": "pay-gap patterns",
        "explanation": "Quartile-wise distribution analysis identifies internal wage discrepancies, demographic pay gaps, and salary compression."
      },
      {
        "question": "6. Employee benefit analysis included retirement plans and:",
        "options": [
          "transportation insurance",
          "taxation assistance",
          "warehouse maintenance",
          "wellness programs"
        ],
        "correctAnswer": "wellness programs",
        "explanation": "Comprehensive benefits packages typically pair traditional retirement plans with health and employee wellness programs."
      },
      {
        "question": "7. Work attendance was one qualifying criterion for ________ incentive plans.",
        "options": [
          "departmental",
          "individual",
          "regional",
          "operational"
        ],
        "correctAnswer": "individual",
        "explanation": "Individual incentive plans frequently require meeting baseline attendance and punctuality thresholds before bonuses are paid."
      },
      {
        "question": "8. Companywide incentive plans may be linked to operational efficiency and:",
        "options": [
          "transportation expenses",
          "office maintenance",
          "employee stock earnings",
          "inventory movement"
        ],
        "correctAnswer": "employee stock earnings",
        "explanation": "Enterprise-wide incentive schemes (such as profit-sharing and ESOPs) align employee rewards with overall company operational efficiency and stock performance."
      },
      {
        "question": "9. Compa Ratio is calculated using employee pay rate and:",
        "options": [
          "pay range midpoint",
          "annual tax rate",
          "transportation allowance",
          "inventory value"
        ],
        "correctAnswer": "pay range midpoint",
        "explanation": "Compa-Ratio is calculated as (Actual Salary / Pay Range Midpoint), measuring where an employee sits relative to market reference pay."
      },
      {
        "question": "10. Hiring management trainees was suggested to build a talent ________.",
        "options": [
          "network",
          "matrix",
          "pipeline",
          "database"
        ],
        "correctAnswer": "pipeline",
        "explanation": "Management trainee programs systematically develop entry-level high-potential candidates to build a steady talent pipeline for future leadership roles."
      }
    ]
  },
  {
    "id": "hr-analytics-week-12",
    "title": "HR Analytics - Week 12 Assignment 12",
    "subject": "HR Analytics",
    "date": "10/10/2026",
    "questions": [
      {
        "question": "1. Which statement best explains the role of Tableau in HR Analytics?",
        "options": [
          "It primarily stores employee records",
          "It converts data into visual analytical insights",
          "It primarily manages employee communication",
          "It primarily develops organizational websites"
        ],
        "correctAnswer": "It converts data into visual analytical insights",
        "explanation": "Tableau is a leading data visualization tool that transforms raw HR datasets into intuitive dashboards and visual insights."
      },
      {
        "question": "2. True OR False Tableau can work with information obtained from different types of data sources.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanation": "Tableau natively connects to a wide variety of data sources including spreadsheets, relational SQL databases, cloud warehouses, and flat files."
      },
      {
        "question": "3. Which visualization would be most suitable for comparing values across different departments?",
        "options": [
          "Scatter Plot",
          "Text Document",
          "Bar Chart",
          "Data Table"
        ],
        "correctAnswer": "Bar Chart",
        "explanation": "Bar charts are optimal for comparing discrete numerical metrics across categorical groups such as departments."
      },
      {
        "question": "4. The calculation of an average joining delay across employees is an example of:",
        "options": [
          "Data connection",
          "Data aggregation",
          "Data extraction",
          "Data formatting"
        ],
        "correctAnswer": "Data aggregation",
        "explanation": "Calculating summary statistics like averages, totals, and counts across individual records is called data aggregation."
      },
      {
        "question": "5. Which feature makes Tableau particularly useful for exploring complex datasets?",
        "options": [
          "Fixed reporting structure",
          "Manual data entry process",
          "Static document preparation",
          "Interactive visual exploration"
        ],
        "correctAnswer": "Interactive visual exploration",
        "explanation": "Tableau provides interactive visual exploration, enabling users to filter, slice, drill down, and discover insights in complex datasets."
      },
      {
        "question": "6. Which situation represents multidimensional analysis?",
        "options": [
          "Examining one variable in isolation",
          "Viewing one employee record at a time",
          "Comparing data across several dimensions",
          "Studying information in a single fixed view"
        ],
        "correctAnswer": "Comparing data across several dimensions",
        "explanation": "Multidimensional analysis involves evaluating metrics across multiple attributes simultaneously, such as department, job band, gender, and performance level."
      },
      {
        "question": "7. A worksheet in Tableau is best understood as:",
        "options": [
          "A collection of connected data sources",
          "An individual analytical view of data",
          "A collection of multiple dashboards",
          "A storage system for employee records"
        ],
        "correctAnswer": "An individual analytical view of data",
        "explanation": "In Tableau, a worksheet contains a single chart or data view, which can subsequently be assembled with other views into dashboards."
      },
      {
        "question": "8. What is the primary benefit of presenting aggregated HR data visually?",
        "options": [
          "It increases the number of employee records",
          "It eliminates the need for source data",
          "It makes patterns and comparisons easier to interpret",
          "It prevents users from exploring the underlying data"
        ],
        "correctAnswer": "It makes patterns and comparisons easier to interpret",
        "explanation": "Visual charts facilitate rapid pattern recognition, comparative analysis, and trend identification compared to raw numbers."
      },
      {
        "question": "9. What is the main purpose of creating a calculated field in Tableau?",
        "options": [
          "To create a new variable using existing information",
          "To delete existing variables from the dataset",
          "To replace the original data source completely",
          "To convert every variable into a graphical format"
        ],
        "correctAnswer": "To create a new variable using existing information",
        "explanation": "A calculated field allows users to generate new variables and customized metrics by applying mathematical or logical formulas to existing data."
      },
      {
        "question": "10. Which Tableau function is appropriate for finding the difference between two dates?",
        "options": [
          "DATEADD",
          "DATENAME",
          "DATEPART",
          "DATEDIFF"
        ],
        "correctAnswer": "DATEDIFF",
        "explanation": "The DATEDIFF function calculates the difference between two date fields in terms of specified units such as days, months, or years."
      }
    ]
  },
  {
    "id": "hr-analytics-incorrect-q",
    "title": "HR Analytics - Incorrect Q",
    "subject": "HR Analytics",
    "date": "16/10/2026",
    "questions": [
      {
        "question": "1. HR analytics differs from HRMIS primarily because HR analytics has the potential to connect HR processes and decisions with ______.",
        "options": [
          "Employee satisfaction scores only",
          "Regulatory compliance requirements",
          "Payroll and compensation structures",
          "Organization performance"
        ],
        "correctAnswer": "Organization performance",
        "explanation": "HR analytics connects HR processes and strategic decisions directly with organizational performance and business outcomes, moving beyond operational record-keeping typical of HRMIS."
      },
      {
        "question": "2. A manager wants a visual breakdown of \"how many applicants are UG, PG, and PhD\" for a quick presentation. Based on the Excel tools, which would best serve this purpose?",
        "options": [
          "Pivot Table",
          "Pivot Chart",
          "SN field",
          "Status of interview field"
        ],
        "correctAnswer": "Pivot Chart",
        "explanation": "A Pivot Chart provides an immediate visual graphical representation coupled with the summary data."
      },
      {
        "question": "3. A manufacturing company with an outdated work culture and poor employer branding is struggling to attract candidates even after posting on multiple platforms. Which influence, as listed under constraints on choosing a recruiting source, most directly explains this problem?",
        "options": [
          "Limited budgetary support",
          "Restrictive policies of the government",
          "Poor image",
          "Conservative internal policies"
        ],
        "correctAnswer": "Poor image",
        "explanation": "An outdated culture and weak reputation constitute a 'Poor image' constraint, discouraging talented applicants regardless of advertising reach."
      },
      {
        "question": "4. The Internal Branding Matrix includes salary benchmarking and compensation revision as its primary tools for strengthening the employer brand among existing employees.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanation": "Internal branding emphasizes culture, shared values, communication, and employee engagement rather than mere transactional compensation changes."
      },
      {
        "question": "5. Which of the following correctly matches a Type of Interview with its definition?",
        "options": [
          "Situational Interview – The recruiter asks questions as they come to mind.",
          "Structured Interview – The recruiter uses a predetermined set of questions that are clearly job-related.",
          "Panel Interview – The recruiter presents a hypothetical incident and asks the candidate to respond.",
          "Behavioural Interview – The focus is on actual work-related incidents, and the applicant is asked to reveal what he or she did in a given situation."
        ],
        "correctAnswer": "Behavioural Interview – The focus is on actual work-related incidents, and the applicant is asked to reveal what he or she did in a given situation.",
        "explanation": "Behavioral interviews operate on the premise that past behavior predicts future performance, probing how candidates handled real past situations."
      },
      {
        "question": "6. Which method provides exposure to diverse functions via advisory groups?",
        "options": [
          "Understudy",
          "Job rotation",
          "Multiple management",
          "Case study"
        ],
        "correctAnswer": "Multiple management",
        "explanation": "Multiple management (such as junior boards of directors) gives emerging managers exposure to high-level strategic problems and diverse organizational functions."
      },
      {
        "question": "7. A suitable method for developing reasoning skills is:",
        "options": [
          "Role playing",
          "Business games",
          "Case study",
          "Sensitivity training"
        ],
        "correctAnswer": "Case study",
        "explanation": "Case study analysis requires trainees to diagnose complex real-world organizational problems, developing critical analytical and reasoning skills."
      },
      {
        "question": "8. What is an important learning metric from training?",
        "options": [
          "Number of holidays taken",
          "Attitude change",
          "New dress code adoption",
          "Marketing strategy redesign"
        ],
        "correctAnswer": "Attitude change",
        "explanation": "Under Kirkpatrick's Level 2 (Learning), changes in attitude, knowledge, and mental models serve as essential learning metrics."
      },
      {
        "question": "9. Training evaluation criteria do NOT include:",
        "options": [
          "Sales promotions",
          "Learning",
          "Employee reactions",
          "Business results"
        ],
        "correctAnswer": "Sales promotions",
        "explanation": "Kirkpatrick's four levels of training evaluation are Reaction, Learning, Behavior, and Results. Sales promotions are marketing activities, not training evaluation criteria."
      },
      {
        "question": "10. What character trait is listed in the benchmark skills table?",
        "options": [
          "Punctuality",
          "Compassion and sensitivity",
          "Typing speed",
          "Accent clarity"
        ],
        "correctAnswer": "Compassion and sensitivity",
        "explanation": "Benchmark managerial competencies highlight emotional intelligence traits such as compassion and interpersonal sensitivity."
      },
      {
        "question": "11. Which activity is part of internal development programs?",
        "options": [
          "External consulting",
          "Job rotation",
          "Legal compliance",
          "Budget proposal writing"
        ],
        "correctAnswer": "Job rotation",
        "explanation": "Job rotation is a primary internal development method for expanding experiential breadth within the firm."
      },
      {
        "question": "12. What method in job experiences matrix involves decision-making under stress?",
        "options": [
          "Group exercise",
          "Adverse business conditions",
          "Annual party planning",
          "Time logging"
        ],
        "correctAnswer": "Adverse business conditions",
        "explanation": "Experiencing adverse business conditions challenges leaders to make high-stakes decisions under genuine organizational stress."
      },
      {
        "question": "13. What does 'Making Transitions' in the job experience matrix signify?",
        "options": [
          "Time zone shift",
          "Unfamiliar responsibilities",
          "Changing passwords",
          "Location mapping"
        ],
        "correctAnswer": "Unfamiliar responsibilities",
        "explanation": "Transition experiences involve stepping into unfamiliar roles, managing different functional scopes, or leading new initiatives."
      },
      {
        "question": "14. InnovateTech included participation in cross-functional ________ as part of performance standards.",
        "options": [
          "outsourcing",
          "auditing",
          "training",
          "marketing"
        ],
        "correctAnswer": "training",
        "explanation": "Cross-functional training participation enhances organizational versatility and collaborative problem-solving, making it a key performance standard criterion."
      },
      {
        "question": "15. In the balanced score approach, return on equity is classified as a:",
        "options": [
          "behavioral indicator",
          "lag indicator",
          "recruitment indicator",
          "training indicator"
        ],
        "correctAnswer": "lag indicator",
        "explanation": "Return on equity (ROE) is a financial output metric reflecting past activities and historical performance, making it a classic lag indicator in the Balanced Scorecard framework."
      },
      {
        "question": "16. The 9 Box Matrix evaluates potential rating and:",
        "options": [
          "compensation ratio",
          "training frequency",
          "attendance score",
          "performance rating"
        ],
        "correctAnswer": "performance rating",
        "explanation": "The 9-Box Grid is a classic talent management tool that plots employee current performance rating on one axis against future potential rating on the other."
      },
      {
        "question": "17. Motivation, ability, and opportunity are analyzed in order to identify:",
        "options": [
          "compensation structures",
          "causes of underperformance",
          "recruitment procedures",
          "leadership succession plans"
        ],
        "correctAnswer": "causes of underperformance",
        "explanation": "The AMO (Ability, Motivation, Opportunity) model is used to diagnose root causes of individual employee performance issues or underperformance."
      },
      {
        "question": "18. Pay mix policies included analysis of base wage, benefits, and:",
        "options": [
          "transportation allowance",
          "long-term incentives",
          "taxation credits",
          "inventory rewards"
        ],
        "correctAnswer": "long-term incentives",
        "explanation": "A complete total rewards pay mix encompasses base pay, short- and long-term incentives, and employee benefits."
      }
    ]
  }
];

