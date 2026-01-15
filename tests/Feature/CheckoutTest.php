<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('renders the checkout page', function () {
    $response = $this->get(route('checkout'));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('Checkout')
        );
});

it('can submit a checkout form and redirect to success', function () {
    $response = $this->post(route('checkout.store'), [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john@example.com',
        'phone' => '07000000000',
        'address' => '123 Fake Street',
        'city' => 'Aba',
        'state' => 'Abia',
        'payment_method' => 'card',
    ]);

    $response->assertRedirect();
    $location = $response->headers->get('Location');
    expect($location)->toContain('order-success');
    expect($location)->toContain('orderId=ORD-');
});

it('renders the order success page', function () {
    $response = $this->get(route('order.success', ['orderId' => 'ORD-12345']));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('OrderSuccess')
                ->where('orderId', 'ORD-12345')
        );
});
