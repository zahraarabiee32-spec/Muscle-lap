// ============================================================================
// ملف إعدادات Supabase
// ============================================================================

// إعدادات Supabase - يجب تغييرها بمعلومات مشروعك
const SUPABASE_URL = 'https://jvsmtvubfhqwxznwcowx.supabase.co'; // رابط مشروعك
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c210dnViZmhxd3h6bndjb3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NDM1NzcsImV4cCI6MjA4NTIxOTU3N30.FrFJcY9FiwRIpRyI9mDWPEQhwvcIFG-eBb19znUjMYY'; // المفتاح العام

// تهيئة عميل Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// فئة SupabaseService - إدارة التخزين
// ============================================================================

class SupabaseService {
    constructor() {
        this.bucketName = 'muscle-lap-images'; // اسم حاوية الصور
        this.initBucket();
    }

    // تهيئة الحاوية إذا لم تكن موجودة
    async initBucket() {
        try {
            const { data: buckets, error } = await supabase.storage.listBuckets();
            
            if (error) throw error;
            
            const bucketExists = buckets.some(bucket => bucket.name === this.bucketName);
            
            if (!bucketExists) {
                console.warn(`حاوية الصور "${this.bucketName}" غير موجودة. الرجاء إنشائها من لوحة تحكم Supabase.`);
            } else {
                console.log(`حاوية الصور "${this.bucketName}" جاهزة للاستخدام.`);
            }
        } catch (error) {
            console.error('خطأ في تهيئة حاوية الصور:', error);
        }
    }

    // ============================================================================
    // إدارة الصور
    // ============================================================================

    /**
     * رفع صورة إلى Supabase Storage
     * @param {File} file - ملف الصورة
     * @param {string} folder - المجلد (تمارين، عروض، إلخ)
     * @param {Function} onProgress - دالة للتحديث أثناء الرفع
     * @returns {Promise<string>} رابط الصورة
     */
    async uploadImage(file, folder = 'exercises', onProgress = null) {
        try {
            // التحقق من نوع الملف
            if (!file.type.startsWith('image/')) {
                throw new Error('الملف يجب أن يكون صورة');
            }

            // إنشاء اسم فريد للملف
            const fileExt = file.name.split('.').pop();
            const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            
            console.log(`جاري رفع الصورة: ${fileName}`);

            // رفع الملف
            const { data, error } = await supabase.storage
                .from(this.bucketName)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            console.log('تم رفع الصورة بنجاح:', data);

            // الحصول على رابط عام للصورة
            const { data: { publicUrl } } = supabase.storage
                .from(this.bucketName)
                .getPublicUrl(fileName);

            return {
                path: data.path,
                url: publicUrl,
                fileName: fileName
            };

        } catch (error) {
            console.error('خطأ في رفع الصورة:', error);
            throw error;
        }
    }

    /**
     * حذف صورة من Supabase Storage
     * @param {string} filePath - مسار الملف
     * @returns {Promise<boolean>} نجاح العملية
     */
    async deleteImage(filePath) {
        try {
            const { data, error } = await supabase.storage
                .from(this.bucketName)
                .remove([filePath]);

            if (error) throw error;

            console.log('تم حذف الصورة بنجاح:', filePath);
            return true;
        } catch (error) {
            console.error('خطأ في حذف الصورة:', error);
            throw error;
        }
    }

    /**
     * الحصول على قائمة الصور في مجلد
     * @param {string} folder - المجلد
     * @returns {Promise<Array>} قائمة الصور
     */
    async listImages(folder = 'exercises') {
        try {
            const { data, error } = await supabase.storage
                .from(this.bucketName)
                .list(folder);

            if (error) throw error;

            return data || [];
        } catch (error) {
            console.error('خطأ في الحصول على قائمة الصور:', error);
            throw error;
        }
    }

    /**
     * الحصول على رابط الصورة
     * @param {string} filePath - مسار الملف
     * @returns {string} رابط الصورة
     */
    getImageUrl(filePath) {
        const { data: { publicUrl } } = supabase.storage
            .from(this.bucketName)
            .getPublicUrl(filePath);
        
        return publicUrl;
    }

    // ============================================================================
    // إدارة المستخدمين (محاكاة - في الواقع سيكون لديك جدول مستخدمين)
    // ============================================================================

    /**
     * حفظ معلومات المستخدم
     * @param {Object} user - بيانات المستخدم
     * @returns {Promise<Object>} بيانات المستخدم المحفوظة
     */
    async saveUser(user) {
        // في تطبيق حقيقي، ستستخدم جدول المستخدمين في Supabase
        // هنا نقوم بالمحاكاة فقط
        return new Promise((resolve) => {
            setTimeout(() => {
                const savedUser = {
                    ...user,
                    id: user.id || Date.now(),
                    updatedAt: new Date().toISOString()
                };
                resolve(savedUser);
            }, 100);
        });
    }

    /**
     * تحديث معلومات الدفع للمدرب
     * @param {number} userId - معرف المستخدم
     * @param {Object} paymentInfo - معلومات الدفع
     * @returns {Promise<boolean>} نجاح العملية
     */
    async updatePaymentInfo(userId, paymentInfo) {
        // في تطبيق حقيقي، ستستخدم جدول المستخدمين في Supabase
        // هنا نقوم بالمحاكاة فقط
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('تم تحديث معلومات الدفع:', { userId, paymentInfo });
                resolve(true);
            }, 100);
        });
    }

    // ============================================================================
    // إدارة التمارين (محاكاة - في الواقع سيكون لديك جدول التمارين)
    // ============================================================================

    /**
     * حفظ تمرين
     * @param {Object} exercise - بيانات التمرين
     * @returns {Promise<Object>} التمرين المحفوظ
     */
    async saveExercise(exercise) {MuscleLapApp.saveExercise = async function() {
    // ... الكود الموجود ...
    
    // قبل رفع الصورة، أضف هذا التحقق:
    if (this.currentImageUpload.file) {
        // ========== تحقق من imageUploader ==========
        if (!window.imageUploader || typeof window.imageUploader.uploadImage !== 'function') {
            this.showNotification('خدمة رفع الصور غير جاهزة. الرجاء الانتظار أو إعادة تحميل الصفحة.', 'error');
            console.error('imageUploader غير متاح:', window.imageUploader);
            return;
        }
        // ==========================================
        
        try {
            // ... باقي الكود ...
        } catch (error) {
            // ... معالجة الأخطاء ...
        }
    }
};
        // في تطبيق حقيقي، ستستخدم جدول التمارين في Supabase
        // هنا نقوم بالمحاكاة فقط
        return new Promise((resolve) => {
            setTimeout(() => {
                const savedExercise = {
                    ...exercise,
                    id: exercise.id || Date.now(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                resolve(savedExercise);
            }, 100);
        });
    }

    /**
     * الحصول على التمارين حسب المنطقة
     * @param {string} bodyPart - منطقة الجسم
     * @returns {Promise<Array>} قائمة التمارين
     */
    async getExercisesByBodyPart(bodyPart) {
        // في تطبيق حقيقي، ستستخدم جدول التمارين في Supabase
        // هنا نقوم بالمحاكاة فقط
        return new Promise((resolve) => {
            setTimeout(() => {
                const exercises = MuscleLapApp.data.exercises[bodyPart] || [];
                resolve(exercises);
            }, 100);
        });
    }

    /**
     * حذف تمرين
     * @param {number} exerciseId - معرف التمرين
     * @returns {Promise<boolean>} نجاح العملية
     */
    async deleteExercise(exerciseId) {
        // في تطبيق حقيقي، ستستخدم جدول التمارين في Supabase
        // هنا نقوم بالمحاكاة فقط
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('تم حذف التمرين:', exerciseId);
                resolve(true);
            }, 100);
        });
    }
}

// ============================================================================
// فئة ImageUploader - معالجة رفع الصور
// ============================================================================

class ImageUploader {
    constructor() {
        this.supabaseService = new SupabaseService();
        this.currentUpload = null;
    }

    /**
     * تحضير الصورة للرفع
     * @param {File} file - ملف الصورة
     * @param {string} type - نوع الصورة (exercise, promo)
     * @returns {Promise<string>} رابط الصورة
     */
    async prepareImageUpload(file, type = 'exercise') {
        try {
            // التحقق من حجم الصورة (5MB كحد أقصى)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                throw new Error('حجم الصورة يجب أن يكون أقل من 5MB');
            }

            // التحقق من نوع الصورة
            if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
                throw new Error('نوع الصورة غير مدعوم. الرجاء اختيار صورة بصيغة JPEG, PNG, GIF, أو WebP');
            }

            // حفظ الملف للرفع
            this.currentUpload = {
                file: file,
                type: type,
                preview: URL.createObjectURL(file)
            };

            return this.currentUpload.preview;
        } catch (error) {
            console.error('خطأ في تحضير الصورة:', error);
            throw error;
        }
    }

    /**
     * رفع الصورة إلى Supabase
     * @param {string} folder - المجلد
     * @param {Function} onProgress - دالة التحديث
     * @returns {Promise<string>} رابط الصورة
     */
    async uploadImage(folder = 'exercises', onProgress = null) {
        if (!this.currentUpload || !this.currentUpload.file) {
            throw new Error('لا يوجد ملف للرفع');
        }

        try {
            // عرض تقدم الرفع
            if (onProgress) {
                onProgress(30); // بداية الرفع
            }

            // رفع الصورة
            const result = await this.supabaseService.uploadImage(
                this.currentUpload.file,
                folder,
                onProgress
            );

            // إكمال التقدم
            if (onProgress) {
                onProgress(100);
            }

            // تنظيف الذاكرة
            if (this.currentUpload.preview) {
                URL.revokeObjectURL(this.currentUpload.preview);
            }

            // إعادة تعيين الرفع الحالي
            const uploadedUrl = result.url;
            this.currentUpload = null;

            return uploadedUrl;
        } catch (error) {
            console.error('خطأ في رفع الصورة:', error);
            throw error;
        }
    }

    /**
     * إلغاء الرفع الحالي
     */
    cancelUpload() {
        if (this.currentUpload && this.currentUpload.preview) {
            URL.revokeObjectURL(this.currentUpload.preview);
        }
        this.currentUpload = null;
    }

    /**
     * حذف صورة من Supabase
     * @param {string} imageUrl - رابط الصورة
     * @returns {Promise<boolean>} نجاح العملية
     */
    async deleteImage(imageUrl) {
        try {
            // استخراج مسار الملف من الرابط
            const urlParts = imageUrl.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const folder = urlParts[urlParts.length - 2];
            const filePath = `${folder}/${fileName}`;

            return await this.supabaseService.deleteImage(filePath);
        } catch (error) {
            console.error('خطأ في حذف الصورة:', error);
            throw error;
        }
    }

    /**
     * الحصول على رابط صورة من Supabase
     * @param {string} filePath - مسار الملف
     * @returns {string} رابط الصورة
     */
    getImageUrl(filePath) {
        return this.supabaseService.getImageUrl(filePath);
    }
}

// ============================================================================
// تهيئة وتصدير الخدمات
// ============================================================================

// إنشاء نسخة من خدمة رفع الصور
const imageUploader = new ImageUploader();

// تصدير الخدمات للاستخدام في الملفات الأخرى
window.SupabaseService = SupabaseService;
window.ImageUploader = ImageUploader;
window.supabaseService = new SupabaseService();
window.imageUploader = imageUploader;

// رسالة تأكيد التحميل
console.log('✅ Supabase service initialized successfully');

// فحص اتصال Supabase
async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase.storage.listBuckets();
        
        if (error) {
            console.warn('⚠️  Unable to connect to Supabase. Please check your credentials.');
            console.warn('For development, images will be stored locally.');
        } else {
            console.log('✅ Successfully connected to Supabase');
        }
    } catch (error) {
        console.warn('⚠️  Supabase connection test failed:', error.message);
    }

// اختبار الاتصال عند التحميل
document.addEventListener('DOMContentLoaded', testSupabaseConnection);