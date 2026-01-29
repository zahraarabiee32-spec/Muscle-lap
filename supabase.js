// ============================================================================
// تطبيق Muscle Lap - ملف JavaScript الرئيسي
// ============================================================================

// ============================================================================
// 1. تعريف البيانات والتطبيق الرئيسي
// ============================================================================

const MuscleLapApp = {
    // بيانات التطبيق
    data: {
        // المستخدم الحالي
        currentUser: null,
        
        // جميع المستخدمين
        users: [
            {
                id: 1,
                email: "trainer@fitness.com",
                password: "trainer123",
                name: "أحمد المدرب",
                type: "trainer",
                level: null,
                paymentInfo: {
                    mastercard: "**** **** **** 1234",
                    zainsh: "0770 123 4567"
                },
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                email: "trainee@fitness.com",
                password: "trainee123",
                name: "محمد المتدرب",
                type: "trainee",
                level: "beginner",
                subscription: false,
                assignedExercises: [],
                createdAt: new Date().toISOString()
            }
        ],
        
        // التمارين
        exercises: {
            chest: [
                {
                    id: 1,
                    name: "تمرين الضغط",
                    description: "تمرين أساسي لتقوية عضلات الصدر",
                    reps: "3 مجموعات × 15 تكرار",
                    image: null,
                    imageUrl: null,
                    assignedTo: [2],
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: "تمرين البنش بريس",
                    description: "تمرين بالبار لتطوير حجم وقوة الصدر",
                    reps: "4 مجموعات × 10 تكرارات",
                    image: null,
                    imageUrl: null,
                    assignedTo: [2],
                    createdAt: new Date().toISOString()
                }
            ],
            arm: [
                {
                    id: 3,
                    name: "تمرين العضلة ذات الرأسين",
                    description: "تمرين لتكبير وتقوية العضلة ذات الرأسين",
                    reps: "3 مجموعات × 12 تكرار",
                    image: null,
                    imageUrl: null,
                    assignedTo: [2],
                    createdAt: new Date().toISOString()
                }
            ],
            shoulder: [
                {
                    id: 4,
                    name: "تمرين رفع الأكتاف",
                    description: "تمرين لتقوية وتطوير عضلات الأكتاف",
                    reps: "3 مجموعات × 15 تكرار",
                    image: null,
                    imageUrl: null,
                    assignedTo: [2],
                    createdAt: new Date().toISOString()
                }
            ],
            back: [
                {
                    id: 5,
                    name: "تمرين السحب العلوي",
                    description: "تمرين لتقوية وتطوير عضلات الظهر العلوية",
                    reps: "3 مجموعات × 10 تكرارات",
                    image: null,
                    imageUrl: null,
                    assignedTo: [2],
                    createdAt: new Date().toISOString()
                }
            ],
            abs: [
                {
                    id: 6,
                    name: "تمرين البلانك",
                    description: "تمرين ثابت لتقوية عضلات البطن الأساسية",
                    reps: "3 مجموعات × 60 ثانية",
                    image: null,
                    imageUrl: null,
                    assignedTo: [2],
                    createdAt: new Date().toISOString()
                }
            ],
            leg: [
                {
                    id: 7,
                    name: "تمرين القرفصاء",
                    description: "تمرين أساسي لتقوية وتطوير عضلات الرجل",
                    reps: "4 مجموعات × 12 تكرار",
                    image: null,
                    imageUrl: null,
                    assignedTo: [2],
                    createdAt: new Date().toISOString()
                }
            ]
        },
        
        // تمارين الإحماء
        warmupExercises: [
            {
                id: 101,
                name: "الجري في المكان",
                description: "رفع الركبتين بالتناوب لمدة 60 ثانية",
                reps: "60 ثانية",
                image: null,
                imageUrl: null
            },
            {
                id: 102,
                name: "تمرين القفز",
                description: "القفز مع فتح الذراعين والرجلين",
                reps: "30 تكرار",
                image: null,
                imageUrl: null
            },
            {
                id: 103,
                name: "تمرين دوران الذراعين",
                description: "تدوير الذراعين للأمام والخلف",
                reps: "20 تكرار لكل اتجاه",
                image: null,
                imageUrl: null
            }
        ],
        
        // الكورسات التدريبية
        courses: [
            {
                id: 1,
                name: "كورس المبتدئين",
                description: "برنامج تدريبي للمبتدئين لمدة 8 أسابيع",
                duration: "8 أسابيع",
                assignedTo: [2]
            }
        ],
        
        // الأنظمة الغذائية
        nutritionPlans: [
            {
                id: 1,
                name: "نظام زيادة الكتلة العضلية",
                description: "نظام غذائي عالي البروتين لزيادة الكتلة العضلية",
                calories: "3000 سعرة حرارية",
                assignedTo: [2]
            }
        ],
        
        // الصور الترويجية
        promotionalImages: {
            1: null,
            2: null,
            3: null
        },
        
        // سعر الاشتراك
        subscriptionPrice: 19.99,
        
        // عدد المتدربين المتبقيين
        spotsLeft: 10
    },
    
    // عناصر DOM
    elements: {},
    
    // التمرين الحالي قيد التعديل
    currentExercise: null,
    
    // الصورة الحالية قيد التحميل
    currentImageUpload: {
        type: null, // 'exercise' أو 'promotional'
        id: null,
        file: null,
        preview: null
    }
};

// ============================================================================
// 2. وظائف التهيئة
// ============================================================================

MuscleLapApp.init = function() {
    // جمع عناصر DOM
    this.collectElements();
    
    // تهيئة البيانات من localStorage
    this.loadFromLocalStorage();
    
    // تحديث واجهة المستخدم
    this.updateUI();
    
    // إعداد معالجات الأحداث
    this.setupEventListeners();
    
    // تحميل البيانات الأولية
    this.loadInitialData();
    
    console.log('✅ Muscle Lap App initialized successfully');
};

MuscleLapApp.collectElements = function() {
    // شريط التنقل
    this.elements = {
        // الأزرار
        loginBtn: document.getElementById('login-btn'),
        registerBtn: document.getElementById('register-btn'),
        logoutBtn: document.getElementById('logout-btn'),
        adminBtn: document.getElementById('admin-btn'),
        themeToggle: document.getElementById('theme-toggle'),
        
        // النماذج المنبثقة
        authModal: document.getElementById('auth-modal'),
        warmupModal: document.getElementById('warmup-modal'),
        bmiModal: document.getElementById('bmi-modal'),
        idealWeightModal: document.getElementById('ideal-weight-modal'),
        exercisesModal: document.getElementById('exercises-modal'),
        editExerciseModal: document.getElementById('edit-exercise-modal'),
        paymentModal: document.getElementById('payment-modal'),
        adminDashboard: document.getElementById('admin-dashboard'),
        imageUploadModal: document.getElementById('image-upload-modal'),
        
        // عناصر أخرى
        spotsLeft: document.getElementById('spots-left'),
        exercisesTitle: document.getElementById('exercises-title'),
        addExerciseBtn: document.getElementById('add-exercise-btn'),
        
        // نماذج المصادقة
        modalTitle: document.getElementById('modal-title'),
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        switchToRegister: document.getElementById('switch-to-register'),
        switchToLogin: document.getElementById('switch-to-login'),
        submitLogin: document.getElementById('submit-login'),
        submitRegister: document.getElementById('submit-register'),
        userType: document.getElementById('user-type'),
        levelGroup: document.getElementById('level-group'),
        
        // حاسبة BMI
        calculateBmiBtn: document.getElementById('calculate-bmi'),
        bmiResult: document.getElementById('bmi-result'),
        bmiFill: document.getElementById('bmi-fill'),
        bmiValue: document.getElementById('bmi-value'),
        bmiCategory: document.getElementById('bmi-category'),
        
        // حاسبة الوزن المثالي
        calculateIdealWeightBtn: document.getElementById('calculate-ideal-weight'),
        idealWeightResult: document.getElementById('ideal-weight-result'),
        idealWeightValue: document.getElementById('ideal-weight-value'),
        weightRange: document.getElementById('weight-range'),
        
        // تحميل الصور
        exerciseImagePreview: document.getElementById('exercise-image-preview'),
        selectImageBtn: document.getElementById('select-image-btn'),
        exerciseImageInput: document.getElementById('exercise-image-input'),
        exerciseUploadProgress: document.getElementById('exercise-upload-progress'),
        exerciseProgressFill: document.getElementById('exercise-progress-fill'),
        exerciseProgressText: document.getElementById('exercise-progress-text'),
        
        uploadImagePreview: document.getElementById('upload-image-preview'),
        selectUploadImageBtn: document.getElementById('select-upload-image-btn'),
        uploadImageInput: document.getElementById('upload-image-input'),
        promoUploadProgress: document.getElementById('promo-upload-progress'),
        promoProgressFill: document.getElementById('promo-progress-fill'),
        promoProgressText: document.getElementById('promo-progress-text'),
        
        saveUploadedImageBtn: document.getElementById('save-uploaded-image'),
        cancelImageUploadBtn: document.getElementById('cancel-image-upload'),
        
        // لوحة تحكم المدرب
        adminTabs: document.querySelectorAll('.admin-tab'),
        adminTabContents: document.querySelectorAll('.admin-tab-content'),
        subscriptionPriceInput: document.getElementById('subscription-price'),
        savePriceBtn: document.getElementById('save-price'),
        
        // معلومات الدفع للمدرب
        mastercardNumberInput: document.getElementById('mastercard-number'),
        zainshNumberInput: document.getElementById('zaincash-number'),
        savePaymentInfoBtn: document.getElementById('save-payment-info'),
        
        // الدفع
        subscribeBtn: document.getElementById('subscribe-btn'),
        processPaymentBtn: document.getElementById('process-payment'),
        paymentPrice: document.getElementById('payment-price'),
        paymentTotal: document.getElementById('payment-total'),
        
        // الإشعارات
        notification: document.getElementById('notification'),
        
        // عداد التمارين
        exerciseCounts: {
            chest: document.getElementById('chest-count'),
            arm: document.getElementById('arm-count'),
            shoulder: document.getElementById('shoulder-count'),
            back: document.getElementById('back-count'),
            abs: document.getElementById('abs-count'),
            leg: document.getElementById('leg-count')
        }
    };
};

MuscleLapApp.loadFromLocalStorage = function() {
    // تحميل المستخدم الحالي
    const savedUser = localStorage.getItem('muscleLapCurrentUser');
    if (savedUser) {
        this.data.currentUser = JSON.parse(savedUser);
    }
    
    // تحميل الوضع (داكن/فاتح)
    const savedTheme = localStorage.getItem('muscleLapTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        this.elements.themeToggle.querySelector('i').classList.remove('fa-moon');
        this.elements.themeToggle.querySelector('i').classList.add('fa-sun');
    }
    
    // تحميل بيانات التطبيق
    const savedData = localStorage.getItem('muscleLapData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        // دمج البيانات مع الحفاظ على الهيكل
        Object.keys(parsedData).forEach(key => {
            if (this.data[key] !== undefined) {
                this.data[key] = parsedData[key];
            }
        });
    }
};

MuscleLapApp.saveToLocalStorage = function() {
    // حفظ المستخدم الحالي
    if (this.data.currentUser) {
        localStorage.setItem('muscleLapCurrentUser', JSON.stringify(this.data.currentUser));
    }
    
    // حفظ بيانات التطبيق
    localStorage.setItem('muscleLapData', JSON.stringify(this.data));
};

MuscleLapApp.loadInitialData = function() {
    // تحديث عدد الأماكن المتبقية
    this.updateSpotsLeft();
    
    // تحديث أسعار الاشتراك
    this.updateSubscriptionPrice();
    
    // تحميل تمارين الإحماء
    this.loadWarmupExercises();
    
    // تحديث أعداد التمارين
    this.updateExerciseCounts();
    
    // تحميل الصور الترويجية
    this.loadPromotionalImages();
};

// ============================================================================
// 3. إدارة واجهة المستخدم
// ============================================================================

MuscleLapApp.updateUI = function() {
    const isLoggedIn = this.data.currentUser !== null;
    const isTrainer = isLoggedIn && this.data.currentUser.type === 'trainer';
    
    // تحديث شريط التنقل
    this.elements.loginBtn.style.display = isLoggedIn ? 'none' : 'block';
    this.elements.registerBtn.style.display = isLoggedIn ? 'none' : 'block';
    this.elements.logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
    this.elements.adminBtn.style.display = isTrainer ? 'block' : 'none';
    
    // تحديث زر الاشتراك
    if (isLoggedIn && this.data.currentUser.type === 'trainee' && this.data.currentUser.subscription) {
        this.elements.subscribeBtn.textContent = 'اشتراكك مفعل';
        this.elements.subscribeBtn.disabled = true;
        this.elements.subscribeBtn.style.backgroundColor = '#666';
    } else {
        this.elements.subscribeBtn.textContent = isLoggedIn ? 'اشترك الآن' : 'سجل الدخول للاشتراك';
        this.elements.subscribeBtn.disabled = false;
        this.elements.subscribeBtn.style.backgroundColor = '';
    }
    
    // إظهار/إخفاء أزرار تحرير الصور الترويجية للمدرب
    const promoActions = document.querySelectorAll('.promo-actions');
    promoActions.forEach(actions => {
        actions.style.display = isTrainer ? 'block' : 'none';
    });
    
    // تحديث معلومات الدفع للمدرب
    if (isTrainer && this.data.currentUser.paymentInfo) {
        this.elements.mastercardNumberInput.value = this.data.currentUser.paymentInfo.mastercard || '';
        this.elements.zainshNumberInput.value = this.data.currentUser.paymentInfo.zainsh || '';
    }
};

MuscleLapApp.updateSpotsLeft = function() {
    this.elements.spotsLeft.textContent = this.data.spotsLeft;
    
    // إخفاء البانر إذا نفذت الأماكن
    const launchBanner = document.querySelector('.launch-banner');
    if (launchBanner) {
        launchBanner.style.display = this.data.spotsLeft > 0 ? 'block' : 'none';
    }
};

MuscleLapApp.updateSubscriptionPrice = function() {
    // تحديث الأسعار في الواجهة
    const priceElements = document.querySelectorAll('.amount');
    priceElements.forEach(el => {
        el.textContent = `$${this.data.subscriptionPrice.toFixed(2)}`;
    });
    
    // تحديث حقل السعر في لوحة التحكم
    if (this.elements.subscriptionPriceInput) {
        this.elements.subscriptionPriceInput.value = this.data.subscriptionPrice;
    }
    
    // تحديث أسعار الدفع
    if (this.elements.paymentPrice && this.elements.paymentTotal) {
        this.elements.paymentPrice.textContent = `$${this.data.subscriptionPrice.toFixed(2)}`;
        this.elements.paymentTotal.textContent = `$${this.data.subscriptionPrice.toFixed(2)}`;
    }
};

MuscleLapApp.updateExerciseCounts = function() {
    for (const part in this.data.exercises) {
        const countElement = this.elements.exerciseCounts[part];
        if (countElement) {
            const visibleCount = this.getVisibleExercisesCount(part);
            countElement.textContent = `${visibleCount} تمارين`;
        }
    }
};

MuscleLapApp.getVisibleExercisesCount = function(part) {
    if (!this.data.currentUser) {
        return this.data.exercises[part]?.length || 0;
    }
    
    if (this.data.currentUser.type === 'trainer') {
        return this.data.exercises[part]?.length || 0;
    }
    
    // للمتدرب: عرض فقط التمارين المخصصة له
    const exercises = this.data.exercises[part] || [];
    return exercises.filter(ex => ex.assignedTo?.includes(this.data.currentUser.id)).length;
};

// ============================================================================
// 4. إدارة المصادقة والمستخدمين
// ============================================================================

MuscleLapApp.openAuthModal = function(type) {
    this.openModal(this.elements.authModal);
    this.switchAuthForm(type);
};

MuscleLapApp.switchAuthForm = function(type) {
    if (type === 'login') {
        this.elements.modalTitle.textContent = 'تسجيل الدخول';
        this.elements.loginForm.style.display = 'block';
        this.elements.registerForm.style.display = 'none';
    } else {
        this.elements.modalTitle.textContent = 'إنشاء حساب';
        this.elements.loginForm.style.display = 'none';
        this.elements.registerForm.style.display = 'block';
        this.elements.levelGroup.style.display = 
            this.elements.userType.value === 'trainee' ? 'block' : 'none';
    }
};

MuscleLapApp.handleLogin = function() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // التحقق من صحة الإدخال
    if (!this.validateEmail(email)) {
        this.showNotification('البريد الإلكتروني يجب أن ينتهي بـ @fitness.com', 'error');
        return;
    }
    
    if (!email || !password) {
        this.showNotification('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    // البحث عن المستخدم
    const user = this.data.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        this.data.currentUser = user;
        this.saveToLocalStorage();
        this.updateUI();
        this.closeModal(this.elements.authModal);
        this.showNotification(`مرحبًا بك ${user.name}`, 'success');
        
        // إعادة تعيين الحقول
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    } else {
        this.showNotification('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
    }
};

MuscleLapApp.handleRegister = function() {
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const name = document.getElementById('reg-name').value.trim();
    const userType = document.getElementById('user-type').value;
    const level = userType === 'trainee' ? document.getElementById('trainee-level').value : null;
    
    // التحقق من صحة الإدخال
    if (!this.validateEmail(email)) {
        this.showNotification('البريد الإلكتروني يجب أن ينتهي بـ @fitness.com', 'error');
        return;
    }
    
    if (!email || !password || !name) {
        this.showNotification('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    if (password.length < 6) {
        this.showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }
    
    // التحقق من عدم وجود مستخدم بنفس البريد
    const userExists = this.data.users.some(u => u.email === email);
    if (userExists) {
        this.showNotification('هذا البريد الإلكتروني مستخدم بالفعل', 'error');
        return;
    }
    
    // إنشاء المستخدم الجديد
    const newUser = {
        id: this.data.users.length + 1,
        email,
        password,
        name,
        type: userType,
        level,
        subscription: false,
        assignedExercises: [],
        paymentInfo: userType === 'trainer' ? { mastercard: '', zainsh: '' } : null,
        createdAt: new Date().toISOString()
    };
    
    this.data.users.push(newUser);
    this.data.currentUser = newUser;
    
    // إذا كان متدرب، تقليل عدد الأماكن
    if (userType === 'trainee' && this.data.spotsLeft > 0) {
        this.data.spotsLeft--;
        this.updateSpotsLeft();
    }
    
    this.saveToLocalStorage();
    this.updateUI();
    this.closeModal(this.elements.authModal);
    this.showNotification(`تم إنشاء حسابك بنجاح! مرحبًا بك ${name}`, 'success');
    
    // إعادة تعيين الحقول
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-name').value = '';
};

MuscleLapApp.validateEmail = function(email) {
    // التحقق من أن البريد ينتهي بـ @fitness.com
    const emailRegex = /^[^\s@]+@fitness\.com$/;
    return emailRegex.test(email);
};

MuscleLapApp.logout = function() {
    this.data.currentUser = null;
    localStorage.removeItem('muscleLapCurrentUser');
    this.updateUI();
    this.showNotification('تم تسجيل الخروج بنجاح', 'success');
};

// ============================================================================
// 5. إدارة التمارين
// ============================================================================

MuscleLapApp.loadWarmupExercises = function() {
    const container = this.elements.warmupModal.querySelector('.exercises-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.data.warmupExercises.forEach(exercise => {
        const exerciseElement = this.createExerciseElement(exercise, false);
        container.appendChild(exerciseElement);
    });
};

MuscleLapApp.openExercisesForBodyPart = function(part) {
    const partNames = {
        chest: 'الصدر',
        arm: 'الذراع',
        shoulder: 'الكتف',
        back: 'الظهر',
        abs: 'البطن',
        leg: 'الرجل'
    };
    
    this.elements.exercisesTitle.textContent = `تمارين ${partNames[part]}`;
    
    // إظهار/إخفاء زر إضافة تمرين للمدرب
    const isTrainer = this.data.currentUser && this.data.currentUser.type === 'trainer';
    this.elements.addExerciseBtn.style.display = isTrainer ? 'block' : 'none';
    
    // تحميل التمارين
    const container = this.elements.exercisesModal.querySelector('.exercises-list');
    container.innerHTML = '';
    
    let exercises = this.data.exercises[part] || [];
    
    // للمتدرب: عرض فقط التمارين المخصصة له
    if (this.data.currentUser && this.data.currentUser.type === 'trainee') {
        exercises = exercises.filter(exercise => 
            exercise.assignedTo?.includes(this.data.currentUser.id)
        );
    }
    
    // تحديث العداد
    const countElement = this.elements.exerciseCounts[part];
    if (countElement) {
        countElement.textContent = `${exercises.length} تمارين`;
    }
    
    // عرض الرسالة إذا لم توجد تمارين
    if (exercises.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = isTrainer ? 
            'لا توجد تمارين في هذه المنطقة. قم بإضافة تمرين جديد.' : 
            'لا توجد تمارين مخصصة لك في هذه المنطقة.';
        container.appendChild(emptyMessage);
    } else {
        // عرض التمارين
        exercises.forEach(exercise => {
            const exerciseElement = this.createExerciseElement(exercise, isTrainer);
            container.appendChild(exerciseElement);
        });
    }
    
    // فتح النافذة المنبثقة
    this.openModal(this.elements.exercisesModal);
    
    // حفظ المنطقة الحالية
    this.elements.exercisesModal.dataset.currentPart = part;
};

MuscleLapApp.createExerciseElement = function(exercise, showActions = false) {
    const div = document.createElement('div');
    div.className = 'exercise-item';
    div.dataset.id = exercise.id;
    
    // عرض الصورة إذا كانت موجودة
    let imageContent = '<i class="fas fa-dumbbell"></i>';
    if (exercise.imageUrl) {
        imageContent = `<img src="${exercise.imageUrl}" alt="${exercise.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-dumbbell\\'></i>';">`;
    }
    
    div.innerHTML = `
        <div class="exercise-img">
            ${imageContent}
        </div>
        <div class="exercise-info">
            <div class="exercise-name">${exercise.name}</div>
            <div class="exercise-description">${exercise.description}</div>
            <div class="exercise-reps">${exercise.reps}</div>
        </div>
        ${showActions ? 
            `<div class="exercise-actions">
                <button class="btn btn-outline btn-small edit-exercise">تعديل</button>
                <button class="btn btn-danger btn-small delete-exercise">حذف</button>
            </div>` : ''
        }
    `;
    
    // إضافة معالجات الأحداث للمدرب
    if (showActions) {
        const editBtn = div.querySelector('.edit-exercise');
        const deleteBtn = div.querySelector('.delete-exercise');
        
        editBtn.addEventListener('click', () => this.openEditExerciseModal(exercise));
        deleteBtn.addEventListener('click', () => this.deleteExercise(exercise.id));
    }
    
    return div;
};

MuscleLapApp.openEditExerciseModal = function(exercise = null) {
    this.currentExercise = exercise;
    
    if (exercise) {
        // وضع التعديل
        document.getElementById('edit-exercise-title').textContent = 'تعديل التمرين';
        document.getElementById('exercise-name').value = exercise.name;
        document.getElementById('exercise-description').value = exercise.description;
        document.getElementById('exercise-reps').value = exercise.reps;
        
        // عرض الصورة
        this.updateImagePreview('exercise', exercise.imageUrl);
        
        // تحديد منطقة الجسم
        let bodyPart = this.elements.exercisesModal.dataset.currentPart;
        if (!bodyPart) {
            for (const part in this.data.exercises) {
                if (this.data.exercises[part].some(ex => ex.id === exercise.id)) {
                    bodyPart = part;
                    break;
                }
            }
        }
        document.getElementById('exercise-body-part').value = bodyPart;
        
        // عرض زر الحذف
        document.getElementById('delete-exercise').style.display = 'block';
        
        // تحميل قائمة المتدربين للتعيين
        if (this.data.currentUser?.type === 'trainer') {
            this.loadTraineesForAssignment(exercise);
        }
    } else {
        // وضع الإضافة
        document.getElementById('edit-exercise-title').textContent = 'إضافة تمرين جديد';
        document.getElementById('exercise-name').value = '';
        document.getElementById('exercise-description').value = '';
        document.getElementById('exercise-reps').value = '';
        document.getElementById('exercise-body-part').value = 
            this.elements.exercisesModal.dataset.currentPart;
        
        // إعادة تعيين الصورة
        this.updateImagePreview('exercise', null);
        
        // إخفاء زر الحذف
        document.getElementById('delete-exercise').style.display = 'none';
        
        // إخفاء قائمة التعيين للمتدربين الجدد
        document.getElementById('assign-trainees-group').style.display = 'none';
    }
    
    this.openModal(this.elements.editExerciseModal);
};

MuscleLapApp.loadTraineesForAssignment = function(exercise) {
    const container = document.getElementById('trainees-checkbox-list');
    if (!container) return;
    
    const trainees = this.data.users.filter(user => user.type === 'trainee');
    
    if (trainees.length === 0) {
        container.innerHTML = '<p class="no-trainees">لا يوجد متدربون بعد</p>';
        document.getElementById('assign-trainees-group').style.display = 'none';
        return;
    }
    
    container.innerHTML = '';
    
    trainees.forEach(trainee => {
        const isAssigned = exercise.assignedTo?.includes(trainee.id);
        
        const div = document.createElement('div');
        div.className = 'trainee-checkbox';
        div.innerHTML = `
            <input type="checkbox" id="trainee-${trainee.id}" value="${trainee.id}" 
                   ${isAssigned ? 'checked' : ''}>
            <label for="trainee-${trainee.id}">
                ${trainee.name} (${trainee.level === 'beginner' ? 'مبتدئ' : 'محترف'})
            </label>
        `;
        container.appendChild(div);
    });
    
    document.getElementById('assign-trainees-group').style.display = 'block';
};

MuscleLapApp.saveExercise = async function() {
    const name = document.getElementById('exercise-name').value.trim();
    const description = document.getElementById('exercise-description').value.trim();
    const reps = document.getElementById('exercise-reps').value.trim();
    const bodyPart = document.getElementById('exercise-body-part').value;
    
    // التحقق من الإدخال
    if (!name || !description || !reps || !bodyPart) {
        this.showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // جمع المتدربين المعينين
    const assignedTrainees = [];
    const checkboxes = document.querySelectorAll('#trainees-checkbox-list input[type="checkbox"]:checked');
    checkboxes.forEach(cb => {
        assignedTrainees.push(parseInt(cb.value));
    });
    
    const currentPart = this.elements.exercisesModal.dataset.currentPart;
    let imageUrl = null;
    
    // رفع الصورة إذا كانت موجودة
    if (this.currentImageUpload.file) {
        try {
            this.showNotification('جاري رفع الصورة...', 'info');
            
            // عرض شريط التقدم
            this.elements.exerciseUploadProgress.style.display = 'block';
            
            // رفع الصورة
            imageUrl = await window.imageUploader.uploadImage('exercises', (progress) => {
                this.elements.exerciseProgressFill.style.width = `${progress}%`;
                this.elements.exerciseProgressText.textContent = `${progress}%`;
            });
            
            this.elements.exerciseUploadProgress.style.display = 'none';
            this.showNotification('تم رفع الصورة بنجاح', 'success');
        } catch (error) {
            this.elements.exerciseUploadProgress.style.display = 'none';
            this.showNotification('خطأ في رفع الصورة: ' + error.message, 'error');
            return;
        }
    }
    
    if (this.currentExercise) {
        // تحديث التمرين الحالي
        const part = currentPart;
        const exerciseIndex = this.data.exercises[part].findIndex(ex => ex.id === this.currentExercise.id);
        
        if (exerciseIndex !== -1) {
            // إذا تغيرت منطقة الجسم
            if (part !== bodyPart) {
                const exercise = this.data.exercises[part][exerciseIndex];
                this.data.exercises[part].splice(exerciseIndex, 1);
                
                if (!this.data.exercises[bodyPart]) {
                    this.data.exercises[bodyPart] = [];
                }
                
                exercise.name = name;
                exercise.description = description;
                exercise.reps = reps;
                exercise.imageUrl = imageUrl || exercise.imageUrl;
                exercise.assignedTo = assignedTrainees;
                exercise.updatedAt = new Date().toISOString();
                
                this.data.exercises[bodyPart].push(exercise);
            } else {
                // تحديث في نفس المنطقة
                const exercise = this.data.exercises[part][exerciseIndex];
                exercise.name = name;
                exercise.description = description;
                exercise.reps = reps;
                exercise.imageUrl = imageUrl || exercise.imageUrl;
                exercise.assignedTo = assignedTrainees;
                exercise.updatedAt = new Date().toISOString();
            }
        }
    } else {
        // إضافة تمرين جديد
        const newExercise = {
            id: Date.now(),
            name,
            description,
            reps,
            imageUrl: imageUrl,
            assignedTo: assignedTrainees,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        if (!this.data.exercises[bodyPart]) {
            this.data.exercises[bodyPart] = [];
        }
        
        this.data.exercises[bodyPart].push(newExercise);
    }
    
    // حفظ التغييرات
    this.saveToLocalStorage();
    this.updateExerciseCounts();
    
    // إعادة تحميل التمارين
    this.openExercisesForBodyPart(currentPart);
    this.closeModal(this.elements.editExerciseModal);
    this.showNotification('تم حفظ التمرين بنجاح', 'success');
    
    // إعادة تعيين التمرين الحالي
    this.currentExercise = null;
    this.currentImageUpload = { type: null, id: null, file: null, preview: null };
};

MuscleLapApp.deleteExercise = function(exerciseId) {
    const part = this.elements.exercisesModal.dataset.currentPart;
    
    if (!part || !exerciseId) return;
    
    if (confirm('هل أنت متأكد من حذف هذا التمرين؟')) {
        const exerciseIndex = this.data.exercises[part].findIndex(ex => ex.id === exerciseId);
        
        if (exerciseIndex !== -1) {
            // حذف الصورة من التخزين إذا كانت موجودة
            const exercise = this.data.exercises[part][exerciseIndex];
            if (exercise.imageUrl) {
                window.imageUploader.deleteImage(exercise.imageUrl).catch(console.error);
            }
            
            this.data.exercises[part].splice(exerciseIndex, 1);
            
            // حفظ التغييرات
            this.saveToLocalStorage();
            this.updateExerciseCounts();
            
            // إعادة تحميل التمارين
            this.openExercisesForBodyPart(part);
            this.closeModal(this.elements.editExerciseModal);
            this.showNotification('تم حذف التمرين بنجاح', 'success');
        }
    }
};

// ============================================================================
// 6. إدارة الصور
// ============================================================================

MuscleLapApp.updateImagePreview = function(type, imageUrl) {
    const previewElement = type === 'exercise' ? 
        this.elements.exerciseImagePreview : 
        this.elements.uploadImagePreview;
    
    if (imageUrl) {
        // عرض الصورة
        previewElement.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
    } else if (this.currentImageUpload.preview) {
        // عرض الصورة الجديدة
        previewElement.innerHTML = `<img src="${this.currentImageUpload.preview}" alt="Preview">`;
    } else {
        // عرض العنصر الافتراضي
        previewElement.innerHTML = `
            <i class="fas fa-image"></i>
            <span>لم يتم اختيار صورة</span>
        `;
    }
};

MuscleLapApp.handleImageSelect = function(type, id = null) {
    const inputElement = type === 'exercise' ? 
        this.elements.exerciseImageInput : 
        this.elements.uploadImageInput;
    
    // إعادة تعيين قيمة المدخل للسماح باختيار نفس الملف مرة أخرى
    inputElement.value = '';
    inputElement.click();
    
    // حفظ المعلومات الحالية
    this.currentImageUpload.type = type;
    this.currentImageUpload.id = id;
};

MuscleLapApp.handleImageFileSelect = async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        // تحضير الصورة للرفع
        const previewUrl = await window.imageUploader.prepareImageUpload(file, this.currentImageUpload.type);
        
        // حفظ الملف وعرض المعاينة
        this.currentImageUpload.file = file;
        this.currentImageUpload.preview = previewUrl;
        this.updateImagePreview(this.currentImageUpload.type, null);
        
        // إخفاء شريط التقدم إذا كان ظاهراً
        if (this.currentImageUpload.type === 'exercise') {
            this.elements.exerciseUploadProgress.style.display = 'none';
        } else {
            this.elements.promoUploadProgress.style.display = 'none';
        }
    } catch (error) {
        this.showNotification('خطأ في تحميل الصورة: ' + error.message, 'error');
        console.error('Error preparing image:', error);
    }
};

MuscleLapApp.savePromotionalImage = async function() {
    if (!this.currentImageUpload.file || !this.currentImageUpload.id) {
        this.showNotification('الرجاء اختيار صورة أولاً', 'error');
        return;
    }
    
    try {
        this.showNotification('جاري رفع الصورة الترويجية...', 'info');
        
        // عرض شريط التقدم
        this.elements.promoUploadProgress.style.display = 'block';
        
        // رفع الصورة
        const imageUrl = await window.imageUploader.uploadImage('promotional', (progress) => {
            this.elements.promoProgressFill.style.width = `${progress}%`;
            this.elements.promoProgressText.textContent = `${progress}%`;
        });
        
        // حفظ رابط الصورة
        this.data.promotionalImages[this.currentImageUpload.id] = imageUrl;
        this.saveToLocalStorage();
        
        // تحميل الصور الترويجية
        this.loadPromotionalImages();
        
        this.elements.promoUploadProgress.style.display = 'none';
        this.closeModal(this.elements.imageUploadModal);
        this.showNotification('تم حفظ الصورة الترويجية بنجاح', 'success');
        
        // إعادة تعيين بيانات التحميل
        this.currentImageUpload = { type: null, id: null, file: null, preview: null };
    } catch (error) {
        this.elements.promoUploadProgress.style.display = 'none';
        this.showNotification('خطأ في رفع الصورة: ' + error.message, 'error');
    }
};

MuscleLapApp.loadPromotionalImages = function() {
    for (let i = 1; i <= 3; i++) {
        const placeholder = document.getElementById(`promo-image-${i}`);
        if (!placeholder) continue;
        
        const imageUrl = this.data.promotionalImages[i];
        if (imageUrl) {
            placeholder.innerHTML = `<img src="${imageUrl}" alt="Promotional Image ${i}">`;
        } else {
            placeholder.innerHTML = `
                <i class="fas fa-${i === 1 ? 'ad' : i === 2 ? 'bullhorn' : 'medal'}"></i>
                <p>${i === 1 ? 'مساحة إعلانية' : i === 2 ? 'عروض مؤقتة' : 'صور تحفيزية'}</p>
            `;
        }
    }
};

// ============================================================================
// 7. أدوات الحساب (BMI والوزن المثالي)
// ============================================================================

MuscleLapApp.calculateBMI = function() {
    const height = parseFloat(document.getElementById('height').value) / 100; // تحويل إلى متر
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (!height || !weight || height < 1 || weight < 30) {
        this.showNotification('يرجى إدخال قيم صحيحة للطول والوزن', 'error');
        return;
    }
    
    const bmi = weight / (height * height);
    const roundedBmi = bmi.toFixed(1);
    
    // تحديد الفئة
    let category, colorPosition;
    if (bmi < 18.5) {
        category = 'نحافة';
        colorPosition = 12.5;
    } else if (bmi < 25) {
        category = 'وزن طبيعي';
        colorPosition = 37.5;
    } else if (bmi < 30) {
        category = 'زيادة وزن';
        colorPosition = 62.5;
    } else {
        category = 'سمنة';
        colorPosition = 87.5;
    }
    
    // تحديث الواجهة
    document.getElementById('bmi-value').textContent = roundedBmi;
    document.getElementById('bmi-category').textContent = category;
    document.getElementById('bmi-fill').style.width = `${colorPosition}%`;
    
    // عرض النتيجة
    document.getElementById('bmi-result').style.display = 'block';
};

MuscleLapApp.calculateIdealWeight = function() {
    const height = parseFloat(document.getElementById('ideal-height').value);
    
    if (!height || height < 100 || height > 250) {
        this.showNotification('يرجى إدخال طول صحيح بين 100 و 250 سم', 'error');
        return;
    }
    
    const heightMeters = height / 100;
    const idealWeight = 22 * (heightMeters * heightMeters);
    const minWeight = 18.5 * (heightMeters * heightMeters);
    const maxWeight = 24.9 * (heightMeters * heightMeters);
    
    // تحديث الواجهة
    document.getElementById('ideal-weight-value').textContent = idealWeight.toFixed(1);
    document.getElementById('weight-range').textContent = `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)}`;
    
    // عرض النتيجة
    document.getElementById('ideal-weight-result').style.display = 'block';
};

// ============================================================================
// 8. إدارة الدفع والاشتراكات
// ============================================================================

MuscleLapApp.processPayment = function() {
    if (!this.data.currentUser) {
        this.showNotification('يرجى تسجيل الدخول أولاً', 'error');
        this.closeModal(this.elements.paymentModal);
        this.openAuthModal('login');
        return;
    }
    
    if (this.data.currentUser.type === 'trainer') {
        this.showNotification('المدرب لا يحتاج للاشتراك', 'info');
        return;
    }
    
    if (this.data.currentUser.subscription) {
        this.showNotification('أنت مشترك بالفعل', 'info');
        this.closeModal(this.elements.paymentModal);
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // محاكاة عملية الدفع
    this.showNotification('جاري معالجة الدفع...', 'info');
    
    setTimeout(() => {
        this.data.currentUser.subscription = true;
        this.saveToLocalStorage();
        
        this.closeModal(this.elements.paymentModal);
        this.showNotification('تم تفعيل اشتراكك بنجاح!', 'success');
        
        // تحديث واجهة المستخدم
        this.updateUI();
    }, 2000);
};

MuscleLapApp.savePaymentInfo = function() {
    const mastercard = this.elements.mastercardNumberInput.value.trim();
    const zainsh = this.elements.zainshNumberInput.value.trim();
    
    if (!this.data.currentUser || this.data.currentUser.type !== 'trainer') {
        this.showNotification('هذه الميزة متاحة للمدرب فقط', 'error');
        return;
    }
    
    // التحقق من صحة رقم MasterCard (نسخة مبسطة)
    if (mastercard && !/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(mastercard.replace(/\s/g, ''))) {
        this.showNotification('رقم MasterCard غير صحيح. الصيغة الصحيحة: 1234 5678 9012 3456', 'error');
        return;
    }
    
    // التحقق من صحة رقم Zain Cash (نسخة مبسطة)
    if (zainsh && !/^07\d{2}\s?\d{3}\s?\d{4}$/.test(zainsh.replace(/\s/g, ''))) {
        this.showNotification('رقم Zain Cash غير صحيح. الصيغة الصحيحة: 0770 123 4567', 'error');
        return;
    }
    
    // حفظ معلومات الدفع
    this.data.currentUser.paymentInfo = {
        mastercard,
        zainsh
    };
    
    // تحديث بيانات المستخدم في القائمة
    const userIndex = this.data.users.findIndex(u => u.id === this.data.currentUser.id);
    if (userIndex !== -1) {
        this.data.users[userIndex].paymentInfo = this.data.currentUser.paymentInfo;
    }
    
    this.saveToLocalStorage();
    this.showNotification('تم حفظ معلومات الدفع بنجاح', 'success');
    
    // تحديث Supabase (محاكاة)
    if (window.supabaseService) {
        window.supabaseService.updatePaymentInfo(this.data.currentUser.id, this.data.currentUser.paymentInfo)
            .catch(error => console.error('Error updating payment info in Supabase:', error));
    }
};

// ============================================================================
// 9. لوحة تحكم المدرب
// ============================================================================

MuscleLapApp.switchAdminTab = function(tabId) {
    // تحديث علامات التبويب النشطة
    this.elements.adminTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabId);
    });
    
    // تحديث محتويات علامات التبويب
    this.elements.adminTabContents.forEach(content => {
        content.classList.toggle('active', content.id === `${tabId}-tab`);
    });
    
    // تحميل البيانات الخاصة بكل تبويب
    switch(tabId) {
        case 'trainees':
            this.loadTraineesList();
            break;
        case 'courses':
            this.loadCoursesList();
            break;
        case 'nutrition':
            this.loadNutritionPlansList();
            break;
        case 'pricing':
            this.loadPricingTab();
            break;
        case 'payment-info':
            this.loadPaymentInfoTab();
            break;
    }
};

MuscleLapApp.loadTraineesList = function() {
    const container = document.querySelector('.trainees-list');
    if (!container) return;
    
    const trainees = this.data.users.filter(user => user.type === 'trainee');
    
    container.innerHTML = '';
    
    trainees.forEach(trainee => {
        const div = document.createElement('div');
        div.className = 'trainee-item';
        
        const levelText = trainee.level === 'beginner' ? 'مبتدئ' : 'محترف';
        const subscriptionText = trainee.subscription ? 'مشترك' : 'غير مشترك';
        const subscriptionClass = trainee.subscription ? 'active' : 'inactive';
        
        div.innerHTML = `
            <div class="trainee-info">
                <h4>${trainee.name}</h4>
                <p>${trainee.email}</p>
                <p class="trainee-level">المستوى: ${levelText}</p>
                <p class="trainee-subscription ${subscriptionClass}">الحالة: ${subscriptionText}</p>
            </div>
            <div class="trainee-actions">
                <button class="btn btn-outline btn-small assign-program" data-id="${trainee.id}">تعيين برنامج</button>
            </div>
        `;
        
        container.appendChild(div);
    });
    
    // إضافة معالج الأحداث لأزرار التعيين
    container.querySelectorAll('.assign-program').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const traineeId = parseInt(e.target.dataset.id);
            this.showNotification(`سيتم تعيين برنامج للمتدرب ID: ${traineeId}`, 'info');
        });
    });
};

MuscleLapApp.loadCoursesList = function() {
    const container = document.querySelector('.courses-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.data.courses.forEach(course => {
        const div = document.createElement('div');
        div.className = 'course-item';
        
        div.innerHTML = `
            <div class="course-info">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <p>المدة: ${course.duration}</p>
            </div>
            <div class="course-actions">
                <button class="btn btn-outline btn-small edit-course">تعديل</button>
                <button class="btn btn-danger btn-small delete-course">حذف</button>
            </div>
        `;
        
        container.appendChild(div);
    });
};

MuscleLapApp.loadNutritionPlansList = function() {
    const container = document.querySelector('.nutrition-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.data.nutritionPlans.forEach(plan => {
        const div = document.createElement('div');
        div.className = 'nutrition-item';
        
        div.innerHTML = `
            <div class="nutrition-info">
                <h4>${plan.name}</h4>
                <p>${plan.description}</p>
                <p>السعرات الحرارية: ${plan.calories}</p>
            </div>
            <div class="nutrition-actions">
                <button class="btn btn-outline btn-small edit-nutrition">تعديل</button>
                <button class="btn btn-danger btn-small delete-nutrition">حذف</button>
            </div>
        `;
        
        container.appendChild(div);
    });
};

MuscleLapApp.loadPricingTab = function() {
    // تحديث سعر الاشتراك في الحقل
    this.elements.subscriptionPriceInput.value = this.data.subscriptionPrice;
};

MuscleLapApp.loadPaymentInfoTab = function() {
    // تحميل معلومات الدفع للمدرب
    if (this.data.currentUser?.type === 'trainer' && this.data.currentUser.paymentInfo) {
        this.elements.mastercardNumberInput.value = this.data.currentUser.paymentInfo.mastercard || '';
        this.elements.zainshNumberInput.value = this.data.currentUser.paymentInfo.zainsh || '';
    }
};

MuscleLapApp.savePrice = function() {
    const newPrice = parseFloat(this.elements.subscriptionPriceInput.value);
    
    if (!newPrice || newPrice < 1 || newPrice > 100) {
        this.showNotification('يرجى إدخال سعر صحيح بين 1 و 100', 'error');
        return;
    }
    
    this.data.subscriptionPrice = newPrice;
    this.saveToLocalStorage();
    this.updateSubscriptionPrice();
    this.showNotification('تم تحديث سعر الاشتراك بنجاح', 'success');
};

// ============================================================================
// 10. وظائف المساعدة
// ============================================================================

MuscleLapApp.openModal = function(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

MuscleLapApp.closeModal = function(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

MuscleLapApp.showNotification = function(message, type = 'success') {
    const notification = this.elements.notification;
    if (!notification) return;
    
    // إعداد النص والنوع
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type, 'show');
    
    // إضافة أيقونة حسب النوع
    let icon = 'fa-check-circle';
    switch(type) {
        case 'error':
            icon = 'fa-exclamation-circle';
            break;
        case 'warning':
            icon = 'fa-exclamation-triangle';
            break;
        case 'info':
            icon = 'fa-info-circle';
            break;
    }
    
    notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    
    // إخفاء الإشعار بعد 3 ثواني
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
};

MuscleLapApp.toggleTheme = function() {
    document.body.classList.toggle('light-mode');
    const icon = this.elements.themeToggle.querySelector('i');
    
    if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('muscleLapTheme', 'light');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('muscleLapTheme', 'dark');
    }
};

// ============================================================================
// 11. إعداد معالجات الأحداث
// ============================================================================

MuscleLapApp.setupEventListeners = function() {
    const self = this;
    
    // أزرار المصادقة
    this.elements.loginBtn.addEventListener('click', () => this.openAuthModal('login'));
    this.elements.registerBtn.addEventListener('click', () => this.openAuthModal('register'));
    this.elements.logoutBtn.addEventListener('click', () => this.logout());
    this.elements.adminBtn.addEventListener('click', () => this.openModal(this.elements.adminDashboard));
    
    // تبديل الوضع الداكن/فاتح
    this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // تبديل نماذج المصادقة
    this.elements.switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchAuthForm('register');
    });
    
    this.elements.switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchAuthForm('login');
    });
    
    // تسجيل الدخول والتسجيل
    this.elements.submitLogin.addEventListener('click', () => this.handleLogin());
    this.elements.submitRegister.addEventListener('click', () => this.handleRegister());
    
    // تغيير نوع المستخدم في التسجيل
    this.elements.userType.addEventListener('change', function() {
        self.elements.levelGroup.style.display = this.value === 'trainee' ? 'block' : 'none';
    });
    
    // المحتوى المجاني
    document.querySelector('.view-warmup').addEventListener('click', () => {
        this.openModal(this.elements.warmupModal);
    });
    
    document.querySelector('.open-bmi').addEventListener('click', () => {
        this.openModal(this.elements.bmiModal);
    });
    
    document.querySelector('.open-ideal-weight').addEventListener('click', () => {
        this.openModal(this.elements.idealWeightModal);
    });
    
    // أيقونات مناطق الجسم
    document.querySelectorAll('.body-card').forEach(card => {
        card.addEventListener('click', () => this.openExercisesForBodyPart(card.dataset.part));
    });
    
    // أزرار الحساب
    this.elements.calculateBmiBtn.addEventListener('click', () => this.calculateBMI());
    this.elements.calculateIdealWeightBtn.addEventListener('click', () => this.calculateIdealWeight());
    
    // إدارة التمارين
    this.elements.addExerciseBtn.addEventListener('click', () => this.openEditExerciseModal());
    document.getElementById('save-exercise').addEventListener('click', () => this.saveExercise());
    document.getElementById('delete-exercise').addEventListener('click', () => {
        if (this.currentExercise) {
            this.deleteExercise(this.currentExercise.id);
        }
    });
    document.getElementById('cancel-edit').addEventListener('click', () => {
        this.closeModal(this.elements.editExerciseModal);
        this.currentExercise = null;
        this.currentImageUpload = { type: null, id: null, file: null, preview: null };
    });
    
    // تحميل الصور للتمارين
    this.elements.selectImageBtn.addEventListener('click', () => this.handleImageSelect('exercise'));
    this.elements.exerciseImageInput.addEventListener('change', (e) => this.handleImageFileSelect(e));
    
    // تحميل الصور الترويجية
    this.elements.selectUploadImageBtn.addEventListener('click', () => this.handleImageSelect('promotional'));
    this.elements.uploadImageInput.addEventListener('change', (e) => this.handleImageFileSelect(e));
    
    this.elements.saveUploadedImageBtn.addEventListener('click', () => this.savePromotionalImage());
    this.elements.cancelImageUploadBtn.addEventListener('click', () => {
        this.closeModal(this.elements.imageUploadModal);
        this.currentImageUpload = { type: null, id: null, file: null, preview: null };
    });
    
    // تغيير الصور الترويجية
    document.querySelectorAll('.change-promo-image').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            this.openModal(this.elements.imageUploadModal);
            this.currentImageUpload.id = id;
            document.getElementById('image-upload-title').textContent = `تغيير الصورة الترويجية ${id}`;
        });
    });
    
    // الدفع والاشتراكات
    this.elements.subscribeBtn.addEventListener('click', () => {
        if (!this.data.currentUser) {
            this.openAuthModal('login');
            this.showNotification('يرجى تسجيل الدخول أولاً', 'warning');
        } else if (this.data.currentUser.type === 'trainer') {
            this.showNotification('المدرب لا يحتاج للاشتراك', 'info');
        } else if (this.data.currentUser.subscription) {
            this.showNotification('أنت مشترك بالفعل', 'info');
        } else {
            this.openModal(this.elements.paymentModal);
        }
    });
    
    this.elements.processPaymentBtn.addEventListener('click', () => this.processPayment());
    
    // لوحة تحكم المدرب
    this.elements.adminTabs.forEach(tab => {
        tab.addEventListener('click', () => this.switchAdminTab(tab.dataset.tab));
    });
    
    this.elements.savePriceBtn.addEventListener('click', () => this.savePrice());
    this.elements.savePaymentInfoBtn.addEventListener('click', () => this.savePaymentInfo());
    
    // عرض الإطلاق
    document.getElementById('join-offer').addEventListener('click', () => {
        if (!this.data.currentUser) {
            this.openAuthModal('register');
            this.showNotification('سجل حساب جديد للاستفادة من العرض', 'info');
            return;
        }
        
        if (this.data.currentUser.type !== 'trainee') {
            this.showNotification('العرض خاص بالمتدربين فقط', 'warning');
            return;
        }
        
        if (this.data.currentUser.subscription) {
            this.showNotification('أنت مشترك بالفعل في العرض', 'info');
            return;
        }
        
        if (this.data.spotsLeft > 0) {
            this.showNotification('تهانينا! تم حجز مكانك في العرض الخاص', 'success');
            this.data.currentUser.subscription = true;
            this.data.spotsLeft--;
            this.saveToLocalStorage();
            this.updateSpotsLeft();
            this.updateUI();
        } else {
            this.showNotification('عذرًا، لقد نفذت الأماكن في العرض الخاص', 'error');
        }
    });
    
    // إغلاق النماذج
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                self.closeModal(modal);
                
                // إعادة تعيين بيانات التحميل عند إغلاق نافذة التحميل
                if (modal.id === 'image-upload-modal') {
                    self.currentImageUpload = { type: null, id: null, file: null, preview: null };
                }
                
                // إعادة تعيين بيانات التمرين عند إغلاق نافذة التعديل
                if (modal.id === 'edit-exercise-modal') {
                    self.currentExercise = null;
                    self.currentImageUpload = { type: null, id: null, file: null, preview: null };
                }
            }
        });
    });
    
    // إغلاق النماذج بالنقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            self.closeModal(e.target);
        }
    });
    
    // إضافة معالج لأزرار القائمة الجانبية للجوال
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // تحديث واجهة المستخدم عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        }
    });
};

// ============================================================================
// 12. بدء تشغيل التطبيق
// ============================================================================

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    MuscleLapApp.init();
});
// ============================================================================
// تصدير وإتاحة imageUploader عالمياً
// ============================================================================

// تأكد من إنشاء imageUploader وتعريفه
if (typeof window !== 'undefined') {
    window.imageUploader = imageUploader;
    window.supabaseService = supabaseService;
    
    console.log('✅ imageUploader جاهز للاستخدام:', !!window.imageUploader);
    console.log('✅ supabaseService جاهز للاستخدام:', !!window.supabaseService);
}

// رسالة تأكيد
console.log('✅ Supabase service initialized successfully');
console.log('✅ imageUploader:', imageUploader ? 'جاهز' : 'غير جاهز');
// جعل التطبيق متاحًا عالميًا للتصحيح
window.MuscleLapApp = MuscleLapApp;