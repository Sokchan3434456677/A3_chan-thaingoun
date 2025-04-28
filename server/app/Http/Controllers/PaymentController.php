<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    private $baseUrl = 'https://api-uat145.phillipbank.com.kh:8441';
    private $clientId = '9501d6df-d0c3-4f33-8bf1-eee5cc7a486e';
    private $clientSecret = '59Pr4UuXwkfZX7QDVOh143Vq3UEEmplEEPvJmT2T';

    /**
     * Get Bearer Token
     */
    private function getBearerToken()
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])->post("{$this->baseUrl}/oauth/token", [
                'grant_type' => 'client_credentials',
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'scope' => 'txn-create'
            ]);

            $data = $response->json();

            if (!$data['access_token']) {
                throw new \Exception('Failed to get access token');
            }

            return $data['access_token'];
        } catch (\Exception $e) {
            throw new \Exception('Error getting bearer token: ' . ($e->getMessage() ?: 'Unknown error'));
        }
    }

    /**
     * Initialize Transaction
     */
    private function initTransaction($accessToken, $txnId)
    {
        try {
            $initData = [
                'partner_id' => 'banhji',
                'merchant_id' => '55368',
                'merchant_name' => 'Ear Sokchan',
                'merchant_city' => 'Phnom Penh',
                'merchant_category' => '5691',
                'merchant_rdn' => 'https://www.targetclothe.com/',
                'phone' => '010888664',
                'payload' => 'Test Item',
                'txn_id' => $txnId,
                'label' => 'Invoice No',
                'currency' => 'USD',
                'amount' => 0.01,
                'fee' => 0.0,
                'country_code' => 'KH',
                'success_redirect' => "https://www.targetclothe.com/payment-success.php?tran_id={$txnId}&status=success",
                'fail_redirect' => "https://www.targetclothe.com/payment-fail.php?tran_id={$txnId}&status=fail"
            ];

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$accessToken}",
                'Content-Type' => 'application/json'
            ])->post("{$this->baseUrl}/api/init/transaction", $initData);

            return $response->json();
        } catch (\Exception $e) {
            throw new \Exception('Error initializing transaction: ' . ($e->getMessage() ?: 'Unknown error'));
        }
    }

    /**
     * Check Transaction Status
     */
    private function checkTransactionStatus($accessToken, $txnId)
    {
        try {
            $statusData = [
                'merchant_id' => '55368',
                'txn_id' => $txnId
            ];

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$accessToken}",
                'Content-Type' => 'application/json'
            ])->post("{$this->baseUrl}/api/check/transaction", $statusData);

            return $response->json();
        } catch (\Exception $e) {
            throw new \Exception('Error checking transaction status: ' . ($e->getMessage() ?: 'Unknown error'));
        }
    }

    /**
     * Initialize Payment API
     */
    public function initPayment(Request $request)
    {
        try {
            $accessToken = $this->getBearerToken();
            $randomNum = mt_rand(10000000, 99999999);
            $txnId = "INV_" . str_pad($randomNum, 8, '0', STR_PAD_LEFT);

            $initResponse = $this->initTransaction($accessToken, $txnId);

            \Log::info('Init Response:', $initResponse);

            if (isset($initResponse['success']) && $initResponse['success']) {
                $newTxnId = $initResponse['data']['txn_id'];
                return response()->json([
                    'success' => true,
                    'message' => 'Transaction initialized successfully',
                    'data' => [
                        'txnId' => $newTxnId,
                        'initResponse' => $initResponse
                    ]
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => $initResponse['message'] ?? 'Failed to initialize transaction'
            ], 400);
        } catch (\Exception $e) {
            \Log::error('Init Payment Error:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check Transaction Status API
     */
    public function checkStatus(Request $request, $txnId)
    {
        try {
            $accessToken = $this->getBearerToken();
            $statusResponse = $this->checkTransactionStatus($accessToken, $txnId);

            if (isset($statusResponse['success']) && $statusResponse['success']) {
                return response()->json([
                    'success' => true,
                    'message' => 'Transaction status retrieved successfully',
                    'data' => $statusResponse['data']
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => $statusResponse['message'] ?? 'Failed to retrieve transaction status'
            ], 400);
        } catch (\Exception $e) {
            \Log::error('Check Status Error:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
