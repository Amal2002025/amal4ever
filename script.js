// דף כניסה
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const department = document.getElementById('department').value;

        // בדיקה שהשדות אינם ריקים
        if (name.trim() && department.trim()) {
            // שמירת השם והמחלקה בזיכרון המקומי של הדפדפן
            localStorage.setItem('playerName', name);
            localStorage.setItem('playerDepartment', department);
            // מעבר לדף המשחק
            window.location.href = 'game.html'; // עובר לעמוד השאלות
        } else {
            alert('יש למלא את כל השדות');
        }
    });
}

// דף המשחק
const gameForm = document.getElementById('gameForm');
if (gameForm) {
    const playerName = localStorage.getItem('playerName'); // משיג את שם השחקן מה-localStorage
    const playerDepartment = localStorage.getItem('playerDepartment'); // משיג את המחלקה של השחקן

    if (!playerName || !playerDepartment) {
        // אם השחקן לא מילא פרטים, מחזירים אותו לעמוד הראשי
        window.location.href = 'index.html';
    }

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    const backBtn = document.getElementById('backBtn');

    let startTime = Date.now(); // שמירת הזמן בתחילת המשחק
    
    // נתוני השאלות
    
let questions = [
{
        question: 'מה נעשה בעבר הרחוק על מנת לשפר את התוצאות הכלכליות של בית החולים הגריאטרי במעלה אדומים –',
        answers: [
           '1.לינה של ליאור מנהל המחלקה הכלכלית במשך 4 חודשים פעם בשבוע במחלקה.',
   '2.שיפוץ גדול.',
   '3.הוספת יועצים חיצוניים רבים מתחומי פעילות שונים .',
   '4. הגדלת מספר ישיבות הצוות .'
        ],
        correct: '1.לינה של ליאור מנהל המחלקה הכלכלית במשך 4 חודשים פעם בשבוע במחלקה.'
    },
    {
        question: 'מה המחלקה שהתחילה את דרכה במחלקה הכלכלית והיום כבר לא בתוך המחלקה',
        answers: [
           '1.מחלקת רכב .',
   '2.מחלקת תפעול.',
   '3.מחלקת BI.',
   '4.רכש.'
        ],
        correct: '3.מחלקת BI.'
    },
    {
        question: 'מה הכי מורכב בחשיבה של המחלקה הכלכלית כאשר שכר המינימום עולה',
        answers: [
           '1.איך לעדכן את התקציב עד סוף השנה ? האם תואם להערכה בתחילת שנה?',
   '2.מה התעריף שהוחלט עליו לעובד זר ומה התעריף ללקוח פרטי?',
   '3.מתי משרד הבריאות יעדכן את התעריף ובכמה?',
   '4.האם יש תוצאות של מו"מ עם גורמים מממנים ולקוחות שאינם מצמידים את התעריף לפי הסכם ?'
        ],
        correct: '4.האם יש תוצאות של מו"מ עם גורמים מממנים ולקוחות שאינם מצמידים את התעריף לפי הסכם ?'
    },
    {
        question: 'באיזה חודש בשנה מחלקת שכר מפיקה בד"כ טופס 106 עבור העובדים:',
        answers: [
           '1. דצמבר',
   '2. מרץ',
   '3. יוני'
        ],
        correct: '2. מרץ'
    },
    {
        question: 'איזה מהבאים אינו חלק מתפקידי מחלקת השכר:',
        answers: [
           '1.  חישוב שעות נוספות',
   '2.  קביעת מדיניות קידום עובדים',
   '3. ניכוי מיסים'
        ],
        correct: '2.  קביעת מדיניות קידום עובדים'
    },
    {
        question: 'מהו שכר הברוטו שמופיע בתלוש השכר:',
        answers: [
           '1. הסכום שהעובד מקבל בפועל',
   '2. הסכום לפני ניכויים והפרשות',
   '3. שכר הבסיס ללא התוספות'
        ],
        correct: '2. הסכום לפני ניכויים והפרשות'
    },
    {
        question: 'מה עושים עורכי הדין של המחלקה המשפטית?',
        answers: [
           '1. מה שאומרים להם לעשות',
   '2. מגנים על האינטרסים של החברה',
   '3. מה שהם חושבים לנכון',
   '4. מפריעים'
        ],
        correct: '2. מגנים על האינטרסים של החברה'
    },
    {
        question: 'במה עוסקות רוב התביעות המתקבלות במחלקה המשפטית?',
        answers: [
           '1. לשון הרע',
   '2. תביעות חוב',
   '3. זכויות סוציאליות ופיטורים שלא כדין',
   '4. הטרדות מיניות'
        ],
        correct: '3. זכויות סוציאליות ופיטורים שלא כדין'
    },
    {
        question: 'מה סכום התביעה הממוצע המתקבל במחלקה המשפטית?',
        answers: [
           '1. כ-70,000 ₪',
   '2. כ-5,000 ₪',
   '3. כ-20,000 ₪',
   '4. כ-250,000 ₪'
        ],
        correct: '1. כ-70,000 ₪'
    },
    {
        question: 'מה כלי העבודה המרכזיים של המחלקה המשפטית:',
        answers: [
           '1. מקדחה, פטיש ומברג',
   '2. אקסבוקס, פלייסטיישן ונטפליקס',
   '3. מאמאנט וחרטטנית המשפט',
   '4. עו"דכנית, נט המשפט ונבו'
        ],
        correct: '4. עו"דכנית, נט המשפט ונבו'
    },
    {
        question: 'מי מערכות מידע גויס להכי הרבה ימי מילואים במלחמה?',
        answers: [
           '1. אודי',
   '2. שני קלטש',
   '3. שני זטלאוי',
   '4. ערן ברוך'
        ],
        correct: '4. ערן ברוך'
    },
    {
        question: 'כמה קריאות נפתחו מתחילת השנה?',
        answers: [
           '1. 500',
   '2. 1000',
   '3. 10000',
   '4. 15000'
        ],
        correct: '3. 10000'
    },
    {
        question: 'כמה יוזרים (משתמשי מערכת) פעילים יש בכל קבוצת עמל ומעבר?',
        answers: [
           '1. 500',
   '2. 1500',
   '3. 2500',
   '4. 5000'
        ],
        correct: '2. 1500'
    },
    {
        question: 'מה יש לערן במגירה השלישית בעמדת העבודה שלו?',
        answers: [
           '1. מסטיקים',
   '2. במבה',
   '3. גאדג'טים שמזמין מaliexpress',
   '4. מחברות'
        ],
        correct: '2. במבה'
    },
    
];
    
    let currentQuestion = 0;
    let correctAnswers = 0; // משתנה למעקב אחר התשובות הנכונות
    
    function loadQuestion() {
        const q = questions[currentQuestion];
        questionEl.classList.add('fade-in'); // אנימציית מעבר
        questionEl.textContent = q.question;
        optionsEl.innerHTML = '';
        q.answers.forEach(answer => {
            const label = document.createElement('label');
            label.classList.add('answer');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = answer;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(answer));
            optionsEl.appendChild(label);
            optionsEl.appendChild(document.createElement('br'));
        });
    }
    
    loadQuestion();
    
    nextBtn.addEventListener('click', () => {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            // בדיקה האם התשובה נכונה
            if (selectedAnswer.value === questions[currentQuestion].correct) {
                correctAnswers++; // העלאה של התשובות הנכונות
            }
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                // אם סיימנו לעבור על כל השאלות, הסתר את הכפתור "המשך" והצג את כפתור "סיום"
                nextBtn.style.display = 'none';
                finishBtn.style.display = 'block';
            }
        } else {
            alert('בחר תשובה לפני המעבר לשאלה הבאה!');
        }
    });

    finishBtn.addEventListener('click', () => {
        const totalTime = (Date.now() - startTime) / 1000; // חישוב הזמן שחלף בשניות
        alert(`סיימת את המשחק! ענית נכון על {correctAnswers} מתוך {questions.length} שאלות. הזמן הכולל: {totalTime} שניות.`);
    });

    backBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });
}
