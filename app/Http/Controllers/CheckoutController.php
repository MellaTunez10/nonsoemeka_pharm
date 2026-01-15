<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Checkout');
    }

    public function store(Request $request): RedirectResponse
    {
        // Mock order processing
        // In a real app, we would validate, create an order in DB, etc.

        return redirect()->route('order.success', [
            'orderId' => 'ORD-'.strtoupper(bin2hex(random_bytes(4))),
        ]);
    }

    public function success(Request $request): Response
    {
        return Inertia::render('OrderSuccess', [
            'orderId' => $request->query('orderId'),
        ]);
    }
}
