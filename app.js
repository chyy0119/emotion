console.log('app.js loading...');
console.log('questions variable exists:', typeof questions !== 'undefined');
console.log('questions length:', questions ? questions.length : 'undefined');

class LoveTestApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.scores = { E: 0, S: 0, T: 0, D: 0 };
        this.answers = [];
        this.theoryScores = {
            reciprocity: { high: 0, medium: 0, low: 0 },
            supportType: { emotional: 0, practical: 0, advice: 0, none: 0 },
            attachment: { secure: 0, anxious: 0, avoidant: 0 },
            disclosure: { deep: 0, medium: 0, shallow: 0 }
        };
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('start-screen');
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startTest();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.resetTest();
        });

        document.getElementById('share-btn').addEventListener('click', () => {
            this.shareResult();
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    startTest() {
        this.currentQuestionIndex = 0;
        this.scores = { E: 0, S: 0, T: 0, D: 0 };
        this.answers = [];
        this.theoryScores = {
            reciprocity: { high: 0, medium: 0, low: 0 },
            supportType: { emotional: 0, practical: 0, advice: 0, none: 0 },
            attachment: { secure: 0, anxious: 0, avoidant: 0 },
            disclosure: { deep: 0, medium: 0, shallow: 0 }
        };
        this.showScreen('chat-screen');
        this.renderQuestion();
    }

    renderQuestion() {
        try {
            console.log('renderQuestion called, index:', this.currentQuestionIndex);
            console.log('questions length:', questions ? questions.length : 'undefined');
            
            const question = questions[this.currentQuestionIndex];
            console.log('question data:', question);
            
            if (!question) {
                console.error('No question found at index:', this.currentQuestionIndex);
                this.showResult();
                return;
            }

            const chatMessages = document.getElementById('chat-messages');
            const optionsArea = document.getElementById('options-area');
            
            console.log('chatMessages element:', chatMessages);
            console.log('optionsArea element:', optionsArea);

            chatMessages.innerHTML = '';
            optionsArea.innerHTML = '';

            const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

            const otherMsg = document.createElement('div');
            otherMsg.className = 'message left';
            otherMsg.innerHTML = `
                <div class="avatar other">💑</div>
                <div>
                    <div class="message-bubble">${question.message}</div>
                    <div class="message-time">${time}</div>
                </div>
            `;
            chatMessages.appendChild(otherMsg);

            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);

            question.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option-btn';
                optionBtn.innerHTML = `<span>${option.text}</span>`;
                optionBtn.addEventListener('click', () => {
                    if (this.isAnimating) return;
                    this.selectOption(index, option);
                });
                optionsArea.appendChild(optionBtn);
            });

            this.updateProgress();
        } catch(e) {
            console.error('renderQuestion error:', e);
            console.error('Stack trace:', e.stack);
            alert('题目加载错误: ' + e.message);
        }
    }

    selectOption(index, option) {
        this.isAnimating = true;

        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => btn.style.pointerEvents = 'none');
        optionBtns[index].classList.add('selected');

        // 优化计分：引入相对权重机制
        // A选项(正向)给+2，B选项(中性)给+1，C选项(负向)给-1，D选项(冷漠)给-2
        // 同时增加维度差异化：不同题目同一选项在不同维度上权重不同
        const question = questions[this.currentQuestionIndex];
        const questionWeight = this.getQuestionWeight(question);
        
        this.scores.E += (option.scores.E || 0) * questionWeight.E;
        this.scores.S += (option.scores.S || 0) * questionWeight.S;
        this.scores.T += (option.scores.T || 0) * questionWeight.T;
        this.scores.D += (option.scores.D || 0) * questionWeight.D;

        if (option.reciprocity && option.reciprocity in this.theoryScores.reciprocity) {
            this.theoryScores.reciprocity[option.reciprocity]++;
        }
        if (option.supportType && option.supportType in this.theoryScores.supportType) {
            this.theoryScores.supportType[option.supportType]++;
        }
        if (option.attachment && option.attachment in this.theoryScores.attachment) {
            this.theoryScores.attachment[option.attachment]++;
        }
        if (option.disclosure && option.disclosure in this.theoryScores.disclosure) {
            this.theoryScores.disclosure[option.disclosure]++;
        }

        this.answers.push({
            questionId: questions[this.currentQuestionIndex].id,
            optionIndex: index,
            scores: option.scores,
            reciprocity: option.reciprocity,
            supportType: option.supportType,
            attachment: option.attachment,
            disclosure: option.disclosure
        });

        const chatMessages = document.getElementById('chat-messages');
        const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

        const selfMsg = document.createElement('div');
        selfMsg.className = 'message right';
        selfMsg.innerHTML = `
            <div class="avatar self"><svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="5" width="10" height="10" rx="3" fill="#FFB6C1"/><rect x="10" y="8" width="2" height="2" rx="1" fill="#333"/><rect x="14" y="8" width="2" height="2" rx="1" fill="#333"/><rect x="6" y="15" width="14" height="12" rx="3" fill="#87CEEB"/><rect x="22" y="5" width="10" height="10" rx="3" fill="#FFB6C1"/><rect x="24" y="8" width="2" height="2" rx="1" fill="#333"/><rect x="28" y="8" width="2" height="2" rx="1" fill="#333"/><rect x="20" y="15" width="14" height="12" rx="3" fill="#98D8C8"/><rect x="18" y="18" width="4" height="2" rx="1" fill="#FFB6C1"/></svg></div>
            <div>
                <div class="message-bubble">${option.text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        chatMessages.appendChild(selfMsg);

        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);

        setTimeout(() => {
            this.currentQuestionIndex++;
            this.isAnimating = false;
            this.renderQuestion();
        }, 800);
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${this.currentQuestionIndex + 1}/${questions.length}`;
    }

    showResult() {
        console.log('showResult called');
        console.log('Final scores:', this.scores);
        console.log('Theory scores:', this.theoryScores);
        this.calculateResult();
        console.log('calculateResult completed');
        this.showScreen('result-screen');
        console.log('showScreen called');
    }

    calculateResult() {
        try {
            console.log('calculateResult started');
            const personality = this.determinePersonality();
            console.log('Personality:', personality);
            const theoryAnalysis = this.calculateTheoryScores();
            console.log('Theory analysis:', theoryAnalysis);
            
            document.getElementById('personality-code').textContent = personality.code;
            document.getElementById('personality-name').textContent = personality.name;
            document.getElementById('result-icon').innerHTML = personality.icon;

            document.getElementById('val-ei').textContent = personality.dimensions.EI;
            document.getElementById('val-su').textContent = personality.dimensions.SU;
            document.getElementById('val-tp').textContent = personality.dimensions.TP;
            document.getElementById('val-df').textContent = personality.dimensions.DF;
            
            // 使用百分位分数计算进度条
            const percentiles = this.calculatePercentileScores();
            const eiPct = percentiles.E;
            const suPct = percentiles.S;
            const tpPct = percentiles.T;
            const dfPct = percentiles.D;
            
            const eiBar = document.getElementById('bar-ei');
            eiBar.style.width = `${eiPct}%`;
            eiBar.style.background = personality.dimensions.EI === 'E' ? 'linear-gradient(90deg, #84fab0, #8fd3f4)' : 'linear-gradient(90deg, #a18cd1, #fbc2eb)';
            
            const suBar = document.getElementById('bar-su');
            suBar.style.width = `${suPct}%`;
            suBar.style.background = personality.dimensions.SU === 'S' ? 'linear-gradient(90deg, #ffecd2, #fcb69f)' : 'linear-gradient(90deg, #ff9a9e, #fecfef)';
            
            const tpBar = document.getElementById('bar-tp');
            tpBar.style.width = `${tpPct}%`;
            tpBar.style.background = personality.dimensions.TP === 'T' ? 'linear-gradient(90deg, #e0c3fc, #8ec5fc)' : 'linear-gradient(90deg, #ffecd2, #fcb69f)';
            
            const dfBar = document.getElementById('bar-df');
            dfBar.style.width = `${dfPct}%`;
            dfBar.style.background = personality.dimensions.DF === 'D' ? 'linear-gradient(90deg, #ff9a9e, #fecfef)' : 'linear-gradient(90deg, #a18cd1, #fbc2eb)';

            document.getElementById('analysis-content').innerHTML = personality.analysis;
            document.getElementById('advice-content').innerHTML = personality.advice;

            document.getElementById('reciprocity-score').textContent = theoryAnalysis.reciprocity.score;
            document.getElementById('reciprocity-level').textContent = theoryAnalysis.reciprocity.level;
            document.getElementById('reciprocity-desc').textContent = theoryAnalysis.reciprocity.description;
            document.getElementById('reciprocity-bar').style.width = `${theoryAnalysis.reciprocity.percentage}%`;

            document.getElementById('support-type').textContent = theoryAnalysis.support.type;
            document.getElementById('support-desc').textContent = theoryAnalysis.support.description;
            
            console.log('support emotionalPct:', theoryAnalysis.support.emotionalPct);
            console.log('support practicalPct:', theoryAnalysis.support.practicalPct);
            console.log('support advicePct:', theoryAnalysis.support.advicePct);
            
            document.getElementById('support-emotional').style.width = `${theoryAnalysis.support.emotionalPct}%`;
            document.getElementById('support-practical').style.width = `${theoryAnalysis.support.practicalPct}%`;
            document.getElementById('support-advice').style.width = `${theoryAnalysis.support.advicePct}%`;

            document.getElementById('attachment-secure').textContent = theoryAnalysis.attachment.securePct + '%';
            document.getElementById('attachment-anxious').textContent = theoryAnalysis.attachment.anxiousPct + '%';
            document.getElementById('attachment-avoidant').textContent = theoryAnalysis.attachment.avoidantPct + '%';
            document.getElementById('attachment-desc').textContent = theoryAnalysis.attachment.description;
            document.getElementById('attachment-secure-bar').style.width = `${theoryAnalysis.attachment.securePct}%`;
            document.getElementById('attachment-anxious-bar').style.width = `${theoryAnalysis.attachment.anxiousPct}%`;
            document.getElementById('attachment-avoidant-bar').style.width = `${theoryAnalysis.attachment.avoidantPct}%`;

            const pie = document.getElementById('attachment-pie');
            const securePct = theoryAnalysis.attachment.securePct;
            const anxiousPct = theoryAnalysis.attachment.anxiousPct;
            const avoidantPct = theoryAnalysis.attachment.avoidantPct;
            pie.style.background = `conic-gradient(
                #4caf50 0% ${securePct}%,
                #ff9800 ${securePct}% ${securePct + anxiousPct}%,
                #f44336 ${securePct + anxiousPct}% 100%
            )`;

            document.getElementById('disclosure-score').textContent = theoryAnalysis.disclosure.score;
            document.getElementById('disclosure-level').textContent = theoryAnalysis.disclosure.level;
            document.getElementById('disclosure-desc').textContent = theoryAnalysis.disclosure.description;
            document.getElementById('disclosure-deep').style.width = `${theoryAnalysis.disclosure.deepPct}%`;
            document.getElementById('disclosure-medium').style.width = `${theoryAnalysis.disclosure.mediumPct}%`;
            document.getElementById('disclosure-shallow').style.width = `${theoryAnalysis.disclosure.shallowPct}%`;
            
            console.log('calculateResult completed successfully');
        } catch(e) {
            console.error('calculateResult error:', e);
            console.error('Stack trace:', e.stack);
            alert('结果计算错误: ' + e.message);
        }
    }

    calculateTheoryScores() {
        const { reciprocity, supportType, attachment, disclosure } = this.theoryScores;

        const reciprocityScore = reciprocity.high * 3 + reciprocity.medium * 2 + reciprocity.low * 1;
        const reciprocityTotal = reciprocity.high + reciprocity.medium + reciprocity.low;
        const reciprocityPercentage = reciprocityTotal > 0 ? (reciprocityScore / (reciprocityTotal * 3)) * 100 : 0;
        
        let reciprocityLevel, reciprocityDesc;
        if (reciprocityPercentage >= 70) {
            reciprocityLevel = '高互惠高频延续型';
            reciprocityDesc = '【社会交换理论】你深谙社会交换原则，懂得在互动中保持付出与回报的平衡。高互惠意味着你不仅积极回应对方，还会主动发起话题、追问对方的感受，形成正向循环。这种模式能增强关系的满意度和持久性。';
        } else if (reciprocityPercentage >= 40) {
            reciprocityLevel = '平衡互动型';
            reciprocityDesc = '【沟通动力学】你的互动处于中等水平，能够维持基本的对话流畅度，但缺乏主动延伸的意识。根据沟通动力学理论，单向的信息传递容易导致关系停滞，建议增加"开放式提问"和"深度回应"的技巧。';
        } else {
            reciprocityLevel = '自顾自发言型';
            reciprocityDesc = '【自我中心偏差】你倾向于表达自己的想法而忽略对方的反馈，这可能源于"自我中心偏差"——过度关注自己的需求而忽视他人。根据共情理论，真正的沟通需要"视角转换"，尝试站在对方的角度理解TA的回应。';
        }

        const supportTotal = supportType.emotional + supportType.practical + supportType.advice + supportType.none;
        const emotionalPct = supportTotal > 0 ? (supportType.emotional / supportTotal) * 100 : 0;
        const practicalPct = supportTotal > 0 ? (supportType.practical / supportTotal) * 100 : 0;
        const advicePct = supportTotal > 0 ? (supportType.advice / supportTotal) * 100 : 0;
        
        let supportTypeLabel, supportDesc;
        if (emotionalPct >= 40) {
            supportTypeLabel = '疗愈级给付者 (Therapist)';
            supportDesc = '【情感聚焦疗法】你擅长提供情感支持，这是最有效的支持类型之一。根据情感聚焦疗法(EFT)，情绪验证能够帮助伴侣感到被理解和接纳，从而增强安全感。你的回应方式类似于"情绪镜子"，能准确反映对方的内心感受。';
        } else if (practicalPct + advicePct >= 50) {
            supportTypeLabel = '边界理智派 (Pragmatist)';
            supportDesc = '【问题聚焦应对】你倾向于提供实际帮助和理性建议，这属于"问题聚焦应对"策略。根据应激心理学，这种方式在解决具体问题时非常有效，但在处理情感困扰时可能显得冷漠。建议学习"先共情后解决"的沟通技巧。';
        } else {
            supportTypeLabel = '温和陪伴者 (Companion)';
            supportDesc = '【陪伴式支持】你以温和的方式陪伴对方，既不强行干预也不完全疏离。根据社会支持理论，"无形的支持"有时比直接的帮助更有力量。你的存在本身就是一种安慰，但在关键时刻需要更明确的支持表达。';
        }

        const attachmentTotal = attachment.secure + attachment.anxious + attachment.avoidant;
        const securePct = attachmentTotal > 0 ? (attachment.secure / attachmentTotal) * 100 : 0;
        const anxiousPct = attachmentTotal > 0 ? (attachment.anxious / attachmentTotal) * 100 : 0;
        const avoidantPct = attachmentTotal > 0 ? (attachment.avoidant / attachmentTotal) * 100 : 0;
        
        let attachmentDesc;
        if (securePct >= 50) {
            attachmentDesc = '【Bowlby依恋理论】安全型依恋——你在关系中表现出健康的情感调节能力。根据Bowlby的依恋理论，安全型个体在童年时期经历了"安全基地"的养育，因此能够自由地表达情感、寻求支持，同时保持适当的独立性。这种模式是最理想的恋爱状态。';
        } else if (anxiousPct >= 40) {
            attachmentDesc = '【焦虑型依恋】焦虑型依恋——你表现出强烈的亲密需求和对被抛弃的恐惧。根据成人依恋访谈(AAI)研究，这种模式通常与"矛盾型"童年依恋有关。焦虑型个体需要频繁的确认和关注，容易陷入"焦虑-追逐-疏远"的关系循环。';
        } else if (avoidantPct >= 40) {
            attachmentDesc = '【回避型依恋】回避型依恋——你倾向于在关系中保持距离，避免情感依赖。根据依恋理论，回避型个体在童年时期学会了"自我依赖"，认为表达情感需求会导致失望。这种模式可能表现为表面冷漠，但内心深处依然渴望亲密。';
        } else {
            attachmentDesc = '【混合型依恋】你的依恋模式较为灵活，融合了多种类型的特征。根据最新的依恋研究，大多数人并非纯粹的某一类型，而是处于一个连续谱上。你的模式会根据情境和伴侣的不同而变化。';
        }

        const disclosureScore = disclosure.deep * 3 + disclosure.medium * 2 + disclosure.shallow * 1;
        const disclosureTotal = disclosure.deep + disclosure.medium + disclosure.shallow;
        const deepPct = disclosureTotal > 0 ? (disclosure.deep / disclosureTotal) * 100 : 0;
        const mediumPct = disclosureTotal > 0 ? (disclosure.medium / disclosureTotal) * 100 : 0;
        const shallowPct = disclosureTotal > 0 ? (disclosure.shallow / disclosureTotal) * 100 : 0;
        
        let disclosureLevel, disclosureDesc;
        if (deepPct >= 30) {
            disclosureLevel = '深度披露者';
            disclosureDesc = '【社会渗透理论】你愿意分享深层的个人信息，这是关系发展的关键。根据Altman和Taylor的社会渗透理论，自我披露是关系从表面到深层发展的核心机制。深度披露能够建立信任和亲密感，但也要注意选择合适的时机和对象。';
        } else if (mediumPct >= 40) {
            disclosureLevel = '适度开放者';
            disclosureDesc = '【边界管理理论】你懂得在开放和保护之间找到平衡，这是健康的自我披露策略。根据边界管理理论，适度的自我披露既能维持亲密关系，又能保护个人隐私。这种策略有助于建立稳定的长期关系。';
        } else {
            disclosureLevel = '谨慎保护者';
            disclosureDesc = '【自我保护机制】你倾向于保护个人隐私，这可能是一种自我保护策略。根据心理防御机制理论，过度的自我保护可能源于对拒绝或伤害的恐惧。适度的自我披露是建立亲密关系的必要条件，建议逐步增加开放度。';
        }

        return {
            reciprocity: {
                score: Math.round(reciprocityPercentage),
                level: reciprocityLevel,
                description: reciprocityDesc,
                percentage: reciprocityPercentage
            },
            support: {
                type: supportTypeLabel,
                description: supportDesc,
                emotionalPct: emotionalPct,
                practicalPct: practicalPct,
                advicePct: advicePct
            },
            attachment: {
                securePct: Math.round(securePct),
                anxiousPct: Math.round(anxiousPct),
                avoidantPct: Math.round(avoidantPct),
                description: attachmentDesc
            },
            disclosure: {
                score: Math.round((disclosureScore / (disclosureTotal * 3)) * 100),
                level: disclosureLevel,
                description: disclosureDesc,
                deepPct: deepPct,
                mediumPct: mediumPct,
                shallowPct: shallowPct
            }
        };
    }

    getQuestionWeight(question) {
        // 根据题目类型设置不同的维度权重系数
        // 让不同题目在不同维度上有不同的区分度
        const weights = {
            'initial': { E: 1.2, S: 0.8, T: 0.8, D: 1.0 },  // 初始题：侧重E和D
            'routine': { E: 1.0, S: 1.0, T: 1.0, D: 0.8 },  // 日常题：均衡但D权重低
            'crisis': { E: 0.8, S: 1.5, T: 1.2, D: 1.0 },   // 危机题：侧重S和T
            'deep': { E: 0.8, S: 1.0, T: 0.8, D: 1.5 },     // 深度题：侧重D
            'final': { E: 1.0, S: 1.0, T: 1.0, D: 1.2 }     // 最终题：均衡但D略高
        };
        return weights[question.type] || { E: 1.0, S: 1.0, T: 1.0, D: 1.0 };
    }

    calculatePercentileScores() {
        // 计算每个维度的相对百分位
        const { E, S, T, D } = this.scores;
        
        // 理论最大/最小分（考虑权重后）
        const maxPossible = 90;  // 30题 * 3分(最高) * 1.5(最高权重)
        const minPossible = -60; // 30题 * -2分(最低) * 1.0(最低权重)
        const range = maxPossible - minPossible;
        
        // 转换为0-100的百分位
        const ePct = ((E - minPossible) / range) * 100;
        const sPct = ((S - minPossible) / range) * 100;
        const tPct = ((T - minPossible) / range) * 100;
        const dPct = ((D - minPossible) / range) * 100;
        
        return {
            E: Math.min(100, Math.max(0, ePct)),
            S: Math.min(100, Math.max(0, sPct)),
            T: Math.min(100, Math.max(0, tPct)),
            D: Math.min(100, Math.max(0, dPct))
        };
    }

    determinePersonality() {
        const { E, S, T, D } = this.scores;
        
        // 统计各类型题目数量
        let routineCount = 0, crisisCount = 0, deepCount = 0;
        questions.forEach(q => {
            if (q.type === 'routine' || q.type === 'initial') routineCount++;
            else if (q.type === 'crisis') crisisCount++;
            else if (q.type === 'deep' || q.type === 'final') deepCount++;
        });
        
        // 计算各维度理论最大/最小分
        const eMax = routineCount * 2 + crisisCount * 2 + deepCount * 3;
        const eMin = routineCount * -1 + crisisCount * -1 + deepCount * -1;
        const eRange = eMax - eMin;
        
        const sMax = routineCount * 2 + crisisCount * 2 + deepCount * 2;
        const sMin = routineCount * -1 + crisisCount * -1 + deepCount * -1;
        const sRange = sMax - sMin;
        
        const tMax = routineCount * 2 + crisisCount * 2 + deepCount * 2;
        const tMin = routineCount * 0 + crisisCount * -1 + deepCount * -1;
        const tRange = tMax - tMin;
        
        const dMax = routineCount * 2 + crisisCount * 2 + deepCount * 3;
        const dMin = routineCount * -1 + crisisCount * -1 + deepCount * -1;
        const dRange = dMax - dMin;
        
        // 转换为0-100的相对百分位
        const ePct = ((E - eMin) / eRange) * 100;
        const sPct = ((S - sMin) / sRange) * 100;
        const tPct = ((T - tMin) / tRange) * 100;
        const dPct = ((D - dMin) / dRange) * 100;
        
        // 使用动态阈值：不是50%分界，而是根据正态分布调整
        const EI = ePct >= 55 ? 'E' : 'I';
        const SU = sPct >= 50 ? 'S' : 'U';
        const TP = tPct >= 45 ? 'T' : 'P';
        const DF = dPct >= 50 ? 'D' : 'F';
        
        const code = EI + SU + TP + DF;
        
        const personalities = {
            'ESTD': {
                name: '现实主义大树',
                icon: '🌳',
                analysis: '【互动驱动：外向主动】你善于发起对话并积极回应，在关系中充满活力。<br><br>【依恋内核：情绪稳定】你情绪稳如老狗，不轻易被对方的挑衅或冷淡带偏，能给出稳定的安全感承诺。<br><br>【社交给付：理性务实】你倾向于用逻辑和效率来处理问题，凡事讲道理讲方法。<br><br>【精神深度：深度依赖】你愿意和伴侣深度绑定、共同承担现实生活的重任，是"做多说少"的可靠伴侣。<br><br>【恋爱优势】你的热情和务实能快速建立信任感，让对方感受到被重视和安全感。',
                advice: '虽然稳定可靠是你的优势，但过度理性可能让对方觉得缺乏浪漫。建议偶尔放下逻辑，用感性的方式表达爱意。可以尝试设定一些"无目的"的约会时间，纯粹享受彼此的陪伴。'
            },
            'ESTF': {
                name: '硬核指挥官',
                icon: '🎯',
                analysis: '【互动驱动：外向主动】你善于主导关系节奏，喜欢安排和规划。<br><br>【依恋内核：情绪稳定】你情绪极其稳定，不轻易被外界因素影响，是关系中的定海神针。<br><br>【社交给付：理性思考】你凡事讲逻辑讲效率，喜欢用数据和事实说话。<br><br>【精神深度：高度独立】你在恋爱中也追求绝对的独立和掌控，绝不沉溺于情感依赖。<br><br>【恋爱优势】你能为关系带来清晰的方向感和安全感，是可靠的领导者型伴侣。',
                advice: '根据情感沟通理论，深度的情感交流对于关系的长期稳定至关重要。建议尝试"情感表达练习"：每天花10分钟与伴侣分享内心感受，而非仅仅谈论日常琐事。学会用语言表达"我想你"、"我在乎你"。'
            },
            'ESPD': {
                name: '人间小太阳',
                icon: '☀️',
                analysis: '【互动驱动：外向主动】你善于发起对话并积极回应，是关系中的能量源泉。<br><br>【依恋内核：情绪稳定】你情绪稳定，不轻易被对方的情绪风吹草动影响，能给出稳定的安全感。<br><br>【社交给付：感性感知】你擅长同步痛苦、提供无条件的偏爱、感同身受、情绪共鸣。<br><br>【精神深度：高度投入】你愿意为对方改写未来规划，欢迎24小时粘人，是完美的情绪价值提供者。<br><br>【恋爱优势】你的细腻和深情能让对方感受到强烈的爱意，你是非常投入且温暖的伴侣。',
                advice: '首先需要了解"适度依赖"的方法：在提供情绪价值的同时，也要学会照顾自己的情感需求。建议学习"情绪边界"理论，在亲密与独立之间找到平衡。记住：安全感来源于自身，而非他人的肯定。'
            },
            'ESPF': {
                name: '快乐风火轮',
                icon: '🎪',
                analysis: '【互动驱动：外向主动】你善于发起互动，喜欢带伴侣满世界玩。<br><br>【依恋内核：情绪稳定】你情绪稳定，大开大合，不轻易陷入内耗。<br><br>【社交给付：感性感知】你擅长提供情绪共鸣，喜欢用感性的方式表达爱意。<br><br>【精神深度：高度独立】你依然保持着洒脱的独立人格，认为"靠谁都不如靠自己"。<br><br>【恋爱优势】你能为关系带来欢乐和新鲜感，是很好的玩伴和伴侣。',
                advice: '建议练习"情感暴露"——从小事开始，逐渐分享内心想法。可以尝试使用"我"语言表达需求，例如："我希望我们能多一些时间在一起"而非"你总是不理我"。理解并接纳自己的真实需求是改变的第一步。'
            },
            'EUTD': {
                name: '傲娇掌控者',
                icon: '🔥',
                analysis: '【互动驱动：外向主动】你善于用夸张的语言和行动表达爱意，容易陷入"爱得越深越不安"的困境。<br><br>【依恋内核：情绪敏感】你内心敏感，处理问题很理性，但内心极其渴望依赖对方。<br><br>【社交给付：理性思考】你喜欢用理智的言语去分析情感问题，常常一边嫌弃对方，一边死死粘着对方。<br><br>【精神深度：深度依赖】你渴望深度连接，但又害怕失去对方的关注。<br><br>【恋爱优势】你的热情和投入能让关系充满活力，你是敢于追求真爱的勇士。',
                advice: '学习"情绪调节策略"——在表达激情的同时，也要学会倾听对方的感受。建议使用"情感温度计"：在表达强烈情绪前，先评估对方的情绪状态是否适合接收。记住：真正的亲密需要互相理解，而非单方面的情感宣泄。'
            },
            'EUTF': {
                name: '带刺的红玫瑰',
                icon: '',
                analysis: '【互动驱动：外向主动】你善于主动出击，喜欢用理智的言语去挑衅或刺探伴侣。<br><br>【依恋内核：情绪敏感】你内心敏感，既渴望被关注，又害怕被束缚。<br><br>【社交给付：理性思考】你习惯用逻辑分析情感问题，用理性思维来避免面对情绪。<br><br>【精神深度：高度独立】你极度骄傲独立，认为"不要100%交出底牌"。<br><br>【恋爱优势】你的复杂性让人着迷，你是充满戏剧性的恋爱对象。',
                advice: '首先需要建立"情绪安全感"。可以尝试写"情绪日记"，记录自己的情绪波动及其触发因素。建议学习"情绪暂停法"：当感到情绪失控时，先离开现场5分钟，进行深呼吸和自我对话。'
            },
            'EUPD': {
                name: '热烈扑火的飞蛾',
                icon: '🦋',
                analysis: '【互动驱动：外向主动】你善于用比喻和象征来表达情感，是敏感多情的浪漫主义者。<br><br>【依恋内核：情绪敏感】你极度敏感，容易陷入"TA是不是不爱我了"的思维循环。<br><br>【社交给付：感性感知】你擅长同步痛苦、提供无条件的偏爱、感同身受。<br><br>【精神深度：深度依赖】你飞蛾扑火般的依赖型人格，爱得轰轰烈烈，也极易受伤。<br><br>【恋爱优势】你的浪漫和细腻能为关系增添诗意，你是令人心动的灵魂伴侣。',
                advice: '学会"现实检验"——在理想化对方的同时，也要看到真实的TA。建议定期进行"关系复盘"：客观评价关系中的优点和问题，而非陷入完美主义的幻想。'
            },
            'EUPF': {
                name: '戏剧化名伶',
                icon: '🎭',
                analysis: '【互动驱动：外向主动】你善于主动互动，喜欢保持神秘感，让对方猜不透你的想法。<br><br>【依恋内核：情绪敏感】你情绪极其敏感，充满戏剧性的感性浪漫。<br><br>【社交给付：感性感知】你擅长用感性的方式表达情感，是情绪共鸣的高手。<br><br>【精神深度：高度独立】你在涉及核心利益时保持清醒独立，不愿被关系束缚。<br><br>【恋爱优势】你的魅力在于不可预测性，你是让人永远好奇的伴侣。',
                advice: '尝试"自我整合"——找到内心的稳定核心。可以通过冥想和自我反思来探索真实的需求和价值观。记住：真正的魅力来源于自信和真诚，而非伪装和表演。'
            },
            'ISTD': {
                name: '默默守护的巨石',
                icon: '',
                analysis: '【互动驱动：内向收敛】你需要大量的个人空间，属于"独处型"人格，社交会让你感到疲惫。<br><br>【依恋内核：情绪稳定】你情绪稳定，不易被外界因素影响，是关系中的定海神针。<br><br>【社交给付：理性思考】你习惯用逻辑分析情感问题，是可靠的问题解决者。<br><br>【精神深度：深度依赖】你虽然嘴上讲道理，但内心对伴侣极度依赖和专一，属于"做多说少"型。<br><br>【恋爱优势】你的细心和包容让关系充满温暖，你是理想的长期伴侣。',
                advice: '增强自我主张能力。根据沟通分析理论，学会从"顺从型"转向"成人型"沟通——表达自己的需求而非仅仅满足他人。尝试使用"自信表达公式"：描述事实+表达感受+提出需求+说明请求。'
            },
            'ISTF': {
                name: '深海沉思者',
                icon: '',
                analysis: '【互动驱动：内向收敛】你需要大量的个人空间，通过独处来获取能量。<br><br>【依恋内核：情绪稳定】你情绪极其稳定，不轻易被外界因素影响。<br><br>【社交给付：理性思考】你凡事讲逻辑讲效率，喜欢用数据和事实说话。<br><br>【精神深度：高度独立】恋爱对你而言是生活锦上添花，绝不沉溺。<br><br>【恋爱优势】你的平和心态能化解冲突，让关系更加和谐。',
                advice: '注意避免"过度佛系"导致的关系停滞。根据关系激活理论，适度的紧张和投入能促进关系发展。建议设定一些共同目标，增加关系的活力和方向感。'
            },
            'ISPD': {
                name: '纯爱守护犬',
                icon: '🐕',
                analysis: '【互动驱动：内向收敛】你倾向于边界感、静止、被动，但内心温柔。<br><br>【依恋内核：情绪稳定】你情绪稳定，温柔包容，是关系中的安全港湾。<br><br>【社交给付：感性感知】你擅长同步痛苦、提供无条件的偏爱、感同身受。<br><br>【精神深度：深度依赖】你一旦爱上就全盘依赖，是全心投入的伴侣。<br><br>【恋爱优势】你的纯真和深情非常动人，你是全心投入的伴侣。',
                advice: '首先需要建立"情绪安全感"。可以尝试写"情绪日记"，记录焦虑情绪及其触发因素，然后用理性思维挑战这些想法。建议学习"自我安抚技术"——当感到不安时，进行自我对话："我很安全，TA是在乎我的"。'
            },
            'ISPF': {
                name: '随风起舞的隐士',
                icon: '🍃',
                analysis: '【互动驱动：内向收敛】你倾向于边界感、静止、被动，享受独处的时光。<br><br>【依恋内核：情绪稳定】你情绪稳定，持有"顺其自然"的恋爱态度。<br><br>【社交给付：感性感知】你极其注重情感共鸣，是佛系恋爱天花板。<br><br>【精神深度：高度独立】你同时保持高度的精神独立，认为"靠谁都不如靠自己"。<br><br>【恋爱优势】你的坚强和自信很有魅力，你是能独立支撑自己的伴侣。',
                advice: '理解"依赖不等于软弱"。根据相互依赖理论，健康的关系需要适度的相互依赖——既保持自我，又愿意依靠对方。尝试从小事开始寻求帮助，逐渐建立信任。'
            },
            'IUTD': {
                name: '病娇暗恋系',
                icon: '',
                analysis: '【互动驱动：内向收敛】你需要大量的个人空间，倾向于隐藏真实情绪。<br><br>【依恋内核：情绪敏感】你内心敏感，内心波涛汹涌，容易内耗。<br><br>【社交给付：理性思考】你用理智掩饰自己的极度依赖，习惯用逻辑分析情感问题。<br><br>【精神深度：深度依赖】你内心极其渴望依赖对方，但表面上保持距离。<br><br>【恋爱优势】你的独立性和深度思考能力很有吸引力，你是值得信赖的理性伴侣。',
                advice: '尝试"渐进式开放"——逐步分享内心世界。可以从分享日常感受开始，慢慢过渡到更深层的话题。理解"亲密需要冒险"——虽然暴露脆弱可能带来伤害，但也是建立深度连接的唯一途径。'
            },
            'IUTF': {
                name: '冷面防卫壁垒',
                icon: '🛡️',
                analysis: '【互动驱动：内向收敛】你追求高度的独立，在关系中保持理性和距离。<br><br>【依恋内核：情绪敏感】你内心敏感，遇到问题容易理智抽离。<br><br>【社交给付：理性思考】你习惯用逻辑分析情感问题，用理性思维来避免面对情绪。<br><br>【精神深度：高度独立】你高度独立防卫，最怕别人越界。<br><br>【恋爱优势】你的冷静和稳定让对方感到安心，你是可靠的问题解决者。',
                advice: '学习"情感表达"的艺术。可以尝试练习识别和命名自己的情绪（如："我现在感到开心/难过/焦虑"）。理解"脆弱不是弱点"——在安全的关系中适当示弱，反而能增强亲密感。'
            },
            'IUPD': {
                name: '易碎的玻璃城堡',
                icon: '',
                analysis: '【互动驱动：内向收敛】你倾向于边界感、静止、被动，需要大量独处时间。<br><br>【依恋内核：情绪敏感】你极度敏感，容易受对方情绪风吹草动的影响。<br><br>【社交给付：感性感知】你感性至上，擅长感同身受和情绪共鸣。<br><br>【精神深度：深度依赖】你全盘情感依赖，需要伴侣极高密度的信息报备。<br><br>【恋爱优势】你的深度和独特视角能带来深刻的情感连接，你是值得深入了解的伴侣。',
                advice: '学习"情绪表达"技巧。可以尝试通过艺术创作（如写作、绘画）来表达内心感受，然后逐渐过渡到语言表达。建议寻找一个安全的环境（如信任的朋友或心理咨询师）来练习分享。'
            },
            'IUPF': {
                name: '孤岛艺术家',
                icon: '',
                analysis: '【互动驱动：内向收敛】你需要大量的个人空间，通过独处来获取能量。<br><br>【依恋内核：情绪敏感】你极度敏感，内心波涛汹涌，容易内耗。<br><br>【社交给付：感性感知】你感性至上，用艺术和创意来表达情感。<br><br>【精神深度：高度独立】你由于害怕受伤，在精神上强行保持独立。<br><br>【恋爱优势】你的洒脱和独立很有吸引力，你是能给对方空间的伴侣。',
                advice: '理解"亲密与自由可以共存"。根据关系边界理论，健康的关系需要清晰的个人边界，但这并不意味着情感上的疏离。尝试在保持独立的同时，也投入一定的情感连接。'
            }
        };

        const result = personalities[code] || {
            name: '独特喵星人',
            icon: '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="5" width="10" height="10" rx="3" fill="#FFB6C1"/><rect x="10" y="8" width="2" height="2" rx="1" fill="#333"/><rect x="14" y="8" width="2" height="2" rx="1" fill="#333"/><rect x="6" y="15" width="14" height="12" rx="3" fill="#87CEEB"/><rect x="22" y="5" width="10" height="10" rx="3" fill="#FFB6C1"/><rect x="24" y="8" width="2" height="2" rx="1" fill="#333"/><rect x="28" y="8" width="2" height="2" rx="1" fill="#333"/><rect x="20" y="15" width="14" height="12" rx="3" fill="#98D8C8"/><rect x="18" y="18" width="4" height="2" rx="1" fill="#FFB6C1"/></svg>',
            analysis: '你的恋爱人格非常独特！你有着自己独特的恋爱方式，不随波逐流。你在某些方面表现得很外向，在另一些方面又很内向。你既渴望亲密，又需要独立。你的恋爱模式是独一无二的，不需要刻意改变。',
            advice: '保持真实的自己就好，总会有人欣赏你的独特~'
        };
        
        result.code = code;
        result.dimensions = { EI, SU, TP, DF };
        result.scores = { E, S, T, D };
        
        return result;
    }

    resetTest() {
        this.startTest();
    }

    async shareResult() {
        const code = document.getElementById('personality-code').textContent;
        const name = document.getElementById('personality-name').textContent;
        const icon = document.getElementById('result-icon').innerHTML;
        
        // Populate share card template
        document.getElementById('share-card-icon').innerHTML = icon;
        document.getElementById('share-card-code').textContent = code;
        document.getElementById('share-card-name').textContent = name;
        
        // Copy dimension values
        document.getElementById('share-dim-ei').textContent = document.getElementById('val-ei').textContent;
        document.getElementById('share-dim-su').textContent = document.getElementById('val-su').textContent;
        document.getElementById('share-dim-tp').textContent = document.getElementById('val-tp').textContent;
        document.getElementById('share-dim-df').textContent = document.getElementById('val-df').textContent;
        
        // Copy theory scores
        document.getElementById('share-theory-reciprocity').textContent = document.getElementById('reciprocity-score').textContent;
        
        // Determine attachment type
        const securePct = parseInt(document.getElementById('attachment-secure').textContent);
        const anxiousPct = parseInt(document.getElementById('attachment-anxious').textContent);
        const avoidantPct = parseInt(document.getElementById('attachment-avoidant').textContent);
        let attachmentType = '安全型';
        if (anxiousPct > securePct && anxiousPct > avoidantPct) {
            attachmentType = '焦虑型';
        } else if (avoidantPct > securePct && avoidantPct > anxiousPct) {
            attachmentType = '回避型';
        }
        document.getElementById('share-theory-attachment').textContent = attachmentType;
        
        // Show loading state
        const shareModal = document.getElementById('share-modal');
        const shareImageContainer = document.getElementById('share-image-container');
        shareImageContainer.innerHTML = '<div style="text-align:center;padding:40px;color:#999;"><span style="font-size:24px;">⏳</span><p style="margin-top:10px;">正在生成分享图片...</p></div>';
        shareModal.classList.add('active');
        
        // Generate image using html2canvas
        try {
            const template = document.getElementById('share-card-template');
            const card = template.querySelector('.share-card');
            
            // Temporarily make it visible for rendering
            template.style.position = 'fixed';
            template.style.left = '0';
            template.style.top = '0';
            template.style.visibility = 'visible';
            template.style.zIndex = '-1';
            
            const canvas = await html2canvas(card, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
                logging: false,
                width: 375,
                height: card.offsetHeight
            });
            
            // Hide template again
            template.style.position = 'absolute';
            template.style.left = '-9999px';
            template.style.top = '-9999px';
            template.style.visibility = 'hidden';
            
            // Convert canvas to image and display
            const imgDataUrl = canvas.toDataURL('image/png');
            shareImageContainer.innerHTML = `<img src="${imgDataUrl}" alt="分享图片" id="share-image">`;
            
            // Store the data URL for copy/download
            this.shareImageDataUrl = imgDataUrl;
            this.shareImageCanvas = canvas;
        } catch (error) {
            console.error('生成分享图片失败:', error);
            shareImageContainer.innerHTML = '<div style="text-align:center;padding:40px;color:#ff6b6b;"><span style="font-size:24px;">⚠️</span><p style="margin-top:10px;">图片生成失败，请重试</p></div>';
        }
    }
}

function goBack() {
    if (confirm('确定要退出测试吗？进度将不会保存哦～')) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('start-screen').classList.add('active');
    }
}

function closeShareModal() {
    document.getElementById('share-modal').classList.remove('active');
}

async function copyShareImage() {
    const btn = document.getElementById('copy-image-btn');
    const originalHTML = btn.innerHTML;
    
    try {
        btn.innerHTML = '<span>⏳</span><span>复制中...</span>';
        btn.disabled = true;
        
        const canvas = window.appInstance.shareImageCanvas;
        if (!canvas) {
            alert('请先生成分享图片');
            return;
        }
        
        // Convert canvas to blob and copy to clipboard
        canvas.toBlob(async (blob) => {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]);
                btn.innerHTML = '<span>✓</span><span>已复制!</span>';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                // Fallback: copy image data URL as text
                const imgDataUrl = window.appInstance.shareImageDataUrl;
                await navigator.clipboard.writeText(imgDataUrl);
                btn.innerHTML = '<span>✓</span><span>已复制图片链接!</span>';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                }, 2000);
            }
        }, 'image/png');
    } catch (error) {
        console.error('复制错误:', error);
        btn.innerHTML = '<span>✕</span><span>复制失败</span>';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 2000);
    }
}

function downloadShareImage() {
    const btn = document.getElementById('download-image-btn');
    const originalHTML = btn.innerHTML;
    
    try {
        btn.innerHTML = '<span>⏳</span><span>保存中...</span>';
        btn.disabled = true;
        
        const imgDataUrl = window.appInstance.shareImageDataUrl;
        if (!imgDataUrl) {
            alert('请先生成分享图片');
            return;
        }
        
        // Create a temporary link to download
        const link = document.createElement('a');
        link.download = `恋爱人格测试_${Date.now()}.png`;
        link.href = imgDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        btn.innerHTML = '<span>✓</span><span>已保存!</span>';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('保存错误:', error);
        btn.innerHTML = '<span>✕</span><span>保存失败</span>';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 2000);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.appInstance = new LoveTestApp();
});