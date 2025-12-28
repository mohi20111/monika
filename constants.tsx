
import { Category, Question, QuestionType, Exam, StudyNote } from './types';

export const CATEGORIES: Category[] = [
  { id: 'mega-bank', title: 'Free Mega Question Bank (20,000+ Qs)', description: 'Complete History Question Bank with Hindi Solutions', count: 22400 },
  { id: 'uphesc', title: 'UPHESC Assistant Professor', description: 'UP Higher Education Services Commission History Papers', count: 4500 },
  { id: 'net-jrf', title: 'UGC NET/JRF (Last 25 Years)', description: 'Previous 25 Years Solved Papers', count: 6800 },
  { id: 'upsc-ias', title: 'UPSC IAS History Optional & Pre', description: 'IAS Mains & Prelims History (Includes Pre-2017)', count: 3200 },
  { id: 'state-psc', title: 'RPSC/BPSC/MPSC/UPPSC', description: 'Various State PSC Assistant Professor Questions', count: 2400 },
  { id: 'historiography', title: 'Historiography (इतिहास लेखन)', description: 'Questions on Philosophy of History & Historiography', count: 1200 },
];

export const STUDY_MATERIALS: StudyNote[] = [
  {
    id: 'SN001',
    subject: 'Ancient',
    topic: 'सिंधु घाटी सभ्यता - महत्वपूर्ण तथ्य',
    facts: [
      'हड़प्पा सभ्यता को "आद्य-ऐतिहासिक" काल की श्रेणी में रखा जाता है।',
      'सिंधु सभ्यता का सबसे बड़ा भारतीय स्थल "राखीगढ़ी" है।',
      'चावल की खेती के साक्ष्य सर्वप्रथम "लोथल" और "रंगपुर" से मिले हैं।',
      'कालीबंगा का शाब्दिक अर्थ है - "काले रंग की चूड़ियाँ"।',
      'सिंधु लिपि दाईं ओर से बाईं ओर लिखी जाती थी (Boustrophedon)।'
    ]
  },
  {
    id: 'SN002',
    subject: 'Medieval',
    topic: 'दिल्ली सल्तनत: प्रशासन और सुधार',
    facts: [
      'बलबन ने "रक्त एवं लौह" की नीति और "सिजदा-पाबोस" की शुरुआत की।',
      'अलाउद्दीन खिलजी पहला सुल्तान था जिसने "नकद वेतन" और "घोड़ा दागने" की प्रथा शुरू की।',
      '"दीवान-ए-कोही" (कृषि विभाग) की स्थापना मोहम्मद बिन तुगलक ने की थी।',
      'फिरोज शाह तुगलक ने सर्वाधिक नहरों और नए नगरों का निर्माण करवाया।',
      '"आइन-ए-दहसाला" व्यवस्था राजा टोडरमल द्वारा विकसित की गई थी।'
    ]
  },
  {
    id: 'SN003',
    subject: 'Modern',
    topic: '1857 का विद्रोह और प्रमुख केंद्र',
    facts: [
      '1857 के विद्रोह का तात्कालिक कारण "चर्बी वाले कारतूस" थे।',
      'कानपुर में विद्रोह का नेतृत्व नाना साहेब और तात्या टोपे ने किया।',
      'इलाहाबाद में लियाकत अली ने विद्रोह की कमान संभाली।',
      'झांसी की रानी लक्ष्मीबाई "यूरोज" से लड़ते हुए वीरगति को प्राप्त हुईं।',
      'बिहार के जगदीशपुर से कुंवर सिंह (80 वर्ष की आयु में) ने नेतृत्व किया।'
    ]
  }
];

export const MOCK_QUESTIONS: Question[] = [
  // --- UPHESC Assistant Professor ---
  {
    id: 'UP001',
    type: QuestionType.MCQ,
    exam: 'UPHESC',
    year: '2021',
    language: 'hi',
    questionText: 'निम्नलिखित में से कौन सा युग्म सही सुमेलित नहीं है?',
    options: ['धोलावीरा - कच्छ का रन', 'कालीबंगा - हरियाणा', 'लोथल - खम्भात की खाड़ी', 'रोपड़ - सतलज नदी'],
    correctAnswer: 'कालीबंगा - हरियाणा',
    explanation: 'कालीबंगा राजस्थान के हनुमानगढ़ जिले में घग्गर नदी के किनारे स्थित है, न कि हरियाणा में। हरियाणा में प्रसिद्ध स्थल राखीगढ़ी और बनावली हैं।'
  },
  {
    id: 'UP002',
    type: QuestionType.ASSERTION_REASON,
    exam: 'UPHESC',
    year: '2018',
    language: 'hi',
    questionText: 'कथन (A): इल्तुतमिश को दिल्ली सल्तनत का वास्तविक संस्थापक माना जाता है।\nकारण (R): उसने लाहौर के स्थान पर दिल्ली को राजधानी बनाया और खलीफा से मंसूर (अधिकार पत्र) प्राप्त किया।',
    options: [
      '(A) और (R) दोनों सही हैं और (R), (A) की सही व्याख्या है।',
      '(A) और (R) दोनों सही हैं लेकिन (R), (A) की सही व्याख्या नहीं है।',
      '(A) सही है लेकिन (R) गलत है।',
      '(A) गलत है लेकिन (R) सही है।'
    ],
    correctAnswer: '(A) और (R) दोनों सही हैं और (R), (A) की सही व्याख्या है।',
    explanation: 'कुतुबुद्दीन ऐबक ने लाहौर से शासन किया था, जबकि इल्तुतमिश ने दिल्ली को केंद्र बनाया और सुल्तान के पद को वैधानिक स्वीकृति दिलाई।'
  },

  // --- UGC NET / JRF ---
  {
    id: 'NET001',
    type: QuestionType.MATCHING,
    exam: 'UGC NET',
    year: '2023',
    language: 'hi',
    questionText: 'सूची-I को सूची-II से सुमेलित कीजिए:',
    matchingListA: ['तारीख-ए-रशीदी', 'हुमायूँनामा', 'नुस्खा-ए-दिलकुशा', 'मुंतखब-उल-लुबाब'],
    matchingListB: ['मिर्जा हैदर दुगलत', 'गुलबदन बेगम', 'भीमसेन', 'खाफी खाँ'],
    options: ['A-1, B-2, C-3, D-4', 'A-2, B-1, C-4, D-3', 'A-3, B-4, C-2, D-1', 'A-4, B-3, C-1, D-2'],
    correctAnswer: 'A-1, B-2, C-3, D-4',
    explanation: 'ये सभी मुगलकालीन महत्वपूर्ण ऐतिहासिक ग्रंथ और उनके लेखक हैं। NET परीक्षा में अक्सर लेखकों का सुमेलन पूछा जाता है।'
  },
  {
    id: 'NET002',
    type: QuestionType.MCQ,
    exam: 'UGC NET',
    year: '2022',
    language: 'hi',
    questionText: 'किस अभिलेख में "सती प्रथा" का प्रथम अभिलेखीय साक्ष्य मिलता है?',
    options: ['प्रयाग प्रशस्ति', 'भानुगुप्त का एरण अभिलेख', 'जूनागढ़ अभिलेख', 'महरौली स्तंभ लेख'],
    correctAnswer: 'भानुगुप्त का एरण अभिलेख',
    explanation: '510 ईस्वी के एरण अभिलेख (मप्र) में गुप्त शासक भानुगुप्त के मित्र गोपराज की मृत्यु पर उसकी पत्नी के सती होने का उल्लेख है।'
  },

  // --- UPSC IAS (Pre-2017 & Recent) ---
  {
    id: 'IAS001',
    type: QuestionType.MCQ,
    exam: 'UPSC IAS',
    year: '2016',
    language: 'hi',
    questionText: 'विजयनगर साम्राज्य के संदर्भ में "अमरम" शब्द का क्या अर्थ था?',
    options: ['एक प्रकार का कर', 'सैनिकों को दिया जाने वाला भू-अनुदान', 'राजा का निजी आवास', 'विदेशी व्यापारियों का समूह'],
    correctAnswer: 'सैनिकों को दिया जाने वाला भू-अनुदान',
    explanation: 'विजयनगर काल में नायकों (सैनिक अधिकारियों) को उनकी सेवाओं के बदले जो भूमि दी जाती थी, उसे अमरम कहा जाता था।'
  },
  {
    id: 'IAS002',
    type: QuestionType.MCQ,
    exam: 'UPSC IAS',
    year: 'Pre-2017',
    language: 'hi',
    questionText: '19वीं सदी के "अहोम विद्रोह" का नेतृत्व किसने किया था?',
    options: ['गोमधर कुंवर', 'चित्तर सिंह', 'सेवाराम', 'बिरसा मुंडा'],
    correctAnswer: 'गोमधर कुंवर',
    explanation: '1828 में असम में अंग्रेजों के विरुद्ध अहोम विद्रोह का नेतृत्व गोमधर कुंवर ने किया था।'
  },

  // --- Historiography (इतिहास लेखन) ---
  {
    id: 'HIST001',
    type: QuestionType.MCQ,
    exam: 'Historiography',
    year: 'Standard',
    language: 'hi',
    questionText: '"इतिहास अतीत और वर्तमान के बीच एक अंतहीन संवाद है" - यह किसने कहा?',
    options: ['ई.एच. कार', 'आर.जी. कोलिंगवुड', 'बेडा (Bede)', 'मार्क् ब्लॉक'],
    correctAnswer: 'ई.एच. कार',
    explanation: 'एडवर्ड हैलेट कार ने अपनी पुस्तक "What is History?" में इतिहास की यह प्रसिद्ध परिभाषा दी थी।'
  },
  {
    id: 'HIST002',
    type: QuestionType.ASSERTION_REASON,
    exam: 'Historiography',
    year: 'Standard',
    language: 'hi',
    questionText: 'कथन (A): रांके (Ranke) को आधुनिक वैज्ञानिक इतिहास लेखन का जनक माना जाता है।\nकारण (R): उसने प्राथमिक स्रोतों के आलोचनात्मक विश्लेषण पर बल दिया और कहा कि इतिहास को "जैसा वह वास्तव में था" वैसा ही प्रस्तुत करना चाहिए।',
    options: [
      '(A) और (R) दोनों सही हैं और (R), (A) की सही व्याख्या है।',
      '(A) और (R) दोनों सही हैं लेकिन (R), (A) की सही व्याख्या नहीं है।',
      '(A) सही है लेकिन (R) गलत है।',
      '(A) गलत है लेकिन (R) सही है।'
    ],
    correctAnswer: '(A) और (R) दोनों सही हैं और (R), (A) की सही व्याख्या है।',
    explanation: 'लियोपोल्ड वॉन रांके ने इतिहास लेखन में वस्तुनिष्ठता (Objectivity) पर सबसे अधिक जोर दिया था।'
  },

  // --- State PSC (RPSC, BPSC, MPSC, UPPSC) ---
  {
    id: 'PSC001',
    type: QuestionType.MCQ,
    exam: 'RPSC',
    year: 'Asst. Prof',
    language: 'hi',
    questionText: 'राजस्थान में "मत्स्य संघ" का गठन कब किया गया था?',
    options: ['18 मार्च, 1948', '25 मार्च, 1948', '30 मार्च, 1949', '15 मई, 1949'],
    correctAnswer: '18 मार्च, 1948',
    explanation: 'राजस्थान एकीकरण के प्रथम चरण में अलवर, भरतपुर, धौलपुर और करौली को मिलाकर मत्स्य संघ बनाया गया था।'
  },
  {
    id: 'PSC002',
    type: QuestionType.MCQ,
    exam: 'BPSC',
    year: '68th Pre',
    language: 'hi',
    questionText: 'बिहार में 1857 के विद्रोह का नेतृत्व किसने किया था?',
    options: ['नाना साहेब', 'तात्या टोपे', 'कुंवर सिंह', 'मौलवी अहमदुल्ला'],
    correctAnswer: 'कुंवर सिंह',
    explanation: 'जगदीशपुर के जमींदार बाबू कुंवर सिंह ने बिहार में विद्रोह का सफल नेतृत्व किया था।'
  },
  {
    id: 'PSC003',
    type: QuestionType.MCQ,
    exam: 'UPPSC',
    year: 'PCS Pre',
    language: 'hi',
    questionText: 'गदर पार्टी की स्थापना कहाँ की गई थी?',
    options: ['सैन फ्रांसिस्को', 'बर्लिन', 'टोक्यो', 'लंदन'],
    correctAnswer: 'सैन फ्रांसिस्को',
    explanation: '1913 में लाला हरदयाल और सोहन सिंह भकना ने अमेरिका के सैन फ्रांसिस्को में गदर पार्टी की स्थापना की थी।'
  },

  // --- Free Mega Bank ---
  {
    id: 'MB001',
    type: QuestionType.MCQ,
    exam: 'Free Mega Bank',
    year: 'Mixed',
    language: 'hi',
    questionText: 'अशोक के किस शिलालेख में "धम्म" की व्याख्या की गई है?',
    options: ['नौवां शिलालेख', 'दसवां शिलालेख', 'ग्यारहवां शिलालेख', 'बारहवां शिलालेख'],
    correctAnswer: 'ग्यारहवां शिलालेख',
    explanation: 'अशोक के 11वें शिलालेख में धम्म के दान को सर्वश्रेष्ठ दान बताया गया है और धम्म की विस्तृत व्याख्या की गई है।'
  },
  {
    id: 'MB002',
    type: QuestionType.MCQ,
    exam: 'Free Mega Bank',
    year: 'Mixed',
    language: 'hi',
    questionText: 'अकबर ने "जजिया" कर किस वर्ष समाप्त किया था?',
    options: ['1562', '1563', '1564', '1575'],
    correctAnswer: '1564',
    explanation: 'अकबर ने 1563 में तीर्थयात्रा कर और 1564 में जजिया कर को समाप्त कर अपनी उदार धार्मिक नीति का परिचय दिया था।'
  },
  {
    id: 'MAP001',
    type: QuestionType.MAP_BASED,
    exam: 'Free Mega Bank',
    year: 'Geography',
    language: 'hi',
    questionText: 'हड़प्पा सभ्यता का सबसे "उत्तरी" स्थल (Northernmost point) कौन सा है जो चिनाब नदी के किनारे स्थित है?',
    options: ['दायमाबाद', 'आलमगीरपुर', 'सुत्कागेंडोर', 'मांडा'],
    correctAnswer: 'मांडा',
    explanation: 'मांडा (जम्मू-कश्मीर) हड़प्पा सभ्यता का उत्तरी बिंदु है। दक्षिणी बिंदु दायमाबाद, पूर्वी आलमगीरपुर और पश्चिमी सुत्कागेंडोर है।'
  }
];

export const PREMIUM_EXAMS: Exam[] = Array.from({ length: 20 }, (_, i) => ({
  id: `gdc-${i + 1}`,
  title: i < 5 ? `UPPSC GDC Model Paper ${i + 1}` : `History Full Length Test ${i + 1}`,
  description: i < 5 ? `Official pattern based model paper for UPPSC Government Degree College Asst. Prof.` : `Comprehensive 120 question set for all History exams.`,
  totalQuestions: 120,
  timeMinutes: 120,
  isPremium: true,
  questions: MOCK_QUESTIONS 
}));
