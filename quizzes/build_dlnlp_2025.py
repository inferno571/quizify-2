# Parser script for DLNLP 2025 PYQ assignments
import sys, os, re, json

sys.stdout.reconfigure(encoding='utf-8')

quizzes = {}

# ==========================================
# Assignment 1
# ==========================================
with open('quizzes/raw_assignment_1.txt', encoding='utf-8') as f:
    text1 = ' '.join([l.strip() for l in f.readlines() if l.strip()])

m1 = list(re.finditer(r'(?:^|\s)(?:Question\s*)?([1-9]|10)\.\s*', text1))
qs1 = []
for i in range(len(m1)):
    start = m1[i].end()
    end = m1[i+1].start() if i+1 < len(m1) else len(text1)
    chunk = text1[start:end].strip()
    
    ans_m = re.search(r'(?i)\b(?:Answer|Answers)\s*[:：]\s*(?:\(([A-D])\)|([A-D]))', chunk)
    ans_letter = ans_m.group(1) or ans_m.group(2) if ans_m else ''
    
    sol_m = re.search(r'(?i)\bSolution\s*[:：]\s*(.+)$', chunk)
    explanation = sol_m.group(1).strip() if sol_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    
    opt_m = list(re.finditer(r'(?:^|\s)\(([A-D])\)\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(main[os_pos:oe_pos].strip())
    
    idx = ord(ans_letter.upper()) - ord('A') if ans_letter else -1
    correct_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    
    if 'confusion matrix' in q_text.lower():
        q_text = q_text.replace('Predicted Positive Predicted Negative Actual Positive 40 10 Actual Negative 20 30', '\n\n| | Predicted Positive | Predicted Negative |\n|---|---|---|\n| Actual Positive | 40 | 10 |\n| Actual Negative | 20 | 30 |\n\n')
    
    if not explanation:
        explanation = f'Option ({ans_letter}) is the correct answer based on NPTEL DLNLP Assignment 1.'
    
    qs1.append({
        'question': f'{i+1}. {q_text}',
        'options': opts,
        'correctAnswer': correct_val,
        'explanation': explanation
    })

quizzes[1] = qs1

# ==========================================
# Assignment 2
# ==========================================
with open('quizzes/raw_assignment_2.txt', encoding='utf-8') as f:
    text2 = f.read()

m2 = list(re.finditer(r'(?m)^\s*([1-8])\.\s*$', text2))
qs2 = []
for i in range(len(m2)):
    start = m2[i].end()
    end = m2[i+1].start() if i+1 < len(m2) else len(text2)
    chunk = text2[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：]\s*([a-d])', chunk)
    ans_letter = ans_m.group(1).lower() if ans_m else ''
    
    sol_m = re.search(r'(?i)\bSolution\s*[:：]\s*([\s\S]+)$', chunk)
    explanation = sol_m.group(1).strip() if sol_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    
    opt_m = list(re.finditer(r'(?m)^\s*([a-d])[\)\.]\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(' '.join(main[os_pos:oe_pos].strip().split()))
    
    idx = ord(ans_letter) - ord('a')
    corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    
    clean_q = ' '.join(q_text.split())
    if i == 7:
        clean_q = clean_q.replace('least squares loss function is given by: where', 'least squares loss function is given by:\n\n$$L = \\frac{1}{N} \\sum_{i=1}^N (y_i - (\\hat{w}x_i + b))^2$$\n\nwhere')
    
    qs2.append({
        'question': f'{i+1}. {clean_q}',
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': ' '.join(explanation.split())
    })

quizzes[2] = qs2

# ==========================================
# Assignment 3
# ==========================================
with open('quizzes/raw_assignment_3.txt', encoding='utf-8') as f:
    text3 = ' '.join([l.strip() for l in f.readlines() if l.strip()])

m3 = list(re.finditer(r'(?:^|\s)(?:Question\s*)?([1-9]|10)\.\s*', text3))
qs3 = []
for i in range(len(m3)):
    start = m3[i].end()
    end = m3[i+1].start() if i+1 < len(m3) else len(text3)
    chunk = text3[start:end].strip()
    
    ans_m = re.search(r'\(Correct Answer:\s*([A-D])\)', chunk)
    ans_letter = ans_m.group(1) if ans_m else ''
    
    q_part = chunk[:ans_m.start()].strip() if ans_m else chunk
    
    opt_m = list(re.finditer(r'(?:^|\s)([A-D])\.\s*', q_part))
    q_text = q_part[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(q_part)
        opts.append(q_part[os_pos:oe_pos].strip())
    
    idx = ord(ans_letter) - ord('A')
    corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    qs3.append({
        'question': f'{i+1}. {q_text}',
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': f'Option ({ans_letter}) is the correct answer according to NPTEL DLNLP Assignment 3.'
    })

quizzes[3] = qs3

# ==========================================
# Assignment 4
# ==========================================
with open('quizzes/raw_assignment_4.txt', encoding='utf-8') as f:
    text4 = f.read()

m4 = list(re.finditer(r'(?i)(?:^|\n)\s*Question\s*([1-7])[\.:]', text4))
qs4 = []
for i in range(len(m4)):
    start = m4[i].end()
    end = m4[i+1].start() if i+1 < len(m4) else len(text4)
    chunk = text4[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：]\s*([1-4])', chunk)
    ans_num = int(ans_m.group(1)) if ans_m else 1
    
    sol_m = re.search(r'(?i)\bSolu\s*tion\s*[:：]\s*([\s\S]+)$', chunk)
    explanation = ' '.join(sol_m.group(1).split()) if sol_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    
    opt_m = list(re.finditer(r'(?m)(?:^|\n)\s*([1-4])\.\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(' '.join(main[os_pos:oe_pos].strip().split()))
    
    corr_val = opts[ans_num - 1] if 0 <= ans_num - 1 < len(opts) else str(ans_num)
    qs4.append({
        'question': f'{i+1}. ' + ' '.join(q_text.split()),
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': explanation
    })

quizzes[4] = qs4

# ==========================================
# Assignment 5
# ==========================================
with open('quizzes/raw_assignment_5.txt', encoding='utf-8') as f:
    text5 = ' '.join([l.strip() for l in f.readlines() if l.strip()])

# Questions in 5 are numbered 1 to 10
# Note in Q6: "d_k = 2. Calculate..." has "2." which is not a question number.
# We match question numbers specifically:
q5_nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
m5_starts = []
for qn in q5_nums:
    pattern = rf'(?:^|\s){qn}\.\s+'
    matches = list(re.finditer(pattern, text5))
    if qn == '2':
        # the true question 2 is the one occurring before question 3
        m5_starts.append(matches[0])
    else:
        m5_starts.append(matches[0])

# sort by start pos
m5_starts.sort(key=lambda x: x.start())

qs5 = []
for i in range(len(m5_starts)):
    start = m5_starts[i].end()
    end = m5_starts[i+1].start() if i+1 < len(m5_starts) else len(text5)
    chunk = text5[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：]\s*\(([A-D])\)', chunk)
    ans_letter = ans_m.group(1) if ans_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    sol_rest = chunk[ans_m.end():].strip() if ans_m else ''
    
    opt_m = list(re.finditer(r'(?:^|\s)\(([A-D])\)\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(main[os_pos:oe_pos].strip())
    
    idx = ord(ans_letter.upper()) - ord('A') if ans_letter else -1
    corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    
    qs5.append({
        'question': f'{i+1}. {q_text}',
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': sol_rest if sol_rest else f'Option ({ans_letter}) is the correct answer according to NPTEL DLNLP Assignment 5.'
    })

quizzes[5] = qs5

# ==========================================
# Assignment 6
# ==========================================
with open('quizzes/raw_assignment_6.txt', encoding='utf-8') as f:
    text6 = ' '.join([l.strip() for l in f.readlines() if l.strip()])

# In 6, questions are 1: , 2: , 3: , 4. , 5. , 6. , 7. , 8.
q6_patterns = [
    r'1:\s+', r'2:\s+', r'3:\s+', r'4\.\s+', r'5\.\s+', r'6\.\s+', r'7\.\s+', r'8\.\s+'
]
m6_starts = []
for p in q6_patterns:
    m = re.search(p, text6)
    if m:
        m6_starts.append(m)

qs6 = []
for i in range(len(m6_starts)):
    start = m6_starts[i].end()
    end = m6_starts[i+1].start() if i+1 < len(m6_starts) else len(text6)
    chunk = text6[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：\-]\s*(?:([A-D])\b|\(([A-D])\)|([a-d])\b)', chunk)
    ans_letter = ''
    if ans_m:
        ans_letter = (ans_m.group(1) or ans_m.group(2) or ans_m.group(3)).upper()
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    sol_rest = chunk[ans_m.end():].strip() if ans_m else ''
    
    opt_m = list(re.finditer(r'(?:^|\s)(?:([A-D])\)|\b([a-d])\))\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(main[os_pos:oe_pos].strip())
    
    idx = ord(ans_letter) - ord('A') if ans_letter else -1
    corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    
    qs6.append({
        'question': f'{i+1}. {q_text}',
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': sol_rest if sol_rest else f'Option ({ans_letter}) is correct based on NPTEL DLNLP Assignment 6.'
    })

quizzes[6] = qs6

# ==========================================
# Assignment 7
# ==========================================
with open('quizzes/raw_assignment_7.txt', encoding='utf-8') as f:
    text7 = f.read()

m7 = list(re.finditer(r'(?m)^\s*([1-9]|10)\.\s*$', text7))
qs7 = []
for i in range(len(m7)):
    start = m7[i].end()
    end = m7[i+1].start() if i+1 < len(m7) else len(text7)
    chunk = text7[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：]\s*([a-d])\)', chunk)
    ans_letter = ans_m.group(1).lower() if ans_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    
    opt_m = list(re.finditer(r'(?m)^\s*([a-d])\)\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(' '.join(main[os_pos:oe_pos].strip().split()))
    
    idx = ord(ans_letter) - ord('a') if ans_letter else -1
    corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    
    qs7.append({
        'question': f'{i+1}. ' + ' '.join(q_text.split()),
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': f'Option ({ans_letter.upper()}) is the correct answer according to NPTEL DLNLP Assignment 7.'
    })

quizzes[7] = qs7

# ==========================================
# Assignment 8
# ==========================================
with open('quizzes/raw_assignment_8.txt', encoding='utf-8') as f:
    text8 = f.read()

m8 = list(re.finditer(r'(?i)(?:^|\n)\s*Question\s*([1-8])\s*:', text8))
qs8 = []
for i in range(len(m8)):
    start = m8[i].end()
    end = m8[i+1].start() if i+1 < len(m8) else len(text8)
    chunk = text8[start:end].strip()
    
    # Handle Q7 and Q8 specifically with embedded formulas
    if i == 6: # Q7
        q_text = ("In RLHF the reward function R(s) is often regularized using the KL divergence between the learned policy π_ϕ and the reference policy π_0 to prevent excessive deviation. The modified reward is given by:\n\n"
                  "$$R'(s) = R(s) - \\beta D_{\\text{KL}}(\\pi_\\phi(\\cdot \\mid s) \\parallel \\pi_0(\\cdot \\mid s))$$\n\n"
                  "The KL divergence is defined as:\n\n"
                  "$$D_{\\text{KL}}(\\pi_\\phi \\parallel \\pi_0) = \\sum_a \\pi_\\phi(a \\mid s) \\log \\frac{\\pi_\\phi(a \\mid s)}{\\pi_0(a \\mid s)}$$\n\n"
                  "Consider a state s where the action probabilities under $\\pi_\\phi$ and reference policy $\\pi_0$ are:\n"
                  "• $\\pi_\\phi(a_1 \\mid s) = 0.6, \\quad \\pi_\\phi(a_2 \\mid s) = 0.4$\n"
                  "• $\\pi_0(a_1 \\mid s) = 0.5, \\quad \\pi_0(a_2 \\mid s) = 0.5$\n\n"
                  "Compute the KL divergence and select the correct answer:")
        opts = ["0.0704", "0.0781", "0.0689", "0.0652"]
        corr_val = "0.0704"
        explanation = ("$D_{\\text{KL}} = (0.6 \\times \\log(0.6/0.5)) + (0.4 \\times \\log(0.4/0.5)) = (0.6 \\times 0.182) + (0.4 \\times (-0.097)) = 0.1092 - 0.0388 = 0.0704$.")
    elif i == 7: # Q8
        q_text = ("In RLHF setup, to train a reward function R(x), the optimization objective is to maximize the difference in rewards between preferred and dispreferred responses. Suppose we have a dataset of preference pairs $(x, y^+)$ and $(x, y^-)$, where $y^+$ is the preferred response and $y^-$ is the dispreferred response.\n\n"
                  "The loss function for the reward model is given as:\n\n"
                  "$$\\mathcal{L} = -\\mathbb{E}_{(x, y^+, y^-)} [\\log \\sigma(R(y^+) - R(y^-))]$$\n\n"
                  "If the rewards for a given preference pair are $R(y^+) = 2.5$, and $R(y^-) = 1.0$, what is the value of the loss term for this pair for the reward model?")
        opts = [
            "log (1 + e^-1.5)",
            "log (1 + e^1.5)",
            "-log (1 + e^-1.5)",
            "-log (1 + e^1.5)"
        ]
        corr_val = "log (1 + e^-1.5)"
        explanation = ("Step 1: Reward difference $R(y^+) - R(y^-) = 2.5 - 1.0 = 1.5$.\n"
                       "Step 2: $\\sigma(1.5) = \\frac{1}{1 + e^{-1.5}}$, so $\\log \\sigma(1.5) = -\\log(1 + e^{-1.5})$.\n"
                       "Step 3: Loss $\\mathcal{L} = -(-\\log(1 + e^{-1.5})) = \\log(1 + e^{-1.5})$.")
    else:
        ans_m = re.search(r'(?i)\bAnswer\s*[:：]\s*([A-D])', chunk)
        ans_letter = ans_m.group(1).upper() if ans_m else ''
        main = chunk[:ans_m.start()].strip() if ans_m else chunk
        
        opt_m = list(re.finditer(r'(?m)^\s*([A-D])[\)\.]\s*', main))
        q_text = ' '.join(main[:opt_m[0].start()].split())
        opts = []
        for j in range(len(opt_m)):
            os_pos = opt_m[j].end()
            oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
            opts.append(' '.join(main[os_pos:oe_pos].strip().split()))
        
        idx = ord(ans_letter) - ord('A') if ans_letter else -1
        corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
        explanation = f'Option ({ans_letter}) is correct based on NPTEL DLNLP Assignment 8.'
    
    qs8.append({
        'question': f'{i+1}. {q_text}',
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': explanation
    })

quizzes[8] = qs8

# ==========================================
# Assignment 9
# ==========================================
with open('quizzes/raw_assignment_9.txt', encoding='utf-8') as f:
    text9 = f.read()

m9 = list(re.finditer(r'(?i)\bQuesti?\s*on\s*(\d+)\s*:', text9))
qs9 = []
for i in range(len(m9)):
    start = m9[i].end()
    end = m9[i+1].start() if i+1 < len(m9) else len(text9)
    chunk = text9[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：]?\s*([A-D])', chunk)
    ans_letter = ans_m.group(1).upper() if ans_m else ''
    
    sol_m = re.search(r'(?i)\bSolution\s*[:：]\s*([\s\S]+)$', chunk)
    explanation = ' '.join(sol_m.group(1).split()) if sol_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    
    opt_m = list(re.finditer(r'(?i)(?:^|\n|\s)\b([A-D])[\)\.]\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(' '.join(main[os_pos:oe_pos].strip().split()))
    
    idx = ord(ans_letter) - ord('A') if ans_letter else -1
    corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    
    if not explanation:
        explanation = f'Option ({ans_letter}) is the correct answer according to NPTEL DLNLP Assignment 9.'
    
    qs9.append({
        'question': f'{i+1}. ' + ' '.join(q_text.split()),
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': explanation
    })

quizzes[9] = qs9

# ==========================================
# Assignment 10
# ==========================================
with open('quizzes/raw_assignment_10.txt', encoding='utf-8') as f:
    text10 = f.read()

m10 = list(re.finditer(r'(?i)\bQuestion\s*(\d+)\s*[\.:]', text10))
qs10 = []
for i in range(len(m10)):
    start = m10[i].end()
    end = m10[i+1].start() if i+1 < len(m10) else len(text10)
    chunk = text10[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：]?\s*([A-D])', chunk)
    ans_letter = ans_m.group(1).upper() if ans_m else ''
    
    sol_m = re.search(r'(?i)\bSolution\s*[:：]\s*([\s\S]+)$', chunk)
    explanation = ' '.join(sol_m.group(1).split()) if sol_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    
    opt_m = list(re.finditer(r'(?i)(?:^|\n|\s)\b([A-D])[\)\.]\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(' '.join(main[os_pos:oe_pos].strip().split()))
    
    idx = ord(ans_letter) - ord('A') if ans_letter else -1
    corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    
    if not explanation:
        explanation = f'Option ({ans_letter}) is the correct answer according to NPTEL DLNLP Assignment 10.'
    
    qs10.append({
        'question': f'{i+1}. ' + ' '.join(q_text.split()),
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': explanation
    })

quizzes[10] = qs10

# ==========================================
# Assignment 11
# ==========================================
with open('quizzes/raw_assignment_11.txt', encoding='utf-8') as f:
    text11 = f.read()

m11 = list(re.finditer(r'(?i)(?:^|\n)\s*Question\s*([1-8])[\.:]', text11))
qs11 = []
for i in range(len(m11)):
    start = m11[i].end()
    end = m11[i+1].start() if i+1 < len(m11) else len(text11)
    chunk = text11[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：]?\s*([A-D](?:,\s*[A-D])*)', chunk)
    ans_raw = ans_m.group(1) if ans_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    
    opt_m = list(re.finditer(r'(?i)(?:^|\n|\s+)\b([A-D])[\)\.]\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(' '.join(main[os_pos:oe_pos].strip().split()))
    
    # if multiple answers like "A, B, C"
    if ',' in ans_raw:
        # choose first or combine text
        letters = [l.strip() for l in ans_raw.split(',')]
        corr_val = ' / '.join([opts[ord(l) - ord('A')] for l in letters if ord(l) - ord('A') < len(opts)])
        explanation = f'Multiple statements are correct: ({ans_raw}). ' + f'Specifically: {corr_val}.'
    else:
        idx = ord(ans_raw) - ord('A') if ans_raw else -1
        corr_val = opts[idx] if 0 <= idx < len(opts) else ans_raw
        explanation = f'Option ({ans_raw}) is correct based on NPTEL DLNLP Assignment 11.'
        if i == 5: # Q6 explanation
            explanation = "For forward propagation, compute FLOPs ≈ 2 × P × N = 2 × (100 × 10^6) × 20 = 4,000 million (4 billion) FLOPs."
        elif i == 6: # Q7 explanation
            explanation = "Under Chinchilla scaling laws, tokens = 20 × parameters = 20 × 8B = 160B tokens."
    
    qs11.append({
        'question': f'{i+1}. ' + ' '.join(q_text.split()),
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': explanation
    })

quizzes[11] = qs11

# ==========================================
# Assignment 12
# ==========================================
with open('quizzes/raw_assignment_12.txt', encoding='utf-8') as f:
    text12 = ' '.join([l.strip() for l in f.readlines() if l.strip()])

m12 = list(re.finditer(r'(?i)(?:^|\s)Question\s*([1-9]|10)\b[:\.]?', text12))
qs12 = []
for i in range(len(m12)):
    start = m12[i].end()
    end = m12[i+1].start() if i+1 < len(m12) else len(text12)
    chunk = text12[start:end].strip()
    
    ans_m = re.search(r'(?i)\bAnswer\s*[:：]\s*(?:([A-D])\b|\(([A-D])\)|([A-D])\))', chunk)
    ans_letter = (ans_m.group(1) or ans_m.group(2) or ans_m.group(3)).upper() if ans_m else ''
    
    main = chunk[:ans_m.start()].strip() if ans_m else chunk
    sol_rest = chunk[ans_m.end():].strip() if ans_m else ''
    
    opt_m = list(re.finditer(r'(?:^|\s)\b([A-D])\)\s*', main))
    q_text = main[:opt_m[0].start()].strip()
    opts = []
    for j in range(len(opt_m)):
        os_pos = opt_m[j].end()
        oe_pos = opt_m[j+1].start() if j+1 < len(opt_m) else len(main)
        opts.append(main[os_pos:oe_pos].strip())
    
    idx = ord(ans_letter) - ord('A') if ans_letter else -1
    corr_val = opts[idx] if 0 <= idx < len(opts) else ans_letter
    
    qs12.append({
        'question': f'{i+1}. {q_text}',
        'options': opts,
        'correctAnswer': corr_val,
        'explanation': sol_rest if sol_rest else f'Option ({ans_letter}) is correct based on NPTEL DLNLP Assignment 12.'
    })

quizzes[12] = qs12

print('Summary of parsed quizzes:')
total_qs = 0
for k in range(1, 13):
    count = len(quizzes[k])
    total_qs += count
    print(f'Assignment {k}: {count} questions')
print(f'TOTAL QUESTIONS: {total_qs}')

# Save to disk as individual files and grand combined test
all_grand_questions = []
for k in range(1, 13):
    q_data = {
        'id': f'dlnlp-2025-assignment-{k}',
        'title': f'DLNLP (2025 PYQ) - Assignment {k}',
        'subject': 'DLNLP (2025 PYQ)',
        'date': '17/10/2026',
        'questions': quizzes[k]
    }
    with open(f'quizzes/dlnlp_2025_assignment_{k}.json', 'w', encoding='utf-8') as f_out:
        json.dump(q_data, f_out, indent=2, ensure_ascii=False)
    
    # re-index question numbering for grand combined test
    for q in quizzes[k]:
        q_copy = dict(q)
        q_copy['question'] = f'{len(all_grand_questions) + 1}. ' + re.sub(r'^\d+\.\s*', '', q['question'])
        all_grand_questions.append(q_copy)

# Grand combined test
grand_test = {
    'id': 'dlnlp-2025-full-combined-test',
    'title': 'DLNLP (2025 PYQ) - Full Combined Grand Test (Assignments 1-12)',
    'subject': 'DLNLP (2025 PYQ)',
    'date': '17/10/2026',
    'questions': all_grand_questions
}
with open('quizzes/dlnlp_2025_full_combined.json', 'w', encoding='utf-8') as f_out:
    json.dump(grand_test, f_out, indent=2, ensure_ascii=False)

print(f'Saved grand combined test with {len(all_grand_questions)} questions.')
