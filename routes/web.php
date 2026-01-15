<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('page', [
        'canRegister' => Features::enabled(Features::registration()),
        'featuredProducts' => App\Models\Product::inRandomOrder()->take(4)->get(),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/Overview');
    })->name('dashboard');

    Route::get('/orders', function () {
        return Inertia::render('Dashboard/Orders');
    })->name('dashboard.orders');

    Route::get('/prescriptions', function () {
        return Inertia::render('Dashboard/Prescriptions');
    })->name('dashboard.prescriptions');

    Route::get('/profile', function () {
        return Inertia::render('Dashboard/Profile');
    })->name('dashboard.profile');
});

Route::get('/category/{slug}', [CategoryController::class, 'show'])->name('category.show');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order-success', [CheckoutController::class, 'success'])->name('order.success');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.show');

// Prescription Flow
Route::get('/prescription-upload', function () {
    return Inertia::render('PrescriptionUpload');
})->name('prescription.upload');

// Static Pages Content Map
$staticContent = [
    'about' => '
        <p>Nonsoemeka Pharmacy is a leading healthcare provider dedicated to bringing professional pharmaceutical care to your doorstep. Established with a vision to revolutionize healthcare access in Abia State, we combine traditional pharmacy values with modern technology.</p>
        <h3>Our Mission</h3>
        <p>To provide authentic, affordable, and accessible pharmaceutical care and wellness products to every household, ensuring a healthier community through professional excellence.</p>
        <h3>Why Choose Us?</h3>
        <ul>
            <li><strong>Authenticity:</strong> All our products are NAFDAC and PCN certified.</li>
            <li><strong>Expertise:</strong> Our licensed pharmacists are available 24/7 for consultations.</li>
            <li><strong>Speed:</strong> Local delivery within 30 minutes in Aba and environs.</li>
        </ul>
    ',
    'contact' => '
        <p>We are here to help you with your health and wellness needs. Reach out to us through any of the following channels:</p>
        <div class="grid md:grid-cols-2 gap-8 mt-8">
            <div class="p-6 bg-emerald-50 rounded-2xl">
                <h4 class="font-bold text-emerald-800">Address</h4>
                <p class="text-emerald-700">69 Umuola Road By Stainless Ogbor-hill Aba, Abia State</p>
            </div>
            <div class="p-6 bg-blue-50 rounded-2xl">
                <h4 class="font-bold text-blue-800">Phone & WhatsApp</h4>
                <p class="text-blue-700">+234 704 547 5153</p>
            </div>
        </div>
        <p class="mt-8 text-sm italic text-gray-500">Working Hours: Monday - Sunday, 24/7 Care</p>
    ',
    'privacy' => '
        <p>Your privacy is important to us. We collect and use your data only to improve your shopping experience and ensure accurate delivery of your medications.</p>
        <h3>Data Protection</h3>
        <p>We use industry-standard encryption to protect your personal and medical information. We never share your data with third parties without your explicit consent.</p>
    ',
    'careers' => '
        <p>Are you passionate about making a difference in healthcare? Join Nonsoemeka Pharmacy and be part of a team that prioritizes professional excellence and community well-being.</p>
        <h3>Available Positions</h3>
        <ul>
            <li><strong>Registered Pharmacists:</strong> Licensed professionals for branch operations and tele-consultations.</li>
            <li><strong>Pharmacy Technicians:</strong> Supporting our pharmacists in dispensing and inventory management.</li>
            <li><strong>Delivery Partners:</strong> Ensuring our 30-minute delivery promise is met across Aba.</li>
        </ul>
        <h3>Benefits</h3>
        <p>We offer competitive remuneration, continuous professional development, and a supportive work environment that fosters growth.</p>
        <p>Send your CV to careers@nonsoemeka.com</p>
    ',
    'locations' => '
        <p>We are expanding our reach to serve you better. Visit us at any of our existing branches or watch out for our upcoming locations.</p>
        <h3>Aba Branch (Main Office)</h3>
        <p>69 Umuola Road By Stainless Ogbor-hill<br>Aba, Abia State, Nigeria</p>
        <p><strong>Phone:</strong> +234 704 547 5153</p>
        <h3>Upcoming Branches (Q1 2026)</h3>
        <ul>
            <li><strong>Port Harcourt:</strong> Trans Amadi Industrial Layout</li>
            <li><strong>Umuahia:</strong> Tower Area</li>
        </ul>
    ',
    'consultation' => '
        <p>At Nonsoemeka Pharmacy, our commitment goes beyond just selling medications. We offer professional health consultations to help you manage your well-being effectively.</p>
        <h3>Our Services</h3>
        <ul>
            <li><strong>Medication Counseling:</strong> Guidance on dosage, side effects, and drug interactions.</li>
            <li><strong>Vital Checks:</strong> Complimentary blood pressure and blood sugar monitoring.</li>
            <li><strong>Tele-Health:</strong> Speak with a licensed pharmacist from the comfort of your home via WhatsApp or voice call.</li>
        </ul>
        <p>Available 24/7 for your emergencies and health inquiries.</p>
    ',
    'delivery' => '
        <p>Get your healthcare essentials delivered to your doorstep without delay. We pride ourselves on the speed and reliability of our logistics.</p>
        <h3>Aba Local Delivery</h3>
        <p>We guarantee <strong>under 30 minutes delivery</strong> within Aba and environs for all orders placed through our website or mobile app.</p>
        <h3>Nationwide Shipping</h3>
        <p>For our wellness and beauty products (non-prescription), we offer nationwide shipping within 2-3 business days.</p>
        <p><strong>Delivery Fee:</strong> Flat rate of ₦500 within Aba.</p>
    ',
    'rewards' => '
        <p>Your loyalty to your health deserves to be rewarded. Sign up for our Health Rewards program and enjoy exclusive benefits.</p>
        <h3>How it Works</h3>
        <p>Earn 1 point for every ₦1,000 spent on any of our products.</p>
        <h3>Redemption Levels</h3>
        <ul>
            <li><strong>50 Points:</strong> 5% discount on your next wellness purchase.</li>
            <li><strong>100 Points:</strong> Free home delivery for a month.</li>
            <li><strong>500 Points:</strong> Comprehensive health screening at our main office.</li>
        </ul>
        <p>Points are automatically tracked when you shop while logged into your account.</p>
    ',
    'terms' => '
        <p>By using the Nonsoemeka Pharmacy platform, you agree to comply with and be bound by the following terms and conditions of use.</p>
        <h3>Medical Disclaimer</h3>
        <p>The information provided on this platform is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.</p>
        <h3>Prescription Policy</h3>
        <p>All prescription medication orders must be accompanied by a valid prescription from a licensed medical practitioner. Our pharmacists reserve the right to verify prescriptions before dispensing.</p>
        <h3>Delivery & Returns</h3>
        <p>Delivery times are estimates and may vary based on location and prevailing conditions. Due to health regulations, medications cannot be returned once the seal is broken, except in cases of manufacturing defects.</p>
    ',
];

foreach (['about', 'contact', 'careers', 'locations', 'rewards', 'consultation', 'delivery', 'privacy', 'terms'] as $page) {
    Route::get('/'.$page, function () use ($page, $staticContent) {
        return Inertia::render('SimplePage', [
            'title' => ucwords(str_replace('-', ' ', $page)),
            'content' => $staticContent[$page] ?? '<p>This is a placeholder for the '.$page.' page. Detailed content is coming soon.</p>',
        ]);
    })->name($page);
}

require __DIR__.'/settings.php';
